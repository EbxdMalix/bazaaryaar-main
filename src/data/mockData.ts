import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'mobiles', name: 'Mobiles', icon: 'Smartphone', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80' },
  { id: 'laptops', name: 'Laptops', icon: 'Laptop', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80' },
  { id: 'audio', name: 'Audio', icon: 'Headphones', image: 'https://images.unsplash.com/photo-1546435770-a3e426ff4737?w=800&q=80' },
  { id: 'watches', name: 'Watches', icon: 'Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2', image: 'https://images.unsplash.com/photo-1621333100570-8402a4767aa4?w=800&q=80' },
  { id: 'appliances', name: 'Appliances', icon: 'Zap', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80' },
];

export const products: Product[] = [
  // MOBILES
  {
    id: '1',
    name: 'iPhone 15 Pro Max - 256GB Titanium Blue',
    price: 485000,
    originalPrice: 512000,
    discount: 5,
    category: 'mobiles',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
    description: 'A17 Pro chip. Aerospace-grade titanium design. The first-of-its-kind 5x Telephoto camera.',
    rating: 4.9, reviews: 128, isFeatured: true, stock: 12
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra - Titanium Black',
    price: 399000,
    originalPrice: 425000,
    discount: 6,
    category: 'mobiles',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1707323136270-207036a1656c?w=800&q=80',
    description: 'Galaxy AI is here. Search like never before, get real-time interpretation on a call.',
    rating: 4.8, reviews: 85, isFeatured: true, stock: 15
  },
  {
    id: 'm1',
    name: 'Google Pixel 8 Pro',
    price: 245000,
    category: 'mobiles',
    brand: 'Google',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80',
    description: 'The all-pro phone engineered by Google. It’s sleek, sophisticated, and has the best Pixel camera yet.',
    rating: 4.7, reviews: 45, stock: 8
  },
  
  // LAPTOPS
  {
    id: '3',
    name: 'MacBook Air M3 - 13.6-inch Starlight',
    price: 345000,
    originalPrice: 360000,
    discount: 4,
    category: 'laptops',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    description: 'Strikingly thin and fast so you can work, play, or create anywhere with the power of M3.',
    rating: 4.9, reviews: 56, isFeatured: true, stock: 8
  },
  {
    id: 'l1',
    name: 'Dell XPS 15 OLED',
    price: 520000,
    category: 'laptops',
    brand: 'Dell',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785bf67e45?w=800&q=80',
    description: 'Immerse yourself in content with bright, color-rich panels with high resolution.',
    rating: 4.6, reviews: 32, stock: 5
  },

  // AUDIO
  {
    id: '4',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    price: 85000,
    originalPrice: 95000,
    discount: 10,
    category: 'audio',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426ff4737?w=800&q=80',
    description: 'Industry-leading noise cancellation with two processors and eight microphones.',
    rating: 4.7, reviews: 210, isDeal: true, stock: 25
  },
  {
    id: 'a1',
    name: 'AirPods Pro (2nd Gen) USB-C',
    price: 68000,
    category: 'audio',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1588423770674-f2855ee82639?w=800&q=80',
    description: 'Rebuilt for even richer audio. Next-level Active Noise Cancellation and Adaptive Audio.',
    rating: 4.8, reviews: 450, stock: 40
  },

  // GAMING
  {
    id: 'g1',
    name: 'PlayStation 5 Slim Edition',
    price: 165000,
    category: 'gaming',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80',
    description: 'Deep immersion with support for haptic feedback, adaptive triggers, and 3D Audio technology.',
    rating: 4.9, reviews: 95, isFeatured: true, stock: 12
  },
  {
    id: 'g2',
    name: 'Nintendo Switch OLED Model',
    price: 95000,
    category: 'gaming',
    brand: 'Nintendo',
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&q=80',
    description: 'Vivid 7-inch OLED screen, a wide adjustable stand, and wired LAN port.',
    rating: 4.7, reviews: 64, stock: 18
  },

  // WATCHES
  {
    id: '5',
    name: 'Galaxy Watch 6 Classic 43mm',
    price: 65000,
    originalPrice: 72000,
    discount: 9,
    category: 'watches',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1508685096489-7aac291ba597?w=800&q=80',
    description: 'Classic style with modern innovation. Know your health better with Sleep Coaching.',
    rating: 4.6, reviews: 42, isDeal: true, stock: 10
  },
  {
    id: 'w1',
    name: 'Apple Watch Ultra 2 Titanium',
    price: 215000,
    category: 'watches',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1434493907317-a46b53b81882?w=800&q=80',
    description: 'The most rugged and capable Apple Watch ever. Designed for endurance and athletes.',
    rating: 4.9, reviews: 28, stock: 5
  },

  // APPLIANCES
  {
    id: 'h1',
    name: 'Dyson V15 Detect Vacuum',
    price: 185000,
    category: 'appliances',
    brand: 'Dyson',
    image: 'https://images.unsplash.com/photo-1558317751-bc3ed6f85f72?w=800&q=80',
    description: 'The most powerful, intelligent cordless vacuum. Laser reveals microscopic dust.',
    rating: 4.8, reviews: 15, stock: 4
  },
  {
    id: 'h2',
    name: 'Philips Air Fryer XXL',
    price: 58000,
    originalPrice: 65000,
    discount: 10,
    category: 'appliances',
    brand: 'Philips',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&q=80',
    description: 'The healthiest way to fry. Maximum taste, minimum fat. Extra large family size.',
    rating: 4.7, reviews: 88, isFeatured: true, stock: 20
  }
];
