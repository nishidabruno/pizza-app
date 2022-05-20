export type PizzaResponse = {
  id: string;
  photo_url: string;
  pizza_name: string;
  description: string;
  photo_path: string;
  price_by_sizes: {
    s: string;
    r: string;
    l: string;
  }
}

export type OrderResponse = {
  id: string;
  amount: number;
  pizza_name: string;
  image_url: string;
  quantity: number;
  size: string;
  status: 'Pending' | 'Done' | 'Delivered';
  waiter_id: string;
  table_number: number;
}
