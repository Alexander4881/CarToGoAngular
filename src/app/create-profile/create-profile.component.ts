import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

import { Customer, DriversLicens, CreditCard, LoginAuthentication } from '../interface/customer';
import { CustomersService } from '../service/customers.service';
import { mastMatchValidator } from '../helper/form-validation';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.less']
})
export class CreateProfileComponent implements OnInit {

  firstFormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    sex: new FormControl(''),
    firstName: new FormControl(''),
    aftertName: new FormControl(''),
    address: new FormControl(''),
    bod: new FormControl(''),
    password: new FormControl(''),
    retypePassword: new FormControl(''),
  }, { validators: mastMatchValidator('password', 'retypePassword')});
  //firstFormGroup
  
  get email() { return this.firstFormGroup.get('email'); }  
  get firstName() { return this.firstFormGroup.get('firstName'); }
  get retypePassword() { return this.firstFormGroup.get('retypePassword');}  

  secondFormGroup = new FormGroup({
    driversLicensNumber: new FormControl(''),
    country: new FormControl(''),
    validityDate: new FormControl(''),
    expiryDate: new FormControl(''),
  });
  thirdFormGroup = new FormGroup({
    creditCardNumber: new FormControl(''),
    creditCardHolder: new FormControl(''),
    expiryDateMonth: new FormControl(''),
    expiryDateYear: new FormControl(''),
    ccv: new FormControl('', Validators.maxLength(3)),
  });
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  isCreateProcessing: boolean = false;
  
  constructor(private httpClient: HttpClient, private _formBuilder: FormBuilder, private customersService: CustomersService, private router: Router) { }

  ngOnInit() {
    //this.firstFormGroup = this._formBuilder.group({ firstCtrl: ['', Validators.required] });
    //this.secondFormGroup = this._formBuilder.group({ secondCtrl: ['', Validators.required] });
    //this.thirdFormGroup = this._formBuilder.group({ thirdCtrl: ['', Validators.required] });
    console.log('hello world');
    //this.httpClient.get<any>('https://127.0.0.1:5001/custome/').subscribe(data => {
    //  console.log('get data');
    //  console.log(data);
    //});
  }

  addtest() {
    
    let email = this.firstFormGroup.get('email').value;
    let sex = this.firstFormGroup.get('sex').value === "1" ? true : false; //this.firstFormGroup.get('sex').value;
    let firstName = this.firstFormGroup.get('firstName').value;
    let aftertName = this.firstFormGroup.get('aftertName').value;
    let address = this.firstFormGroup.get('address').value;
    let bod = this.firstFormGroup.get('bod').value;
    bod = new Date(bod).getFullYear().toString() + '-' + (new Date(bod).getMonth() + 1).toString() + '-' + new Date(bod).getDate().toString();
    let password = this.firstFormGroup.get('password').value;

    let driversLicensNumber = this.secondFormGroup.get('driversLicensNumber').value;
    let country = this.secondFormGroup.get('country').value;
    let validityDate = this.secondFormGroup.get('validityDate').value;
    validityDate = new Date(validityDate).getFullYear().toString() + '-' + (new Date(validityDate).getMonth() + 1).toString() + '-' + new Date(validityDate).getDate().toString();
    let expiryDate = this.secondFormGroup.get('expiryDate').value;
    expiryDate = new Date(expiryDate).getFullYear().toString() + '-' + (new Date(expiryDate).getMonth() + 1).toString() + '-' + new Date(expiryDate).getDate().toString();

    let creditCardNumber = this.thirdFormGroup.get('creditCardNumber').value;
    let creditCardHolder= "";
    let creditCarDexpiryDate = this.thirdFormGroup.get('expiryDateYear').value + '-' + this.thirdFormGroup.get('expiryDateMonth').value + '-01';
    let ccv = this.thirdFormGroup.get('ccv').value;
    
    let driversLicens: DriversLicens = { driversLicensNumber: driversLicensNumber, country: country, validityDate: validityDate, expiryDate: expiryDate };
    let creditCard: CreditCard = { creditCardNumber: creditCardNumber, creditCardHolder: creditCardHolder, expiryDate: creditCarDexpiryDate, ccv: ccv}

    const newCustomer: Customer = { email: email, sex: sex, password: password, firstName: firstName, aftertName: aftertName, address: address, phoneNumber: '', bithDate: bod, driversLicens: driversLicens, creditCards: creditCard };
    console.log('before:');
    console.log(newCustomer);

    this.isCreateProcessing = true;
    this.customersService.addCustomer(newCustomer).subscribe(data => {
      console.log(data);
      this.isCreateProcessing = false;      
      this.router.navigateByUrl("/");
    });

  }

}
