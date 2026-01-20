'use client'

import React from 'react';
import Link from 'next/link'; // For internal navigation
import ProductCard from '../app/components/ProductCard';
import { PRODUCTS } from '../constants/products';
import { Leaf, ShieldCheck, Zap, Store, Search, User, ShieldAlert } from 'lucide-react';

export default function Home() {
  const solaceCollection = PRODUCTS[0];

  return (
    <main className="min-h-screen bg-[#FBFBFB] selection:bg-black selection:text-white">
      
      {/* 1. RESTORED GLOBAL NAVIGATION (All entry points) */}
      <nav className="w-full py-6 px-6 border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <span className="text-white font-black text-xl italic">S</span>
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter italic">Solace</h1>
          </Link>

          {/* Center Links - Restored Functional Access */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/tracking" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition flex items-center gap-2">
              <Search size={14} /> Track Order
            </Link>
            <Link href="/vendor/dashboard" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition flex items-center gap-2">
              <Store size={14} /> Vendor Portal
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-3 text-gray-400 hover:text-red-500 transition" title="Admin HQ">
              <ShieldAlert size={20} />
            </Link>
            <button className="bg-black text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition shadow-lg shadow-black/10">
              Enter Market
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO HEADER */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4 border-black pl-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-green-600 mb-4 block">
              10-Minute Delivery Protocol
            </span>
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] text-gray-900">
              The Reserve <br /> Collection.
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-sm font-bold text-gray-500 leading-relaxed mb-6 italic">
              "Hyper-local logistics meeting premium grade botanical standards."
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <ShieldCheck size={14} className="text-green-500" /> Secure Pay
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <Leaf size={14} className="text-green-500" /> Lab Tested
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT GRID (Cana & Scott) */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {PRODUCTS.map((item) => (
            <div key={item.id} className="w-full">
              <ProductCard product={item} />
            </div>
          ))}

          {/* SYSTEM STATUS CARD (Restored context for the user) */}
          <div className="bg-gray-900 rounded-[3.5rem] p-12 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden">
            <Zap className="absolute -right-10 -top-10 text-white/5 w-64 h-64" />
            <div>
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-green-500/20">
                <Zap size={28} className="text-black" />
              </div>
              <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
                Fleet is <br /> Active.
              </h3>
              <p className="text-gray-400 font-bold text-sm max-w-[240px] leading-relaxed">
                Riders are currently stationed at Independence Square and CMS.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-4">
               <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-4 border-gray-900 bg-gray-700" />
                 ))}
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-green-400 animate-pulse">
                 12 Riders Online
               </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER (With Vendor Entry Point) */}
      <footer className="bg-white border-t border-gray-100 py-16 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-4">Solace Ecosystem</h4>
            <p className="text-gray-400 text-sm font-bold max-w-xs leading-relaxed">
              We provide the infrastructure for premium vendors to reach customers in record time.
            </p>
          </div>
          
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 mb-6">Partnerships</p>
            <ul className="space-y-4">
              <li><Link href="/vendor" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition">Apply as Vendor</Link></li>
              <li><Link href="/vendor/dashboard" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition">Vendor Login</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 mb-6">System</p>
            <ul className="space-y-4">
              <li><Link href="/tracking" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition">Track Order</Link></li>
              <li><Link href="/admin" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition">Admin Portal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-16 flex justify-between items-center border-t border-gray-50 mt-16">
          <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em]">© 2026 Solace Systems Nigeria</p>
          <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 italic font-black text-xs">S</div>
        </div>
      </footer>
    </main>
  );
}