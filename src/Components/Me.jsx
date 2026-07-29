import Dep from '../img/dep.png';
import logo from '../img/logo/purya.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const stickyPalette = [
  { bg: 'bg-primary', border: 'border-dark/20', tape: 'bg-white/80' },
  { bg: 'bg-white', border: 'border-dark/10', tape: 'bg-accent-coral' },
  { bg: 'bg-accent-teal', border: 'border-dark/15', tape: 'bg-white/80' },
  { bg: 'bg-accent-coral', border: 'border-dark/15', tape: 'bg-white/80' },
  { bg: 'bg-cream', border: 'border-dark/10', tape: 'bg-primary' },
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
  const technicalSkills = t('technical_skills');

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="mx-auto lg:w-[90%]">
      <div className="grid items-start grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

        {/* ID Card — digantung dengan lanyard */}
        <div className="lg:col-span-4" data-aos="fade-right" data-aos-anchor-placement="top-bottom">
          <div className="relative w-full max-w-xs mx-auto lg:mx-0 lg:max-w-none pt-2 pb-10 px-6">

            {/* Titik gantung tetap (kaitan di leher) — poros ayunan seluruh rangkaian */}
            <span className="absolute top-0 left-1/2 z-30 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-dark/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:bg-white/25"></span>

            {/* Bayangan lantai — statis, memberi kesan kartu benar-benar menggantung & melayang */}
            <span className="absolute bottom-4 w-40 h-6 -translate-x-1/2 rounded-full left-1/2 bg-dark/15 blur-md"></span>

            {/* ===== Tali + klip + kartu berayun sebagai SATU kesatuan (fisik nyata: kartu tergantung di ujung tali) ===== */}
            <div
              className="relative flex flex-col items-center animate-card-wobble"
              style={{ transformOrigin: 'top center' }}
            >
              {/* Tali/lanyard — tekstur kain woven, jahitan tepi, teks brand berulang */}
              <div
                className="relative w-6 sm:w-7 h-32 sm:h-40 rounded-b-[3px] border-x border-dashed border-dark/15 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.12),inset_2px_0_3px_rgba(255,255,255,0.3)]"
                style={{
                  backgroundColor: '#FEDE00',
                  backgroundImage:
                    'repeating-linear-gradient(115deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1.5px, transparent 1.5px, transparent 6px), repeating-linear-gradient(0deg, rgba(56,56,56,0.07) 0px, rgba(56,56,56,0.07) 1px, transparent 1px, transparent 5px)',
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-around py-3 select-none">
                  {['PURYA', '•', 'DEV', '•'].map((word, idx) => (
                    <span key={idx} className="text-[6px] sm:text-[7px] font-bold tracking-widest text-dark/40">
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Klip metal (carabiner) — gradasi logam supaya terasa mengilap & nyata */}
              <svg viewBox="0 0 40 60" className="relative z-20 w-8 h-12 -mt-0.5" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="45%" stopColor="#D8D8D8" />
                    <stop offset="100%" stopColor="#9A9A9A" />
                  </linearGradient>
                </defs>
                <rect x="10" y="0" width="20" height="9" rx="3" fill="url(#metalGradient)" stroke="#383838" strokeWidth="1.6" />
                <path d="M14 9 v9 a6 6 0 0 0 12 0 V9" fill="none" stroke="#383838" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="20" cy="36" r="9" fill="url(#metalGradient)" stroke="#383838" strokeWidth="1.8" />
                <circle cx="20" cy="36" r="3.5" fill="none" stroke="#383838" strokeWidth="1.3" />
                <rect x="16" y="47" width="8" height="10" rx="2" fill="url(#metalGradient)" stroke="#383838" strokeWidth="1.6" />
                <ellipse cx="16.5" cy="4" rx="2.6" ry="1.1" fill="#FFFFFF" opacity="0.85" />
              </svg>

              {/* ===== Kartu ID ===== */}
              <div className="relative w-full -mt-1">
                {/* lubang gantungan di ujung atas kartu */}
                <span className="absolute z-20 w-4 h-4 -translate-x-1/2 bg-cream dark:bg-slate-900 border-2 rounded-full -top-2 left-1/2 border-dark/30"></span>

                <div className="relative overflow-hidden rounded-[1.75rem] border border-border-soft dark:border-slate-700 bg-white dark:bg-slate-800 shadow-card transition-colors duration-300">

                  {/* Kilau plastik/laminasi — sapuan diagonal transparan di atas seluruh kartu */}
                  <span
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(115deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 22%, rgba(255,255,255,0) 78%, rgba(255,255,255,0.18) 100%)',
                    }}
                  ></span>

                  {/* Label puncak kartu ala badge kantor — logo + teks jadi satu */}
                  <div className="flex items-center justify-center gap-2 py-2 bg-accent-teal dark:bg-teal-900">
                    <img src={logo} alt="Logo Aditiya Purya" className="w-5 h-5" />
                    <span className="text-[9px] font-bold uppercase text-white tracking-widest2">
                      Portfolio ID
                    </span>
                  </div>

                  {/* Foto + identitas */}
                  <div className="flex flex-col items-center px-7 pt-7 pb-5 text-center">
                    <div className="relative w-32 overflow-hidden bg-slate-100 border-4 rounded-2xl shadow-sm aspect-[4/5] border-primary sm:w-36 dark:bg-slate-700">
                      <img
                        src={Dep}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        className="object-contain w-full h-full pointer-events-none select-none [filter:contrast(112%)_saturate(105%)_brightness(102%)_grayscale(6%)]"
                        style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                      />
                      {/* Vignette tipis ala foto studio ID */}
                      <span
                        className="absolute inset-0 pointer-events-none"
                        style={{ boxShadow: 'inset 0 0 14px 3px rgba(0,0,0,0.28)' }}
                      ></span>
                      {/* Stiker hologram — kesan kartu asli/terverifikasi */}
                      <span
                        className="absolute z-10 rounded-full -bottom-1.5 -right-1.5 h-6 w-6 border border-white/70 shadow-sm"
                        style={{
                          background: 'conic-gradient(from 180deg, #70C1FE, #15AA98, #FEDE00, #FF7168, #70C1FE)',
                          opacity: 0.9,
                        }}
                      ></span>
                    </div>

                    <h3 className="mt-4 font-heading text-xl font-bold text-dark dark:text-white">
                      Aditiya Purya
                    </h3>
                    <p className="mt-0.5 text-sm font-semibold text-dark/55 dark:text-white/60">
                      {t('greet_role')}
                    </p>

                    {/* Garis putus-putus ala kartu ID */}
                    <div className="w-full mt-5 border-t-2 border-dashed border-border-soft dark:border-slate-600"></div>

                    {/* Nomor ID + barcode — detail administratif ala kartu asli */}
                    <div className="flex items-center justify-between w-full mt-3">
                      <span className="font-mono text-[10px] tracking-wide text-dark/45 dark:text-white/45">
                        NO. DEV-0725-AP
                      </span>
                      <span
                        className="h-4 w-14 rounded-[1px] dark:invert"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(90deg, #383838 0px, #383838 1.5px, transparent 1.5px, transparent 3px, #383838 3px, #383838 3.5px, transparent 3.5px, transparent 6px, #383838 6px, #383838 7.5px, transparent 7.5px, transparent 9px)',
                          opacity: 0.55,
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teks */}
        <div className="lg:col-span-8" data-aos="fade-left" data-aos-anchor-placement="top-bottom">
          <div className="relative inline-flex flex-col items-start mb-4 rotate-[-2.5deg]">
            <span className="relative px-4 py-2 rounded-md shadow-sticky bg-primary">
              <span className="absolute -top-2 left-1/2 h-3 w-6 -translate-x-1/2 rounded-[2px] bg-white/70 rotate-[-4deg] opacity-70"></span>
              <span className="font-hand text-lg text-dark" style={{ fontFamily: '"Patrick Hand", cursive' }}>
                {t('about_label')}
              </span>
            </span>
            <svg viewBox="0 0 70 46" className="w-16 h-10 mt-0.5 ml-4 text-dark/40 dark:text-white/30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5 C10 26, 30 36, 58 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" />
              <path d="M51 31 L58 38 L50 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2 className="font-heading text-3xl font-bold leading-snug tracking-tightest text-dark dark:text-white sm:text-4xl">
            {t('about_heading')}
          </h2>

          <p className="max-w-2xl mt-5 leading-relaxed text-dark/75 dark:text-white/75">
            {t('about_desc')}
          </p>

          <div className="pt-8 mt-8 border-t border-border-soft dark:border-slate-700">
            <div className="relative inline-flex flex-col items-start mb-8 rotate-[2deg]">
              <span className="relative px-4 py-2 rounded-md shadow-sticky bg-accent-teal">
                <span className="absolute -top-2 left-1/2 h-3 w-6 -translate-x-1/2 rounded-[2px] bg-white/70 rotate-[3deg] opacity-70"></span>
                <span className="font-hand text-lg text-white" style={{ fontFamily: '"Patrick Hand", cursive' }}>
                  {t('about_skills')}
                </span>
              </span>
              <svg viewBox="0 0 70 46" className="w-16 h-10 mt-0.5 ml-4 text-dark/40 dark:text-white/30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5 C10 26, 30 36, 58 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" />
                <path d="M51 31 L58 38 L50 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">
              {technicalSkills.map((skill, i) => {
                const palette = stickyPalette[i % stickyPalette.length];
                const rotation = rotations[i % rotations.length];
                return (
                  <div
                    key={skill}
                    className={`relative ${rotation} hover:rotate-0 hover:-translate-y-1.5 hover:z-10 transition-all duration-300 ease-out ${palette.bg} shadow-sticky hover:shadow-sticky-hover px-5 pt-8 pb-5 min-h-[104px] flex items-center`}
                  >
                    <span
                      className={`absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-3.5 rounded-[2px] ${palette.tape} opacity-70 rotate-[-4deg]`}
                    ></span>
                    <span
                      className="font-hand text-lg leading-tight text-dark"
                      style={{ fontFamily: '"Patrick Hand", cursive' }}
                    >
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