import { Given } from '@cucumber/cucumber';
import { OrderService } from '../../src/OrderService';
import { ICustomWorld } from '../support/world';

Given('the Double Eleven promotion is active', function (this: ICustomWorld) {
  this.doubleElevenActive = true;
  this.orderService = new OrderService();
  this.orderItems = [];
  this.thresholdDiscount = null;
  this.buyOneGetOneActive = false;
});