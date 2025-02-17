export interface Restaurant {
  id: number;
  name: string;
  address: string;
  imageUrl?: string;
  ratings?: Rating[];
  categories?: Category[];
}

export interface Rating {
  id: number;
  rating: number;
  comment: string;
  userId: number;
  restaurantId: number;
  createdAt: string;
  user: {
    name: string;
  };
}

export interface Category {
  id: number;
  name: string;
  cuisineType: string;
  location: string;
  imageUrl: string;
  rating: number;
  deliveryTime: string;
  minimumOrder: number;
  deliveryCost: number;
  isOpen: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
  menus: Menu[];
}

export interface Menu {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  restaurantId: number;
  restaurantName?: string;
}

export type OrderStatus = 
  | 'PENDING'
  | 'ACCEPTED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'PICKED_UP'
  | 'DELIVERING'
  | 'DELIVERED'
  | 'CANCELLED';

export interface RestaurantOrder {
  id: number;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  restaurant: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    name: string;
    address: string;
    phone: string;
  };
  orderItems: Array<{
    id: number;
    quantity: number;
    menu: Menu;
  }>;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  restaurantId: number;
  supplements: Supplement[];
}

export interface Order {
  id: number;
  userId: number;
  restaurantId: number;
  status: OrderStatus;
  totalAmount: number;
  deliveryCost: number;
  orderItems: OrderItem[];
  restaurant: Restaurant;
  deliveryman?: {
    id: number;
    user: {
      name: string;
      phone: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  menuId: number;
  quantity: number;
  price: number;
  menu: Menu;
  supplements?: Supplement[];
}

export interface Supplement {
  id: number;
  name: string;
  price: number;
}


export type OrderStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Review {
  id: number;
  score: number;
  comment: string;
  user: {
    name: string;
  };
  createdAt: string;
} 