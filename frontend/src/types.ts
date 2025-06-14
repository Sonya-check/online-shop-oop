// frontend/src/types.ts

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
}

export interface CartItem {
  id: number;
  userId: number;
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  total: number;
  createdAt: string;   // будем хранить даты как строки (ISO)
  updatedAt: string;
  orderItems: OrderItem[];
}