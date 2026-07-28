import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import ProjData from '../ProjData'
import building from '../img/projects.png'
import Project from './Project'
import { useLanguage } from '../context/LanguageContext'

export default function Works() {
  const { t } = useLanguage();
  const items = ProjData

  useEffect(() => {
    Aos.init({ duration: 500 })
  }, [])

  return (
    <section id="projects" className="pt-24 pb-24">
      <div className="container">
        <div className="self-center">
          <div className="flex items-center px-4 mb-8" data-aos="fade-right">
            <img src={building} alt="" className="w-[40px] pl-2 mr-1" />
            <h4 className="text-xl font-semibold text-dark dark:text-white heading-wow">{t('projects_heading')}</h4>
          </div>

          <Project item={items} />
        </div>
      </div>
    </section>
  )
}