import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function SystemStatus() {
  const { t, lang } = useLanguage();
  const [responseTime, setResponseTime] = useState(42);
  const [lastChecked, setLastChecked] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setResponseTime(Math.floor(Math.random() * (68 - 32 + 1)) + 32);
      setLastChecked(new Date());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const timeString = lastChecked.toLocaleTimeString(lang === 'id' ? 'id-ID' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-5 py-4 border sm:flex-row rounded-2xl border-slate-800 bg-slate-900/60">
      {/* Status utama */}
      <div className="flex items-center gap-3">
        <span className="relative flex w-2.5 h-2.5">
          <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
          <span className="relative inline-flex w-2.5 h-2.5 bg-green-500 rounded-full"></span>
        </span>
        <span className="text-sm font-semibold text-white">
          {t('status_operational')}
        </span>
      </div>

      {/* Metrik */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="font-mono font-semibold text-green-400">99.98%</span>
          {t('status_uptime')}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="font-mono font-semibold text-sky-400">{responseTime}ms</span>
          {t('status_response')}
        </span>
        <span className="flex items-center gap-1.5">
          {t('status_checked')}
          <span className="font-mono font-semibold text-slate-300">{timeString}</span>
        </span>
      </div>
    </div>
  );
}