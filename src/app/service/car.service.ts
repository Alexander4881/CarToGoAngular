import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

import { Car } from '../interface/car';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CarService {
  allCars: Car[];

  constructor(private http: HttpClient) { }

  /** GET: Get all car info. */
  getAllCar(): Observable<any> {
    return this.http.get<Car>(environment.getAllCarApi, httpOptions)
  }

}
