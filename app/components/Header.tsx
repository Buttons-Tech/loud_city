import { Search, User, Store, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Mobile Menu Icon (Placeholder for sidebar) */}
        <Menu size={20} className="md:hidden text-gray-400" />

        <Link href="/">
          <h1 className="font-black text-2xl tracking-tighter cursor-pointer">SOLACE</h1>
        </Link>

        <div className="flex gap-2 sm:gap-4 items-center">
          {/* VISIBLE ON ALL SCREENS: The "Sell" button */}
          <Link href="/vendor" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-700 px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-black hover:text-white transition">
            <Store size={14} /> 
            <span className="hidden xs:inline">Sell</span>
          </Link>
          
          <Search size={20} className="text-gray-400 cursor-pointer" />
          <User size={20} className="text-gray-400 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}