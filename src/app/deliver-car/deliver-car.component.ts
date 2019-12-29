import { Component, OnInit, Input } from '@angular/core';
import { OrderCar, TryPayment } from '../interface/order-car'
import { OrdercarService } from '../service/ordercar.service'

@Component({
  selector: 'app-deliver-car',
  templateUrl: './deliver-car.component.html',
  styleUrls: ['./deliver-car.component.less']
})
export class DeliverCarComponent implements OnInit {
  @Input() currentOrderCar: OrderCar;
  tryPayMent: TryPayment = { endDT: null, total: 0 };

  constructor(private ordercarService: OrdercarService, ) { }

  ngOnInit()
  {
    this.ordercarService.getTryPayMentByOrderId(this.currentOrderCar.id)
      .subscribe(data => {
        console.log('trypayment:');
        console.log(data);
        this.tryPayMent = data;
      });
    console.log('show current ordercar:');
    console.log(this.currentOrderCar);
  }

}
