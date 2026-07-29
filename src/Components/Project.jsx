import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const RIBBON_COLORS = ['#FEDE00', '#70C1FE', '#15AA98', '#FF7168']

function DuckMascot({ className }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path
        d="M46 26c4.5 0 8 3.6 8 8 0 3.4-2 6.3-5 7.5-.6 4.4-4.4 7.8-9 7.8H21c-6.6 0-12-5.4-12-12 0-5.6 3.9-10.3 9.1-11.6C19.2 19.6 24.7 15 31 15c7 0 12.8 5 14 11.6Z"
        fill="currentColor"
      />
      <circle cx="45" cy="24" r="2" fill="#383838" />
      <path d="M52 24l6-2.5-3.5 5.5L52 24Z" fill="currentColor" />
    </svg>
  )
}

export default function Project({ item }) {
  const { t } = useLanguage()

  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])

  return (
    <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto mt-10 sm:grid-cols-2">
      {item.map((val, index) => {
        const techList = [val.tech1, val.tech2, val.tech3].filter(Boolean)
        const ribbon = RIBBON_COLORS[index % RIBBON_COLORS.length]

        return (
          <a
            href={val.link}
            target="_blank"
            rel="noreferrer"
            className="relative flex flex-col overflow-hidden bg-white border-2 border-dark dark:bg-slate-900 dark:border-white/15 stamp-card rounded-2xl group"
            key={val.id}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            {/* === Blok grafis warna ala thumbnail "Our Blog" MotherDuck === */}
            <div
              className="relative flex items-center justify-center h-44 overflow-hidden border-b-2 border-dark sm:h-52"
              style={{ backgroundColor: ribbon }}
            >
              {val.category && (
                <span className="absolute top-0 left-0 z-10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest2 text-white bg-dark">
                  {val.category}
                </span>
              )}

              {/* Mockup browser frame membungkus screenshot project */}
              <div className="relative w-[78%] rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500 rounded-xl border-2 border-dark bg-white shadow-card overflow-hidden">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-cream border-b border-dark/10">
                  <span className="w-2 h-2 rounded-full bg-accent-coral" />
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="w-2 h-2 rounded-full bg-accent-teal" />
                </div>
                <img
                  src={val.img}
                  alt={val.title}
                  className="object-cover object-top w-full h-24 sm:h-28"
                />
              </div>

              <DuckMascot className="absolute bottom-2.5 right-3 w-7 h-7 text-white drop-shadow-sm" />
            </div>

            {/* === Bagian putih: meta, judul, deskripsi === */}
            <div className="flex flex-col flex-1 p-6">
              <p className="text-[11px] font-bold uppercase tracking-widest2 text-slate-400 dark:text-slate-500">
                 {t('projects_personal')} {val.type ? ` · ${val.type}` : ''}
              </p>

              <h2 className="mt-2 text-lg font-extrabold leading-snug uppercase sm:text-xl font-heading text-dark dark:text-white">
                {val.title}
              </h2>

              {val.desc && (
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  {val.desc}
                </p>
              )}

              <div className="flex items-center justify-between pt-5 mt-5 border-t border-dashed border-border-soft dark:border-slate-700">
                <div className="flex items-center -space-x-2">
                  {techList.map((tech, i) => (
                    <img
                      key={i}
                      src={tech}
                      alt=""
                      className="w-8 h-8 p-1 bg-white border-2 rounded-full dark:bg-slate-800 border-cream dark:border-slate-800"
                    />
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-dark dark:text-primary">
                 {t('projects_view')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}