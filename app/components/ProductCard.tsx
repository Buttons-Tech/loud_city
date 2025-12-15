// components/ProductCard.tsx
import React from 'react';
import Image from 'next/image';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToOrder: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToOrder }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
      
      {/* Placeholder Image (Use next/image for real images) */}
      <div className="relative w-full h-40">
    <Image 
        src={product.imageUrl} 
        alt={product.name} 
        // ⭐️ New Prop: Use 'fill' instead of layout="fill"
        fill 
        // ⭐️ New Prop: Use CSS class 'object-cover' instead of objectFit="cover"
        className="object-cover rounded-t-xl"
        sizes="(max-width: 768px) 100vw, 33vw" // Recommended for performance
    />
</div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
        <p className={`text-sm font-semibold mt-1 ${product.category === 'Smoke' ? 'text-green-600' : 'text-indigo-600'}`}>
          {product.category}
        </p>
        <p className="text-2xl font-extrabold text-gray-800 mt-2">
          ${product.price.toFixed(2)} 
          <span className="text-sm font-normal text-gray-500 ml-1">/{product.unit}</span>
        </p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
        
        <button
          onClick={() => onAddToOrder(product)}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
        >
          ➕ Add to Order
        </button>
      </div>
    </div>
  );
};