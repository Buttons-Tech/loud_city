// app/page.tsx
'use client'; 

import React, { useState, useMemo } from 'react';
import { Product, mockProducts } from '../types'; 
import { ProductCard } from '../app/components/ProductCard';

interface OrderItem extends Product {
  quantity: number;
}

// Define possible filters for the UI
type FilterCategory = 'All' | 'Strain' | 'Accessory';

export default function LoudCity() {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [roomNumber, setRoomNumber] = useState('');
  // ⭐️ NEW STATE: To track the currently selected filter
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('All');
  
  // ⭐️ MODIFIED: Filter products based on the selected category
  const filteredProducts = useMemo(() => {
    if (categoryFilter === 'All') {
      return mockProducts;
    }
    return mockProducts.filter(p => p.category === categoryFilter);
  }, [categoryFilter]);
  
  // ... (handleAddToOrder, handleRemoveItem, subtotal, and placeOrder remain the same)

  // 1. Order Management (UNMODIFIED)
  const handleAddToOrder = (product: Product) => {
    // ... (logic remains the same)
    setOrder(prevOrder => {
      const existingItem = prevOrder.find(item => item.id === product.id);
      if (existingItem) {
        return prevOrder.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevOrder, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveItem = (id: number) => {
    setOrder(prevOrder => prevOrder.filter(item => item.id !== id));
  };

  // 2. Calculations (UNMODIFIED)
  const subtotal = useMemo(() => {
    return order.reduce((sum, item) => item.price * item.quantity + sum, 0);
  }, [order]);
  
  // 3. WhatsApp Generation and Redirect (UNMODIFIED)
  const placeOrder = () => {
    // ... (logic remains the same)
    if (order.length === 0) {
        alert("Your order is empty! Please add items before placing an order.");
        return;
    }
    if (!roomNumber.trim()) {
        alert("Please enter your Room Number to proceed with the delivery.");
        return;
    }
    // ... (rest of the order formatting and WhatsApp redirect logic)
    const orderDetails = order
      .map(item => `${item.quantity} x ${item.name} ($${(item.price * item.quantity).toFixed(2)})`)
      .join('\n');

    const message = `🌿 Loud City Order 🌿\n\nRoom Number: *${roomNumber}*\n\n--- Items ---\n${orderDetails}\n\nTOTAL: *$${subtotal.toFixed(2)}*\n\nPlease confirm delivery.`;
    
    const phoneNumber = '09066596603'; 
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank'); 
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <title>Loud City | Premium Delivery</title>

      <main className="container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* --- LEFT COLUMN: Products Listing --- */}
        <div className="lg:col-span-3">
          <header className="mb-8">
            <h1 className="text-5xl font-extrabold text-green-700 tracking-tight">🌿 Loud City</h1>
            <p className="text-xl text-gray-600 mt-2">Welcome! Select your smoke and accessories below.</p>
          </header>

          {/* Spotify Embed Placeholder (UNMODIFIED) */}
          <div className="p-4 bg-gray-200 rounded-lg mb-8 border-l-4 border-l-green-600">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🔊 Vibe Check (Spotify)</h2>
            <p className="text-sm text-gray-600">The shared playlist integration will show here for subscribers!</p>
          </div>
          
          {/* ⭐️ NEW: Category Selector */}
          <div className="flex space-x-4 mb-8 p-3 bg-white rounded-xl shadow-md border border-gray-100">
            {(['All', 'Strain', 'Accessory'] as FilterCategory[]).map(category => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`
                  px-6 py-2 rounded-full font-semibold transition-all duration-200
                  ${categoryFilter === category 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {category === 'Strain' && '🍁 Strains'}
                {category === 'Accessory' && '⚙️ Accessories'}
                {category === 'All' && '🛍️ All Products'}
              </button>
            ))}
          </div>
          
          {/* ⭐️ MODIFIED: Use filteredProducts here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToOrder={handleAddToOrder} />
            ))}
            {filteredProducts.length === 0 && (
                <div className="md:col-span-2 text-center py-10 text-gray-500 text-xl italic">
                    No products found in the "{categoryFilter}" category.
                </div>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: Order Summary (UNMODIFIED) --- */}
        <aside className="lg:col-span-1 sticky top-8 h-fit">
            {/* ... (Order Summary JSX remains the same) ... */}
            <div className="bg-white border border-green-200 rounded-xl p-6 shadow-xl">
                <h2 className="text-3xl font-bold text-green-800 mb-4">🛒 Your Order</h2>
                
                {/* Room Number Input */}
                <div className="mb-4">
                <label htmlFor="room" className="block text-sm font-medium text-gray-700">Room Number</label>
                <input
                    id="room"
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    placeholder="E.g., 305"
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-green-500 focus:ring-green-500"
                />
                </div>

                {/* Order List */}
                <div className="space-y-3 mb-6">
                {order.length === 0 ? (
                    <p className="text-gray-500 italic text-center py-4">Nothing in the cart yet. Start selecting!</p>
                ) : (
                    order.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2">
                        <span className="font-medium text-gray-700 truncate">{item.name}</span>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)} ({item.quantity})</span>
                            <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-red-500 hover:text-red-700 transition duration-150 font-bold text-lg leading-none"
                                title="Remove item"
                            >
                            ×
                            </button>
                        </div>
                    </div>
                    ))
                )}
                </div>

                {/* Total & Order Button */}
                <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <button
                    onClick={placeOrder}
                    disabled={order.length === 0 || !roomNumber.trim()}
                    className={`w-full py-3 rounded-xl font-extrabold text-white transition duration-300 ${
                    order.length > 0 && roomNumber.trim()
                        ? 'bg-red-600 hover:bg-red-700 transform hover:scale-[1.01]'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    📱 Send Order via WhatsApp
                </button>
                </div>
            </div>
        </aside>

      </main>
    </div>
  );
}