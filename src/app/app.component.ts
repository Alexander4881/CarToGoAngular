import {Component,  ViewChild,  TemplateRef,  ViewContainerRef} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  styles: [`
    .menu {
      margin: 0;
      padding: 6px 10px;
      list-style: none;
      border: 1px solid #ccc;
      z-index: 99;
    }
  `]
})
export class AppComponent {
  @ViewChild('createMenuBtn', { static: false }) createMenuBtn: HTMLElement;
  @ViewChild('menuTpl', { static: false }) menuTpl: TemplateRef<any>;
  //login menu
  @ViewChild('loginMenuBtn', { static: false }) loginMenuBtn: HTMLElement;
  @ViewChild('loginMenuTpl', { static: false }) loginMenuTpl: TemplateRef<any>;

  overlayRef: OverlayRef;
  overlayRef2: OverlayRef;
  title = 'cartogo';


  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) { }

  createMenu() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
    }
    const strategy = this.overlay.position()
      .flexibleConnectedTo(this.createMenuBtn).withPositions([{
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
      }]);
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: strategy
    });

    this.overlayRef.attach(new TemplatePortal(this.menuTpl, this.viewContainerRef));  
    this.overlayRef.backdropClick().subscribe( () => this.overlayRef.detach());
    //this.overlayRef.backdropClick().subscribe(() => console.log('abcd'));


  }

  createLoginMenu() {
    if (this.overlayRef2 && this.overlayRef2.hasAttached()) {
      this.overlayRef2.dispose();
    }
    const strategy = this.overlay.position()
      .flexibleConnectedTo(this.loginMenuBtn).withPositions([{
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
      }]);
    this.overlayRef2 = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: strategy
    });

    this.overlayRef2.attach(new TemplatePortal(this.loginMenuTpl, this.viewContainerRef));
    this.overlayRef2.backdropClick().subscribe(() => this.overlayRef2.detach());    

  }

}
