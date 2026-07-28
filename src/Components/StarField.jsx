import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement; // section #home (hero), bukan seluruh viewport

    let width = container.clientWidth;
    let height = container.clientHeight;
    let particles = [];
    let animationId;
    let isDark = document.documentElement.classList.contains('dark');

    const pointer = { x: -9999, y: -9999, active: false };

    const PARTICLE_DENSITY = 9000;
    const LINK_DISTANCE = 130;
    const REPEL_RADIUS = 110;
    const REPEL_FORCE = 1.8;
    const SPRING_STRENGTH = 0.02;
    const DAMPING = 0.9;

    function createParticles() {
      const count = Math.floor((width * height) / PARTICLE_DENSITY);
      particles = Array.from({ length: count }, () => {
        const baseX = Math.random() * width;
        const baseY = Math.random() * height;
        return {
          baseX, baseY, x: baseX, y: baseY, vx: 0, vy: 0,
          radius: Math.random() * 1.6 + 0.8,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.15,
          driftY: (Math.random() - 0.5) * 0.15,
        };
      });
    }

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      createParticles();
    }

    function updateColorMode() {
      isDark = document.documentElement.classList.contains('dark');
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const rgb = isDark ? '255, 255, 255' : '56, 56, 56';

      for (const p of particles) {
        p.baseX += p.driftX;
        p.baseY += p.driftY;
        if (p.baseX < 0) p.baseX = width;
        if (p.baseX > width) p.baseX = 0;
        if (p.baseY < 0) p.baseY = height;
        if (p.baseY > height) p.baseY = 0;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < REPEL_RADIUS) {
            const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx += (p.baseX - p.x) * SPRING_STRENGTH;
        p.vy += (p.baseY - p.y) * SPRING_STRENGTH;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        p.twinklePhase += p.twinkleSpeed;
      }

      const linkOpacityBase = isDark ? 0.22 : 0.16;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const strength = 1 - dist / LINK_DISTANCE;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${rgb}, ${(strength * linkOpacityBase).toFixed(3)})`;
            ctx.lineWidth = strength * 1.1;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
        const opacity = isDark ? 0.35 + twinkle * 0.5 : 0.55 + twinkle * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    function handlePointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }

    function handleTouchMove(e) {
      if (e.touches && e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.touches[0].clientX - rect.left;
        pointer.y = e.touches[0].clientY - rect.top;
        pointer.active = true;
      }
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(draw);
      }
    }

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handlePointerLeave);
    window.addEventListener('mouseleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibility);

    const observer = new MutationObserver(updateColorMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerLeave);
      window.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}