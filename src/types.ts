export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  brand: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  isFeatured?: boolean;
  isDeal?: boolean;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
