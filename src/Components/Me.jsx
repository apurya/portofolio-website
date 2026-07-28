import Dep from '../img/dep.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const technicalSkills = [
  'Hardware & Peripheral Troubleshooting',
  'Network Configuration',
  'Web Development',
  'Database Management',
  'LAN Cabling',
  'Preventive Maintenance',
  'Data Backup & Recovery',
  'Technical Documentation',
  'User Support',
  'Analytical & Problem-Solving',
];

const stickyPalette = [
  { bg: 'bg-primary/25', border: 'border-primary/50', tape: 'bg-primary' },
  { bg: 'bg-accent-blue/20', border: 'border-accent-blue/40', tape: 'bg-accent-blue' },
  { bg: 'bg-accent-teal/15', border: 'border-accent-teal/35', tape: 'bg-accent-teal' },
  { bg: 'bg-accent-coral/15', border: 'border-accent-coral/35', tape: 'bg-accent-coral' },
  { bg: 'bg-white', border: 'border-border-soft', tape: 'bg-border-soft' },
];

const rotations = [
  'rotate-[-3deg]',
  'rotate-[2.5deg]',
  'rotate-[-1.5deg]',
  'rotate-[3deg]',
  'rotate-[-2.5deg]',
  'rotate-[1.5deg]',
];

export default function Me() {
  const { t } = useLanguage();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="mx-auto lg:w-[90%]">
      <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

        {/* Foto */}
        <div className="lg:col-span-4" data-aos="fade-right" data-aos-anchor-placement="top-bottom">
          <div className="relative w-full max-w-xs mx-auto lg:mx-0 lg:max-w-none px-5 pt-5 pb-8">

            <span
              className="icon-float absolute z-20 flex items-center justify-center w-11 h-11 -top-1 -left-1 rounded-2xl bg-white dark:bg-slate-800 border-2 border-border-soft dark:border-slate-700 shadow-card text-accent-blue"
              style={{ '--tilt': '-6deg' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
                <path d="M4 12a8 8 0 0 1 16 0" />
                <path d="M7 15a4.5 4.5 0 0 1 10 0" />
                <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </span>

            <span
              className="icon-float absolute z-20 flex items-center justify-center w-10 h-10 top-[38%] -right-2 rounded-full bg-white dark:bg-slate-800 border-2 border-accent-teal shadow-card text-accent-teal"
              style={{ '--tilt': '5deg', animationDelay: '0.9s' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <ellipse cx="12" cy="6" rx="7" ry="2.6" />
                <path d="M5 6v5.5c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
                <path d="M5 11.5V17c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-5.5" />
              </svg>
            </span>

            <span className="icon-wiggle absolute z-20 flex items-center justify-center w-12 h-12 -bottom-2 -left-2 rounded-full bg-primary border-2 border-dark shadow-card text-dark">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M3.5 14.2c0-3.6 2.9-6.2 6.7-6.2.9 0 1.6-.6 1.6-1.4 0-.4-.2-.8-.5-1.1.5-.2 1-.3 1.5-.3 2.4 0 4.3 1.8 4.5 4.1.9.2 1.7.8 1.7 1.9 0 1.2-1.1 2-2.4 2h-.3c.4.6.6 1.2.6 1.9 0 2.4-2.4 4.3-5.9 4.3-4.1 0-7.5-2.1-7.5-5.2Z" />
                <circle cx="15.6" cy="7.8" r="0.9" fill="white" />
              </svg>
            </span>

            <span
              className="icon-float absolute z-20 flex items-center gap-1.5 -bottom-3 -right-3 px-3.5 py-2 bg-white dark:bg-slate-800 border-2 border-dark dark:border-white rounded-full shadow-card-hover"
              style={{ '--tilt': '-4deg', animationDelay: '0.4s' }}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full bg-green-500 rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-2 h-2 bg-green-600 rounded-full"></span>
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest2 text-dark dark:text-white">
                {t('about_online')}
              </span>
            </span>

            <div
              className="relative overflow-hidden bg-white border-4 border-white rounded-[2rem] shadow-card-hover cursor-pointer dark:border-slate-800 aspect-[4/5] select-none"
              onContextMenu={(e) => e.preventDefault()}
              style={{ WebkitTouchCallout: 'none' }}
            >
              <img
                src={Dep}
                alt="Muhammad Aditiya Purya"
                draggable={false}
                className="object-cover w-full h-full transition-transform duration-500 ease-out hover:scale-110 pointer-events-none select-none"
                style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
              />
              <div className="absolute inset-0 z-10" onContextMenu={(e) => e.preventDefault()}></div>
            </div>
          </div>
        </div>

        {/* Teks */}
        <div className="lg:col-span-8" data-aos="fade-left" data-aos-anchor-placement="top-bottom">
          <p className="flex items-center mb-3 eyebrow-label">
            <span className="inline-block w-6 h-[3px] rounded-full bg-primary mr-2"></span>
            {t('about_label')}
          </p>

          <h2 className="font-heading text-3xl font-bold leading-snug tracking-tightest text-dark dark:text-white sm:text-4xl">
            {t('about_heading')}
          </h2>

          <p className="max-w-2xl mt-5 leading-relaxed text-slate-500 dark:text-slate-400">
            {t('about_desc')}
          </p>

          <div className="pt-8 mt-8 border-t border-border-soft dark:border-slate-700">
            <p className="flex items-center mb-7 eyebrow-label">
              <span className="inline-block w-6 h-[3px] rounded-full bg-accent-teal mr-2"></span>
              {t('about_skills')}
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
              {technicalSkills.map((skill, i) => {
                const palette = stickyPalette[i % stickyPalette.length];
                const rotation = rotations[i % rotations.length];
                return (
                  <div
                    key={skill}
                    className={`relative ${rotation} hover:rotate-0 hover:-translate-y-1.5 hover:z-10 transition-all duration-300 ease-out ${palette.bg} ${palette.border} border rounded-lg shadow-card hover:shadow-card-hover px-4 pt-5 pb-4 min-h-[88px] flex items-center`}
                  >
                    <span
                      className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-9 h-4 rounded-[2px] ${palette.tape} opacity-70 rotate-[-4deg] shadow-sm`}
                    ></span>
                    <span className="text-sm font-semibold leading-snug text-dark">
                      {skill}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}