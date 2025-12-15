// types/index.ts

export interface Product {
  id: number;
  name: string;
  category: 'Smoke' | 'Accessory';
  price: number;
  unit: string; // e.g., 'per gram' or 'each'
  description: string;
  imageUrl: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Cana Diesel',
    category: 'Smoke',
    price: 9000.00,
    unit: 'per gram',
    description: 'Energetic Sativa. Great for socializing and creativity.',
    imageUrl: '/4.png', // Replace with a real path/URL
  },
  {
    id: 2,
    name: 'Scott Loud',
    category: 'Smoke',
    price: 3000.00,
    unit: 'per gram',
    description: 'Relaxing Indica. Ideal for winding down and sleep.',
    imageUrl: '/scott.webp',
  },
  {
    id: 3,
    name: 'King Size Roller',
    category: 'Accessory',
    price: 3000.99,
    unit: 'each',
    description: 'High-quality acrylic roller for perfect joints.',
    imageUrl: '/roller.jpg',
  },
  {
    id: 4,
    name: '4-Piece Grinder',
    category: 'Accessory',
    price: 2500.50,
    unit: 'each',
    description: 'Aluminum alloy grinder with kief catcher.',
    imageUrl: '/grinder.jpg',
  },
];