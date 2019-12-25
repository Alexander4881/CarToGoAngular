import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../interface/car'

@Component({
  selector: 'app-reserve-car-show-details',
  templateUrl: './reserve-car-show-details.component.html',
  styleUrls: ['./reserve-car-show-details.component.less']
})
export class ReserveCarShowDetailsComponent implements OnInit {
  @Input() currentCar: Car;

  constructor() { }

  ngOnInit() {
    console.log('show details:');
    console.log(this.currentCar);
  }

}
