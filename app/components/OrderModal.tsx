'use client'
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, MapPin, CreditCard, Truck } from 'lucide-react';

export default function OrderModal({ product, weight, totalPrice, onClose }) {
  const [step, setStep] = useState('summary'); 
  const [busStop, setBusStop] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); 

  // Timer logic
  useEffect(() => {
    if (step === 'tracking' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  // This calculation creates the "moving ring" effect
  const strokeDasharray = 283; 
  const percentage = timeLeft / 600;
  const strokeDashoffset = strokeDasharray * (1 - percentage);

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
        
        {step === 'summary' ? (
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <h2 className="text-3xl font-black mb-1 italic uppercase tracking-tighter">Order Summary</h2>
            {/* FIX: Showing the specific Variant Name (Tea A or Tea B) */}
            <p className="text-green-600 font-bold text-sm mb-6">Selected: {product.variantName || product.name}</p>
            
            <div className="bg-gray-50 rounded-3xl p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-black text-gray-400 text-[10px] uppercase">Item</span>
                <span className="font-bold">{product.variantName || product.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-black text-gray-400 text-[10px] uppercase">Quantity</span>
                <span className="font-bold">{weight}g</span>
              </div>
              <div className="border-t border-gray-200 my-3 pt-3 flex justify-between items-center">
                <span className="font-black uppercase text-xs">Total</span>
                <span className="font-black text-2xl text-green-600">₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Drop-off Point</label>
            <select className="w-full bg-gray-100 rounded-2xl p-4 mb-8 font-bold appearance-none outline-none" onChange={(e) => setBusStop(e.target.value)}>
              <option value="">Select Bus Stop...</option>
              <option value="Main Gate">Main Gate Stop</option>
              <option value="Lakeside">Lakeside Entrance</option>
            </select>

            <button disabled={!busStop} onClick={() => setStep('tracking')} className="w-full bg-black text-white font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-green-600 transition-colors disabled:bg-gray-200">
              Confirm & Pay
            </button>
          </div>
        ) : (
          <div className="text-center py-6 animate-in zoom-in duration-500">
            {/* THE ROTATING TIMER UI */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray={strokeDasharray}
                  style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s linear' }}
                  className="text-green-500" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-gray-900">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                <span className="text-[10px] font-black text-gray-400 uppercase">Est. Arrival</span>
              </div>
            </div>

            <h2 className="text-2xl font-black uppercase italic mb-2">Rider Dispatched</h2>
            <p className="text-sm text-gray-500 mb-8">Meeting you at <span className="text-black font-black underline">{busStop}</span></p>
            
            <button onClick={onClose} className="w-full bg-green-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2">
              <CheckCircle size={20} /> I've received it
            </button>
          </div>
        )}
      </div>
    </div>
  );
}