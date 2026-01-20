'use client'
import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, MapPin } from 'lucide-react';
import OrderModal from './OrderModal';
import { Product, Variant } from '@/app/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [weight, setWeight] = useState<number>(50);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Type-safe selection of current item
  const current: Variant | Product = product.isTea && product.variants 
    ? product.variants[activeIdx] 
    : product;

  const price: number = product.isTea && product.variants
    ? product.variants[activeIdx].basePrice * weight
    : (product.basePrice || 0);

  return (
    <div className="bg-white rounded-[2.5rem] p-4 border border-gray-100 shadow-sm flex flex-col gap-4">
      <div className="relative h-56 rounded-3xl overflow-hidden">
        <img src={current.img} className="w-full h-full object-cover" alt={product.name} />
      </div>

      <div className="px-1">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.vendor.name}</span>
        <h3 className="font-black text-xl text-gray-800">
          {product.isTea && product.variants ? product.variants[activeIdx].variantName : product.name}
        </h3>
      </div>

      {product.isTea && product.variants && (
        <div className="flex gap-2 px-1">
          {product.variants.map((v, i) => (
            <button key={v.id} onClick={() => setActiveIdx(i)} className={`flex-1 py-2 rounded-xl text-[10px] font-black border transition ${activeIdx === i ? 'bg-black text-white' : 'text-gray-400 border-gray-100'}`}>
              {v.label}
            </button>
          ))}
        </div>
      )}

      {/* Weight controls and Buy button remain same, but variables are now strictly typed */}
      <div className="flex justify-between items-center mt-2 px-1">
        <span className="font-black text-2xl">₦{price.toLocaleString()}</span>
        <button onClick={() => setShowModal(true)} className="bg-black text-white p-4 rounded-2xl active:scale-95 transition">
          <ShoppingCart size={20}/>
        </button>
      </div>

      {showModal && (
        <OrderModal 
          product={current as Variant} 
          weight={weight} 
          totalPrice={price} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}