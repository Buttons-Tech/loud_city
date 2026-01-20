'use client'
import React, { useState } from 'react';
import { 
  LayoutDashboard, User, Package, Plus, Save, 
  X, Image as ImageIcon, Trash2, MapPin, CheckCircle2, Clock 
} from 'lucide-react';

export default function VendorDashboard() {
  const [view, setView] = useState('orders'); // orders | inventory | profile
  const [showUpload, setShowUpload] = useState(false);
  const [variants, setVariants] = useState([{ label: 'Tea A', variantName: '', basePrice: '' }]);

  const addVariant = () => {
    setVariants([...variants, { label: `Tea ${String.fromCharCode(65 + variants.length)}`, variantName: '', basePrice: '' }]);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F9FAFB]">
      
      {/* 1. SIDEBAR (Desktop) / BOTTOM NAV (Mobile) */}
      <nav className="fixed bottom-0 w-full md:relative md:w-72 bg-white border-t md:border-r p-4 md:p-8 flex md:flex-col justify-around md:justify-start z-50">
        <div className="hidden md:block mb-10">
          <h1 className="font-black text-2xl text-green-600 italic uppercase tracking-tighter">Solace Vendor</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Merchant Portal v1.0</p>
        </div>
        
        <button onClick={() => setView('orders')} className={`flex items-center gap-3 p-3 md:p-4 rounded-2xl font-black transition ${view === 'orders' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}>
          <LayoutDashboard size={20}/> <span className="text-[10px] md:text-sm uppercase tracking-widest">Orders</span>
        </button>
        
        <button onClick={() => setView('inventory')} className={`flex items-center gap-3 p-3 md:p-4 rounded-2xl font-black transition ${view === 'inventory' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}>
          <Package size={20}/> <span className="text-[10px] md:text-sm uppercase tracking-widest">Inventory</span>
        </button>
        
        <button onClick={() => setView('profile')} className={`flex items-center gap-3 p-3 md:p-4 rounded-2xl font-black transition ${view === 'profile' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}>
          <User size={20}/> <span className="text-[10px] md:text-sm uppercase tracking-widest">Profile</span>
        </button>
      </nav>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-12 pb-24 md:pb-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          {/* --- VIEW: ORDERS --- */}
          {view === 'orders' && (
            <section className="animate-in fade-in slide-in-from-bottom duration-500">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black uppercase italic">Active Dispatches</h2>
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Live Updates</span>
                </div>
              </div>

              <div className="space-y-4">
                {[1, 2].map((order) => (
                  <div key={order} className="bg-white p-6 md:p-8 rounded-[2.5rem] border-2 border-green-500 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-gray-800">Order #882{order}</span>
                        <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">Paid via OPay</span>
                      </div>
                      <p className="text-lg font-bold text-gray-600 uppercase tracking-tighter">250g Silver Needle White Tea</p>
                      
                      {/* CRITICAL: Bus Stop Info for Dispatch */}
                      <div className="flex items-center gap-2 mt-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <MapPin size={18} className="text-green-600" />
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase leading-none">Drop-off Bus Stop</p>
                          <p className="font-black text-gray-900">Independence Square Stop</p>
                        </div>
                      </div>
                    </div>
                    <button className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-black px-10 py-4 rounded-2xl transition shadow-lg shadow-green-100 uppercase tracking-widest text-xs">
                      Mark Dispatched
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- VIEW: INVENTORY --- */}
          {view === 'inventory' && (
            <section className="animate-in fade-in slide-in-from-bottom duration-500">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black uppercase italic">Storefront</h2>
                <button onClick={() => setShowUpload(true)} className="bg-black text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-green-600 transition shadow-xl shadow-gray-200">
                  <Plus size={18}/> Add Product
                </button>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                      <th className="p-6">Product Item</th>
                      <th className="p-6">Pricing Style</th>
                      <th className="p-6">Visibility</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr className="hover:bg-gray-50/50 transition">
                      <td className="p-6">
                        <p className="font-black text-gray-900">Organic Oolong Collection</p>
                        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">2 Variants active</p>
                      </td>
                      <td className="p-6 font-bold text-gray-500 italic">Per Gram</td>
                      <td className="p-6"><span className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full font-black uppercase">Live</span></td>
                      <td className="p-6 text-right text-gray-400"><Trash2 size={18} className="ml-auto cursor-pointer hover:text-red-500 transition" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* --- VIEW: PROFILE --- */}
          {view === 'profile' && (
            <section className="animate-in fade-in slide-in-from-bottom duration-500">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black uppercase italic">Store Settings</h2>
                <button className="bg-green-500 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-green-100 hover:scale-105 transition">
                  <Save size={18}/> Save Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 block mb-2 px-1">Legal Store Name</label>
                    <input className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-green-500" defaultValue="Green Leaf Teas" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 block mb-2 px-1">Brand Bio / Mantra</label>
                    <textarea className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-green-500 h-32" defaultValue="Providing the finest organic blends to the Solace community since 2024." />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-col items-center justify-center border-dashed border-2">
                    <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 flex items-center justify-center text-gray-400">
                      <ImageIcon size={32} />
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-green-600 underline">Upload Store Logo</button>
                  </div>
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100">
                    <label className="text-[10px] font-black uppercase text-gray-400 block mb-2 px-1">WhatsApp for Dispatch</label>
                    <input className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-green-500" defaultValue="+234 812 345 6789" />
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>
      </main>

      {/* 3. UPLOAD MODAL (Inventory Context) */}
      {showUpload && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-8 max-h-[85vh] overflow-y-auto relative animate-in zoom-in duration-300">
            <button onClick={() => setShowUpload(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition"><X /></button>
            <h2 className="text-3xl font-black uppercase italic mb-8">Add New Stock</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="w-full bg-gray-50 rounded-2xl p-4 font-bold outline-none" placeholder="Product Name (e.g. Signature Blend)" />
                <select className="w-full bg-gray-50 rounded-2xl p-4 font-bold outline-none">
                  <option>Tea Leaves (Grams)</option>
                  <option>Fixed Accessories</option>
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pricing Variants</h4>
                  <button onClick={addVariant} className="text-green-600 text-[10px] font-black uppercase">+ Add Variant</button>
                </div>
                {variants.map((v, i) => (
                  <div key={i} className="flex gap-3 bg-gray-50 p-4 rounded-2xl animate-in slide-in-from-left">
                    <input className="flex-1 bg-white rounded-xl p-3 text-xs font-bold" placeholder={`${v.label} Name (e.g. Silver Needle)`} />
                    <input className="w-24 bg-white rounded-xl p-3 text-xs font-bold" placeholder="Price ₦" />
                  </div>
                ))}
              </div>

              <button className="w-full bg-black text-white font-black py-5 rounded-[2rem] uppercase tracking-widest hover:bg-green-600 transition shadow-xl shadow-gray-100">
                Push to Live Marketplace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}