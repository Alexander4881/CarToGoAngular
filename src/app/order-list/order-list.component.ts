import { Component, OnInit, Injectable, Inject, OnDestroy, AfterViewInit, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdercarService } from '../service/ordercar.service';
import { CustomersService } from '../service/customers.service';
import { OrderCar, CheckOutOrder } from '../interface/order-car';
import { Router, NavigationEnd } from '@angular/router'; 
import { map } from 'rxjs/operators';


export interface DeliverCarDialogData {
  name: string;
  currentOrderCar: OrderCar;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.less']
})
export class OrderListComponent implements OnInit, OnDestroy, AfterViewInit {
  ordersDataSource = new MatTableDataSource<OrderCar>();
  isLoading: boolean = true;
  orderListRouteSubscription: any;
  secondsInterval = [];
  @ViewChildren("secondTimespan") secondTimespan: QueryList<ElementRef>;


  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private ordercarService: OrdercarService,
    private customersService: CustomersService,
    private router: Router,
    private el: ElementRef) {

    //this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //  return false;
    //};
    this.orderListRouteSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });

  }

  ngAfterViewInit() {    
    setInterval(() => {
      //this.showSecondsInterval(1);
      this.addSecondsInterval();
    }, 1000);
    
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

  showSecondsInterval(orderId: number): number {
    
    if (this.secondTimespan)
    {            
      if (this.secondTimespan.length > 0)
      {        

        this.secondTimespan.forEach(
          (div: ElementRef) => {
            let valStr = div.nativeElement.textContent;
            let valArr = valStr.split('|');
            let container = document.querySelector('.second-timespan-' + valArr[1]);
            let cumulative: number = Math.floor(Number(valArr[0])) + 1;
            console.log(cumulative);
            container.innerHTML = cumulative.toString();
            div.nativeElement.innerHTML = cumulative + "|" + valArr[1];
            console.log(valStr);
          }
        );
      }
    }            
    return orderId;    
  }

  getSecondsIntervalBetweenStartAndNow(refIndex: number): string {
    return this.secondsInterval[refIndex];
  }

  addSecondsInterval(): void {
    let that = this;
    this.secondsInterval.forEach(
      function (value, index) {
        that.secondsInterval[index] = value + 1;        
      },that)
  }

  secondFormatStr(secondVal: number): string {
    let h = Math.floor(secondVal / 3600);
    let m = Math.floor((secondVal / 60 % 60));
    let s = Math.floor((secondVal % 60));
    return h + ":" + m + ":" + s;
  }

  createSecondsIntervalBetweenStartAndNow(ordercars: OrderCar[]): void {

    let that = this;
    ordercars.forEach(function (value) {
      if (value.status == 2)
      {
        that.ordercarService.getSecondsIntervalBetweenStartAndNow(value.id)
        .subscribe(data => {
          that.secondsInterval[value.id] = data;
        });
      }
    },that); 

    //this.ordercarService.getSecondsIntervalBetweenStartAndNow(orderId)
    //  //.subscribe(data => {

    //  //  console.log(data);

    //  //})

    //  .pipe(map(data => {
    //  console.log('123');
    //  return data;
    //}))

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
        this.createSecondsIntervalBetweenStartAndNow(data);
        console.log('secondsInterval');
        console.log(this.secondsInterval);
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
