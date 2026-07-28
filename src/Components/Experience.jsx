import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import works from '../img/works.png'
import ExpData from '../ExpData';
import { useLanguage } from '../context/LanguageContext';

const ACCENTS = [
  { bar: 'bg-primary', text: 'text-dark dark:text-primary', dot: 'bg-primary' },
  { bar: 'bg-accent-blue', text: 'text-accent-blue', dot: 'bg-accent-blue' },
  { bar: 'bg-accent-teal', text: 'text-accent-teal', dot: 'bg-accent-teal' },
  { bar: 'bg-accent-coral', text: 'text-accent-coral', dot: 'bg-accent-coral' },
];

export default function Experience() {
  const { t, lang } = useLanguage();
  const data = ExpData[lang];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <section id="experience" className="section-wrap">
      <div className="container">
        <div className="mb-10" data-aos="fade-right">
          <p className="mb-2 eyebrow-label">{t('exp_heading')}</p>
          <div className="flex items-center gap-2">
            <img src={works} alt="" className="w-8 h-8" />
            <h3 className="section-title !text-2xl sm:!text-3xl">
              {t('exp_heading')}
            </h3>
          </div>
        </div>

        <div className="flex flex-col max-w-4xl gap-6 mx-auto">
          {data.map((exp, index) => {
            const accent = ACCENTS[index % ACCENTS.length];

            return (
              <div
                key={exp.id}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                data-aos-anchor-placement="top-bottom"
                className="relative overflow-hidden card-surface group"
              >
                {/* Bilah aksen kiri, warnanya bergilir per entry */}
                <span className={`absolute top-0 left-0 z-10 w-1 h-full ${accent.bar}`}></span>

                <div className="p-5 sm:p-8">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="flex items-start gap-3">
                      <img
                        src={exp.img}
                        alt={exp.company}
                        className="object-contain flex-shrink-0 w-10 h-10 p-1 bg-white border rounded-2xl sm:w-12 sm:h-12 border-border-soft dark:border-slate-600 dark:bg-slate-900"
                      />
                      <div>
                        <h3 className="text-lg font-bold sm:text-xl text-dark dark:text-white">
                          {exp.role} <span className="text-sm font-medium sm:text-base text-slate-400">- {exp.type}</span>
                        </h3>
                        <p className={`mt-1 text-sm font-semibold sm:text-base ${accent.text}`}>
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 text-xs shrink-0 sm:text-sm text-slate-500 dark:text-slate-400 sm:items-end">
                      <span className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 pt-5 mt-5 border-t gap-x-8 gap-y-3 border-border-soft dark:border-slate-700 sm:grid-cols-2">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        <span className={`w-1.5 h-1.5 mt-1.5 rounded-full shrink-0 ${accent.dot}`}></span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-5 mt-5 border-t border-border-soft dark:border-slate-700">
                    <p className="mb-3 eyebrow-label">{t('exp_tech')}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((techName, i) => (
                        <span key={techName} className="tag-chip">
                          <span className={`w-1.5 h-1.5 rounded-full ${ACCENTS[i % ACCENTS.length].dot}`}></span>
                          {techName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}