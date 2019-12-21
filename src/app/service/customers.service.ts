import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Customer } from '../interface/customer';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customerUrl = 'https://localhost:5001/custome/';  // URL to web api
  

  constructor(private http: HttpClient) { }

  /** POST: add a new customer to the database */
  addCustomer(customer: Customer): Observable<any> {
    return this.http.post<Customer>(this.customerUrl, customer, httpOptions)
  }
}
