import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.less']
})
export class CreateProfileComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({ firstCtrl: ['', Validators.required] });
    this.secondFormGroup = this._formBuilder.group({ secondCtrl: ['', Validators.required] });
    this.thirdFormGroup = this._formBuilder.group({ thirdCtrl: ['', Validators.required] });
  }

}
