import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Data from '../Data';
import { useLanguage } from '../context/LanguageContext';

const baseClass =
  'inline-flex items-center px-4 py-2 text-xs font-bold rounded-full border transition-all duration-200';
const activeClass =
  'bg-dark text-white border-dark dark:bg-white dark:text-dark dark:border-white';
const inactiveClass =
  'bg-transparent text-dark/60 dark:text-white/60 border-border-soft dark:border-slate-700 hover:border-dark dark:hover:border-white hover:text-dark dark:hover:text-white';

const categoryTranslationKey = {
  'Web Development': 'category_webdev',
  'Technical Support': 'category_techsupport',
};

export default function Buttons({ menuItems, filterItems, setItems }) {
  const { t } = useLanguage();
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleClick = (val) => {
    setActiveButton(val);
    filterItems(val);
  };

  const handleReset = () => {
    setActiveButton(null);
    setItems(Data);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        data-aos="fade-right"
        className={`${baseClass} ${activeButton === null ? activeClass : inactiveClass}`}
        onClick={handleReset}
      >
        {t('langtools_all')}
      </button>

      {menuItems.map((val) => (
        <button
          key={val}
          data-aos="fade-right"
          className={`${baseClass} ${activeButton === val ? activeClass : inactiveClass}`}
          onClick={() => handleClick(val)}
        >
          {t(categoryTranslationKey[val] || val)}
        </button>
      ))}
    </div>
  );
}