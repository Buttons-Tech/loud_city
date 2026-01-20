'use client'
import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, MapPin } from 'lucide-react';
import OrderModal from './OrderModal';

export default function ProductCard({ product }) {
  const [weight, setWeight] = useState(50);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const current = product.isTea ? product.variants[activeIdx] : product;
  const price = product.isTea ? current.basePrice * weight : product.basePrice;

  return (
    <div className="bg-white rounded-[2.5rem] p-4 border border-gray-100 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md">
      <div className="relative h-56 rounded-3xl overflow-hidden">
        <img src={current.img} className="w-full h-full object-cover transition-all" alt={product.name} />
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1">
          <MapPin size={10} className="text-green-400" /> 15m Delivery
        </div>
      </div>

      <div className="px-1">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.vendor.name}</span>
        <h3 className="font-black text-xl text-gray-800">{product.isTea ? current.variantName : product.name}</h3>
      </div>

      {product.isTea && (
        <div className="flex gap-2 px-1">
          {product.variants.map((v, i) => (
            <button key={i} onClick={() => setActiveIdx(i)} className={`flex-1 py-2 rounded-xl text-[10px] font-black border transition ${activeIdx === i ? 'bg-black text-white border-black' : 'text-gray-400 border-gray-100'}`}>
              {v.label}
            </button>
          ))}
        </div>
      )}

      {product.isTea ? (
        <div className="bg-gray-50 rounded-2xl p-2 flex items-center justify-between border border-gray-100">
          <button onClick={() => setWeight(Math.max(10, weight - 10))} className="p-2 bg-white rounded-xl shadow-sm"><Minus size={16}/></button>
          <div className="text-center">
            <span className="font-black text-lg">{weight}g</span>
            <p className="text-[10px] text-gray-400 font-bold tracking-widest">₦{current.basePrice}/g</p>
          </div>
          <button onClick={() => setWeight(weight + 10)} className="p-2 bg-white rounded-xl shadow-sm"><Plus size={16}/></button>
        </div>
      ) : <div className="h-[64px] flex items-center px-4 italic text-gray-400 text-xs font-bold">Fixed unit price</div>}

      <div className="flex justify-between items-center mt-2 px-1">
        <span className="font-black text-2xl">₦{price.toLocaleString()}</span>
        <button onClick={() => setShowModal(true)} className="bg-black text-white p-4 rounded-2xl hover:bg-green-600 transition active:scale-95"><ShoppingCart size={20}/></button>
      </div>

      {showModal && <OrderModal product={current} weight={weight} totalPrice={price} onClose={() => setShowModal(false)} />}
    </div>
  );
}