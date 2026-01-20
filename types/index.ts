export interface Vendor {
  name: string;
  image: string;
  location?: string; // For the pickup point
  active?: boolean;
}

export interface Variant {
  id: string;
  label: string;       // e.g., "Cana"
  variantName: string; // e.g., "Cana Premium"
  basePrice: number;   // e.g., 9000
  img: string;
}

export interface Product {
  id: string;
  name: string;
  isTea: boolean;
  vendor: Vendor;
  variants: Variant[];
}

export interface Order {
  id: string;
  productName: string;
  variantLabel: string; // "Cana" or "Scott"
  weight: number;
  totalPrice: number;
  status: 'pending' | 'paid' | 'dispatched' | 'completed';
  customerLocation: string;
  createdAt: string;
  opayReference?: string;
}