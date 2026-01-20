import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import ProductCard from '@/app/components/ProductCard';
import MusicPlayer from '@/app/components/MusicPlayer';

const MOCK_PRODUCTS = [
  { 
    id: '1', 
    name: 'Tea Collection', 
    isTea: true, 
    vendor: { name: 'Green Leaf', image: 'https://i.pravatar.cc/150?u=green' }, 
    variants: [
      { id: 'v1', label: 'Tea A', variantName: 'Silver Needle White', basePrice: 150, img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80' },
      { id: 'v2', label: 'Tea B', variantName: 'Organic Oolong', basePrice: 120, img: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  { 
    id: '2', 
    name: 'Studio Monitor Pro', 
    basePrice: 45000, 
    isTea: false, 
    vendor: { name: 'Sonic Hub', image: 'https://i.pravatar.cc/150?u=sonic' }, 
    img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80' 
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen pb-32">
      <Header />
      <main className="max-w-screen-xl mx-auto px-4">
        <Hero />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {MOCK_PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
      <MusicPlayer />
    </div>
  );
}