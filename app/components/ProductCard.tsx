'use client'

import React, { useState } from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import OrderModal from './OrderModal';
import { Product } from '../../types';

export default function ProductCard({ product }: { product: Product }) {
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [weight, setWeight] = useState(50);
  const [showModal, setShowModal] = useState(false);

  const currentVariant = product.variants[activeVariantIdx];
  const totalPrice = currentVariant.basePrice * weight;
  const weightOptions = [1, 2, 5, 10];

  return (
    <div className="bg-white rounded-[3.5rem] p-6 border border-gray-100 shadow-sm flex flex-col gap-6">
      
      {/* Visual Header */}
      <div className="relative h-72 rounded-[3rem] overflow-hidden bg-gray-50">
        <img 
          src={currentVariant.img} 
          alt={currentVariant.variantName}
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-5 left-5 bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/10">
          <Zap size={14} className="text-green-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">
            {product.vendor.name}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-2">
        <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">
          {currentVariant.variantName}
        </h3>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
          Solace Reserve • Limited Edition
        </p>
      </div>

      {/* Variant Selector (Cana vs Scott) */}
      <div className="grid grid-cols-2 gap-3 px-1">
        {product.variants.map((v, i) => (
          <button 
            key={v.id} 
            onClick={() => setActiveVariantIdx(i)}
            className={`py-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
              activeVariantIdx === i 
                ? 'bg-black text-white border-black shadow-lg' 
                : 'text-gray-400 border-gray-100'
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{v.label}</span>
            <span className={`text-[8px] font-bold ${activeVariantIdx === i ? 'text-green-400' : 'text-gray-400'}`}>
              ₦{v.basePrice.toLocaleString()}/g
            </span>
          </button>
        ))}
      </div>

      {/* Gram Selector */}
      <div className="bg-gray-50 p-2 rounded-[2rem] flex gap-1">
        {weightOptions.map((w) => (
          <button
            key={w}
            onClick={() => setWeight(w)}
            className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
              weight === w ? 'bg-white text-black shadow-sm' : 'text-gray-400'
            }`}
          >
            {w}g
          </button>
        ))}
      </div>

      {/* Total & Buy */}
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50 px-2">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Amount</p>
          <span className="text-3xl font-black text-gray-900 tracking-tighter">
            ₦{totalPrice.toLocaleString()}
          </span>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-black text-white p-6 rounded-full hover:bg-green-500 transition-all shadow-xl"
        >
          <ShoppingCart size={24} />
        </button>
      </div>

      {showModal && (
        <OrderModal 
          product={currentVariant} 
          weight={weight} 
          totalPrice={totalPrice} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}