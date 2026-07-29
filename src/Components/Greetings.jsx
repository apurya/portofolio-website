import resume from '../file/CV-Aditiya-Purya.pdf'
import { useLanguage } from '../context/LanguageContext'

export default function Greetings() {
  const { t } = useLanguage();
  const [helloBefore, helloAfter] = t('greet_hello').split('👋');

  return (
    <div className="w-full text-center md:text-left">

      <p className="-mt-1 mb-2 flex items-center justify-center gap-1.5 text-xl font-semibold text-dark/70 dark:text-white/60 md:justify-start md:text-2xl">
        {helloBefore}
        <span className="inline-block animate-wave" style={{ transformOrigin: '70% 70%' }}>👋</span>
        {helloAfter}
      </p>

      <h1 className="mt-1 font-heading text-5xl font-extrabold leading-[1.05] tracking-tightest text-dark dark:text-white sm:text-6xl lg:text-7xl">
        Aditiya <span className="marker-highlight">Purya</span>
      </h1>

      <h2 className="mt-4 mb-5 text-xl font-medium text-slate-500 dark:text-slate-400 lg:text-2xl">
        {t('greet_role')}
      </h2>

      <p className="max-w-md mx-auto mb-8 leading-relaxed text-slate-500 dark:text-slate-400 md:mx-0">
        {t('greet_welcome')} <span className="font-bold text-dark dark:text-white">{t('greet_website')}</span> {t('greet_suffix')}
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
        <a href={resume} download className="w-full sm:w-auto btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M12 3v12" />
            <path d="M7 10l5 5 5-5" />
            <path d="M4 19h16" />
          </svg>
          {t('greet_download')}
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