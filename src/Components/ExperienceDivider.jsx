import { useLanguage } from '../context/LanguageContext';
import MarqueeRibbon from './MarqueeRibbon';

function DividerCloud({ className }) {
  return (
    <svg viewBox="0 0 200 100" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M34 78 C10 78 4 50 26 40 C22 20 52 8 70 20 C80 4 112 4 122 22 C148 16 170 36 158 56 C180 58 180 78 158 78 Z"
        className="fill-white stroke-dark dark:fill-slate-700 dark:stroke-white/20"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ExperienceDivider() {
  const { t } = useLanguage();

  return (
    <div className="relative">
      {/* 2 awan statis menumpuk di garis atas ribbon — kiri & kanan */}
      <div className="relative z-20 h-24 -mb-10 overflow-visible pointer-events-none sm:h-32 sm:-mb-14">
        <DividerCloud className="absolute bottom-0 left-0 w-56 h-auto sm:w-72" />
        <DividerCloud className="absolute bottom-0 right-0 w-56 h-auto sm:w-72" />
      </div>

      <MarqueeRibbon label={t('marquee_label_exp')} bgClass="bg-accent-teal" />
    </div>
  );
}