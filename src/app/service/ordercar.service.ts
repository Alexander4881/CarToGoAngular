import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

import { OrderCar, ReserverCar, TryPayment, CheckOutOrder } from '../interface/order-car'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrdercarService {

  constructor(private http: HttpClient) { }

  /** POST: Create Order. */
  createOrder(reserverCar: ReserverCar): Observable<OrderCar> {
    return this.http.post<OrderCar>(environment.createOrder, reserverCar, httpOptions)
  }

  getOrderByCustomer(customerId: number): Observable<any> {
    let url: string = environment.getOrderByCustomer.replace('customerId', customerId.toString());
    return this.http.get<any>(url, httpOptions)
  }
  
  getTryPayMentByOrderId(orderCarId: number): Observable<TryPayment> {
    let url: string = environment.getTryPayMentByOrderId.replace('OrderCarId', orderCarId.toString());
    return this.http.get<TryPayment>(url, httpOptions)
  }

  checkoutOrderByOrderIdAndCustomerId(checkOutOrder: CheckOutOrder): Observable<OrderCar> {
    return this.http.post<OrderCar>(environment.checkoutOrderByOrderIdAndCustomerId, checkOutOrder, httpOptions)
  }

  getSecondsIntervalBetweenStartAndNow(orderCarId: number): Observable<number> {
    let url: string = environment.getSecondsIntervalBetweenStartAndNow.replace('OrderCarId', orderCarId.toString());
    console.log('url:');
    console.log(url);
    return this.http.get<number>(url, httpOptions)
  }

}
