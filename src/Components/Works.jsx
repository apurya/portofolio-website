import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import ProjData from '../ProjData'
import Project from './Project'
import { useLanguage } from '../context/LanguageContext'

export default function Works() {
  const { t, lang } = useLanguage();
  const items = ProjData[lang]

  useEffect(() => {
    Aos.init({ duration: 500 })
  }, [])

  return (
    <section id="projects" className="pt-24 pb-24">
      <div className="container">
        <div className="self-center">
          <div className="mb-10" data-aos="fade-right">
            <span className="inline-block px-3 py-1 mb-3 text-[11px] font-extrabold uppercase tracking-widest2 text-dark bg-primary rounded-full">
              Showcase
            </span>
            <h3 className="section-title !text-2xl sm:!text-3xl uppercase tracking-tightest">
              {t('projects_heading')}
            </h3>
          </div>

          <Project item={items} />
        </div>
      </div>
    </section>
  )
}