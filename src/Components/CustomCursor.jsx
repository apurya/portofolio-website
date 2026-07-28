import { useEffect, useRef, useState } from 'react';

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

    // Efek animasi saat double click
    const handleDoubleClick = (e) => {
      const id = Date.now() + Math.random();
      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);

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
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-primary transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: 8, height: 8 }}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border-2 transition-all duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isPointer ? 'border-primary bg-primary/10' : 'border-slate-400/60'}`}
        style={{
          width: isPointer ? 52 : 32,
          height: isPointer ? 52 : 32,
        }}
      />

      {/* Efek ripple saat double click */}
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full border-2 border-primary cursor-burst"
          style={{
            left: burst.x,
            top: burst.y,
            width: 48,
            height: 48,
          }}
        />
      ))}
    </>
  );
}