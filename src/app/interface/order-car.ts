import { Car } from '../interface/car';
import { Customer } from '../interface/customer';

export interface OrderCar {
  id?: number;
  orderNumber: string;
  status: number;
  createDT: string;
  starteDT: string;
  dndDT: string;
  validityDT: string;
  pinkCode: string;
  qrCode: string;
  drivenKM: number;
  total: number;
  customer: Customer;
  car: Car;
}
export interface ReserverCar {
  customerID: number;
  carID: number;
}

export interface TryPayment {
  endDT: string;
  total: number;
}

export interface CheckOutOrder {
  orderCarID: number;
  customerID: number;
}
