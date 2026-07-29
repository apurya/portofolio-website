import { useLanguage } from '../context/LanguageContext'
import MusicPlayer from './MusicPlayer'

const INSTAGRAM_URL = 'https://instagram.com/aditiyapurya';

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { id: 'home', label: t('nav_home') },
    { id: 'about', label: t('nav_about') },
    { id: 'certification', label: t('nav_certification') },
    { id: 'experience', label: t('nav_experience') },
    { id: 'projects', label: t('nav_projects') },
    { id: 'contact', label: t('nav_contact') },
  ];

  const socials = [
    {
      name: 'Instagram',
      href: INSTAGRAM_URL,
      hoverClass: 'hover:bg-accent-coral hover:border-accent-coral hover:text-white',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@charmterrapin',
      hoverClass: 'hover:bg-dark hover:border-dark hover:text-primary',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 3c.4 2.2 1.9 3.7 4.1 4v3c-1.5.1-2.9-.3-4.1-1.1v6.4a5.6 5.6 0 1 1-4.8-5.5v3.1a2.5 2.5 0 1 0 1.8 2.4V3H15Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/aditiyapurya',
      hoverClass: 'hover:bg-accent-blue hover:border-accent-blue hover:text-white',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="7.2" cy="8" r="1.3" fill="currentColor" />
          <path d="M7.2 11v6.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path
            d="M11.2 17.2V11m0 0c0-1.4 1-2.3 2.3-2.3 1.4 0 2.3 1 2.3 2.6v5.9"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/6289648395232',
      hoverClass: 'hover:bg-accent-teal hover:border-accent-teal hover:text-white',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 3.5C7.31 3.5 3.5 7.24 3.5 11.85c0 1.86.63 3.58 1.7 4.97L4.35 20.5l3.85-1.24a8.55 8.55 0 0 0 3.8.89c4.69 0 8.5-3.74 8.5-8.3S16.69 3.5 12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M9.3 10.2c0-.28.18-.53.45-.62l1-.35c.3-.1.62.02.79.29l.6.94c.17.27.13.62-.1.85l-.4.4c.32.68.9 1.26 1.6 1.6l.4-.4c.23-.23.58-.27.85-.1l.94.6c.27.17.39.49.29.79l-.35 1a.66.66 0 0 1-.62.45c-2.5 0-4.55-2.05-4.55-4.55Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/apurya',
      hoverClass: 'hover:bg-dark hover:border-dark hover:text-primary',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.92.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-cream dark:bg-slate-900 border-t border-border-soft dark:border-slate-800">
      {/* Now Playing */}
      <MusicPlayer />

      {/* Kolom */}
      <div className="container">
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-extrabold tracking-widest2 uppercase text-dark/60 dark:text-white/70">{t('footer_links')}</p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-dark dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-extrabold tracking-widest2 uppercase text-dark/60 dark:text-white/70">{t('footer_contact')}</p>
            <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-dark/50 dark:text-white/50">
                  <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a href="mailto:m.aditiapurya@gmail.com" className="hover:text-dark dark:hover:text-white transition-colors">
                  m.aditiapurya@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-dark/50 dark:text-white/50">
                  <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                <span>Purwakarta, Jawa Barat</span>
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-5">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border bg-white dark:bg-slate-800 border-border-soft dark:border-slate-700 text-dark dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card ${social.hoverClass}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-soft dark:border-slate-800">
        <div className="container">
          <div className="flex items-center justify-center py-8 text-center">
            <p className="text-base font-bold text-dark dark:text-white sm:text-lg font-heading">
              {t('made_with')} <span className="text-accent-coral">💝</span> {t('by')}{' '}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-primary decoration-2 underline-offset-4 hover:text-accent-coral transition-colors"
              >
                Aditiya Purya
              </a>{' '}
              {t('using')}{' '}
              <a
                href="https://react.dev"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-primary decoration-2 underline-offset-4 hover:text-accent-coral transition-colors"
              >
                React
              </a>{' '}
              &amp;{' '}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-primary decoration-2 underline-offset-4 hover:text-accent-coral transition-colors"
              >
                Tailwind
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}