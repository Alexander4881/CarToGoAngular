import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help-detail',
  templateUrl: './help-detail.component.html',
  styleUrls: ['./help-detail.component.less']
})
export class HelpDetailComponent implements OnInit {
  @Input() indexHelpRef: number;

  constructor() { }

  ngOnInit() {
  }

}
