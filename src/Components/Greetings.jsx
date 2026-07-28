import resume from '../file/CV-Aditiya-Purya.pdf'
import { useLanguage } from '../context/LanguageContext'

export default function Greetings() {
  const { t } = useLanguage();

  return (
    <div className="w-full text-center md:text-left">

      <div className="inline-flex items-center gap-2 mb-6 eyebrow-label">
        <span className="relative flex w-2 h-2">
          <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-accent-teal animate-ping"></span>
          <span className="relative inline-flex w-2 h-2 rounded-full bg-accent-teal"></span>
        </span>
        {t('greet_available')}
      </div>

      <p className="text-lg font-semibold text-dark/70 dark:text-white/60 md:text-xl">
        {t('greet_hello')}
      </p>

      <h1 className="mt-2 font-heading text-5xl font-extrabold leading-[1.05] tracking-tightest text-dark dark:text-white sm:text-6xl lg:text-7xl">
        Aditiya <span className="marker-highlight">Purya</span>
      </h1>

      <h2 className="mt-5 mb-5 text-xl font-medium text-slate-500 dark:text-slate-400 lg:text-2xl">
        {t('greet_role')}
      </h2>

      <p className="max-w-md mx-auto mb-8 leading-relaxed text-slate-500 dark:text-slate-400 md:mx-0">
        {t('greet_welcome')} <span className="font-bold text-dark dark:text-white">{t('greet_website')}</span> {t('greet_suffix')}
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
        <a href={resume} download className="w-full sm:w-auto btn-primary">
          📄 {t('greet_download')}
        </a>
        <a href="#contact" className="w-full sm:w-auto btn-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          {t('greet_contact')}
        </a>
      </div>
    </div>
  )
}