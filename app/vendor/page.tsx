'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function VendorJoinPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // LOGIC: Here is where you'd call your API to save the vendor to MongoDB
    // For now, we simulate a 1-second "Automatic" registration
    setTimeout(() => {
      // Once saved, we push them to their new dashboard
      router.push('/vendor/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <form onSubmit={handleSignup} className="max-w-md w-full animate-in fade-in zoom-in duration-500">
        <h1 className="text-5xl font-black mb-2 uppercase italic tracking-tighter text-green-500">Solace Vendor</h1>
        <p className="text-gray-400 mb-10 font-bold">Start selling in 60 seconds.</p>
        
        <div className="space-y-4">
          <div className="group">
            <label className="text-[10px] font-black uppercase text-gray-500 mb-2 block group-focus-within:text-green-500 transition">Store Name</label>
            <input required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-bold outline-none focus:border-green-500 focus:bg-white/10 transition" placeholder="e.g. Zen Leaf" />
          </div>

          <div className="group">
            <label className="text-[10px] font-black uppercase text-gray-500 mb-2 block group-focus-within:text-green-500 transition">Pickup Bus Stop</label>
            <input required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-bold outline-none focus:border-green-500 focus:bg-white/10 transition" placeholder="Where do riders meet you?" />
          </div>

          <button type="submit" className="w-full bg-green-500 text-black font-black py-5 rounded-2xl uppercase tracking-widest mt-6 hover:scale-[1.02] active:scale-95 transition-all">
            {loading ? 'Creating Store...' : 'Launch My Store'}
          </button>
        </div>
      </form>
    </div>
  );
}