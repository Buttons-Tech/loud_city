'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, X } from 'lucide-react';
import Link from 'next/link';

export default function TrackingPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'SOL-000';
  const busStop = searchParams.get('stop') || 'Main Gate';
  
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - (timeLeft / 600));

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[3.5rem] p-10 text-center shadow-2xl">
        <div className="relative w-56 h-56 mx-auto mb-10 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="112" cy="112" r={radius} stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
            <circle 
              cx="112" cy="112" r={radius} stroke="#22c55e" strokeWidth="12" fill="transparent" 
              strokeDasharray={circumference}
              style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s linear', strokeLinecap: 'round' }}
            />
          </svg>
          <div className="z-10 text-center">
            <span className="text-5xl font-black text-gray-900 tabular-nums">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Arrival Time</p>
          </div>
        </div>

        <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Rider Dispatched</h2>
        <p className="text-sm text-gray-500 font-bold mt-4 mb-10">
          Meeting you at <span className="text-black border-b-2 border-green-500 uppercase">{busStop}</span> for order <span className="text-black">{orderId}</span>
        </p>
        
        <Link href="/" className="w-full bg-green-500 text-white font-black py-5 rounded-[2rem] flex items-center justify-center gap-3 uppercase tracking-widest hover:scale-105 transition-transform">
          <CheckCircle size={20} /> I've Received It
        </Link>
      </div>
    </div>
  );
}