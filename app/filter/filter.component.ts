import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder, FormArray, Validators,ReactiveFormsModule  } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  data :any;
  constructor(public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public task: any) {
      this.data=this.task["task"].title
     }
/*
      parseObject(obj)
     {
        for(var key in obj)
        {
           console.log("key: " + key + ", value: " + obj[key])
           if(obj[key] instanceof Object)
           {
             this.parseObject(obj[key]);
           }
        }
     }
     */
  ngOnInit() {

//this.parseObject()
    //let obj = 
   // this.data=obj.title

    this.dynamicForm = this.formBuilder.group({
        numberOfConditions: ['', Validators.required],
        logic: ['ET', Validators.required],
        conditions: new FormArray([])
    });
}

 // convenience getters for easy access to form fields
 get f() { return this.dynamicForm.controls; }
 get t() { return this.f.conditions as FormArray; }

 onChangeConditions(e) {
     const numberOfTickets = e.target.value || 0;
     if (this.t.length < numberOfTickets) {
         for (let i = this.t.length; i < numberOfTickets; i++) {
             this.t.push(this.formBuilder.group({
                 name: ['', Validators.required],
                 operator: ['equal', Validators.required],
                 valeur: ['', [Validators.required]]
             }));
         }
     } else {
         for (let i = this.t.length; i >= numberOfTickets; i--) {
             this.t.removeAt(i);
         }
     }
 }

 onSubmit() {
     this.submitted = true;

     // stop here if form is invalid
     if (this.dynamicForm.invalid) {
         return;
     }

     // display form values on success
     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
 }

 onReset() {
     // reset whole form back to initial state
     this.submitted = false;
     this.dynamicForm.reset();
     this.t.clear();
 }

 onClear() {
     // clear errors and reset ticket fields
     this.submitted = false;
     this.t.reset();
 }
/*
  initForm() {
    this.filterForm = this.formBuilder.group({
      label: '',
      lastName: '',
      email: '',
      drinkPreference: '',
      hobbies: this.formBuilder.array([])
    });
}

  onSubmitForm() {
    const formValue = this.filterForm.value;

     console.log(formValue['hobbies'])

      formValue['hobbies'] ? formValue['hobbies'] : []
  }

  getHobbies(): FormArray {
    //console.log(this.filterForm.get('hobbies'))

    return this.filterForm.get('hobbies') as FormArray;
  }

  onAddHobby() {
    const newHobbyControl = this.formBuilder.control(null, Validators.required);
    const newHobbyControl1 = this.formBuilder.control(null, Validators.required);
    const newHobbyControl2 = this.formBuilder.control(null, Validators.required);


    //console.log(this.getHobbies())
    console.log(newHobbyControl)
    this.getHobbies().push(newHobbyControl);
    this.getHobbies().push(newHobbyControl1);
    this.getHobbies().push(newHobbyControl2);
}
*/
}
