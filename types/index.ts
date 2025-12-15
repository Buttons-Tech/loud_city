// types/index.ts

export interface Product {
  id: number;
  name: string;
  category: 'Strain' | 'Accessory';
  price: number;
  unit: string; // e.g., 'per gram' or 'each'
  description: string;
  imageUrl: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Sour Diesel',
    category: 'Strain',
    price: 18.00,
    unit: 'per gram',
    description: 'Energetic Sativa. Great for socializing and creativity.',
    imageUrl: '/images/sour_diesel.jpg', // Replace with a real path/URL
  },
  {
    id: 2,
    name: 'Granddaddy Purp',
    category: 'Strain',
    price: 16.50,
    unit: 'per gram',
    description: 'Relaxing Indica. Ideal for winding down and sleep.',
    imageUrl: '/images/gdp.jpg',
  },
  {
    id: 3,
    name: 'King Size Roller',
    category: 'Accessory',
    price: 12.99,
    unit: 'each',
    description: 'High-quality acrylic roller for perfect joints.',
    imageUrl: '/images/roller.jpg',
  },
  {
    id: 4,
    name: '4-Piece Grinder',
    category: 'Accessory',
    price: 24.50,
    unit: 'each',
    description: 'Aluminum alloy grinder with kief catcher.',
    imageUrl: '/images/grinder.jpg',
  },
];