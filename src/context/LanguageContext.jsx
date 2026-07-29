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
    greet_hello: "Hai 👋 Saya",
    greet_role: "Web Developer",
    greet_welcome: "Selamat Datang di",
    greet_website: "Website",
    greet_suffix: "Pribadi Saya",
    greet_download: "Unduh CV",
    greet_contact: "Hubungi Saya",

    // About
    about_label: "Tentang Saya",
    about_heading: "Saya menjaga komputer, jaringan, dan sistem tetap berjalan agar penggunanya tidak perlu memikirkannya dua kali.",
    about_desc: "Saya lulusan Manajemen Informatika dengan pengalaman langsung dalam instalasi dan troubleshooting sistem Windows, konfigurasi jaringan LAN, pengembangan web, serta mendukung operasional IT harian. Saya senang mengambil sesuatu yang rusak dan diam-diam membuatnya bekerja kembali.",
    about_skills: "Keahlian Teknis",
    about_online: "Online",
    technical_skills: [
      "Troubleshooting Perangkat Keras & Peripheral",
      "Konfigurasi Jaringan",
      "Pengembangan Web",
      "Manajemen Basis Data",
      "Pengkabelan LAN",
      "Pemeliharaan Preventif",
      "Backup & Pemulihan Data",
      "Dokumentasi Teknis",
      "Dukungan Pengguna",
      "Analitis & Pemecahan Masalah",
    ],

    // Experience
    exp_heading: "Pengalaman Magang",
    exp_learn_more: "Selengkapnya",
    exp_show_less: "Tutup",
    marquee_label: "SERTIFIKAT",

    // Language & Tools
    langtools_heading: "Bahasa & Tools",
    langtools_all: "Semua",
    category_webdev: "Pengembangan Web",
    category_techsupport: "Dukungan Teknis",

    // Certification
    cert_heading: "Sertifikasi",
    cert_count: "Sertifikat",
    cert_view: "Lihat Sertifikat",
    marquee_label_exp: "PENGALAMAN MAGANG",

    // Projects
    projects_heading: "Proyek",   
    projects_personal: "Proyek Pribadi",
    projects_view: "Lihat Project",

    // Contact
    contact_heading: "Hubungi Saya",
    contact_desc: "Terbuka untuk Magang, Peluang Full-Time, dan Proyek IT yang Menarik. Silakan Hubungi Saya!",
    contact_form_title: "Tulis Pesan",
    contact_form_desc: "Isi form di bawah, saya akan balas secepatnya.",
    contact_name: "Nama",
    contact_name_ph: "Masukkan nama Anda",
    contact_email: "Email",
    contact_email_ph: "nama@email.com",
    contact_message: "Pesan",
    contact_message_ph: "Tuliskan pesan Anda di sini...",
    contact_submit: "Kirim Pesan",
    contact_sending: "Mengirim...",
    contact_success: "Terima kasih! Pesanmu berhasil terkirim.",
    contact_error: "Terjadi kesalahan. Silakan coba lagi.",
    contact_name_required: "Nama wajib diisi.",
    contact_email_required: "Email wajib diisi.",
    contact_email_invalid: "Format email tidak valid.",
    contact_message_required: "Pesan wajib diisi.",

    // Footer
    footer_links: "Tautan",
    footer_contact: "Kontak",
    made_with: "Dibuat dengan",
    by: "oleh",
    using: "menggunakan",

    // Music player
    music_now_playing: "Sedang Diputar",
    music_play: "Putar musik",
    music_pause: "Hentikan musik",
    music_prev: "Lagu sebelumnya",
    music_next: "Lagu berikutnya",

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
    greet_hello: "Hi 👋 I am",
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
    technical_skills: [
      "Hardware & Peripheral Troubleshooting",
      "Network Configuration",
      "Web Development",
      "Database Management",
      "LAN Cabling",
      "Preventive Maintenance",
      "Data Backup & Recovery",
      "Technical Documentation",
      "User Support",
      "Analytical & Problem-Solving",
    ],

    // Experience
    exp_heading: "Internship Experience",
    exp_learn_more: "Learn more",
    exp_show_less: "Show less",
    marquee_label: "CERTIFICATION",

    // Language & Tools
    langtools_heading: "Language & Tools",
    langtools_all: "All",
    category_webdev: "Web Development",
    category_techsupport: "Technical Support",

    // Certification
    cert_heading: "Certification",
    cert_count: "Certificates",
    cert_view: "View Certificate",
    marquee_label_exp: "INTERNSHIP EXPERIENCE",

    // Projects
    projects_heading: "Projects",
    projects_personal: "Personal Project",
    projects_view: "View Project",

    // Contact
    contact_heading: "Contact Me",
    contact_desc: "Open to Internship, Full-Time Opportunities, and Exciting IT Projects. Feel Free to Reach Out!",
    contact_form_title: "Write a Message",
    contact_form_desc: "Fill out the form below and I'll get back to you soon.",
    contact_name: "Name",
    contact_name_ph: "Enter your name",
    contact_email: "Email",
    contact_email_ph: "name@email.com",
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

    // Footer
    footer_links: "Links",
    footer_contact: "Contact",
    made_with: "Made with",
    by: "by",
    using: "using",

    // Music player
    music_now_playing: "Now Playing",
    music_play: "Play music",
    music_pause: "Pause music",
    music_prev: "Previous track",
    music_next: "Next track",

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