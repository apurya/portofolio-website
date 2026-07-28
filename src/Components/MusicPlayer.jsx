import { useEffect, useRef, useState } from 'react'

const PLAYLIST = [
  { title: 'Warna Primer', artist: 'starrducc', src: '/music/warnaprimer.mp3', cover: '/music/starrducc.jpg' },
]

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const containerRef = useRef(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [glowColor, setGlowColor] = useState('59, 130, 246')
  const [progress, setProgress] = useState(0) // 0 - 100 (%)

  const currentTrack = PLAYLIST[trackIndex]

  const audioCtxRef = useRef(null)
  const analyserRef = useRef(null)
  const dataArrayRef = useRef(null)
  const sourceNodeRef = useRef(null)
  const rafIdRef = useRef(null)
  const glowColorRef = useRef(glowColor)

  useEffect(() => {
    glowColorRef.current = glowColor
  }, [glowColor])

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = currentTrack.cover

    img.onload = () => {
      if (cancelled) return
      try {
        const canvas = document.createElement('canvas')
        const size = 40
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, size, size)

        const { data } = ctx.getImageData(0, 0, size, size)
        let r = 0, g = 0, b = 0, count = 0

        for (let i = 0; i < data.length; i += 4) {
          const pr = data[i]
          const pg = data[i + 1]
          const pb = data[i + 2]
          const alpha = data[i + 3]
          if (alpha < 200) continue

          const max = Math.max(pr, pg, pb)
          const min = Math.min(pr, pg, pb)
          if (max > 245 && min > 245) continue
          if (max < 15) continue

          r += pr
          g += pg
          b += pb
          count++
        }

        if (count > 0) {
          r = Math.round(r / count)
          g = Math.round(g / count)
          b = Math.round(b / count)
          setGlowColor(`${r}, ${g}, ${b}`)
        }
      } catch (err) {
      }
    }

    return () => {
      cancelled = true
    }
  }, [currentTrack.cover])

  const ensureAudioGraph = () => {
    const audio = audioRef.current
    if (!audio || sourceNodeRef.current) return

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      const audioCtx = new AudioContextClass()
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 64
      analyser.smoothingTimeConstant = 0.8

      const source = audioCtx.createMediaElementSource(audio)
      source.connect(analyser)
      analyser.connect(audioCtx.destination)

      audioCtxRef.current = audioCtx
      analyserRef.current = analyser
      sourceNodeRef.current = source
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
    } catch (err) {
    }
  }

  const runGlowLoop = () => {
    const analyser = analyserRef.current
    const dataArray = dataArrayRef.current
    const el = containerRef.current
    if (!analyser || !dataArray || !el) return

    analyser.getByteFrequencyData(dataArray)

    const bassBinCount = Math.max(1, Math.floor(dataArray.length * 0.35))
    let sum = 0
    for (let i = 0; i < bassBinCount; i++) sum += dataArray[i]
    const bassLevel = sum / bassBinCount / 255

    const intensity = Math.pow(bassLevel, 1.6)

    const blur1 = 10 + intensity * 34
    const spread1 = 2 + intensity * 10
    const alpha1 = 0.35 + intensity * 0.45
    const blur2 = 20 + intensity * 60
    const spread2 = 4 + intensity * 16
    const alpha2 = 0.18 + intensity * 0.35

    const color = glowColorRef.current
    el.style.boxShadow =
      `0 0 ${blur1.toFixed(1)}px ${spread1.toFixed(1)}px rgba(${color}, ${alpha1.toFixed(2)}), ` +
      `0 0 ${blur2.toFixed(1)}px ${spread2.toFixed(1)}px rgba(${color}, ${alpha2.toFixed(2)})`

    const cover = el.querySelector('[data-cover]')
    if (cover) {
      const scale = 1 + intensity * 0.08
      cover.style.transform = `scale(${scale})`
    }

    rafIdRef.current = requestAnimationFrame(runGlowLoop)
  }

  const startGlowLoop = () => {
    stopGlowLoop()
    rafIdRef.current = requestAnimationFrame(runGlowLoop)
  }

  const stopGlowLoop = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    const el = containerRef.current
    if (el) el.style.boxShadow = ''
    const cover = el?.querySelector('[data-cover]')
    if (cover) cover.style.transform = ''
  }

  const stopMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
    stopGlowLoop()
  }

  const playCurrent = () => {
    const audio = audioRef.current
    if (!audio) return

    ensureAudioGraph()

    const playPromise = audio.play()
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          setIsPlaying(true)
          startGlowLoop()
        })
        .catch(() => {
          setIsPlaying(false)
        })
    } else {
      setIsPlaying(true)
      startGlowLoop()
    }

    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
  }

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic()
    } else {
      playCurrent()
    }
  }

  const goToTrack = (newIndex) => {
    const wasPlaying = isPlaying
    stopGlowLoop()
    setIsPlaying(false)

    const nextIndex = (newIndex + PLAYLIST.length) % PLAYLIST.length
    setTrackIndex(nextIndex)

    if (wasPlaying) {
      setTimeout(() => playCurrent(), 0)
    }
  }

  const nextTrack = () => goToTrack(trackIndex + 1)
  const prevTrack = () => goToTrack(trackIndex - 1)

  const seekTo = (e) => {
  const audio = audioRef.current
  const bar = e.currentTarget
  if (!audio || !audio.duration) return
  const rect = bar.getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  audio.currentTime = ratio * audio.duration
}

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handleEnded = () => {
      goToTrack(trackIndex + 1)
      setTimeout(() => playCurrent(), 0)
    }
    const handleError = () => {
      setIsPlaying(false)
      stopGlowLoop()
    }
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
useEffect(() => {
  const audio = audioRef.current
  if (!audio) return

  const handleTimeUpdate = () => {
    if (audio.duration > 0) {
      setProgress((audio.currentTime / audio.duration) * 100)
    }
  }
  const handleLoadedMetadata = () => setProgress(0)

  audio.addEventListener('timeupdate', handleTimeUpdate)
  audio.addEventListener('loadedmetadata', handleLoadedMetadata)
  return () => {
    audio.removeEventListener('timeupdate', handleTimeUpdate)
    audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
  }
}, [trackIndex])
  }, [trackIndex])

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
      stopGlowLoop()
      audioCtxRef.current?.close?.()
    }
  }, [])

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
}, [])

  return (
    <>
      <audio ref={audioRef} src={currentTrack.src} crossOrigin="anonymous" preload="auto" />

      {/* Tombol player*/}
      <div
        ref={containerRef}
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-1 pr-3 rounded-full backdrop-blur-sm border select-none ${
          isPlaying ? 'border-transparent music-glow' : 'border-slate-100 dark:border-slate-700 shadow-lg transition-shadow duration-500'
        }`}
        style={{
          '--glow-color': glowColor,
          backgroundColor: isPlaying ? `rgba(${glowColor}, 0.16)` : undefined,
        }}
      >
        {/* Bar progress lagu, warnanya ikut warna dominan cover */}
<div
  onClick={seekTo}
  className="fixed z-40 h-1.5 rounded-full cursor-pointer bg-black/10 dark:bg-white/10"
  style={{
    bottom: '4px',
    right: '20px',
    left: '20px',
    maxWidth: '260px',
    marginLeft: 'auto',
  }}
>
  <div
    className="h-full transition-[width] duration-150 ease-linear rounded-full"
    style={{
      width: `${progress}%`,
      backgroundColor: `rgb(${glowColor})`,
      boxShadow: `0 0 8px 1px rgba(${glowColor}, 0.6)`,
    }}
  />
</div>
        {/* Tombol Previous */}
        <button
          onClick={prevTrack}
          aria-label="Lagu sebelumnya"
          title="Lagu sebelumnya"
          className="flex items-center justify-center w-8 h-8 ml-2 rounded-full shrink-0 hover:bg-black/10 dark:hover:bg-white/10 active:scale-90 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-dark dark:text-white">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

        {/* Cover + Play/Pause */}
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Hentikan musik' : 'Putar musik'}
          title={isPlaying ? 'Hentikan musik' : 'Putar musik'}
          className="relative flex items-center justify-center w-12 h-12 overflow-hidden transition-transform duration-150 ease-out rounded-full shrink-0 touch-manipulation hover:scale-105 active:scale-90"
        >
          <img
            data-cover
            src={currentTrack.cover}
            alt={currentTrack.title}
            draggable={false}
            className={`w-full h-full object-cover transition-transform duration-100 ease-out ${isPlaying ? 'animate-spin' : ''}`}
            style={{ animationDuration: '6s' }}
          />
          <span className="absolute inset-0 flex items-center justify-center transition-colors bg-black/30 hover:bg-black/40">
            {isPlaying ? (
              <span className="flex items-end gap-0.5 h-3.5">
                <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '60%', animationDuration: '0.6s' }}></span>
                <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '100%', animationDuration: '0.8s' }}></span>
                <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '40%', animationDuration: '0.5s' }}></span>
              </span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </span>
        </button>

        {/* Info lagu */}
        <div className="flex flex-col items-start py-2 text-left max-w-[110px] sm:max-w-[150px]">
          <span className="w-full text-xs font-bold truncate text-dark dark:text-white">
            {currentTrack.title}
          </span>
          <span className="w-full text-[11px] truncate text-slate-500 dark:text-slate-400">
            {currentTrack.artist}
          </span>
        </div>

        {/* Tombol Next */}
        <button
          onClick={nextTrack}
          aria-label="Lagu berikutnya"
          title="Lagu berikutnya"
          className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 hover:bg-black/10 dark:hover:bg-white/10 active:scale-90 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-dark dark:text-white">
            <path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z" />
          </svg>
        </button>
      </div>
    </>
  )
}