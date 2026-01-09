'use client'

import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Store, Clock } from 'lucide-react';

interface Vendor {
  name: string;
  image: string;
  rating: number;
}

interface Product {
  id: string;
  name: string;
  image: string;
  basePricePerGram: number;
  unitName: string; // e.g., "grams"
  vendor: Vendor;
}

export default function TeaProductCard({ product }: { product: Product }) {
  const [weight, setWeight] = useState(50); // Default 50g
  const step = 10; // Increment by 10g

  const totalPrice = weight * product.basePricePerGram;

  const handleIncrement = () => setWeight((prev) => prev + step);
  const handleDecrement = () => setWeight((prev) => (prev > step ? prev - step : step));

  return (
    <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-100 transition-all hover:shadow-2xl">
      {/* Product Image */}
      <div className="relative h-48 w-full">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <Clock size={12} /> 15 mins
        </div>
      </div>

      <div className="p-5">
        {/* Vendor Info Section */}
        <div className="flex items-center gap-2 mb-3">
          <img 
            src={product.vendor.image} 
            alt={product.vendor.name} 
            className="w-6 h-6 rounded-full object-cover border border-gray-200"
          />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
            <Store size={12} /> {product.vendor.name}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-4">Premium loose-leaf tea</p>

        {/* Weight Toggle Logic */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Select Quantity</span>
            <span className="text-sm font-bold text-green-600">₦{product.basePricePerGram}/g</span>
          </div>
          
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-2">
            <button 
              onClick={handleDecrement}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            >
              <Minus size={20} />
            </button>
            
            <div className="flex flex-col items-center">
              <span className="text-lg font-black text-gray-800">{weight}g</span>
            </div>

            <button 
              onClick={handleIncrement}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold">Total Price</p>
            <p className="text-2xl font-black text-gray-900">₦{totalPrice.toLocaleString()}</p>
          </div>
          
          <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl transition-transform active:scale-95 shadow-lg shadow-green-200">
            <ShoppingCart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}