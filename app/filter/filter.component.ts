import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder, FormArray, Validators,ReactiveFormsModule  } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ItemsService } from '../items.service';
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
    private dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public task: any,@Inject(MAT_DIALOG_DATA) public dialog: any,public itemsService: ItemsService) {
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

  /*  this.t.push(this.formBuilder.group({
      name: ['', Validators.required],
      operator: ['equal', Validators.required],
      valeur: ['', [Validators.required]]
  }));
  */
  
  //  this.dynamicForm.setValue(this.itemsService.data_filter.value)
    
//this.parseObject()
    //let obj = 
   // this.data=obj.title
   console.log(this.itemsService.data_filter)
   if (this.itemsService.data_filter.length==0)
    this.dynamicForm = this.formBuilder.group({
        numberOfConditions: ['1', Validators.required],
        logic: ['ET', Validators.required],
        conditions: new FormArray([])
    });

    if (this.itemsService.data_filter.length >0)
    {
      let counter=0;
    while (counter<this.itemsService.data_filter.length)
    {
      if (this.itemsService.data_filter[counter]["conditions"][0].name===this.task["task"].title)
      {

       for (let i=0;i<this.itemsService.data_filter[counter].numberOfConditions;i++)
       {
         this.t.push(this.formBuilder.group({
           name: [this.itemsService.data_filter[counter]["conditions"][i].name, Validators.required],
           operator: [this.itemsService.data_filter[counter]["conditions"][i].operator, Validators.required],
           valeur: [this.itemsService.data_filter[counter]["conditions"][i].valeur, [Validators.required]]
       }));
       }
       this.dynamicForm = this.formBuilder.group({
        numberOfConditions: [this.itemsService.data_filter[counter].numberOfConditions, Validators.required],
        logic: [this.itemsService.data_filter[counter].logic, Validators.required],
        conditions: new FormArray([])
    });
        break;
      }
      counter++;
    }
  }

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
     let JSON_OBJECT={}
     let trouve=false
     let counter=0;
     JSON_OBJECT["name"]=this.task["task"].title
     JSON_OBJECT["conditions"]=[]
     if (this.itemsService.data_filter !== undefined)
     {
  
     while (counter<this.itemsService.data_filter.length)
     {
          if (this.itemsService.data_filter[counter]["conditions"][0].name===this.task["task"].title)
          {
              trouve=true
              break;
          }
        counter++;
      }
      }
     if (trouve)
     this.itemsService.data_filter[counter]=this.dynamicForm.value
     else
     this.itemsService.data_filter.push(this.dynamicForm.value)
     for (let i=0;i<this.dynamicForm.value["conditions"].length;i++)
     {
        let JSON_Cond_Item={}
        JSON_Cond_Item["operator"]=this.dynamicForm.value["conditions"][i].operator
        JSON_Cond_Item["valeur"]=this.dynamicForm.value["conditions"][i].valeur
        JSON_OBJECT["conditions"].push(JSON_Cond_Item)
     }
     let i=0
     let filter_already_exist:boolean=false
     if (this.itemsService.data["where"] !== undefined)
        while (i<this.itemsService.data["where"].length)
          {
            if (this.itemsService.data["where"][i].name===this.task["task"].title)
            {
              this.itemsService.data["where"][i]["conditions"]=JSON_OBJECT["conditions"]
              filter_already_exist=true
              break;
            }
            i++;
          }
      else
      this.itemsService.data["where"]=[]
     if (!filter_already_exist)
     {
      this.itemsService.data["where"].push(JSON_OBJECT)
     }
     this.itemsService.emitTaskGroups()
     this.close()
    
    /* console.log(this.dynamicForm.value["numberOfConditions"])
     console.log(this.dynamicForm.value["logic"])
 
     console.log(this.dynamicForm.value["conditions"][0])
     */
     // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
 }

 onReset() {
     this.submitted = false;
     this.dynamicForm.reset();
     this.t.clear();
 }

 close() {
  this.dialogRef.close();
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