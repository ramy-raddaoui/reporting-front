import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 

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
  selectedValueOfGReport: string;

  constructor(private formBuilder: FormBuilder) { }
  WeekDays=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
  MonthDays=[]
  ngOnInit() {
    for (let i=0;i<32;i++)
    this.MonthDays.push(i)
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
    //  'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'reportname': [null],
      'greport': [null],
      'reportdesc': [null],
      'recipients':[null],
      'excepts':[null],
      'gReportAdd':[null],
     // 'email':[null,[Validators.email]],
       emails: this.formBuilder.array([]),
     // greportadd: this.formBuilder.array([])
     
    });
  }


  getGReportAddFormControls(): AbstractControl[] {
    return (<FormArray> this.formGroup.get('greportadd')).controls
  }

  addEmail(): void {
    (this.formGroup.get('emails') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  removeEmail(index) {
    (this.formGroup.get('emails') as FormArray).removeAt(index);
  }

  getEmailsFormControls(): AbstractControl[] {
    return (<FormArray> this.formGroup.get('emails')).controls
  }

  onSubmit(post) {
    this.post = post;
    console.log(post)
  }

}
