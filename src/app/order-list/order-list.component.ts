import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DeliverCarDialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.less']
})
export class OrderListComponent implements OnInit {
  ordersDataSource = new MatTableDataSource<any>();
  isLoading: boolean = true;

  ordersTestDataSource = [
    { title: 'Hydrogen1'},
    { title: 'Hydrogen2' },
  ];

  constructor(private httpClient: HttpClient, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ShowDeliverCarDialog, {
      width: '300px',
      data: { name: 'abc', animal: 'abc' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  ngOnInit() {
    //this.httpClient.get<any>('https://jsonplaceholder.typicode.com/albums').subscribe(data => {
    //  this.ordersDataSource.data = data;
    //  this.isLoading = false;
    //})

    this.httpClient.get<any>('/assets/testdatasource.json').subscribe(data => {
      this.ordersDataSource.data = data;
      this.isLoading = false;
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
    @Inject(MAT_DIALOG_DATA) public data: DeliverCarDialogData) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
