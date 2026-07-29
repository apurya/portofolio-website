import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import ExpData from '../ExpData';
import { useLanguage } from '../context/LanguageContext';

const PANELS = [
  { block: 'bg-primary', ink: 'text-dark', decor: ['bg-accent-blue', 'bg-accent-teal', 'bg-accent-coral'] },
  { block: 'bg-accent-teal', ink: 'text-white', decor: ['bg-primary', 'bg-accent-coral', 'bg-white'] },
  { block: 'bg-accent-coral', ink: 'text-dark', decor: ['bg-primary', 'bg-accent-teal', 'bg-white'] },
  { block: 'bg-accent-blue', ink: 'text-dark', decor: ['bg-primary', 'bg-accent-coral', 'bg-white'] },
];

function IllustrationPanel({ exp, panel }) {
  const [c1, c2, c3] = panel.decor;
  return (
    <div className={`relative flex items-center justify-center min-h-[320px] sm:min-h-[420px] overflow-hidden p-10 sm:p-14 ${panel.block}`}>
      <span className={`absolute w-20 h-14 rounded-full top-10 left-10 sm:left-16 opacity-90 ${c3}`} aria-hidden="true" />
      <span className={`absolute w-10 h-10 rotate-45 rounded-md bottom-16 left-8 sm:left-12 ${c1}`} aria-hidden="true" />
      <span className={`absolute rounded-full bottom-10 right-10 sm:right-16 w-14 h-14 ${c2}`} aria-hidden="true" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />

      <div className="relative z-10 flex items-center justify-center w-40 h-40 bg-white border-2 shadow-card border-dark sm:w-48 sm:h-48 rounded-2xl" style={{ boxShadow: '6px 6px 0 0 rgba(56,56,56,0.9)' }}>
        <img
          src={exp.img}
          alt={exp.company}
          className="object-contain w-24 h-24 sm:w-28 sm:h-28"
        />
      </div>
    </div>
  );
}

function TextPanel({ exp, panel, t }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center p-8 bg-cream dark:bg-slate-900 sm:p-14">
      <span className="mb-4 text-xs font-bold tracking-widest2 uppercase text-dark/50 dark:text-white/40">
        {exp.type} — {exp.period}
      </span>

      <h3 className="font-mono text-2xl font-bold leading-tight tracking-tight uppercase sm:text-3xl text-dark dark:text-white">
        {exp.role}
      </h3>

      <p className={`mt-3 text-sm font-bold sm:text-base ${exp.id === '1' ? 'text-primary' : 'text-accent-teal'}`}>
       {exp.company} · {exp.location}
      </p>

      <p className="mt-5 text-sm leading-relaxed sm:text-base text-slate-600 dark:text-slate-400">
        {exp.points[0]}
      </p>

      {open && (
        <div className="mt-4 space-y-4">
          {exp.points.length > 1 && (
            <ul className="space-y-2">
              {exp.points.slice(1).map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 mt-1.5 rounded-full shrink-0 bg-dark/40 dark:bg-white/30" />
                  {point}
                </li>
              ))}
            </ul>
          )}
          <div>
            <div className="flex flex-wrap gap-2">
              {exp.tech.map((techName) => (
                <span key={techName} className="tag-chip">{techName}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 mt-6 text-sm font-bold tracking-wide uppercase underline underline-offset-4 decoration-2 w-max text-dark dark:text-white hover:text-accent-blue transition-colors"
      >
        {open ? t('exp_show_less') : t('exp_learn_more')}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform ${open ? '-rotate-90' : ''}`}>
          <path fillRule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 10H3a1 1 0 110-2h12.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

export default function Experience() {
  const { t, lang } = useLanguage();
  const data = ExpData[lang];

  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  return (
    <section id="experience" className="relative">
      <div className="container pt-20 sm:pt-28">
        <div className="mb-10" data-aos="fade-right">
          <h3 className="section-title !text-2xl sm:!text-3xl">
            {t('exp_heading')}
          </h3>
        </div>
      </div>

      <div className="border-y-2 border-dark dark:border-white/15">
        {data.map((exp, index) => {
          const panel = PANELS[index % PANELS.length];
          const reversed = index % 2 === 1;

          return (
            <div
              key={exp.id}
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              className={`grid grid-cols-1 md:grid-cols-2 ${index !== 0 ? 'border-t-2 border-dark dark:border-white/15' : ''}`}
            >
              <div className={reversed ? 'md:order-2' : ''}>
                <IllustrationPanel exp={exp} panel={panel} />
              </div>
              <div className={reversed ? 'md:order-1' : ''}>
                <TextPanel exp={exp} panel={panel} t={t} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}