import CerData from '../CerData';
import Certification from './Certification';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import AchieveIcon from '../img/rocket.png';

export default function CertifSection() {
  const { t } = useLanguage();
  useEffect(() => {
    Aos.init({ duration: 500 })
  }, [])
  const item = CerData

  return (
    <section id="certification" className="relative" data-aos="fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
  <h3 className="flex items-center gap-3 section-title !text-2xl sm:!text-3xl">
    <span className="inline-flex items-center justify-center shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-full">
      <img src={AchieveIcon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
    </span>
    {t('cert_heading')}
  </h3>
</div>
        <span className="badge-pill">
          {item.length} {t('cert_count')}
        </span>
      </div>

      <Certification item={item} />
    </section>
  )
}