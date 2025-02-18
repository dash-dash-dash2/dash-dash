export type OrderStatus = 
  | 'PENDING'
  | 'ACCEPTED' 
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'PICKED_UP'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  id: number;
  menuId: number;
  quantity: number;
  menu: {
    id: number;
    name: string;
    price: number;
  };
}

export interface RestaurantOrder {
  id: number;
  status: OrderStatus;
  totalAmount: number;
  user: {
    id: number;
    name: string;
    address: string;
    phone: string;
  };
  restaurant: {
    id: number;
    name: string;
  };
  orderItems: OrderItem[];
  createdAt: string;
} 