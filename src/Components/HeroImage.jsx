import { useRef } from 'react'

const codeLines = [
  { text: '$ ping 192.168.1.1', color: '#8C8279' },
  { text: 'Reply from 192.168.1.1: time=1ms', color: '#128E7F' },
  { text: '$ ipconfig /all', color: '#8C8279' },
  { text: 'Connection: established', color: '#128E7F' },
  { text: "import React from 'react'", color: '#3A8ED6' },
  { text: 'function App() { return <Hero /> }', color: '#E85A51' },
  { text: '$ npm run dev', color: '#8C8279' },
  { text: 'VITE ready in 320ms', color: '#128E7F' },
  { text: 'SELECT * FROM users;', color: '#B08E00' },
  { text: '> status: connected', color: '#128E7F' },
]

function FlatMascot({ className = 'w-16 h-16' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="58" rx="30" ry="26" fill="#FEDE00" />
      <ellipse cx="34" cy="52" rx="10" ry="14" fill="#FEDE00" transform="rotate(-20 34 52)" />
      <circle cx="66" cy="42" r="16" fill="#FEDE00" />
      <path d="M78 40 L92 44 L78 50 Z" fill="#FF7168" />
      <circle cx="70" cy="38" r="2.4" fill="#383838" />
      <path d="M40 78 Q50 88 60 78" stroke="#383838" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function HeroImage() {
  const wrapRef = useRef(null)

  const tiltFromPoint = (clientX, clientY) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = clientX - rect.left - rect.width / 2
    const y = clientY - rect.top - rect.height / 2
    const rotateY = (x / rect.width) * 8
    const rotateX = -(y / rect.height) * 8
    el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`
  }

  const resetTilt = () => {
    const el = wrapRef.current
    if (!el) return
    el.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)`
  }

  const handleMouseMove = (e) => tiltFromPoint(e.clientX, e.clientY)
  const handleMouseLeave = () => resetTilt()

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center max-w-md mx-auto">

        <span className="absolute -z-30 w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] blob-shape-a bg-accent-teal/25"></span>
        <span className="absolute -z-30 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] translate-x-6 -translate-y-4 blob-shape-b bg-accent-coral/20"></span>

        <svg viewBox="0 0 400 400" className="absolute -z-20 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] opacity-30">
          <g stroke="#70C1FE" strokeWidth="1" strokeDasharray="4 4" fill="none">
            <path d="M60,80 L200,200 L340,90" />
            <path d="M60,320 L200,200 L340,310" />
            <path d="M200,200 L200,60" />
            <path d="M200,200 L200,340" />
          </g>
          {[[60, 80], [340, 90], [60, 320], [340, 310], [200, 60], [200, 340], [200, 200]].map(
            ([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={i === 6 ? 5 : 3.5} fill="#70C1FE" />
          )}
          <circle r="4" fill="#15AA98">
            <animateMotion dur="3s" repeatCount="indefinite" path="M60,80 L200,200 L340,90" />
          </circle>
          <circle r="4" fill="#FF7168">
            <animateMotion dur="4s" repeatCount="indefinite" path="M60,320 L200,200 L340,310" />
          </circle>
          <circle r="4" fill="#FEDE00">
            <animateMotion dur="3.5s" repeatCount="indefinite" path="M200,60 L200,200 L200,340" />
          </circle>
        </svg>

        <span className="absolute -z-10 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] border-2 border-dashed rounded-full border-primary/30 animate-spin [animation-duration:26s]"></span>

        <span className="absolute bottom-0 w-40 h-6 -translate-x-1/2 rounded-full left-1/2 bg-dark/10 blur-md"></span>

        <div
          ref={wrapRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-[260px] sm:max-w-sm transition-transform duration-150 ease-out float-img"
        >
          <div className="p-3 border-4 border-white shadow-card-hover bg-white dark:bg-slate-800 dark:border-slate-700 rounded-3xl">
            <div className="flex items-center gap-1.5 px-2 pb-2 mb-2 border-b border-border-soft dark:border-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-coral"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-accent-teal"></span>
              <span className="flex-1 ml-2 px-3 py-1 text-[10px] font-mono text-slate-500 bg-cream dark:bg-slate-900 rounded-full truncate">
                purya.com
              </span>
            </div>

            <div
              className="h-40 px-2 overflow-hidden text-xs font-mono leading-relaxed bg-cream/60 dark:bg-slate-900/60 rounded-2xl sm:h-48"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
              }}
            >
              <div className="pt-3 code-scroll">
                {[...codeLines, ...codeLines].map((line, i) => (
                  <p key={i} className="whitespace-nowrap" style={{ color: line.color }}>
                    {line.text}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="h-3 mx-auto -mt-1 bg-white border-x border-b shadow-inner dark:bg-slate-800 border-border-soft dark:border-slate-700 rounded-b-2xl" style={{ width: '92%' }}></div>
          <div className="h-1.5 mx-auto bg-border-soft dark:bg-slate-700 rounded-b-full" style={{ width: '40%' }}></div>
        </div>

        <span className="absolute flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full shadow-card bg-white dark:bg-slate-800 border border-border-soft dark:border-slate-700 text-dark dark:text-slate-200 -top-6 -left-2 sm:-top-8 sm:-left-8 float-chip">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
          Web Developer
        </span>

        <span
          className="absolute flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full shadow-card bg-white dark:bg-slate-800 border border-border-soft dark:border-slate-700 text-dark dark:text-slate-200 top-6 -right-2 sm:top-8 sm:-right-10 float-chip"
          style={{ animationDelay: '1.2s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-teal"></span>
          IT Support
        </span>

        <span
          className="absolute flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full shadow-card bg-white dark:bg-slate-800 border border-border-soft dark:border-slate-700 text-dark dark:text-slate-200 -bottom-1 left-1 sm:-bottom-2 sm:left-0 float-chip"
          style={{ animationDelay: '2s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-coral"></span>
          IT Infrastructure
        </span>

        <div
          className="absolute z-30 -bottom-10 -right-6 sm:-bottom-12 sm:-right-10 float-chip"
          style={{ animationDelay: '0.6s' }}
        >
          <FlatMascot className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-lg" />
        </div>

        <span
          className="absolute z-20 flex items-center justify-center w-8 h-8 -translate-y-1/2 rounded-2xl top-1/2 -left-4 sm:-left-8 bg-accent-blue/20 float-chip"
          style={{ animationDelay: '1.6s' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent-blue"></span>
        </span>
        <span
          className="absolute z-20 flex items-center justify-center rounded-full w-7 h-7 top-4 left-6 sm:top-2 sm:left-2 bg-primary/25 float-chip"
          style={{ animationDelay: '2.2s' }}
        >
          <span className="w-2 h-2 rounded-full bg-primary"></span>
        </span>
      </div>
    </div>
  )
}