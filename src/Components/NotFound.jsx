import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden bg-white dark:bg-slate-900">
      {/* Dekorasi background */}
      <span className="absolute rounded-full pointer-events-none -top-24 -left-24 w-72 h-72 bg-primary/10 blur-3xl"></span>
      <span className="absolute rounded-full pointer-events-none -bottom-24 -right-24 w-72 h-72 bg-sky-500/10 blur-3xl"></span>

      <button
        type="button"
        onClick={toggleLang}
        aria-label="Toggle language"
        className="absolute flex items-center justify-center w-9 h-9 text-xs font-bold border rounded-full top-6 right-6 border-slate-300 dark:border-slate-600 text-dark dark:text-white bg-white/60 dark:bg-slate-800/60"
      >
        {lang === 'id' ? 'ID' : 'EN'}
      </button>

      <div className="relative max-w-md text-center">
        {/* Ikon status offline, senada dengan brand IT support */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="relative flex w-3 h-3">
            <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
          </span>
          <span className="font-mono text-sm font-semibold tracking-widest uppercase text-slate-400">
            {t('notfound_status')}
          </span>
        </div>

        <h1 className="text-7xl font-extrabold text-transparent sm:text-8xl bg-clip-text bg-gradient-to-r from-primary to-sky-400">
          404
        </h1>

        <h2 className="mt-4 text-xl font-bold text-dark dark:text-white sm:text-2xl">
          {t('notfound_heading')}
        </h2>

        <p className="max-w-sm mx-auto mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
          {t('notfound_desc')}
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 mt-8 text-sm font-semibold text-dark transition-all duration-300 rounded-full bg-primary hover:bg-dark hover:text-white hover:-translate-y-0.5 hover:shadow-lg"
        >
          ← {t('notfound_back')}
        </Link>
      </div>
    </div>
  );
}