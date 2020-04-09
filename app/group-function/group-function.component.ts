import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-group-function',
  templateUrl: './group-function.component.html',
  styleUrls: ['./group-function.component.css']
})
export class GroupFunctionComponent implements OnInit {
  data :string;
  
   selection: string;

   customOption: string = 'customOption';

  constructor(private dialogRef: MatDialogRef<GroupFunctionComponent>,@Inject(MAT_DIALOG_DATA) public task: any,@Inject(MAT_DIALOG_DATA) public dialog,public itemsService: ItemsService) { 
    this.data=this.task["task_title"];
  }

  onClick($event)
  {
    console.log("onclick function")
    let i=0;
    let trouve=false
      while (i<this.itemsService.data_function.length)
      {
        console.log(this.itemsService.data_function[i]['nom'])
      if (this.itemsService.data_function[i]['nom']===this.data)
      {console.log("ici dans IFF");this.itemsService.data_function[i]['metrique']=this.selection ;trouve=true;break;} 
      i++;
      }

      this.itemsService.emitTaskGroups()

    this.close()
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {

    let i=0;
    let trouve=false
    console.log(this.itemsService.data_function.length)
      while (i<this.itemsService.data_function.length)
      {
        console.log("ici dans whilee")
        console.log(this.itemsService.data_function[i]['nom'])
      if (this.itemsService.data_function[i]['nom']==this.data)
      {console.log("ici dans IFF");this.selection = this.itemsService.data_function[i]['metrique'];trouve=true;break;} 
      i++;
      }


      if (!trouve)
      {
        console.log(" if (!trouve)")
        let JSON_Cond_Item={}
        JSON_Cond_Item["nom"]=this.data
        JSON_Cond_Item["metrique"]="sum"
        this.selection="sum";
        this.itemsService.data_function.push(JSON_Cond_Item)
      } 

    
  }

  onSubmit() {
    //console.log(this.itemsService.data_function)
   /* let i=0;
    while (i<this.itemsService.data_filter.length)
    {
    if (this.itemsService.data_filter[i]['name']==this.data)
    {this.itemsService.data_filter[i]['value']=this.selectedStatus;break;} 
    i++;
    }
    this.close()
    */
  }




}
