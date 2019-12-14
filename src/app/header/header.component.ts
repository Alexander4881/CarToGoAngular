import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  //login menu
  @ViewChild('loginMenuBtn', { static: false }) loginMenuBtn: HTMLElement;
  @ViewChild('loginMenuTpl', { static: false }) loginMenuTpl: TemplateRef<any>;

  overlayRef2: OverlayRef;
  title = 'cartogo';

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
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
