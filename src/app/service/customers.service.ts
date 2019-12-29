import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

import { Customer, LoginAuthentication } from '../interface/customer';
import { Router } from '@angular/router'; 

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
  currentCustomer: Customer ;

  constructor(private http: HttpClient, private router: Router) { }

  /** POST: add a new customer to the database */
  addCustomer(customer: Customer): Observable<any> {
    return this.http.post<Customer>(this.customerUrl, customer, httpOptions)
  }

  loginCustomer(loginMess: LoginAuthentication): Observable<any> {
    return this.http.post<Customer>(environment.loginApi, loginMess, httpOptions)
  }

  loginAvailable(): void {
    console.log(this.currentCustomer);
    if (!this.currentCustomer) {           
      this.router.navigateByUrl("/");
    }
  }

  logOut(): void {
    this.currentCustomer = null;
    console.log(this.currentCustomer);
    this.router.navigateByUrl("/");
  }

  isLoginSucces(): boolean {
    if (this.currentCustomer)
    { return true; }
    return false;
  }

}
