import radiopro from './img/radiopro.png';
import smk from './img/smk.png';

const ExpData = {
  id: [
    {
      id: "1",
      role: "Junior Web Programmer",
      type: "Magang",
      company: "Radio Pro 93.10 FM Purwakarta",
      period: "Mar 2024 - Mei 2024",
      location: "Purwakarta, Jawa Barat",
      img: radiopro,
      points: [
        "Mengembangkan dan memelihara sistem informasi berbasis web menggunakan PHP Native dan MySQL untuk mendukung pelaporan operasional internal.",
        "Merancang dan menerapkan fitur kontrol akses pengguna untuk mengatur izin sistem dan akses data.",
        "Membantu mengembangkan logika aplikasi yang aman dengan validasi input pengguna dan penerapan praktik keamanan dasar pada modul PHP.",
        "Melakukan pengujian sistem, debugging, dan troubleshooting untuk mengidentifikasi serta memperbaiki bug aplikasi.",
      ],
      tech: ["PHP Native", "MySQL", "JavaScript", "CSS Tailwind"],
    },
    {
      id: "2",
      role: "IT Support",
      type: "Magang",
      company: "SMK Negeri 1 Purwakarta",
      period: "Jul 2020 - Sep 2020",
      location: "Purwakarta, Jawa Barat",
      img: smk,
      points: [
        "Melakukan instalasi, konfigurasi, dan troubleshooting perangkat keras komputer serta sistem operasi Windows.",
        "Membantu setup dan pemeliharaan jaringan dasar, termasuk pengkabelan LAN, koneksi switch, dan pengujian konektivitas.",
        "Mendukung aktivitas troubleshooting jaringan seperti konfigurasi IP, pengujian LAN dasar, dan pengecekan koneksi internet.",
        "Melakukan pemeliharaan sistem rutin, backup data, dan recovery untuk menjaga integritas data serta keandalan sistem.",
      ],
      tech: ["Windows", "LAN Cabling", "Networking"],
    },
  ],
  en: [
    {
      id: "1",
      role: "Junior Web Programmer",
      type: "Internship",
      company: "Radio Pro 93.10 FM Purwakarta",
      period: "Mar 2024 - May 2024",
      location: "Purwakarta, West Java",
      img: radiopro,
      points: [
        "Developed and maintained a web-based information system using PHP Native and MySQL to support internal operational reporting.",
        "Designed and implemented user access control features to manage system permissions and data access.",
        "Helped build secure application logic with user input validation and basic security practices in PHP modules.",
        "Performed system testing, debugging, and troubleshooting to identify and fix application bugs.",
      ],
      tech: ["PHP Native", "MySQL", "JavaScript", "CSS Tailwind"],
    },
    {
      id: "2",
      role: "IT Support",
      type: "Internship",
      company: "SMK Negeri 1 Purwakarta",
      period: "Jul 2020 - Sep 2020",
      location: "Purwakarta, West Java",
      img: smk,
      points: [
        "Performed installation, configuration, and troubleshooting of computer hardware and Windows operating systems.",
        "Helped set up and maintain basic networks, including LAN cabling, switch connections, and connectivity testing.",
        "Supported network troubleshooting activities such as IP configuration, basic LAN testing, and internet connection checks.",
        "Carried out routine system maintenance, data backup, and recovery to keep data integrity and system reliability.",
      ],
      tech: ["Windows", "LAN Cabling", "Networking"],
    },
  ],
};

export default ExpData;