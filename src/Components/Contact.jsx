import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const FORMSPREE_FORM_ID = "mbdnyyzn";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

const miniPokemons = [
  { name: 'Eeve', gif: 'https://play.pokemonshowdown.com/sprites/ani/eevee.gif' },
  { name: 'Bulbasaur', gif: 'https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif' },
  { name: 'Charmander', gif: 'https://play.pokemonshowdown.com/sprites/ani/charmander.gif' },
  { name: 'Squirtle', gif: 'https://play.pokemonshowdown.com/sprites/ani/squirtle.gif' },
];

export default function Contact() {
  const { t } = useLanguage();
  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFieldErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = t('contact_name_required');
    if (!formData.email.trim()) {
      errors.email = t('contact_email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('contact_email_invalid');
    }
    if (!formData.message.trim()) errors.message = t('contact_message_required');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-2xl border border-border-soft dark:border-slate-600 bg-cream dark:bg-slate-700 text-dark dark:text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white dark:focus:bg-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10";

  return (
    <section className="relative section-wrap overflow-hidden" id="contact">
      <span className="absolute rounded-full pointer-events-none -top-32 -left-32 w-96 h-96 bg-primary/5 blur-3xl -z-10"></span>
      <span className="absolute rounded-full pointer-events-none -bottom-32 -right-32 w-96 h-96 bg-accent-blue/10 blur-3xl -z-10"></span>

      <div className="container relative">
        <div className="max-w-xl mx-auto mb-12 text-center">
          <p className="mb-2 eyebrow-label" data-aos="fade-up">{t('contact_heading')}</p>
          <h2 className="section-title !text-3xl sm:!text-4xl" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            {t('contact_heading')}
          </h2>
          <p
            className="mt-4 text-base font-medium md:text-lg text-slate-500 dark:text-slate-400"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            {t('contact_desc')}
          </p>
        </div>

        <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto lg:grid-cols-5 lg:gap-8">

          {/* Panel Info Kontak */}
          <div
            className="flex flex-col p-6 lg:col-span-2 card-surface sm:p-8"
            data-aos="fade-right"
            data-aos-anchor-placement="top-bottom"
          >
            <h3 className="mb-1 text-xl font-bold text-dark dark:text-white">
              {t('contact_info_title')}
            </h3>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
              {t('contact_info_desc')}
            </p>

            <div className="flex flex-col gap-5">
              <a href="mailto:m.aditiapurya@gmail.com" className="flex items-start gap-3 group">
                <span className="flex items-center justify-center w-10 h-10 text-lg transition-colors duration-300 rounded-2xl shrink-0 bg-primary/15 text-dark dark:text-primary group-hover:bg-primary">
                  ✉️
                </span>
                <div>
                  <p className="eyebrow-label">{t('contact_email')}</p>
                  <p className="text-sm font-medium break-all transition-colors duration-300 text-dark dark:text-white group-hover:text-primary">
                    m.aditiapurya@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-10 h-10 text-lg rounded-2xl shrink-0 bg-accent-blue/15 text-dark dark:text-accent-blue">
                  📍
                </span>
                <div>
                  <p className="eyebrow-label">{t('contact_location_label')}</p>
                  <p className="text-sm font-medium text-dark dark:text-white">
                    Purwakarta, Jawa Barat
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-10 h-10 text-lg rounded-2xl shrink-0 bg-accent-teal/15 text-dark dark:text-accent-teal">
                  ⏱️
                </span>
                <div>
                  <p className="text-sm font-medium text-dark dark:text-white">
                    {t('contact_response_note')}
                  </p>
                </div>
              </div>
            </div>

            {/* Sosial media — flat, aksen warna brand per ikon */}
            <div className="flex items-center gap-3 pt-6 mt-7 border-t border-border-soft dark:border-slate-700">
              <a
                href="https://instagram.com/aditiyapurya"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-dark text-cream transition-all duration-300 hover:bg-accent-coral hover:-translate-y-1"
              >
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" className="fill-current"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
              </a>

              <a
                href="https://wa.me/6289648395232"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-dark text-cream transition-all duration-300 hover:bg-accent-teal hover:-translate-y-1"
              >
                <svg role="img" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.001 0C5.373 0 0 5.373 0 12c0 2.116.553 4.104 1.523 5.828L0 24l6.334-1.492A11.94 11.94 0 0012.001 24C18.629 24 24 18.627 24 12S18.629 0 12.001 0zm0 21.75a9.72 9.72 0 01-4.96-1.36l-.356-.211-3.68.867.902-3.598-.232-.37A9.72 9.72 0 012.25 12C2.25 6.615 6.615 2.25 12.001 2.25S21.75 6.615 21.75 12 17.386 21.75 12.001 21.75z"/></svg>
              </a>

              <a
                href="https://www.linkedin.com/in/aditiyapurya"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-dark text-cream transition-all duration-300 hover:bg-accent-blue hover:-translate-y-1"
              >
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" className="fill-current"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>

            {/* Mini pokemon — companion strip, konsisten sama hero */}
            <div className="flex-1 mt-7 rounded-2xl bg-cream dark:bg-slate-900/40 border border-border-soft dark:border-slate-700 min-h-[7rem]">
              <div className="flex items-center justify-center h-full gap-3 p-5">
                {miniPokemons.map((poke) => (
                  <span key={poke.name} title={poke.name} className="companion-chip !w-12 !h-12">
                    <img src={poke.gif} alt={poke.name} className="object-contain w-8 h-8" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3" data-aos="fade-left" data-aos-anchor-placement="top-bottom">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col h-full p-6 card-surface sm:p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="block mb-2 text-sm font-bold text-dark dark:text-primary">
                    {t('contact_name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder={t('contact_name_ph')}
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1.5 text-xs font-medium text-accent-coral">{fieldErrors.name}</p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="email" className="block mb-2 text-sm font-bold text-dark dark:text-primary">
                    {t('contact_email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder={t('contact_email_ph')}
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1.5 text-xs font-medium text-accent-coral">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-1 mt-5">
                <label htmlFor="message" className="block mb-2 text-sm font-bold text-dark dark:text-primary">
                  {t('contact_message')}
                </label>
                <textarea
                  id="message"
                  placeholder={t('contact_message_ph')}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none flex-1 min-h-[180px]`}
                ></textarea>
                {fieldErrors.message && (
                  <p className="mt-1.5 text-xs font-medium text-accent-coral">{fieldErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full mt-6 btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" && (
                  <span className="w-4 h-4 border-2 rounded-full border-dark/30 border-t-dark animate-spin" />
                )}
                {status === "loading" ? t('contact_sending') : t('contact_submit')}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-3 p-4 mt-5 border border-accent-teal/30 rounded-2xl bg-accent-teal/10 text-reveal">
                  <span className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white rounded-full shrink-0 bg-accent-teal">✓</span>
                  <p className="text-sm font-medium text-accent-teal">{t('contact_success')}</p>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 p-4 mt-5 border border-accent-coral/30 rounded-2xl bg-accent-coral/10 text-reveal">
                  <span className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white rounded-full shrink-0 bg-accent-coral">!</span>
                  <p className="text-sm font-medium text-accent-coral">{t('contact_error')}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}