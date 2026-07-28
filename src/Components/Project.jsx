import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const ACCENT_TEXT = ['text-dark dark:text-primary', 'text-accent-blue', 'text-accent-teal', 'text-accent-coral'];
const ACCENT_BG = ['bg-primary', 'bg-accent-blue', 'bg-accent-teal', 'bg-accent-coral'];

export default function Project({ item }) {
  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])

  return (
    <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto mt-6 sm:grid-cols-2">
      {item.map((val, index) => {
        const techList = [val.tech1, val.tech2, val.tech3].filter(Boolean)
        const accentText = ACCENT_TEXT[index % ACCENT_TEXT.length]
        const accentBg = ACCENT_BG[index % ACCENT_BG.length]

        return (
          <a
            href={val.link}
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden card-surface group"
            key={val.id}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div className="relative overflow-hidden aspect-video rounded-t-3xl">
              <img
                src={val.img}
                alt={val.title}
                className="object-cover object-center w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-dark/50 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-dark translate-y-3 rounded-full bg-primary transition-transform duration-300 group-hover:translate-y-0">
                  Lihat Project
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {val.category && (
                <p className={`mb-1.5 text-xs font-bold tracking-widest2 uppercase ${accentText}`}>
                  {val.category}
                </p>
              )}

              <h2 className="text-lg font-bold sm:text-xl text-dark dark:text-white">
                {val.title}
              </h2>

              <span className={`block h-0.5 w-8 mt-2 rounded-full ${accentBg}`}></span>

              <div className="flex items-center justify-between mt-4">
                <p className="text-xs font-medium sm:text-sm text-slate-500 dark:text-slate-400">
                  {val.type}
                </p>

                <div className="flex items-center gap-2 sm:gap-3">
                  {techList.map((tech, i) => (
                    <img
                      key={i}
                      src={tech}
                      alt=""
                      className="w-5 h-5 transition-transform duration-300 ease-out sm:w-6 sm:h-6 group-hover:-translate-y-0.5"
                    />
                  ))}
                </div>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}