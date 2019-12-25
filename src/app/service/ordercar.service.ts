import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

import { OrderCar, ReserverCar } from '../interface/order-car'

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

}
