import { Component, OnInit, Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdercarService } from '../service/ordercar.service';
import { CustomersService } from '../service/customers.service';
import { OrderCar, CheckOutOrder } from '../interface/order-car';
import { Router, NavigationEnd } from '@angular/router'; 


export interface DeliverCarDialogData {
  name: string;
  currentOrderCar: OrderCar;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.less']
})
export class OrderListComponent implements OnInit, OnDestroy {
  ordersDataSource = new MatTableDataSource<OrderCar>();
  isLoading: boolean = true;
  orderListRouteSubscription: any;

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private ordercarService: OrdercarService,
    private customersService: CustomersService,
    private router: Router) {

    //this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //  return false;
    //};
    this.orderListRouteSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });

  }

  ngOnDestroy() {
    if (this.orderListRouteSubscription) {
      this.orderListRouteSubscription.unsubscribe();
    }
  }

  openDialog(currentOrderCar: OrderCar): void {
    const dialogRef = this.dialog.open(ShowDeliverCarDialog, {
      width: '300px',
      data: { name: 'trypayment', currentOrderCar: currentOrderCar }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  ngOnInit() {
    this.customersService.loginAvailable();

    //this.httpClient.get<any>('https://jsonplaceholder.typicode.com/albums').subscribe(data => {
    //  this.ordersDataSource.data = data;
    //  this.isLoading = false;
    //})

    if (this.customersService.currentCustomer)
    {
      this.ordercarService.getOrderByCustomer(this.customersService.currentCustomer.id).subscribe(data => {
        console.log('get ordercar');
        console.log(data);
        this.ordersDataSource.data = data;
        this.isLoading = false;
      });
    }
    console.log('i comme 123');

    this.httpClient.get<any>('/assets/testdatasource.json').subscribe(data => {
      //this.ordersDataSource.data = data;
      //this.isLoading = false;
    })

    //this.httpClient.get<any>('https://jsonplaceholder.typicode.com/todos').subscribe(data => { this.ordersDataSource.data = data })

  }

}

@Component({
  selector: 'show-deliver-car-dialog',
  templateUrl: './show-deliver-car-dialog.html',
  styleUrls: ['./order-list.component.less']
})
export class ShowDeliverCarDialog {

  constructor(
    public dialogRef: MatDialogRef<boolean>,
    @Inject(MAT_DIALOG_DATA) public data: DeliverCarDialogData,
    private ordercarService: OrdercarService,
    private customersService: CustomersService,
    private router: Router)
  { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  checkoutDialog(): void {
    //checkoutOrderByOrderIdAndCustomerId
    let checkoutOutOrder: CheckOutOrder = { customerID: this.customersService.currentCustomer.id, orderCarID: this.data.currentOrderCar.id }
    this.ordercarService.checkoutOrderByOrderIdAndCustomerId(checkoutOutOrder)
      .subscribe(data => {
        console.log('checkout order:');
        console.log(data);
        this.dialogRef.close();
        this.router.navigateByUrl("orderlist");
      });
  }

}
