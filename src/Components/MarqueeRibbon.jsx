import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function MarqueeRibbon({ label: labelProp, bgClass = 'bg-primary' }) {
  const { t } = useLanguage();
  const label = labelProp ?? t('marquee_label');
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      // scroll ke bawah (delta > 0) -> geser konten ke kanan
      offsetRef.current -= delta * 0.6;

      const track = trackRef.current;
      if (track) {
        const loopWidth = track.scrollWidth / 2;
        if (loopWidth > 0) {
          offsetRef.current = ((offsetRef.current % loopWidth) + loopWidth) % loopWidth;
          track.style.transform = `translateX(${-offsetRef.current}px)`;
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const repeat = Array.from({ length: 10 });

  return (
    <div className={`relative w-full overflow-hidden border-y-[3px] border-dark dark:border-white/20 ${bgClass} py-3 sm:py-4`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1].map((group) => (
          <div key={group} className="flex items-center shrink-0" aria-hidden={group === 1}>
            {repeat.map((_, i) => (
              <span
                key={i}
                className="flex items-center px-6 font-mono text-lg font-bold tracking-wide text-dark whitespace-nowrap sm:text-2xl"
              >
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}