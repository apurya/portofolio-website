import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useLanguage } from '../context/LanguageContext';

const SEAL_COLORS = ['#FEDE00', '#70C1FE', '#15AA98', '#FF7168'];

function CertCard({ val, index }) {
  const { t } = useLanguage();
  const sealColor = SEAL_COLORS[index % SEAL_COLORS.length];

  return (
    <a
      href={val.link}
      target="_blank"
      rel="noreferrer"
      className="relative flex flex-col w-full mt-6 cert-card group"
    >
      <span
        className="cert-seal"
        style={{ backgroundColor: sealColor }}
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-dark">
          <path d="M12 2l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 14.2l-4.8 2.56.92-5.34L4.24 7.64l5.36-.78L12 2z" fill="currentColor" />
        </svg>
      </span>

      <div className="relative overflow-hidden aspect-[4/3] rounded-t-[1.4rem]">
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

      <div className="flex items-center flex-1 gap-3 p-5 cert-divider">
        <img
          src={val.logo}
          alt=""
          className="object-cover w-12 h-12 bg-white border-2 rounded-full shadow-card aspect-square border-border-soft dark:border-slate-600"
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
  );
}

export default function Certification({ item }) {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="grid items-start grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 place-items-center">
        {item.map((val, index) => (
          <CertCard key={val.id} val={val} index={index} />
        ))}
      </div>
    </div>
  );
}