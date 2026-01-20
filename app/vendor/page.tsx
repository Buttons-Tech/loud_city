'use client'

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Store, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function VendorJoinPage() {
  const router = useRouter();

  // --- 1. STATE MANAGEMENT ---
  const [storeName, setStoreName] = useState<string>('');
  const [pickupPoint, setPickupPoint] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // --- 2. AUTOMATIC REDIRECT LOGIC ---
  useEffect(() => {
    // If they are already a vendor, don't show this form, go straight to dashboard
    const isVendor = localStorage.getItem('solace_vendor_active');
    if (isVendor === 'true') {
      router.replace('/vendor/dashboard');
    }
  }, [router]);

  // --- 3. SIGNUP HANDLER ---
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a network delay for the "Automatic" feel
    setTimeout(() => {
      // Save the "Digital ID Card" to the browser
      localStorage.setItem('solace_vendor_active', 'true');
      localStorage.setItem('solace_vendor_name', storeName);
      localStorage.setItem('solace_vendor_location', pickupPoint);

      // Redirect to the dashboard
      router.push('/vendor/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-green-500 selection:text-black">
      
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-green-500/20 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-3xl mb-6 rotate-3">
            <Store size={32} className="text-black" />
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">Solace Vendor</h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">Join the 15-minute revolution</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-4">
            {/* Store Name Input */}
            <div className="group">
              <label className="text-[10px] font-black uppercase text-gray-500 mb-2 block px-1 tracking-widest group-focus-within:text-green-500 transition-colors">
                What is your store called?
              </label>
              <input 
                required
                type="text"
                value={storeName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setStoreName(e.target.value)}
                placeholder="e.g. Zen Leaf Collective"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-black text-white outline-none focus:border-green-500 focus:bg-white/10 transition-all placeholder:text-white/20"
              />
            </div>

            {/* Pickup Point Input */}
            <div className="group">
              <label className="text-[10px] font-black uppercase text-gray-500 mb-2 block px-1 tracking-widest group-focus-within:text-green-500 transition-colors">
                Nearest Bus Stop (For Riders)
              </label>
              <input 
                required
                type="text"
                value={pickupPoint}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPickupPoint(e.target.value)}
                placeholder="e.g. Independence Square Stop"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 font-black text-white outline-none focus:border-green-500 focus:bg-white/10 transition-all placeholder:text-white/20"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !storeName || !pickupPoint}
            className="w-full bg-green-500 disabled:bg-gray-800 disabled:text-gray-500 text-black font-black py-6 rounded-[2rem] uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-green-500/10"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Zap size={18} className="animate-bounce" /> Initializing...
              </span>
            ) : (
              <>Launch My Store <ArrowRight size={20} /></>
            )}
          </button>
        </form>

        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center">
            <ShieldCheck size={20} className="text-green-500 mb-2" />
            <p className="text-[8px] font-black uppercase text-gray-400 tracking-wider">Instant Approval</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center">
            <Zap size={20} className="text-green-500 mb-2" />
            <p className="text-[8px] font-black uppercase text-gray-400 tracking-wider">No Password Needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}