import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  description?: string;
  specifications?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (product: Product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    } else {
      return {
        items: [...state.items, { ...product, quantity: 1 }]
      };
    }
  }),
  
  removeItem: (productId: number) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),
  
  updateQuantity: (productId: number, quantity: number) => set((state) => {
    if (quantity <= 0) {
      return {
        items: state.items.filter(item => item.id !== productId)
      };
    }
    return {
      items: state.items.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    };
  }),
  
  clearCart: () => set({ items: [] }),
  
  getTotalItems: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    const state = get();
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('R$ ', '').replace('.', '').replace(',', '.'));
      return total + (price * item.quantity);
    }, 0);
  }
}));