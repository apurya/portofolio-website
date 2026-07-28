import CerData from '../CerData';
import Certification from './Certification';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function CertifSection() {
  const { t } = useLanguage();
  useEffect(() => {
    Aos.init({ duration: 500 })
  }, [])
  const item = CerData

  return (
    <div id="certification" className="mt-24" data-aos="fade-up">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-2 eyebrow-label">{t('cert_heading')}</p>
          <h3 className="section-title !text-2xl sm:!text-3xl">{t('cert_heading')}</h3>
        </div>
        <span className="badge-pill">
          {item.length} {t('cert_count')}
        </span>
      </div>
      <Certification item={item} />
    </div>
  )
}