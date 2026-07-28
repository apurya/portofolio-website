import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const stampPalette = [
  { bg: 'bg-primary', text: 'text-dark' },       
  { bg: 'bg-sky-400', text: 'text-dark' },       
  { bg: 'bg-teal-500', text: 'text-white' },     
  { bg: 'bg-rose-500', text: 'text-dark' },     
  { bg: 'bg-sky-600', text: 'text-white' },    
  { bg: 'bg-teal-300', text: 'text-dark' },      
  { bg: 'bg-rose-300', text: 'text-dark' },       
  { bg: 'bg-sky-200', text: 'text-dark' },      
  { bg: 'bg-teal-700', text: 'text-white' }, 
  { bg: 'bg-rose-600', text: 'text-white' },      
  { bg: 'bg-white', text: 'text-dark' },         
  { bg: 'bg-dark', text: 'text-white' },        
  { bg: 'bg-sky-100', text: 'text-dark' },       
  { bg: 'bg-teal-100', text: 'text-dark' },       
];

const rotations = [
  'rotate-[-3deg]',
  'rotate-[2deg]',
  'rotate-[-1.5deg]',
  'rotate-[3deg]',
  'rotate-[-2deg]',
  'rotate-[1.5deg]',
];

function Card({ val, index }) {
  const palette = stampPalette[index % stampPalette.length];
  const rotation = rotations[index % rotations.length];

  return (
    <div
      className={`stamp-card group flex flex-col items-center gap-2 p-3 text-center ${palette.bg} border-2 border-dark dark:border-slate-900 rounded-lg ${rotation} transition-all duration-300 ease-out hover:rotate-0 hover:-translate-y-1 hover:z-10`}
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      <span className="flex items-center justify-center border border-dark rounded-full w-9 h-9 bg-white/95 shadow-sm">
        <img src={val.logo} alt="" className="object-contain w-4.5 h-4.5 w-[18px] h-[18px]" />
      </span>
      <h6 className={`text-[11px] font-extrabold uppercase tracking-wide leading-tight ${palette.text}`}>
        {val.title}
      </h6>
    </div>
  );
}

export default function SkillCard({ item }) {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4 mt-8 sm:grid-cols-4 lg:grid-cols-5">
      {item.map((val, index) => (
        <Card key={val.id} val={val} index={index} />
      ))}
    </div>
  );
}