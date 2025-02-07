import { Component, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { } from "googlemaps";
import { Router } from '@angular/router'; 

import { CarService } from '../service/car.service';
import { CustomersService } from '../service/customers.service'
import { OrdercarService } from '../service/ordercar.service'
import { Car } from '../interface/car';
import { OrderCar, ReserverCar } from '../interface/order-car'


export interface DialogData {
  carRefId: number;
  name: string;
  currentCar: Car
}

@Component({
  selector: 'app-reserve-car',
  templateUrl: './reserve-car.component.html',
  styleUrls: ['./reserve-car.component.less']
})
export class ReserveCarComponent implements AfterViewInit {
  map: google.maps.Map;
  //map: any;
  @ViewChild('mapWrapper', { static: false }) mapElement: ElementRef;

  ngAfterViewInit() {
    this.customersService.loginAvailable();
    this.carService.getAllCar().subscribe(data => {
      this.carService.allCars = data;
      this.initializeMap();
      console.log(this.carService.allCars);
    });
  }
  constructor(
    public dialog: MatDialog,
    private carService: CarService,
    private customersService: CustomersService) { }


  openDialog(currentCar: Car): void {
    const dialogRef = this.dialog.open(ShowCarDetailsDialog, {
      width: '300px',
      data: { name: 'car', carRefId: 0, currentCar: currentCar}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  initializeMap() {
    let collection = new Array();
    let markerCollection = new Array();


    collection[0] = new google.maps.LatLng(55.427645, 11.782827);
    collection[1] = new google.maps.LatLng(55.427879, 11.782961);
    collection[2] = new google.maps.LatLng(55.428322, 11.783165);
    collection[3] = new google.maps.LatLng(55.429193, 11.784560);
    collection[4] = new google.maps.LatLng(55.429169, 11.784925);
    

    //const lngLat = new google.maps.LatLng(6.5874964, 3.9886097);

    const mapOptions: google.maps.MapOptions = {
      center: collection[0],
      zoom: 16,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


    let infowindow = new google.maps.InfoWindow({
      content: "Hello World!"
    });

    let that = this;

    this.carService.allCars.forEach(function (value, index) {
      if (value.gpsCordinat !== null) {

        let carConrdinat = new google.maps.LatLng(value.gpsCordinat.latitude, value.gpsCordinat.longitude);

        markerCollection[index] = new google.maps.Marker({
          position: carConrdinat,
        });
        markerCollection[index].setMap(this.map);

        google.maps.event.addListener(markerCollection[index], 'click', function () {
          console.log('hello world2');
          that.openDialog(value);
        });

      }

    }, this);
    //return

    //collection.forEach(function (value,index) {
    //  console.log(index);
    //  markerCollection[index] = new google.maps.Marker({
    //    position: value,      
    //  });
    //  markerCollection[index].setMap(this.map);

    //  google.maps.event.addListener(markerCollection[index], 'click', function () {
    //    console.log('hello world2');
    //    that.openDialog(405);
    //    //infowindow.open(this.map, markerCollection[index]);
    //  });
   
    //},this); 


    //if ('geolocation' in navigator) {
    //  navigator.geolocation.getCurrentPosition(
    //    position => {
    //      let currentLatitude = parseFloat(position.coords.latitude.toFixed(6));
    //      let currentLongitude = parseFloat(position.coords.longitude.toFixed(6));

    //      myCurrentPosition = new google.maps.LatLng(currentLatitude, currentLongitude);

    //      let myCity = new google.maps.Circle({
    //        center: myCurrentPosition,
    //        radius: 50,
    //        strokeColor: "#0000FF",
    //        strokeOpacity: 0.8,
    //        strokeWeight: 2,
    //        fillColor: "#0000FF",
    //        fillOpacity: 0.4
    //      });
    //      myCity.setMap(this.map);

    //      console.log('latitude fulld:' + position.coords.latitude);
    //      console.log('latitude tofixed:' + position.coords.latitude.toFixed(6));
    //      console.log('longitude fulld:' + position.coords.longitude);
    //      console.log('longitude tofixed:' + position.coords.longitude.toFixed(6));
    //      console.log('Lat: {' + position.coords.latitude + '} Lng: {' + position.coords.longitude + '}');
    //    },
    //    err => alert('Error ({' + err.code + '}): {' + err.message + '}')
    //  );
    //} else {
    //  alert('Geolocation is not supported by your browser.');
    //}
    
    var amsterdam = new google.maps.LatLng(55.750635, 12.520223);

  }

}



@Component({
  selector: 'show-car-details-dialog',
  templateUrl: 'show-car-details-dialog.html',
  styleUrls: ['./reserve-car.component.less']
})

export class ShowCarDetailsDialog {
  isCarDetailsActive: boolean = true;
  isCarRreservedActive: boolean = false;
  pinkCode: string = '';
  validityDT: string = '';

  constructor(
    private router: Router,
    private customersService: CustomersService,
    private ordercarService: OrdercarService,
    public dialogRef: MatDialogRef<ShowCarDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  closeDialog(): void {
    console.log('is data:');
    console.log(this.data.currentCar);
    this.router.navigateByUrl("orderlist");
    this.dialogRef.close();    
  }

  createReserveCar(): void {

    if (this.customersService.currentCustomer) {

      let reserverCar: ReserverCar = { carID: this.data.currentCar.id, customerID: this.customersService.currentCustomer.id };

      this.ordercarService.createOrder(reserverCar).subscribe(data => {
        console.log('reservered:');
        console.log(data);
        this.isCarDetailsActive = false;
        this.isCarRreservedActive = true;
        this.pinkCode = data.pinkCode.toString();
        this.validityDT = data.validityDT.toString();
      });

    } 
  }

}

