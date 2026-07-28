/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  id: {
    // Navigasi
    nav_home: "Beranda",
    nav_about: "Tentang",
    nav_experience: "Pengalaman",
    nav_certification: "Sertifikat",
    nav_projects: "Proyek",
    nav_contact: "Kontak",

    // Hero / Greetings
    greet_available: "Tersedia untuk kerja sama",
    greet_hello: "Halo Semua 👋, Saya",
    greet_role: "Web Developer",
    greet_welcome: "Selamat Datang di",
    greet_website: "Website",
    greet_suffix: "Pribadi Saya",
    greet_download: "Unduh CV",
    greet_contact: "Hubungi Saya",
    greet_trait_1: "Cepat Belajar",
    greet_trait_2: "Suka Memecahkan Masalah",
    greet_trait_3: "Kolaboratif",

    // About
    about_label: "Tentang Saya",
    about_heading: "Saya menjaga komputer, jaringan, dan sistem tetap berjalan agar penggunanya tidak perlu memikirkannya dua kali.",
    about_desc: "Saya lulusan Manajemen Informatika dengan pengalaman langsung dalam instalasi dan troubleshooting sistem Windows, konfigurasi jaringan LAN, pengembangan web, serta mendukung operasional IT harian. Saya senang mengambil sesuatu yang rusak dan diam-diam membuatnya bekerja kembali.",
    about_skills: "Keahlian Teknis",
    about_online: "Online",

    // Experience
    exp_heading: "Pengalaman Magang",
    exp_tech: "Teknologi yang Digunakan",

    // Language & Tools
    langtools_heading: "Bahasa & Tools",
    langtools_all: "Semua",
    category_webdev: "Pengembangan Web",
    category_techsupport: "Dukungan Teknis",

    // Certification
    cert_heading: "Sertifikasi",
    cert_count: "Sertifikat",
    cert_view: "Lihat Sertifikat",

    // Projects
    projects_heading: "Proyek",
    projects_website: "Website",
    projects_uiux: "UI/UX",

    // Contact
    contact_heading: "Hubungi Saya",
    contact_desc: "Terbuka untuk Magang, Peluang Full-Time, dan Proyek IT yang Menarik. Silakan Hubungi Saya!",
    contact_name: "Nama",
    contact_name_ph: "Nama lengkap kamu",
    contact_email: "Email",
    contact_email_ph: "kamu@contoh.com",
    contact_message: "Pesan",
    contact_message_ph: "Tulis pesanmu di sini...",
    contact_submit: "Kirim Pesan",
    contact_sending: "Mengirim...",
    contact_success: "Terima kasih! Pesanmu berhasil terkirim.",
    contact_error: "Terjadi kesalahan. Silakan coba lagi.",
    contact_name_required: "Nama wajib diisi.",
    contact_email_required: "Email wajib diisi.",
    contact_email_invalid: "Format email tidak valid.",
    contact_message_required: "Pesan wajib diisi.",
    contact_info_title: "Info Kontak",
    contact_info_desc: "Pilih cara paling nyaman untuk menghubungi saya.",
    contact_response_note: "Biasanya membalas dalam 24 jam.",
    contact_location_label: "Lokasi",

    // Footer
    footer_desc: "Lulusan Manajemen Informatika yang tertarik pada IT Support, Networking, dan System Administration.",
    footer_links: "Tautan",
    footer_contact: "Kontak",
    footer_cta_title: "Tertarik Bekerja Sama?",
    footer_cta_desc: "Yuk diskusikan proyek atau peluang berikutnya.",
    footer_cta_button: "Hubungi Saya",
    footer_rights: "Hak cipta dilindungi.",
    made_with: "Dibuat dengan",
    by: "oleh",
    using: "menggunakan",

    // System status
    status_operational: "Semua Sistem Berjalan Normal",
    status_uptime: "Waktu Aktif",
    status_response: "Waktu Respons",
    status_checked: "Terakhir Dicek",

    // 404
    notfound_status: "Halaman Tidak Ditemukan",
    notfound_heading: "Oops, halaman ini sedang offline",
    notfound_desc: "Sepertinya halaman yang kamu cari sudah dipindah, dihapus, atau memang tidak pernah ada. Yuk kembali ke halaman utama.",
    notfound_back: "Kembali ke Beranda",
  },

  en: {
    // Navigation
    nav_home: "Home",
    nav_about: "About Me",
    nav_experience: "Experience",
    nav_certification: "Certification",
    nav_projects: "Projects",
    nav_contact: "Contact",

    // Hero / Greetings
    greet_available: "Available for work",
    greet_hello: "Hello Everyone 👋, I'm",
    greet_role: "Web Developer",
    greet_welcome: "Welcome to My Personal",
    greet_website: "Website",
    greet_suffix: "",
    greet_download: "Download Resume",
    greet_contact: "Contact Me",

    // About
    about_label: "About Me",
    about_heading: "I keep computers, networks, and systems running so the people who use them never have to think twice.",
    about_desc: "I'm an Informatics Management graduate with hands-on experience installing and troubleshooting Windows systems, setting up LAN networks, web development and supporting daily IT operations. I like taking something broken and quietly making it work again.",
    about_skills: "Technical Skills",
    about_online: "Online",

    // Experience
    exp_heading: "Internship Experience",
    exp_tech: "Technologies Used",

    // Language & Tools
    langtools_heading: "Language & Tools",
    langtools_all: "All",
    category_webdev: "Web Development",
    category_techsupport: "Technical Support",

    // Certification
    cert_heading: "Certification",
    cert_count: "Certificates",
    cert_view: "View Certificate",

    // Projects
    projects_heading: "Projects",
    projects_website: "Website",
    projects_uiux: "UI/UX",

    // Contact
    contact_heading: "Contact Me",
    contact_desc: "Open to Internship, Full-Time Opportunities, and Exciting IT Projects. Feel Free to Reach Out!",
    contact_name: "Name",
    contact_name_ph: "Your full name",
    contact_email: "Email",
    contact_email_ph: "you@example.com",
    contact_message: "Message",
    contact_message_ph: "Write your message here...",
    contact_submit: "Send Message",
    contact_sending: "Sending...",
    contact_success: "Thank you! Your message has been sent successfully.",
    contact_error: "Something went wrong. Please try again.",
    contact_name_required: "Name is required.",
    contact_email_required: "Email is required.",
    contact_email_invalid: "Invalid email format.",
    contact_message_required: "Message is required.",
    contact_info_title: "Contact Info",
    contact_info_desc: "Pick whichever way works best for you.",
    contact_response_note: "Usually responds within 24 hours.",
    contact_location_label: "Location",

    // Footer
    footer_desc: "Informatics Management graduate passionate about Web Developer, IT Support, Networking, and System Administration.",
    footer_links: "Links",
    footer_contact: "Contact",
    footer_cta_title: "Let's Work Together",
    footer_cta_desc: "Let's talk about your next project or opportunity.",
    footer_cta_button: "Get in Touch",
    footer_rights: "All rights reserved.",
    made_with: "Made with",
    by: "by",
    using: "using",

    // System status
    status_operational: "All Systems Operational",
    status_uptime: "Uptime",
    status_response: "Response Time",
    status_checked: "Last Checked",

    // 404
    notfound_status: "Page Not Found",
    notfound_heading: "Oops, this page went offline",
    notfound_desc: "Looks like the page you're looking for has been moved, deleted, or never existed. Let's get you back home.",
    notfound_back: "Back to Home",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'id';
    return localStorage.getItem('lang') || 'id';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'id' ? 'en' : 'id'));

  const t = (key) => (key in translations[lang] ? translations[lang][key] : key);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}