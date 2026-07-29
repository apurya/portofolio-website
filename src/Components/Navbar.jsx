import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import logo from '../img/logo/purya.png';

const icons = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 12l9-9 9 9" /><path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  ),
  certification: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="9" r="6" /><path d="M9 14.5L7 22l5-3 5 3-2-7.5" />
    </svg>
  ),
  experience: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
    </svg>
  ),
};

function SunIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  );
}

function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [activeId, setActiveId] = useState('home');
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const navItems = [
    { id: 'home', label: t('nav_home') },
    { id: 'about', label: t('nav_about') },
    { id: 'certification', label: t('nav_certification') },
    { id: 'experience', label: t('nav_experience') },
    { id: 'projects', label: t('nav_projects') },
    { id: 'contact', label: t('nav_contact') },
  ];

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [lang]);

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-transparent">
      <header className="md-nav">
        <div className="container flex items-center justify-between h-16 lg:h-20">
          <a href="#home" className="flex items-center gap-2.5 shrink-0">
            <img src={logo} alt="Purya logo" className="object-contain w-8 h-8 rounded-lg drop-shadow" />
            <span className="font-heading text-lg font-extrabold tracking-tightest text-dark dark:text-white drop-shadow-sm">
              Adit
            </span>
          </a>

          <nav className="items-center hidden gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-active={activeId === item.id}
                className="md-nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              aria-label="Toggle language"
              className="flex items-center justify-center w-10 h-10 text-xs font-extrabold rounded-full shadow-card text-dark dark:text-white bg-white/80 dark:bg-slate-800/80 backdrop-blur hover:bg-white dark:hover:bg-slate-800"
            >
              {lang === 'id' ? 'ID' : 'EN'}
            </button>

            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label="Toggle dark mode"
              className="flex items-center justify-center w-10 h-10 rounded-full shadow-card text-dark dark:text-white bg-white/80 dark:bg-slate-800/80 backdrop-blur hover:bg-white dark:hover:bg-slate-800"
            >
              {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsNavMenuOpen((prev) => !prev)}
              className="flex items-center justify-center w-10 h-10 rounded-full shadow-card lg:hidden text-dark dark:text-white bg-white/80 dark:bg-slate-800/80 backdrop-blur hover:bg-white dark:hover:bg-slate-800"
            >
              {isNavMenuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M6 6l12 12M18 6L6 18" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {isNavMenuOpen && (
          <nav className="px-4 pb-4 mx-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-2xl shadow-card lg:hidden">
            <ul className="flex flex-col gap-1 pt-3">
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsNavMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                        isActive
                          ? 'bg-primary/15 text-dark dark:text-primary'
                          : 'text-dark/60 dark:text-white/60 hover:bg-cream dark:hover:bg-slate-800'
                      }`}
                    >
                      {icons[item.id]}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
}

export default Navbar;