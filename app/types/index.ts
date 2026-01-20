export interface Vendor {
  name: string;
  image: string;
  location?: string;
  whatsapp?: string;
}

export interface Variant {
  id: string;
  label: string; // e.g., "Tea A"
  variantName: string; // e.g., "Silver Needle"
  basePrice: number;
  img: string;
}

export interface Product {
  id: string;
  name: string;
  isTea: boolean;
  vendor: Vendor;
  img?: string; // Optional if it has variants
  basePrice?: number; // Optional if it's a tea with variants
  variants?: Variant[];
}

export interface Order {
  id: string;
  productName: string;
  weight: number;
  totalPrice: number;
  busStop: string;
  status: 'pending' | 'dispatched' | 'delivered';
}