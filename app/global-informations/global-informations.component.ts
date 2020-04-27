import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { ItemsService } from '../items.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { RESTService } from '../rest.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-global-informations',
  templateUrl: './global-informations.component.html',
  styleUrls: ['./global-informations.component.css']
})
export class GlobalInformationsComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post = [];
  recipients=[]
  DaysList= ['1', '2', '3', '4', '5', '6'];
  excepts=[]
  selectedDays;
  selectedValueOfGReport: string;
  saveChart : Subscription ;
  UserListSubscription : Subscription ;
  WeekDaysSubscription : Subscription ;
  FullDataChart : Subscription ;
  constructor(private activatedRoute:ActivatedRoute,private formBuilder: FormBuilder,private dialogRef: MatDialogRef<GlobalInformationsComponent>,public itemsService: ItemsService,public rest:RESTService ) { }
  WeekDays=[]
  MonthDays=[]
  ngOnInit() {
    for (let i=0;i<32;i++)
    this.MonthDays.push(i)
    this.UserListSubscription=this.rest.getUsersList().subscribe(
      (data: any) => {
        for (let i=0;i<data.length;i++)
        {
          this.recipients.push(data[i])
          this.excepts.push(data[i])
        }
        console.log(data)
      },
      (error) => {
        console.log('An error occured' + error);
      },
      () => {
        console.log('Observable userList complete!');
      }
      );

      this.WeekDaysSubscription=this.rest.getWeekDaysList().subscribe(
        (data: any) => {
          for (let i=0;i<data.length;i++)
          {
            this.WeekDays.push(data[i])
          }
          console.log(this.WeekDays)
        },
        (error) => {
          console.log('An error occured' + error);
        },
        () => {
          console.log('Observable weekDays complete!');
        }
        );


    this.createForm();
    if (this.itemsService.getIdChart()!==null)
    this.FullDataChart=this.rest.getFullChartData(this.itemsService.getIdChart()).subscribe(
      (data: any) => {
        this.formGroup.get('reportname').setValue(data["reportname"]);
        this.formGroup.get('reportdesc').setValue(data['reportdesc']);
        this.formGroup.get('greport').setValue(data['greport']);
  
  
        switch(data['greport'])
        {
          case "Daily":
            console.log("Daily remind");break;
          case "Onaspecificdate":
            this.formGroup.get("gReportAdd").setValue([]);break;
          default :
          this.formGroup.get("gReportAdd").setValue([])
          for (let i=0;i<data["gReportAdd"].length;i++)
          {
            this.formGroup.get("gReportAdd")["value"].push(data["gReportAdd"][i].id)
          }
          break;
        }
        //setting recipients selected
        this.formGroup.get("recipients").setValue([])
        let recipients_Selected=[]
        for (let i=0;i<data["recipients"].length;i++)
          recipients_Selected.push(data["recipients"][i].id)
        this.formGroup.get("recipients").setValue(recipients_Selected)

        // Setting excepts selected
       this.formGroup.get("excepts").setValue([])
        let excepts_Selected=[]
        for (let i=0;i<data["excepts"].length;i++)
          excepts_Selected.push(data["excepts"][i].id)

        this.formGroup.get("excepts").setValue(excepts_Selected)
        
        // setting specific mails selected
        for (let i=0;i<data["emails"].length;i++)
        (this.formGroup.get('emails') as FormArray).push(
          this.formBuilder.control(data["emails"][i]["email"])
        );
           console.log(data)

      },
      (error) => {
        console.log('An error occured' + error);
      },
      () => {
        console.log('Observable complete!');
      }
      );

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

  close() {
    this.dialogRef.close();
  }

  onSubmit(post) {
    this.post=[]
    this.post.push(post);
    console.log(this.post)
    this.post.push(this.itemsService.data)
    console.log(this.formGroup.get("recipients"))

    this.saveChart=this.rest.saveChart(this.post).subscribe(
      (data: any) => {
        if (this.itemsService.can_send_api_request)
        {
            alert('chart saved successfully')
        }
        else
        console.log("Sorry !!!! Chart not saved")
      },
      (error) => {
        console.log('An error occured' + error);
      },
      () => {
        console.log('Observable complete!');
      }
      );


  //   this.close()
  }

}
