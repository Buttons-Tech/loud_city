    import { Music, PlayCircle } from 'lucide-react';

export default function MusicPlayer() {
  return (
    <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-auto sm:w-full sm:max-w-md sm:mx-auto bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-3 shadow-2xl flex items-center gap-4 z-50">
      <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center animate-pulse overflow-hidden relative">
        <img src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=100&q=80" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <Music className="text-white relative z-10" size={24} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-black text-sm text-white truncate">Midnight City Vibes</p>
        <p className="text-xs text-gray-400 truncate">Solace Radio • 420 listening</p>
      </div>
      <PlayCircle size={36} className="text-white cursor-pointer hover:text-green-400 transition" />
    </div>
  );
}