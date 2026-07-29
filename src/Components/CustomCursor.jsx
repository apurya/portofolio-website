import { useEffect, useRef, useState } from 'react';

// Warna aksen brand MotherDuck — dipakai bergiliran untuk efek klik,
// selaras dengan cara ilustrasi situs memakai warna cerah secara selektif.
const BRAND_ACCENTS = ['#FEDE00', '#FF7168', '#15AA98', '#70C1FE'];

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [bursts, setBursts] = useState([]); // daftar efek klik yang sedang aktif

  useEffect(() => {
    // Nonaktif otomatis di device sentuh (mobile/tablet)
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch) return;

    const pos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const handleMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive = !!target.closest('a, button, input, textarea, [role="button"]');
      setIsPointer(isInteractive);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
    };

    let rafId;
    const animateRing = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.15;
      ringPos.y += (pos.y - ringPos.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    const handleLeave = () => setIsVisible(false);

    // Efek animasi saat double click — warna aksen dipilih acak dari palet brand
    const handleDoubleClick = (e) => {
      const id = Date.now() + Math.random();
      const color = BRAND_ACCENTS[Math.floor(Math.random() * BRAND_ACCENTS.length)];
      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY, color }]);

      // Bersihkan burst setelah animasi selesai (600ms)
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    window.addEventListener('dblclick', handleDoubleClick);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('dblclick', handleDoubleClick);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  // Tidak render apapun di device sentuh
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Titik tengah: charcoal netral, jadi kuning saat menyentuh elemen interaktif —
          mengikuti kontras isi/border yang sama dengan .btn-primary */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-colors duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isPointer ? 'bg-primary' : 'bg-dark dark:bg-white'}`}
        style={{ width: 8, height: 8 }}
      />
      {/* Ring pengikut: border charcoal tipis + bayangan offset kecil selaras
          dengan bahasa "hard-shadow" pada .cert-card/.btn-primary. Saat di atas
          elemen interaktif, ring berubah jadi isi kuning + border charcoal tebal. */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border-2 transition-all duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isPointer ? 'border-dark bg-primary/20 dark:border-white' : 'border-dark/30 dark:border-white/30'}`}
        style={{
          width: isPointer ? 52 : 32,
          height: isPointer ? 52 : 32,
          boxShadow: isPointer ? '3px 3px 0 0 rgba(56,56,56,0.45)' : '2px 2px 0 0 rgba(56,56,56,0.25)',
        }}
      />

      {/* Efek ripple saat double click — cincin warna aksen brand, gantian tiap klik */}
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full border-2 cursor-burst"
          style={{
            left: burst.x,
            top: burst.y,
            width: 48,
            height: 48,
            borderColor: burst.color,
          }}
        />
      ))}
    </>
  );
}