'use client'

import React, { useState, useEffect, ChangeEvent } from 'react';
import { X, CheckCircle, MapPin, CreditCard, Loader2, ChevronRight, Truck } from 'lucide-react';
import { Variant } from '../../types';

interface OrderModalProps {
  product: Variant;
  weight: number;
  totalPrice: number;
  onClose: () => void;
}

type PaymentMethod = 'online' | 'pod';

export default function OrderModal({ product, weight, totalPrice, onClose }: OrderModalProps) {
  // --- STATE ---
  const [step, setStep] = useState<'summary' | 'tracking'>('summary'); 
  const [busStop, setBusStop] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes

  // --- TIMER LOGIC (For POD or after return from Online) ---
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'tracking' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // --- ORDER EXECUTION ---
  const handleConfirmOrder = async () => {
    if (!busStop) return alert("Please select a meeting point");
    setIsLoading(true);

    const orderData = {
      amount: totalPrice,
      orderId: `SOL-${Math.floor(100000 + Math.random() * 900000)}`,
      item: `${weight}g of ${product.variantName}`,
      method: paymentMethod,
      location: busStop
    };

    if (paymentMethod === 'online') {
      // ONLINE PATH: Redirect to OPay
      try {
        const response = await fetch('/api/pay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...orderData,
            callbackUrl: `${window.location.origin}/tracking?orderId=${orderData.orderId}&stop=${busStop}`
          }),
        });
        const data = await response.json();
        if (data.url) window.location.href = data.url;
      } catch (err) {
        alert("Payment gateway error. Try Pay on Delivery.");
        setIsLoading(false);
      }
    } else {
      // POD PATH: Go straight to tracking timer
      setTimeout(() => {
        setStep('tracking');
        setIsLoading(false);
      }, 1500);
    }
  };

  // --- TIMER UI MATH ---
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - (timeLeft / 600));

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[3.5rem] p-8 shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom duration-500">
        
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-300 hover:text-black transition-transform hover:rotate-90">
          <X size={24} />
        </button>

        {step === 'summary' ? (
          <div className="space-y-6">
            <header>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Checkout</h2>
              <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mt-2">Finalize your {product.variantName} order</p>
            </header>

            {/* Payment Method Toggle - RESTORED FEATURE */}
            <div className="flex bg-gray-100 p-1.5 rounded-[2rem] gap-1">
              <button 
                onClick={() => setPaymentMethod('online')}
                className={`flex-1 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${paymentMethod === 'online' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
              >
                <CreditCard size={14} /> Pay Online
              </button>
              <button 
                onClick={() => setPaymentMethod('pod')}
                className={`flex-1 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${paymentMethod === 'pod' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
              >
                <Truck size={14} /> On Delivery
              </button>
            </div>

            {/* Selection Summary */}
            <div className="bg-gray-50 rounded-[2.5rem] p-6 space-y-3 border border-gray-100">
              <div className="flex justify-between text-[10px] font-black uppercase text-gray-400">
                <span>Product / Weight</span>
                <span>Subtotal</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-black text-gray-900 uppercase italic">{product.variantName} ({weight}g)</span>
                <span className="font-black text-2xl text-green-600 tracking-tighter">₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Bus Stop Selection */}
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 mb-3 block px-2 tracking-widest">Select Meeting Point</label>
              <select 
                value={busStop}
                onChange={(e) => setBusStop(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl p-5 font-black text-gray-900 outline-none focus:ring-2 focus:ring-green-500 appearance-none"
              >
                <option value="">Nearest Bus Stop...</option>
                <option value="Independence Square">Independence Square</option>
                <option value="CMS Bus Stop">CMS Bus Stop</option>
                <option value="Lekki Phase 1">Lekki Phase 1</option>
                <option value="Ikeja Underbridge">Ikeja Underbridge</option>
              </select>
            </div>

            <button 
              disabled={!busStop || isLoading} 
              onClick={handleConfirmOrder} 
              className="w-full bg-black text-white font-black py-6 rounded-[2rem] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-green-600 transition-all disabled:bg-gray-200"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : (paymentMethod === 'online' ? 'Pay Now via OPay' : 'Confirm Order')}
            </button>
          </div>
        ) : (
          /* STEP: TRACKING (Circular Timer UI) */
          <div className="text-center py-6 animate-in zoom-in duration-500">
            <div className="relative w-48 h-48 mx-auto mb-10 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r={radius} stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
                <circle 
                  cx="96" cy="96" r={radius} stroke="#22c55e" strokeWidth="12" fill="transparent" 
                  strokeDasharray={circumference}
                  style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s linear', strokeLinecap: 'round' }}
                />
              </svg>
              <div className="z-10 flex flex-col items-center">
                <span className="text-5xl font-black text-gray-900 tabular-nums">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Est. Arrival</span>
              </div>
            </div>

            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Rider Dispatched</h2>
            <p className="text-sm text-gray-500 font-bold mb-10 italic">Meeting you at {busStop}</p>
            
            <button onClick={onClose} className="w-full bg-green-500 text-white font-black py-5 rounded-[2rem] flex items-center justify-center gap-3 uppercase tracking-widest shadow-xl shadow-green-100 hover:scale-[1.02] transition-transform">
              <CheckCircle size={20} /> I've Received It
            </button>
          </div>
        )}
      </div>
    </div>
  );
}