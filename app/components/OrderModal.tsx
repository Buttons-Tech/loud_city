'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { X, CheckCircle, MapPin } from 'lucide-react';
import { Variant } from '@/app/types';

interface OrderModalProps {
  product: Variant;
  weight: number;
  totalPrice: number;
  onClose: () => void;
}

export default function OrderModal({ product, weight, totalPrice, onClose }: OrderModalProps) {
  const [step, setStep] = useState<'summary' | 'tracking'>('summary'); 
  const [busStop, setBusStop] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(600); 

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'tracking' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const handleBusStopChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBusStop(e.target.value);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const strokeDasharray = 440; // Updated for better visual
  const percentage = timeLeft / 600;
  const strokeDashoffset = strokeDasharray * (1 - percentage);

  return (
    // ... UI same as before, but using typed handlers like handleBusStopChange
    <select onChange={handleBusStopChange} className="...">
       <option value="">Select Bus Stop...</option>
       <option value="Main Gate">Main Gate</option>
    </select>
  );
}