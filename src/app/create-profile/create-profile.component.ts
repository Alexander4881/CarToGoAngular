import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Customer } from '../interface/customer';
import { CustomersService } from '../service/customers.service';

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
    retypePassword: new FormControl('')
  });
  get email() { return this.firstFormGroup.get('email'); }

  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  
  constructor(private httpClient: HttpClient, private _formBuilder: FormBuilder, private customersService: CustomersService) { }
  
  ngOnInit() {
    //this.firstFormGroup = this._formBuilder.group({ firstCtrl: ['', Validators.required] });
    this.secondFormGroup = this._formBuilder.group({ secondCtrl: ['', Validators.required] });
    this.thirdFormGroup = this._formBuilder.group({ thirdCtrl: ['', Validators.required] });
    console.log('hello world');
    //this.httpClient.get<any>('https://127.0.0.1:5001/custome/').subscribe(data => {
    //  console.log('get data');
    //  console.log(data);
    //});
  }

  addtest() {
    
    let email = this.firstFormGroup.get('email').value;
    let sex = true; //this.firstFormGroup.get('sex').value;
    let firstName = this.firstFormGroup.get('firstName').value;
    let aftertName = this.firstFormGroup.get('aftertName').value;
    let address = this.firstFormGroup.get('address').value;
    let bod = this.firstFormGroup.get('bod').value;
    let password = this.firstFormGroup.get('password').value;

    //let newCustomer: Customer = new Customer();

    const newCustomer: Customer = { id: 0, email: email, sex: sex, password: password, firstName: firstName, aftertName: aftertName, address: address, phoneNumber: '', bithDate: bod };

    this.customersService.addCustomer(newCustomer).subscribe(data => console.log(data));

    console.log('hello world 12:');
    console.log(newCustomer);
  }

}
