import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { ItemsService } from '../items.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { RESTService } from '../rest.service';

@Component({
  selector: 'app-global-informations',
  templateUrl: './global-informations.component.html',
  styleUrls: ['./global-informations.component.css']
})
export class GlobalInformationsComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post = [];
  recipients=['Acheteur Gestionnaire', 'Assistant de marché', 'Assistant mobilité', 'Chef de département direct']
  DaysList= ['1', '2', '3', '4', '5', '6'];
  excepts=['hamoud sidi bouna','sidi ahmed salem','ahmed salem michri','mohamed sidi gh']
  selectedDays;
  selectedValueOfGReport: string;
  saveChart : Subscription ;
  constructor(private formBuilder: FormBuilder,public itemsService: ItemsService,public rest:RESTService ) { }
  WeekDays=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
  MonthDays=[]
  ngOnInit() {
    for (let i=0;i<32;i++)
    this.MonthDays.push(i)
    this.createForm();
    /*let JSON_OBJ={
      reportname : "reportRami",
      greport: "Daily",
      reportdesc: "hahahaha",
      recipients : ["Assistant de marché"],
      excepts : ["sidi ahmed salem","ahmed salem michri"],
      gReportAdd :null,
      emails : []
    }
    */
   // this.post.push(JSON_OBJ)
   // this.post.push(this.itemsService.data)
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
    this.post=[]
    this.post.push(post);
    this.post.push(this.itemsService.data)
    this.saveChart=this.rest.saveChart(this.post).subscribe(
      (data: any) => {
        if (this.itemsService.can_send_api_request)
        {
            console.log("successfully saved")
        }
        else
        console.log("Sorry !!!! Chart not saved")
      }
      );
    console.log(this.post)
  }

}
