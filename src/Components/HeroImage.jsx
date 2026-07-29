import HeroIllustration from '../img/kucing.png'

export default function HeroImage() {
  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center w-full max-w-2xl mx-auto py-6">

        <span
  className="absolute -z-10"
  style={{
    width: '36%',
    height: '28%',
    top: '-5%',
    right: '-4%',
    transform: 'rotate(8deg)',
  }}
>
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    className="w-full h-full"
    aria-hidden="true"
  >
    <ellipse cx="50" cy="70" rx="23" ry="18" fill="#FEDE00" />
    <ellipse cx="22" cy="38" rx="9" ry="11" fill="#FEDE00" transform="rotate(-20 22 38)" />
    <ellipse cx="39" cy="20" rx="9" ry="11" fill="#FEDE00" transform="rotate(-8 39 20)" />
    <ellipse cx="61" cy="20" rx="9" ry="11" fill="#FEDE00" transform="rotate(8 61 20)" />
    <ellipse cx="78" cy="38" rx="9" ry="11" fill="#FEDE00" transform="rotate(20 78 38)" />
  </svg>
</span>
{/* ↓ span ini & img di bawahnya TIDAK diubah, biarkan seperti aslinya ↓ */}
<span
  className="absolute -translate-x-1/2 rounded-full bottom-0 left-1/2 bg-dark/10 blur-md"
  style={{ width: '32%', height: '1.4rem' }}
></span>

<img
  src={HeroIllustration}
  alt="Ilustrasi jendela kode purya.portfolio dengan maskot kucing"
  draggable={false}
  className="relative z-10 w-[80%] h-auto select-none pointer-events-none"
/>
      </div>
    </div>
  )
}