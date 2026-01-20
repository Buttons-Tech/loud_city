'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // CRITICAL: Use 'next/navigation'
import { 
  BarChart3, Users, Store, Bike, 
  TrendingUp, AlertCircle, DollarSign, 
  CheckCircle, Search, Clock 
} from 'lucide-react';

// --- TYPES ---
interface AdminStat {
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}

interface MarketOrder {
  id: string;
  vendor: string;
  amount: number;
  status: 'paid' | 'dispatched' | 'completed';
  time: string;
}

// --- MOCK DATA ---
const STATS: AdminStat[] = [
  { label: 'Total Revenue', value: '₦1,240,500', trend: '+12%', icon: <DollarSign className="text-green-500" /> },
  { label: 'Active Vendors', value: '18', trend: '+2', icon: <Store className="text-blue-500" /> },
  { label: 'Live Orders', value: '12', trend: 'High', icon: <Bike className="text-orange-500" /> },
  { label: 'Customers', value: '842', trend: '+45', icon: <Users className="text-purple-500" /> },
];

const RECENT_ORDERS: MarketOrder[] = [
  { id: 'SOL-991', vendor: 'Zen Leaf', amount: 12500, status: 'dispatched', time: '2 mins ago' },
  { id: 'SOL-990', vendor: 'Organic Blends', amount: 8400, status: 'paid', time: '5 mins ago' },
  { id: 'SOL-989', vendor: 'Tea Palace', amount: 21000, status: 'completed', time: '12 mins ago' },
];

export default function AdminDashboard() {
  const router = useRouter(); // Initialize router inside the component
  const [search, setSearch] = useState<string>('');

  // --- SECURITY CHECK ---
  useEffect(() => {
    const isAdmin = localStorage.getItem('solace_admin_key');
    
    // For development, you can set this key in your browser console:
    // localStorage.setItem('solace_admin_key', 'SUPER_SECRET_KEY')
    if (isAdmin !== 'SUPER_SECRET_KEY') {
      router.replace('/'); 
    }
  }, [router]); // Include router in dependency array for TS safety

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900">Solace HQ</h1>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Marketplace Oversight</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search database..."
                className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 font-bold shadow-sm focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white shrink-0">
              <BarChart3 size={24} />
            </div>
          </div>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {STATS.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-gray-50 rounded-2xl">{stat.icon}</div>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
              </div>
              <div className="mt-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN FEED */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8">Active Transactions</h2>
              <div className="space-y-4">
                {RECENT_ORDERS.filter(o => o.vendor.toLowerCase().includes(search.toLowerCase())).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-transparent hover:border-green-300 transition-all">
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        order.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600 animate-pulse'
                      }`}>
                        {order.status === 'completed' ? <CheckCircle size={20}/> : <Clock size={20}/>}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 uppercase tracking-tight">{order.id} • {order.vendor}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900">₦{order.amount.toLocaleString()}</p>
                      <p className="text-[8px] font-black uppercase bg-black text-white px-2 py-1 rounded inline-block mt-1">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="bg-black text-white rounded-[3rem] p-10 shadow-2xl h-fit">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8 text-green-500">Fleet Active</h2>
            <div className="space-y-8">
              {[1, 2, 3].map((r) => (
                <div key={r} className="flex items-center gap-4 border-l-2 border-white/10 pl-4">
                  <div>
                    <p className="text-sm font-black text-white leading-none">Rider-0{r}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Active • {r * 3} mins ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}