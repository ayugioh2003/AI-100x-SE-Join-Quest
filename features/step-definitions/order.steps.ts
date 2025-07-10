import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { OrderService } from '../../src/OrderService';
import { OrderItem } from '../../src/OrderItem';
import { Product } from '../../src/Product';
import { Order } from '../../src/Order';

let orderService: OrderService;
let orderItems: OrderItem[];
let result: Order;
let thresholdDiscount: { threshold: number; discount: number } | null = null;
let buyOneGetOneActive: boolean = false;

Given('no promotions are applied', function () {
  // console.log('Given: no promotions are applied')
  orderService = new OrderService();
  orderItems = [];
  thresholdDiscount = null;
  buyOneGetOneActive = false;
});

Given('the threshold discount promotion is configured:', function (dataTable) {
  // console.log('Given: the threshold discount promotion is configured:');
  const config = dataTable.hashes()[0];
  thresholdDiscount = {
    threshold: parseInt(config.threshold),
    discount: parseInt(config.discount)
  };
  if (!orderService) {
    orderService = new OrderService();
  }
  orderItems = [];
});

Given('the buy one get one promotion for cosmetics is active', function () {
  // console.log('Given: the buy one get one promotion for cosmetics is active');
  buyOneGetOneActive = true;
  if (!orderService) {
    orderService = new OrderService();
  }
  orderItems = [];
});

When('a customer places an order with:', function (dataTable) {
  // console.log('When: a customer places an order with:');
  const rows = dataTable.hashes();
  orderItems = rows.map((row: any) => {
    const product = new Product(row.productName, parseInt(row.unitPrice), row.category || 'default');
    return new OrderItem(product, parseInt(row.quantity));
  });
  result = orderService.checkout(orderItems, thresholdDiscount, buyOneGetOneActive);
});

Then('the order summary should be:', function (dataTable) {
  // console.log('Then: the order summary should be:');
  const expectedData = dataTable.hashes()[0];
  if (expectedData.totalAmount) {
    expect(result.totalAmount).to.equal(parseInt(expectedData.totalAmount));
  }
  if (expectedData.originalAmount) {
    expect(result.originalAmount).to.equal(parseInt(expectedData.originalAmount));
  }
  if (expectedData.discount) {
    expect(result.discount).to.equal(parseInt(expectedData.discount));
  }
});

Then('the customer should receive:', function (dataTable) {
  // console.log('Then: the customer should receive:');
  const expectedItems = dataTable.hashes();
  expectedItems.forEach((expectedItem: any) => {
    const actualItem = result.items.find(item => item.product.name === expectedItem.productName);
    expect(actualItem).to.not.be.undefined;
    expect(actualItem!.quantity).to.equal(parseInt(expectedItem.quantity));
  });
});