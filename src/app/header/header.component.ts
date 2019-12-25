import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomersService } from '../service/customers.service';
import { Customer, LoginAuthentication } from '../interface/customer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  isLoginFailed: boolean = false;
  isLoginSuccess: boolean = false;
  currentCustomer: Customer;
  //login menu
  @ViewChild('loginMenuBtn', { static: true }) loginMenuBtn: HTMLElement;
  @ViewChild('loginMenuTpl', { static: true }) loginMenuTpl: TemplateRef<any>;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  overlayRef2: OverlayRef;
  title = 'cartogo';

  constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef, private customersService: CustomersService) { }

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

  login() {
    
    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;
    const newLogin: LoginAuthentication = { email: email, passWord: password };
    this.customersService.loginCustomer(newLogin)
      .subscribe(data => {
        this.customersService.currentCustomer = data;
        if (!(this.customersService.currentCustomer === null)) {
          this.isLoginFailed = false;
          this.isLoginSuccess = true;
          this.currentCustomer = this.customersService.currentCustomer;
          console.log('success:');
          console.log(this.currentCustomer.id);
        } else {
          this.isLoginFailed = true;
          this.isLoginSuccess = false;
          console.log('Brugernavn eller adgangskode er forkert');
        }
      });
  }
}
