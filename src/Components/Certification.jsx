import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Certification({ item }) {
  const { t } = useLanguage();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
        {item.map((val, index) => (
          <a
            href={val.link}
            target="_blank"
            rel="noreferrer"
            key={val.id}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            data-aos-anchor-placement="top-bottom"
            className="relative block w-full overflow-hidden card-surface group sm:w-[400px] lg:w-[440px]"
          >
            <div className="relative overflow-hidden aspect-[4/3] rounded-t-3xl">
              <img
                src={val.img}
                alt={val.alt}
                className="object-cover object-top w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <span className="absolute inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-dark transition-opacity duration-300 rounded-full opacity-0 top-3 right-3 bg-primary group-hover:opacity-100">
                {t('cert_view')}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 10H3a1 1 0 110-2h12.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </span>
            </div>

            <div className="flex items-center gap-3 p-5">
              <img
                src={val.logo}
                alt=""
                className="object-cover bg-white border-2 rounded-full shadow-card w-12 h-12 aspect-square border-border-soft dark:border-slate-600"
              />
              <div>
                <p className="text-base font-bold leading-tight text-dark dark:text-white sm:text-lg">
                  {val.title}
                </p>
                {val.subtitle && (
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{val.subtitle}</p>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}