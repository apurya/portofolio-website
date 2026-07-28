import { useLanguage } from '../context/LanguageContext'
import logo from '../img/logo/purya.png'

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

  return (
    <footer className="bg-cream dark:bg-slate-900 border-t border-border-soft dark:border-slate-800">
      {/* CTA banner */}
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 py-12 text-center border-b border-border-soft dark:border-slate-800 sm:flex-row sm:text-left">
          <div>
            <h3 className="font-heading text-2xl font-bold text-dark dark:text-white sm:text-3xl">
              {t('footer_cta_title')}
            </h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {t('footer_cta_desc')}
            </p>
          </div>
          <a href="#contact" className="shrink-0 btn-primary">
            {t('footer_cta_button')}
          </a>
        </div>
      </div>

      {/* Kolom */}
      <div className="container">
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-3">
          <div>
            <a href="#home" className="inline-flex items-center gap-2 mb-3">
              <img src={logo} alt="Purya logo" className="object-contain w-8 h-8 rounded-lg" />
              <span className="font-heading text-lg font-extrabold text-dark dark:text-white">Adit</span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {t('footer_desc')}
            </p>
          </div>

          <div>
            <p className="mb-4 eyebrow-label">{t('footer_links')}</p>
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
            <p className="mb-4 eyebrow-label">{t('footer_contact')}</p>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="mailto:m.aditiapurya@gmail.com" className="hover:text-dark dark:hover:text-white transition-colors">
                  m.aditiapurya@gmail.com
                </a>
              </li>
              <li>Purwakarta, Jawa Barat</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-soft dark:border-slate-800">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-center sm:flex-row text-slate-400">
            <p>© {new Date().getFullYear()} Aditiya Purya. {t('footer_rights')}</p>
            <p>
              {t('made_with')} <span className="text-accent-coral">♥</span> {t('by')} Aditiya Purya {t('using')} React & Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}