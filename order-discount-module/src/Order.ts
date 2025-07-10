import { OrderItem } from './OrderItem';

export class Order {
  constructor(
    public totalAmount: number,
    public originalAmount: number,
    public discount: number,
    public items: OrderItem[]
  ) {}
}