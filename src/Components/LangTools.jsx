import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from "react"
import Data from "../Data"
import Buttons from "./Buttons"
import SkillCard from "./SkillCard"
import { useLanguage } from '../context/LanguageContext'

export default function LangTools() {
  const { t } = useLanguage();
  const [item, setItems] = useState(Data)
  const menuItems = [...new Set(Data.map((val) => val.category))]

  const filterItems = (cat) => {
    const newItems = Data.filter((newval) => newval.category === cat)
    setItems(newItems)
  }

  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])

  return (
    <div className="mt-24" data-aos="fade-up">
      <p className="mb-2 eyebrow-label">{t('about_skills')}</p>
      <h3 className="section-title !text-2xl sm:!text-3xl">{t('langtools_heading')}</h3>

      <div className="mt-6">
        <Buttons
          menuItems={menuItems}
          filterItems={filterItems}
          setItems={setItems}
        />
      </div>

      <SkillCard item={item} />
    </div>
  )
}