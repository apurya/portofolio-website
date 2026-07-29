import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const PLAYLIST = [
  { title: 'Warna Primer', artist: 'starrducc', src: '/music/warnaprimer.mp3', cover: '/music/starrducc.jpg' },
]

const EQ_BAR_COUNT = 4
const EQ_BASE_LEVEL = 0.22

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MusicPlayer() {
  const { t } = useLanguage()
  const audioRef = useRef(null)
  const progressBarRef = useRef(null)
  const barRefs = useRef([])

  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0 - 100 (%)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const isDraggingRef = useRef(false)
  useEffect(() => {
    isDraggingRef.current = isDragging
  }, [isDragging])

  const currentTrack = PLAYLIST[trackIndex]
  const hasMultipleTracks = PLAYLIST.length > 1

  // Web Audio API: analisis frekuensi asli lagu untuk menggerakkan equalizer
  const audioCtxRef = useRef(null)
  const analyserRef = useRef(null)
  const dataArrayRef = useRef(null)
  const sourceNodeRef = useRef(null)
  const rafIdRef = useRef(null)

  const ensureAudioGraph = () => {
    const audio = audioRef.current
    if (!audio || sourceNodeRef.current) return
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      const audioCtx = new AudioContextClass()
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 64
      analyser.smoothingTimeConstant = 0.75

      const source = audioCtx.createMediaElementSource(audio)
      source.connect(analyser)
      analyser.connect(audioCtx.destination)

      audioCtxRef.current = audioCtx
      analyserRef.current = analyser
      sourceNodeRef.current = source
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
    } catch (err) {
      // Browser lama tanpa Web Audio API: musik tetap jalan, equalizer diam di posisi dasar
    }
  }

  const setBarLevel = (bar, level) => {
    if (bar) bar.style.transform = `scaleY(${level.toFixed(2)})`
  }

  const runEqLoop = () => {
    const analyser = analyserRef.current
    const dataArray = dataArrayRef.current
    if (!analyser || !dataArray) return

    analyser.getByteFrequencyData(dataArray)

    const bars = barRefs.current
    const groupSize = Math.max(1, Math.floor(dataArray.length / EQ_BAR_COUNT))

    for (let i = 0; i < EQ_BAR_COUNT; i++) {
      let sum = 0
      const start = i * groupSize
      const end = start + groupSize
      for (let j = start; j < end; j++) sum += dataArray[j]
      const avg = sum / groupSize / 255 // 0 - 1
      const level = Math.min(1, Math.max(EQ_BASE_LEVEL, Math.pow(avg, 0.7)))
      setBarLevel(bars[i], level)
    }

    rafIdRef.current = requestAnimationFrame(runEqLoop)
  }

  const startEqLoop = () => {
    stopEqLoop()
    rafIdRef.current = requestAnimationFrame(runEqLoop)
  }

  const stopEqLoop = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    barRefs.current.forEach((bar) => setBarLevel(bar, EQ_BASE_LEVEL))
  }

  const playCurrent = () => {
    const audio = audioRef.current
    if (!audio) return

    ensureAudioGraph()
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }

    const playPromise = audio.play()
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          setIsPlaying(true)
          startEqLoop()
        })
        .catch(() => setIsPlaying(false))
    } else {
      setIsPlaying(true)
      startEqLoop()
    }
  }

  const stopMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
    stopEqLoop()
  }

  const toggleMusic = () => (isPlaying ? stopMusic() : playCurrent())

  const goToTrack = (newIndex) => {
    const wasPlaying = isPlaying
    const nextIndex = (newIndex + PLAYLIST.length) % PLAYLIST.length
    setIsPlaying(false)
    stopEqLoop()
    setTrackIndex(nextIndex)
    if (wasPlaying) setTimeout(() => playCurrent(), 0)
  }

  const nextTrack = () => goToTrack(trackIndex + 1)
  const prevTrack = () => goToTrack(trackIndex - 1)

  // Progress bar bisa digeser (drag) oleh kursor / jari, tidak hanya diklik
  const getRatioFromPointer = (e) => {
    const bar = progressBarRef.current
    if (!bar) return 0
    const rect = bar.getBoundingClientRect()
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
  }

  const handleSeekStart = (e) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration)) return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setIsDragging(true)
    const ratio = getRatioFromPointer(e)
    setProgress(ratio * 100)
    setCurrentTime(ratio * audio.duration)
  }

  const handleSeekMove = (e) => {
    if (!isDragging) return
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration)) return
    const ratio = getRatioFromPointer(e)
    setProgress(ratio * 100)
    setCurrentTime(ratio * audio.duration)
  }

  const handleSeekEnd = (e) => {
    const audio = audioRef.current
    if (isDragging && audio && Number.isFinite(audio.duration)) {
      const ratio = getRatioFromPointer(e)
      audio.currentTime = ratio * audio.duration
    }
    setIsDragging(false)
  }

  // Ganti lagu otomatis saat selesai, & handle error load
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handleEnded = () => {
      goToTrack(trackIndex + 1)
      setTimeout(() => playCurrent(), 0)
    }
    const handleError = () => {
      setIsPlaying(false)
      stopEqLoop()
    }
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [trackIndex])

  // Update progress bar & durasi (diskip saat user sedang menggeser manual)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      if (isDraggingRef.current) return
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100)
        setCurrentTime(audio.currentTime)
      }
    }
    const handleLoadedMetadata = () => {
      setProgress(0)
      setCurrentTime(0)
      setDuration(audio.duration || 0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [trackIndex])

  // Stop musik saat tab disembunyikan / window kehilangan fokus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) stopMusic()
    }
    const handleBlur = () => stopMusic()

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleBlur)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
      stopEqLoop()
    }
  }, [])

  // Coba autoplay, fallback ke interaksi pertama pengguna (kebijakan browser)
  useEffect(() => {
    const tryAutoplay = () => {
      if (!isPlaying) playCurrent()
    }
    tryAutoplay()

    const handleFirstInteraction = () => {
      if (!isPlaying) playCurrent()
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }

    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full py-8 border-t border-border-soft dark:border-slate-800">
      <div className="container">
        <div className="flex flex-col items-center gap-5 p-5 bg-white border rounded-3xl sm:p-6 sm:gap-6 border-border-soft dark:border-slate-700 dark:bg-slate-800 sm:flex-row">
          <audio ref={audioRef} src={currentTrack.src} preload="metadata" crossOrigin="anonymous" />

          {/* Cover + info lagu */}
          <div className="flex items-center w-full gap-4 sm:w-auto sm:min-w-[210px]">
            <div className="relative flex items-center justify-center w-14 h-14 overflow-hidden shrink-0 rounded-xl bg-cream dark:bg-slate-700">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                draggable={false}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="min-w-0 text-left">
              <p className="inline-flex items-center gap-1.5 mb-1 text-[10px] font-extrabold uppercase tracking-widest2 text-dark/60 dark:text-white/60">
                <span className="eq-bars text-primary">
                  {Array.from({ length: EQ_BAR_COUNT }).map((_, i) => (
                    <span key={i} ref={(el) => (barRefs.current[i] = el)} />
                  ))}
                </span>
                {t('music_now_playing')}
              </p>
              <p className="text-sm font-bold truncate font-heading text-dark dark:text-white">
                {currentTrack.title}
              </p>
              <p className="text-xs truncate text-slate-500 dark:text-slate-400">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Kontrol transport + progress bar */}
          <div className="flex flex-col items-center flex-1 w-full gap-2.5">
            <div className="flex items-center gap-3">
              {hasMultipleTracks && (
                <button
                  onClick={prevTrack}
                  aria-label={t('music_prev')}
                  title={t('music_prev')}
                  className="flex items-center justify-center w-8 h-8 transition-colors rounded-full text-dark dark:text-white hover:bg-dark/5 dark:hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
                </button>
              )}

              <button
                onClick={toggleMusic}
                aria-label={isPlaying ? t('music_pause') : t('music_play')}
                title={isPlaying ? t('music_pause') : t('music_play')}
                className="flex items-center justify-center w-10 h-10 transition-transform duration-200 rounded-full bg-primary text-dark hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M7 5h3v14H7zm7 0h3v14h-3z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {hasMultipleTracks && (
                <button
                  onClick={nextTrack}
                  aria-label={t('music_next')}
                  title={t('music_next')}
                  className="flex items-center justify-center w-8 h-8 transition-colors rounded-full text-dark dark:text-white hover:bg-dark/5 dark:hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z" />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex items-center w-full max-w-md gap-2">
              <span className="text-[11px] tabular-nums text-slate-400 w-8 text-right shrink-0">
                {formatTime(currentTime)}
              </span>

              {/* Track: area sentuh diperbesar secara vertikal supaya nyaman digeser */}
              <div
                ref={progressBarRef}
                onPointerDown={handleSeekStart}
                onPointerMove={handleSeekMove}
                onPointerUp={handleSeekEnd}
                onPointerCancel={handleSeekEnd}
                className={`relative flex-1 flex items-center h-4 select-none touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}`}
              >
                <div className="relative w-full h-1.5 overflow-visible rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Thumb / gagang geser */}
                  <div
                    className={`absolute top-1/2 w-3.5 h-3.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-primary border-2 border-white dark:border-slate-800 shadow-card transition-transform ${isDragging ? 'scale-125' : 'scale-100'}`}
                    style={{ left: `${progress}%` }}
                  />
                </div>
              </div>

              <span className="text-[11px] tabular-nums text-slate-400 w-8 shrink-0">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}