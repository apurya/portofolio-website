function RibbonCloud({ className }) {
  return (
    <svg viewBox="0 0 200 100" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M34 78 C10 78 4 50 26 40 C22 20 52 8 70 20 C80 4 112 4 122 22 C148 16 170 36 158 56 C180 58 180 78 158 78 Z"
        className="fill-white stroke-dark"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RibbonStar({ className, delay }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`animate-twinkle ${className}`}
      style={{ animationDelay: delay }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 0c.6 5.6 1.8 8.9 4 11.1 2.2 2.2 5.5 3.4 8 4-2.5.6-5.8 1.8-8 4-2.2 2.2-3.4 5.5-4 11.1-.6-5.6-1.8-8.9-4-11.1-2.2-2.2-5.5-3.4-8-4 2.5-.6 5.8-1.8 8-4 2.2-2.2 3.4-5.5 4-11.1Z"
        className="fill-primary"
      />
    </svg>
  );
}

export default function CloudRibbon() {
  const cloudSet = Array.from({ length: 4 });
  const stars = Array.from({ length: 16 });

  return (
    <div className="relative z-20 h-16 -mt-8 -mb-0 overflow-hidden pointer-events-none sm:h-20 sm:-mt-10">
      {/* Awan — light mode, drift horizontal loop tanpa henti */}
      <div className="absolute inset-0 flex items-center dark:hidden">
        <div className="flex items-center shrink-0 animate-cloud-drift">
          {[0, 1].map((g) => (
            <div key={g} className="flex items-center shrink-0" aria-hidden={g === 1}>
              {cloudSet.map((_, i) => (
                <RibbonCloud key={i} className="w-36 h-auto mr-24 shrink-0 sm:w-52 sm:mr-40" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bintang — dark mode, berkelip di tempat */}
      <div className="absolute inset-0 items-center justify-between hidden px-4 dark:flex">
        {stars.map((_, i) => (
          <RibbonStar
            key={i}
            className={
              i % 3 === 0
                ? 'w-4 h-auto sm:w-5'
                : i % 3 === 1
                ? 'w-3 h-auto sm:w-4'
                : 'w-2.5 h-auto sm:w-3'
            }
            delay={`${(i * 0.23).toFixed(2)}s`}
          />
        ))}
      </div>
    </div>
  );
}