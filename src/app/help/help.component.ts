import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.less'],
  styles: [`
    ::ng-deep .specific-class > .mat-expansion-indicator:after {
      color: #3F51B5;
    }
  `],
})
export class HelpComponent implements OnInit {
  indexHelpRef: number = 0;
  constructor() { }

  ngOnInit() {
  }

  showHelpDetail(indexHelpRef: number) {
    this.indexHelpRef = indexHelpRef;
    console.log('help');
  }

}
