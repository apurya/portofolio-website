import CertifSection from './CertifSection';
import CloudRibbon from './CloudRibbon';
import LangTools from './LangTools';
import MarqueeRibbon from './MarqueeRibbon';
import Me from './Me';

function Cloud({ className }) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M34 78 C10 78 4 50 26 40 C22 20 52 8 70 20 C80 4 112 4 122 22 C148 16 170 36 158 56 C180 58 180 78 158 78 Z"
        className="fill-white stroke-dark"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Star({ className, delay = '0s' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`animate-pulse ${className}`}
      style={{ animationDelay: delay, animationDuration: '2.4s' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 0c.6 5.6 1.8 8.9 4 11.1 2.2 2.2 5.5 3.4 8 4-2.5.6-5.8 1.8-8 4-2.2 2.2-3.4 5.5-4 11.1-.6-5.6-1.8-8.9-4-11.1-2.2-2.2-5.5-3.4-8-4 2.5-.6 5.8-1.8 8-4 2.2-2.2 3.4-5.5 4-11.1Z"
        className="fill-primary"
      />
    </svg>
  )
}

function StarDot({ className, delay = '0s' }) {
  return (
    <span
      className={`absolute rounded-full bg-white animate-pulse ${className}`}
      style={{ animationDelay: delay, animationDuration: '2.4s' }}
      aria-hidden="true"
    ></span>
  )
}

export default function About() {
  return (
    <section id="about">
      <div className="relative w-full overflow-hidden bg-accent-blue dark:bg-sky-900 transition-colors duration-300">
        <div className="dark:hidden">
          <Cloud className="absolute w-20 h-auto opacity-90 -top-2 left-6 sm:w-28 sm:left-16 sm:top-4" />
          <Cloud className="absolute w-16 h-auto opacity-80 top-10 right-8 sm:w-24 sm:right-20 sm:top-6" />
          <Cloud className="absolute w-24 h-auto opacity-70 bottom-0 left-1/3 sm:w-32 sm:bottom-2" />
          <Cloud className="absolute w-14 h-auto opacity-90 bottom-6 right-4 sm:w-20 sm:right-10 sm:bottom-10" />
          <Cloud className="absolute w-12 h-auto opacity-60 top-1/2 left-2 hidden sm:block sm:w-16" />
        </div>

        <div className="hidden dark:block">
          <Star className="absolute w-7 h-auto opacity-90 -top-1 left-6 sm:w-9 sm:left-16 sm:top-4" delay="0s" />
          <Star className="absolute w-5 h-auto opacity-70 top-10 right-9 sm:w-7 sm:right-24 sm:top-6" delay="0.6s" />
          <Star className="absolute w-8 h-auto opacity-80 bottom-2 left-1/3 sm:w-10 sm:bottom-6" delay="1.1s" />
          <Star className="absolute w-5 h-auto opacity-90 bottom-8 right-5 sm:w-6 sm:right-11 sm:bottom-14" delay="0.3s" />
          <Star className="absolute w-4 h-auto opacity-60 top-1/2 left-2 hidden sm:block sm:w-5" delay="1.5s" />

          <StarDot className="w-1 h-1 top-6 left-1/2" delay="0.9s" />
          <StarDot className="w-1.5 h-1.5 top-20 right-1/3" delay="1.3s" />
          <StarDot className="w-1 h-1 bottom-10 left-12" delay="0.2s" />
          <StarDot className="w-1.5 h-1.5 bottom-16 right-1/4 hidden sm:block" delay="1.7s" />
          <StarDot className="w-1 h-1 top-1/3 right-8" delay="0.5s" />
        </div>

        <div className="container relative z-10 py-20 sm:py-28">
          <Me />
        </div>
      </div>

      <CloudRibbon />

      <div className="container section-wrap">
        <LangTools />
      </div>

      <MarqueeRibbon />

      <div className="container section-wrap">
        <CertifSection />
      </div>
    </section>
  )
}