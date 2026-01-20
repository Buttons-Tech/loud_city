'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Phone, Package, CheckCircle, Clock } from 'lucide-react';

export default function TrackingPage() {
  const { id } = useParams();
  
  // We set the start time. In a real app, you'd fetch this from your DB
  const [timeLeft, setTimeLeft] = useState<number>(600); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- TIMER MATH ---
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - timeLeft / 600);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center p-6 pt-20">
      <div className="w-full max-w-md bg-white rounded-[3.5rem] p-10 shadow-xl border border-gray-100 text-center">
        
        <header className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600 bg-green-50 px-4 py-2 rounded-full">
            Order Confirmed • {id}
          </span>
        </header>

        {/* THE FAMILIAR TIMER UI */}
        <div className="relative w-56 h-56 mx-auto mb-12 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="112" cy="112" r={radius} stroke="#F3F4F6" strokeWidth="12" fill="transparent" />
            <circle 
              cx="112" cy="112" r={radius} stroke="#22C55E" strokeWidth="12" fill="transparent" 
              strokeDasharray={circumference}
              style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s linear', strokeLinecap: 'round' }}
            />
          </svg>
          <div className="z-10 text-center">
            <span className="text-6xl font-black text-gray-900 tabular-nums leading-none">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Minutes Left</p>
          </div>
        </div>

        <div className="space-y-6 text-left bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-green-600">
              <Package size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Status</p>
              <p className="font-black text-gray-900 uppercase italic">Rider is picking up tea</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-green-600">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Drop-off</p>
              <p className="font-black text-gray-900 uppercase italic">Independence Square</p>
            </div>
          </div>
        </div>

        <button className="w-full mt-10 bg-black text-white font-black py-6 rounded-[2.5rem] uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-2xl shadow-gray-200">
          <Phone size={18} /> Contact Rider
        </button>
      </div>

      <p className="mt-8 text-[10px] font-black text-gray-300 uppercase tracking-widest">
        Solace Quick-Commerce Protocol v1.0
      </p>
    </div>
  );
}