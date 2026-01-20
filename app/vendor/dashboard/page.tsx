'use client'

import React, { useState, ChangeEvent } from 'react';
import { 
  LayoutDashboard, User, Package, Plus, Save, 
  X, Image as ImageIcon, Trash2, MapPin, 
  CheckCircle2, Clock, LogOut, MessageSquare
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- TYPES ---
interface VariantForm {
  id: string;
  label: string;
  variantName: string;
  basePrice: string;
}

interface Order {
  id: string;
  customerName: string;
  item: string;
  weight: number;
  totalPrice: number;
  busStop: string;
  status: 'pending' | 'dispatched';
  paid: boolean;
}

type DashboardView = 'orders' | 'inventory' | 'profile';

// --- MOCK DATA ---
const MOCK_ORDERS: Order[] = [
  {
    id: 'SOL-9921',
    customerName: 'Ayo O.',
    item: 'Silver Needle White Tea',
    weight: 150,
    totalPrice: 22500,
    busStop: 'Main Gate Stop',
    status: 'pending',
    paid: true
  },
  {
    id: 'SOL-9925',
    customerName: 'Blessing E.',
    item: 'Organic Oolong',
    weight: 50,
    totalPrice: 6000,
    busStop: 'Lakeside Entrance',
    status: 'pending',
    paid: true
  }
];

export default function VendorDashboard() {
  const router = useRouter();
  
  // --- STATE ---
  const [view, setView] = useState<DashboardView>('orders');
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [variants, setVariants] = useState<VariantForm[]>([
    { id: '1', label: 'Tea A', variantName: '', basePrice: '' }
  ]);

  // --- HANDLERS ---
  const addVariant = () => {
    const nextChar = String.fromCharCode(65 + variants.length); // B, C, D...
    const newVariant: VariantForm = {
      id: Math.random().toString(36).substr(2, 9),
      label: `Tea ${nextChar}`,
      variantName: '',
      basePrice: ''
    };
    setVariants([...variants, newVariant]);
  };

  const updateVariant = (index: number, field: keyof VariantForm, value: string) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem('solace_vendor_active');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8F9FA]">
      
      {/* 1. SIDEBAR (Desktop) / BOTTOM NAV (Mobile) */}
      <nav className="fixed bottom-0 w-full md:relative md:w-72 bg-white border-t md:border-r p-4 md:p-8 flex md:flex-col justify-around md:justify-start z-50 shadow-2xl md:shadow-none">
        <div className="hidden md:block mb-12">
          <h1 className="font-black text-3xl text-green-600 italic tracking-tighter uppercase">Solace</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Merchant Portal</p>
        </div>
        
        <div className="flex md:flex-col w-full gap-2">
          <button 
            onClick={() => setView('orders')} 
            className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl font-black transition-all ${view === 'orders' ? 'bg-black text-white shadow-xl scale-105' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <LayoutDashboard size={20}/> <span className="hidden md:inline uppercase text-xs tracking-widest">Orders</span>
          </button>
          
          <button 
            onClick={() => setView('inventory')} 
            className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl font-black transition-all ${view === 'inventory' ? 'bg-black text-white shadow-xl scale-105' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <Package size={20}/> <span className="hidden md:inline uppercase text-xs tracking-widest">Inventory</span>
          </button>
          
          <button 
            onClick={() => setView('profile')} 
            className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl font-black transition-all ${view === 'profile' ? 'bg-black text-white shadow-xl scale-105' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <User size={20}/> <span className="hidden md:inline uppercase text-xs tracking-widest">Profile</span>
          </button>
        </div>

        <button 
          onClick={handleLogout}
          className="hidden md:flex mt-auto items-center gap-4 p-4 text-red-400 font-black hover:bg-red-50 rounded-2xl transition"
        >
          <LogOut size={20}/> <span className="uppercase text-xs tracking-widest">Exit Store</span>
        </button>
      </nav>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12 pb-32 md:pb-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {/* VIEW: ORDERS */}
          {view === 'orders' && (
            <div className="animate-in fade-in slide-in-from-bottom duration-500">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">Live Orders</h2>
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-black text-[10px] uppercase animate-pulse">
                  <Clock size={14} /> Processing
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="bg-white p-8 rounded-[3rem] border-2 border-green-500 shadow-sm flex flex-col lg:flex-row justify-between lg:items-center gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black bg-gray-100 px-3 py-1 rounded-full">{order.id}</span>
                        {order.paid && <span className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-2 py-1 rounded">Paid via OPay</span>}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-gray-900">{order.item}</h3>
                        <p className="text-gray-400 font-bold italic">{order.weight}g for {order.customerName}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 inline-flex">
                        <MapPin size={20} />
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-widest leading-none">Drop-off Location</p>
                          <p className="font-black uppercase text-sm">{order.busStop}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="bg-black text-white font-black px-8 py-4 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-green-600 transition">
                        Dispatch Rider
                      </button>
                      <button className="p-4 bg-gray-100 rounded-2xl text-gray-400 hover:text-black transition">
                        <MessageSquare size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: INVENTORY */}
          {view === 'inventory' && (
            <div className="animate-in fade-in slide-in-from-bottom duration-500">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">Your Shelf</h2>
                <button 
                  onClick={() => setShowUpload(true)}
                  className="bg-black text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-2xl hover:bg-green-600 transition scale-105"
                >
                  <Plus size={20}/> <span className="uppercase text-xs tracking-widest">New Product</span>
                </button>
              </div>

              <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
                      <th className="p-8">Product Details</th>
                      <th className="p-8">Type</th>
                      <th className="p-8">Variants</th>
                      <th className="p-8 text-right">Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr className="group">
                      <td className="p-8">
                        <p className="font-black text-xl">Silver Needle Collection</p>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Premium White Tea</p>
                      </td>
                      <td className="p-8 italic font-bold text-gray-500">Per Gram</td>
                      <td className="p-8 text-center">
                         <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full font-black text-xs">2</span>
                      </td>
                      <td className="p-8 text-right">
                        <button className="text-gray-300 hover:text-red-500 transition"><Trash2 size={20}/></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: PROFILE */}
          {view === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom duration-500">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">Store Profile</h2>
                <button className="bg-green-500 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-green-100 hover:scale-105 transition">
                  <Save size={20}/> <span className="uppercase text-xs tracking-widest">Update Store</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-8 rounded-[3rem] border border-gray-100 space-y-6">
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 block mb-3 px-1 tracking-widest">Public Store Name</label>
                      <input className="w-full bg-gray-50 border-none rounded-2xl p-5 font-black outline-none focus:ring-2 focus:ring-green-500 transition" defaultValue="Green Leaf Teas" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 block mb-3 px-1 tracking-widest">The "Solace" Vibe (Bio)</label>
                      <textarea className="w-full bg-gray-50 border-none rounded-2xl p-5 font-bold outline-none focus:ring-2 focus:ring-green-500 h-40 transition" defaultValue="Directly sourced white and oolong teas for the 15-minute delivery generation." />
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[3rem] border border-gray-100 flex flex-col items-center justify-center text-center border-dashed border-4 border-gray-100 group cursor-pointer hover:border-green-200 transition">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:text-green-500 transition">
                      <ImageIcon size={40} />
                    </div>
                    <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-green-600">Change Store Logo</p>
                  </div>
                  <div className="bg-white p-8 rounded-[3rem] border border-gray-100">
                    <label className="text-[10px] font-black uppercase text-gray-400 block mb-3 px-1 tracking-widest">WhatsApp for Rider Coordination</label>
                    <input className="w-full bg-gray-50 border-none rounded-2xl p-5 font-black outline-none focus:ring-2 focus:ring-green-500 transition" defaultValue="+234 812 345 6789" />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* 3. UPLOAD MODAL (Inventory Context) */}
      {showUpload && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3.5rem] p-10 max-h-[90vh] overflow-y-auto relative animate-in zoom-in duration-300">
            <button onClick={() => setShowUpload(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-all hover:rotate-90">
              <X size={32}/>
            </button>
            
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">New Stock</h2>
            <p className="text-gray-400 font-bold text-sm mb-10 italic">Create your product and its A/B variants.</p>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 block mb-2 px-1 tracking-widest">Global Name</label>
                  <input className="w-full bg-gray-100 rounded-2xl p-5 font-black outline-none focus:ring-2 focus:ring-green-500" placeholder="e.g. Signature Blend" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 block mb-2 px-1 tracking-widest">Pricing Type</label>
                  <select className="w-full bg-gray-100 rounded-2xl p-5 font-black outline-none appearance-none">
                    <option>Tea Leaves (Price/Gram)</option>
                    <option>Fixed Unit (Accessories)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900 underline decoration-green-500 decoration-4 underline-offset-4">Product Variants (Tea A, B...)</h4>
                  <button onClick={addVariant} className="bg-green-50 text-green-700 text-[10px] font-black uppercase px-4 py-2 rounded-full hover:bg-green-100 transition">
                    + Add Option
                  </button>
                </div>
                
                {variants.map((v, i) => (
                  <div key={v.id} className="flex gap-4 bg-gray-50 p-6 rounded-[2rem] border border-gray-100 animate-in slide-in-from-left duration-300">
                    <div className="flex-1">
                      <label className="text-[8px] font-black uppercase text-gray-400 block mb-1">{v.label} Name</label>
                      <input 
                        className="w-full bg-white rounded-xl p-4 text-sm font-black outline-none" 
                        placeholder="e.g. Silver Needle"
                        value={v.variantName}
                        onChange={(e) => updateVariant(i, 'variantName', e.target.value)}
                      />
                    </div>
                    <div className="w-32">
                      <label className="text-[8px] font-black uppercase text-gray-400 block mb-1">Price ₦</label>
                      <input 
                        className="w-full bg-white rounded-xl p-4 text-sm font-black outline-none text-green-600" 
                        placeholder="150"
                        value={v.basePrice}
                        onChange={(e) => updateVariant(i, 'basePrice', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full bg-black text-white font-black py-6 rounded-[2.5rem] uppercase tracking-widest hover:bg-green-600 transition shadow-2xl shadow-gray-200 mt-6">
                Launch to Marketplace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}