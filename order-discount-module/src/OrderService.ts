import { Order } from './Order';
import { OrderItem } from './OrderItem';

export class OrderService {
  checkout(items: OrderItem[], thresholdDiscount?: { threshold: number; discount: number } | null, buyOneGetOneActive?: boolean, doubleElevenActive?: boolean): Order {
    const originalAmount = items.reduce((sum, item) => sum + (item.product.unitPrice * item.quantity), 0);
    
    let discount = 0;
    
    // Apply Double Eleven bulk discount
    if (doubleElevenActive) {
      items.forEach(item => {
        const bulkSets = Math.floor(item.quantity / 10);
        if (bulkSets > 0) {
          // 20% discount for each set of 10 items
          discount += bulkSets * 10 * item.product.unitPrice * 0.2;
        }
      });
    }
    
    // Apply threshold discount
    if (thresholdDiscount && originalAmount >= thresholdDiscount.threshold) {
      discount += thresholdDiscount.discount;
    }
    
    const totalAmount = originalAmount - discount;
    
    const resultItems = items.map(item => {
      if (buyOneGetOneActive && item.product.category === 'cosmetics') {
        return new OrderItem(item.product, item.quantity + 1);
      }
      return item;
    });
    
    return new Order(totalAmount, originalAmount, discount, resultItems);
  }
}