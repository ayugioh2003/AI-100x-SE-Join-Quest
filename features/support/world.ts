import { World, setWorldConstructor } from '@cucumber/cucumber';
import { OrderService } from '../../src/OrderService';
import { OrderItem } from '../../src/OrderItem';
import { Order } from '../../src/Order';

export interface ICustomWorld extends World {
  orderService: OrderService;
  orderItems: OrderItem[];
  result: Order;
  thresholdDiscount: { threshold: number; discount: number } | null;
  buyOneGetOneActive: boolean;
  doubleElevenActive: boolean;
}

export class CustomWorld extends World implements ICustomWorld {
  orderService!: OrderService;
  orderItems!: OrderItem[];
  result!: Order;
  thresholdDiscount: { threshold: number; discount: number } | null = null;
  buyOneGetOneActive: boolean = false;
  doubleElevenActive: boolean = false;
}

setWorldConstructor(CustomWorld);