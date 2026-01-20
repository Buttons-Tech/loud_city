'use client'

import React, { useState, useEffect, ChangeEvent } from 'react';
import { X, CheckCircle, MapPin, CreditCard, Loader2, ChevronRight } from 'lucide-react';
import { Variant } from '@/app/types';

interface OrderModalProps {
  product: Variant;
  weight: number;
  totalPrice: number;
  onClose: () => void;
}

export default function OrderModal({ product, weight, totalPrice, onClose }: OrderModalProps) {
  // --- STATE ---
  const [step, setStep] = useState<'summary' | 'tracking'>('summary'); 
  const [busStop, setBusStop] = useState<string>('');
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes in seconds

  // --- TIMER LOGIC ---
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'tracking' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // --- OPAY PAYMENT TRIGGER ---
  const handlePayment = async () => {
    setIsPaying(true);
    try {
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice,
          orderId: `SOL-${Math.floor(Math.random() * 1000000)}`,
          customerName: "Solace User",
          itemDescription: `${weight}g of ${product.variantName}`,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to OPay Secure Checkout
        window.location.href = data.url;
      } else {
        throw new Error("Payment initialization failed");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Could not connect to OPay. Please try again.");
      setIsPaying(false);
    }
  };

  // --- TIMER RING MATH ---
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // SVG Circle Math: Radius 70, Circumference = 2 * PI * 70 ≈ 440
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const percentage = timeLeft / 600;
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-end sm:items-center justify-center p-4 selection:bg-green-500">
      <div className="bg-white w-full max-w-md rounded-[3.5rem] p-8 shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom duration-500">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-gray-300 hover:text-black transition-transform hover:rotate-90"
        >
          <X size={24} />
        </button>

        {step === 'summary' ? (
          <div className="space-y-6">
            <header>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Order Summary</h2>
              <p className="text-green-600 font-black text-[10px] uppercase tracking-[0.2em] mt-2">
                Verified Fresh: {product.variantName}
              </p>
            </header>

            {/* Product Details Card */}
            <div className="bg-gray-50 rounded-[2.5rem] p-8 space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <span className="font-black text-gray-400 text-[10px] uppercase tracking-widest">Selected Item</span>
                <span className="font-black text-gray-900 uppercase italic">{product.variantName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <span className="font-black text-gray-400 text-[10px] uppercase tracking-widest">Weight</span>
                <span className="font-black text-gray-900">{weight}g</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-black text-[10px] uppercase tracking-widest">Total to Pay</span>
                <span className="font-black text-3xl text-green-600 tracking-tighter">₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Bus Stop Selection */}
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 mb-3 block px-2 tracking-widest">
                Meeting Point (Bus Stop)
              </label>
              <div className="relative">
                <select 
                  value={busStop}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setBusStop(e.target.value)}
                  className="w-full bg-gray-100 border-none rounded-2xl p-5 font-black text-gray-900 appearance-none outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                  <option value="">Select Nearest Stop...</option>
                  <option value="Main Gate Stop">Main Gate Stop</option>
                  <option value="Independence Square">Independence Square</option>
                  <option value="Lakeside Entrance">Lakeside Entrance</option>
                  <option value="Pharmacy Junction">Pharmacy Junction</option>
                </select>
                <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <button 
              disabled={!busStop || isPaying} 
              onClick={handlePayment} 
              className="group w-full bg-black text-white font-black py-6 rounded-[2rem] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-green-600 transition-all disabled:bg-gray-200"
            >
              {isPaying ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Connecting OPay...
                </>
              ) : (
                <>
                  Confirm & Pay <CreditCard size={20} />
                </>
              )}
            </button>
            <p className="text-[8px] text-center font-bold text-gray-400 uppercase tracking-widest">
              Securely processed via OPay Checkout
            </p>
          </div>
        ) : (
          /* STEP: TRACKING */
          <div className="text-center py-6 animate-in zoom-in duration-500">
            {/* ROTATING RING TIMER UI */}
            <div className="relative w-48 h-48 mx-auto mb-10 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle 
                  cx="96" cy="96" r={radius} 
                  stroke="currentColor" strokeWidth="12" fill="transparent" 
                  className="text-gray-100" 
                />
                {/* Animated Moving Ring */}
                <circle 
                  cx="96" cy="96" r={radius} 
                  stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray={circumference}
                  style={{ 
                    strokeDashoffset, 
                    transition: 'stroke-dashoffset 1s linear',
                    strokeLinecap: 'round'
                  }}
                  className="text-green-500" 
                />
              </svg>
              {/* Static Centered Digits */}
              <div className="flex flex-col items-center justify-center z-10">
                <span className="text-5xl font-black text-gray-900 tabular-nums">
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
                  Est. Arrival
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2 leading-none">Rider Dispatched</h2>
            <p className="text-sm text-gray-500 font-bold mb-10">
              Meeting you at <span className="text-black border-b-2 border-green-500 uppercase">{busStop}</span>
            </p>
            
            <button 
              onClick={onClose} 
              className="w-full bg-green-500 text-white font-black py-5 rounded-[2rem] flex items-center justify-center gap-3 uppercase tracking-widest shadow-xl shadow-green-100 hover:scale-[1.02] transition-transform"
            >
              <CheckCircle size={20} /> I've received it
            </button>
          </div>
        )}
      </div>
    </div>
  );
}