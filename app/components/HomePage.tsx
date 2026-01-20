'use client'

import React, { useState } from 'react';
import { Search, User, PlayCircle, Plus, Minus, ShoppingCart, Music, MapPin, Store, Menu } from 'lucide-react';

// --- MOCK DATA ---
const PRODUCTS = [
  { 
    id: '1', 
    name: 'Silver Needle White Tea', 
    basePrice: 2000, // Price per gram
    isTea: true, 
    vendor: { name: 'Green Leaf', image: 'https://i.pravatar.cc/150?u=green' }, 
    img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    id: '2', 
    name: 'Studio Monitor Pro XX', 
    basePrice: 45000, // Flat price
    isTea: false, 
    vendor: { name: 'Sonic Hub', image: 'https://i.pravatar.cc/150?u=sonic' }, 
    // FIXED IMAGE URL BELOW
    img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    id: '3', 
    name: 'Ceramic Kyusu Teapot', 
    basePrice: 12500, // Flat price
    isTea: false, 
    vendor: { name: 'Artisan Clay', image: 'https://i.pravatar.cc/150?u=clay' }, 
    img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' 
  },
];

// --- INDIVIDUAL PRODUCT CARD COMPONENT ---
function ProductCard({ product }: { product: any }) {
  const [weight, setWeight] = useState(1); // Default 50g for tea
  
  // Calculate price: if it's tea, multiply. If not, use base price.
  const displayPrice = product.isTea ? product.basePrice * weight : product.basePrice;

  return (
    <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Image & Tag */}
      <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden group">
        <img src={product.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
          <MapPin size={10} className="text-green-400" /> 15 min delivery
        </div>
      </div>
      
      <div className="px-1">
         {/* Vendor Detail */}
        <div className="flex items-center gap-2 mb-1">
            <img src={product.vendor.image} className="w-5 h-5 rounded-full border border-gray-200" alt="vendor" />
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{product.vendor.name}</span>
        </div>
        
        {/* Product Name */}
        <h3 className="font-black text-gray-800 text-lg leading-tight line-clamp-1">{product.name}</h3>
      </div>
      
      {/* TEA WEIGHT TOGGLE (Only shows if isTea is true) */}
      {product.isTea ? (
        <div className="bg-gray-50 rounded-2xl p-2 flex items-center justify-between border border-gray-100">
          <button 
            onClick={() => setWeight(Math.max(1, weight - 1))}
            className="p-2 bg-white shadow-sm rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
          >
            <Minus size={16} className="text-gray-600" />
          </button>
          <div className="text-center">
            <span className="text-base font-black text-gray-800 block">{weight}g</span>
            <p className="text-[10px] text-gray-400 font-bold tracking-wider">₦{product.basePrice}/g</p>
          </div>
          <button 
            onClick={() => setWeight(weight + 1)}
            className="p-2 bg-white shadow-sm rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
        </div>
      ) : (
        <div className="h-[66px] flex items-center px-2">
           <p className="text-xs text-gray-400 font-medium italic">Standard Unit Price</p>
        </div>
      )}
      
      {/* FINAL PRICE & ADD TO CART */}
      <div className="flex justify-between items-end mt-2 px-1">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total</p>
          <span className="font-black text-2xl text-gray-900">₦{displayPrice.toLocaleString()}</span>
        </div>
        <button className="bg-black text-white p-3.5 rounded-2xl hover:bg-green-600 transition-colors active:scale-95 shadow-lg shadow-gray-200">
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
             <div className="flex items-center gap-2 lg:hidden">
                <Menu size={24} className="text-gray-600" />
            </div>
            <h1 className="font-black text-2xl tracking-tighter lg:text-3xl">CLOUD CITY</h1>
            <div className="flex gap-3 sm:gap-4">
            <div className="bg-gray-100 p-2 sm:p-2.5 rounded-full cursor-pointer hover:bg-gray-200 transition"><Search size={20} className="text-gray-600" /></div>
            <div className="bg-gray-100 p-2 sm:p-2.5 rounded-full cursor-pointer hover:bg-gray-200 transition"><User size={20} className="text-gray-600" /></div>
            </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto">
        {/* PODCAST BANNER */}
        <section className="px-4 sm:px-6 py-6 sm:py-8">
            <div className="w-full h-40 sm:h-48 md:h-56 rounded-[2.5rem] bg-gradient-to-r from-green-900 via-black to-gray-900 p-8 sm:p-10 flex items-center justify-between overflow-hidden relative shadow-xl">
            <div className="relative z-10 max-w-xs sm:max-w-md">
                <span className="bg-green-500 text-black text-[10px] font-black px-2 py-1 rounded mb-2 inline-block uppercase">Live Now</span>
                <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl leading-tight">The Cloud Session</h2>
                <p className="text-green-400 text-sm sm:text-base font-bold mt-1">Ep. 1: The Lagos Night Life</p>
            </div>
            <PlayCircle size={80} className="text-white/10 absolute -right-6 -bottom-6 md:text-white/20" />
            <button className="relative z-10 bg-white text-black text-xs sm:text-sm font-black px-5 py-2.5 rounded-full uppercase hover:bg-green-500 hover:text-white transition-colors hidden sm:block">Listen Now</button>
            </div>
        </section>

        {/* PRODUCT FEED */}
        <section className="px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-full flex items-center justify-between px-2">
                 <h2 className="font-black text-gray-400 text-xs uppercase tracking-[0.2em]">Local Marketplace</h2>
                 <span className="text-xs font-bold text-green-600 cursor-pointer hover:underline">View All</span>
            </div>
           
            {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
            ))}
        </section>
      </main>

      {/* PERSISTENT PLAYER */}
      <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-auto sm:w-full sm:max-w-md sm:mx-auto bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-3 sm:p-4 shadow-2xl flex items-center gap-4 z-50">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-800 rounded-2xl flex items-center justify-center animate-pulse relative overflow-hidden">
           <img src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=100&q=80" className="absolute inset-0 w-full h-full object-cover opacity-50" />
           <Music className="text-white relative z-10" size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-sm sm:text-base text-white truncate">Midnight Vibes Radio</p>
          <p className="text-xs text-gray-400 truncate">Curated by Solace • 420 listening</p>
        </div>
        <div className="flex items-center gap-2">
             <PlayCircle size={36} className="text-white cursor-pointer hover:text-green-400 transition" />
        </div>
       
      </div>
    </div>
  );
}