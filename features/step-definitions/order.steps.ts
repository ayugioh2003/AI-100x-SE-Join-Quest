import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { OrderService } from '../../src/OrderService';
import { OrderItem } from '../../src/OrderItem';
import { Product } from '../../src/Product';
import { ICustomWorld } from '../support/world';

Given('no promotions are applied', function (this: ICustomWorld) {
  this.orderService = new OrderService();
  this.orderItems = [];
  this.thresholdDiscount = null;
  this.buyOneGetOneActive = false;
  this.doubleElevenActive = false;
});

Given('the threshold discount promotion is configured:', function (this: ICustomWorld, dataTable) {
  const config = dataTable.hashes()[0];
  this.thresholdDiscount = {
    threshold: parseInt(config.threshold),
    discount: parseInt(config.discount)
  };
  if (!this.orderService) {
    this.orderService = new OrderService();
  }
  this.orderItems = [];
});

Given('the buy one get one promotion for cosmetics is active', function (this: ICustomWorld) {
  this.buyOneGetOneActive = true;
  if (!this.orderService) {
    this.orderService = new OrderService();
  }
  this.orderItems = [];
});

When('a customer places an order with:', function (this: ICustomWorld, dataTable) {
  const rows = dataTable.hashes();
  this.orderItems = rows.map((row: any) => {
    const product = new Product(row.productName, parseInt(row.unitPrice), row.category || 'default');
    return new OrderItem(product, parseInt(row.quantity));
  });
  this.result = this.orderService.checkout(this.orderItems, this.thresholdDiscount, this.buyOneGetOneActive, this.doubleElevenActive);
});

Then('the order summary should be:', function (this: ICustomWorld, dataTable) {
  const expectedData = dataTable.hashes()[0];
  if (expectedData.totalAmount) {
    expect(this.result.totalAmount).to.equal(parseInt(expectedData.totalAmount));
  }
  if (expectedData.originalAmount) {
    expect(this.result.originalAmount).to.equal(parseInt(expectedData.originalAmount));
  }
  if (expectedData.discount) {
    expect(this.result.discount).to.equal(parseInt(expectedData.discount));
  }
});

Then('the customer should receive:', function (this: ICustomWorld, dataTable) {
  const expectedItems = dataTable.hashes();
  expectedItems.forEach((expectedItem: any) => {
    const actualItem = this.result.items.find(item => item.product.name === expectedItem.productName);
    expect(actualItem).to.not.be.undefined;
    expect(actualItem!.quantity).to.equal(parseInt(expectedItem.quantity));
  });
});