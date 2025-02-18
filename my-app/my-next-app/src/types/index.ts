export interface Restaurant {
  id: number;
  name: string;
  cuisineType: string;
  location: string;
  imageUrl?: string;
  ratings?: Rating[];
  address?: string;
  menus?: any[];
}

export interface Rating {
  id: number;
  score: number;
  comment: string;

  user: {
    name: string;
  };
  createdAt?: string;
}

export interface Category {
  id: number;
  name: string;
  address: string;
  imageUrl?: string;
  ratings?: Rating[];
  categories?: Category[];
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
  | 'CANCELLED'
  | 'CONFIRMED'
  | 'OUT_FOR_DELIVERY';

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
    price: number;
  }>;
  description: string;
  imageUrl?: string;
  restaurantId: number;
  supplements: Supplement[];
}

export interface Order {
  id: number;
  restaurant: {
    id: number;
    name: string;
  };
  status: OrderStatus;
  total: number;
  orderItems: Array<{
    id: number;
    quantity: number;
    price: number;
    menu: {
      id: number;
      name: string;
      price: number;
    };
  }>;
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



export interface Review {
  id: number;
  score: number;
  comment: string;
  user: {
    name: string;
  };
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  imageUrl?: string;
  deliverymanId?: number;
}