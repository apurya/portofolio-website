import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const FORMSPREE_FORM_ID = "mbdnyyzn";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

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
    "w-full px-4 py-3 rounded-2xl border-2 border-border-soft dark:border-slate-600 bg-cream dark:bg-slate-700 text-dark dark:text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white dark:focus:bg-slate-700 focus:border-dark dark:focus:border-primary focus:ring-4 focus:ring-primary/20";

  return (
    <section className="relative overflow-hidden section-wrap bg-primary" id="contact">
      {/* Dekorasi ringan ala MotherDuck — coretan awan & lingkaran samar di atas kuning */}
      <span className="absolute rounded-full pointer-events-none -top-24 -right-24 w-72 h-72 bg-dark/5 blur-3xl"></span>
      <svg className="absolute hidden pointer-events-none left-6 bottom-6 sm:block opacity-25" width="140" height="90" viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 70c-14 0-22-11-18-23-8-10-2-27 14-27 3-13 24-18 32-6 15-3 27 10 22 23 12 4 12 22-2 27-4 8-16 10-23 4-9 8-22 5-25-4-8 3-16-2-16-11" stroke="#383838" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <div className="container relative">
        <div className="grid items-center max-w-5xl gap-10 mx-auto lg:grid-cols-5 lg:gap-12">

          {/* Kiri: heading + form "Write Message" */}
          <div className="lg:col-span-3" data-aos="fade-right" data-aos-anchor-placement="top-bottom">
            <p className="mb-3 eyebrow-label !text-dark/60">{t('contact_heading')}</p>
            <h2 className="mb-4 font-heading text-3xl font-extrabold uppercase tracking-tightest text-dark sm:text-4xl">
              {t('contact_form_title')}
            </h2>
            <p className="max-w-md mb-8 text-sm font-medium sm:text-base text-dark/70">
              {t('contact_form_desc')}
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-bold text-dark">
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
                    <p className="mt-1.5 text-xs font-bold text-dark/80">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-bold text-dark">
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
                    <p className="mt-1.5 text-xs font-bold text-dark/80">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-bold text-dark">
                  {t('contact_message')}
                </label>
                <textarea
                  id="message"
                  placeholder={t('contact_message_ph')}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none min-h-[140px]`}
                ></textarea>
                {fieldErrors.message && (
                  <p className="mt-1.5 text-xs font-bold text-dark/80">{fieldErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center w-full gap-2 px-10 py-4 mt-2 text-base font-bold text-primary transition-all duration-300 rounded-full sm:w-auto bg-dark hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" && (
                  <span className="w-4 h-4 border-2 rounded-full border-primary/30 border-t-primary animate-spin" />
                )}
                {status === "loading" ? t('contact_sending') : t('contact_submit')}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-3 p-4 border-2 rounded-2xl bg-white/70 border-dark/10 text-reveal">
                  <span className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white rounded-full shrink-0 bg-accent-teal">✓</span>
                  <p className="text-sm font-bold text-dark">{t('contact_success')}</p>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 p-4 border-2 rounded-2xl bg-white/70 border-dark/10 text-reveal">
                  <span className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white rounded-full shrink-0 bg-accent-coral">!</span>
                  <p className="text-sm font-bold text-dark">{t('contact_error')}</p>
                </div>
              )}
            </form>
          </div>

          {/* Kanan: ilustrasi lucu — amplop + sticker bintang + karakter mengintip, gaya flat MotherDuck */}
          <div className="justify-center hidden lg:col-span-2 lg:flex" data-aos="fade-left" data-aos-anchor-placement="top-bottom">
            <svg viewBox="0 0 300 300" className="w-full max-w-xs icon-float" xmlns="http://www.w3.org/2000/svg">
              {/* bayangan lembut di bawah amplop, biar komposisi tidak melayang kosong */}
              <ellipse cx="150" cy="256" rx="88" ry="10" fill="#383838" opacity="0.08" />

              {/* burung merpati mengintip dari BELAKANG sudut kiri-atas amplop — melambangkan "pembawa pesan",
                  pas untuk section Contact. Badan & kepala terpisah biar bentuknya jelas terbaca sebagai burung */}
              <ellipse cx="100" cy="128" rx="32" ry="24" fill="#FFFFFF" stroke="#383838" strokeWidth="4" />
              <polygon points="112,122 130,108 140,126 120,136" fill="#70C1FE" stroke="#383838" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="88" cy="98" r="24" fill="#FFFFFF" stroke="#383838" strokeWidth="4" />
              <circle cx="95" cy="92" r="3" fill="#383838" />
              <polygon points="78,96 78,106 62,101" fill="#FEDE00" stroke="#383838" strokeWidth="2" strokeLinejoin="round" />

              {/* amplop utama, digambar setelah karakter supaya cuma sedikit ujung bawahnya yang ketutup */}
              <g transform="rotate(-3 150 199)">
                <rect x="55" y="140" width="190" height="118" rx="16" fill="#FFFFFF" stroke="#383838" strokeWidth="5" />
                <polyline points="55,140 150,205 245,140" fill="none" stroke="#383838" strokeWidth="5" strokeLinejoin="round" />
              </g>

              {/* pesawat kertas + jejak gerak, dikelompokkan rapat di ruang kosong kanan-atas
                  supaya terasa "sedang terbang", bukan elemen nyasar sendirian */}
              <g opacity="0.9">
                <line x1="196" y1="94" x2="224" y2="88" stroke="#383838" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
                <line x1="206" y1="79" x2="231" y2="73" stroke="#383838" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
                <polygon points="235,58 282,77 235,96 248,77" fill="#383838" />
              </g>

              {/* sticker bintang teal, di ruang kosong kanan-bawah — tidak lagi menumpuk di sudut amplop */}
              <g transform="translate(252,222) rotate(15)">
                <path d="M22 0 29 15 44 22 29 29 22 44 15 29 0 22 15 15Z" fill="#15AA98" stroke="#383838" strokeWidth="3" strokeLinejoin="round"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}