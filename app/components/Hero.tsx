import { PlayCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="px-4 sm:px-6 py-6 sm:py-8">
      <div className="w-full h-40 sm:h-48 md:h-56 rounded-[2.5rem] bg-gradient-to-r from-green-900 via-black to-gray-900 p-8 flex items-center justify-between overflow-hidden relative shadow-xl text-white">
        <div className="relative z-10">
          <span className="bg-green-500 text-black text-[10px] font-black px-2 py-1 rounded mb-2 inline-block uppercase tracking-widest">Live Now</span>
          <h2 className="font-black text-2xl sm:text-4xl leading-tight">The Cloud Session</h2>
          <p className="text-green-400 text-sm font-bold mt-1 tracking-wider italic">Ep. 1: Lagos Night Life</p>
        </div>
        <PlayCircle size={80} className="text-white/10 absolute -right-6 -bottom-6" />
        <button className="relative z-10 bg-white text-black text-xs sm:text-sm font-black px-5 py-2.5 rounded-full uppercase transition-transform active:scale-95">Listen</button>
      </div>
    </section>
  );
}