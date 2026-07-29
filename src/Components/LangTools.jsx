import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from "react"
import Data from "../Data"
import Buttons from "./Buttons"
import SkillCard from "./SkillCard"
import { useLanguage } from '../context/LanguageContext'
import ToolsIcon from '../img/computer.png'

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
    <div data-aos="fade-up">
      <h3 className="inline-flex items-center gap-3 px-6 py-2.5 sm:px-7 sm:py-3 font-heading text-2xl sm:text-3xl font-bold tracking-tightest text-dark bg-primary rounded-full">
  {t('langtools_heading')}
</h3>
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