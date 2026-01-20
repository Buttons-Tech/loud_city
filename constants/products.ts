import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'solace-signature-001',
    name: 'Solace Signature',
    isTea: true,
    vendor: { name: 'Solace Official', image: '/logo.png' },
    variants: [
      { 
        id: 'v-cana', 
        label: 'Cana', 
        variantName: 'Cana Premium', 
        basePrice: 9000, 
        img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80' 
      },
      { 
        id: 'v-scott', 
        label: 'Scott', 
        variantName: 'Scott Blend', 
        basePrice: 3000, 
        img: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=800&q=80' 
      }
    ]
  }
];