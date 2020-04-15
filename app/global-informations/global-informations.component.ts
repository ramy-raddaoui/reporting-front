import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select'; 
import {MatInputModule} from '@angular/material/input'; 


@Component({
  selector: 'app-global-informations',
  templateUrl: './global-informations.component.html',
  styleUrls: ['./global-informations.component.css']
})
export class GlobalInformationsComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  recipients=['Acheteur Gestionnaire', 'Assistant de marché', 'Assistant mobilité', 'Chef de département direct']
  DaysList= ['1', '2', '3', '4', '5', '6'];
  excepts=['hamoud sidi bouna','sidi ahmed salem','ahmed salem michri','mohamed sidi gh']
  selectedDays;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
    //  'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'reportname': [null, Validators.required],
      'greport': [null],
      'reportdesc': [null, Validators.required],
      'days': [null, Validators.required],
      'recipients':[null, Validators.required],
      'excepts':[null, Validators.required],
      'email':[null,[Validators.email]]

     
    });
  }




  onSubmit(post) {
    this.post = post;
    console.log(post)
  }

  
}
