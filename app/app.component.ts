import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemsService } from './items.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Moment } from 'moment';
import {formatDate} from '@angular/common'
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy{
  isAbscisseValid=false
  isOrdonneeValid=false
  isGroupByValid=false
  is_Date_Range_NULL=false
  isMultiParamsGroupByAllowed=false
  value=[];
  param1={};
  param2=[];
  data={};
  title = 'ngxcharts';
  taskGroups: any[];
  taskGroupsSubscription: Subscription;
  taskGroupsIds: any[]; // faire la liaison entre les listes pour passer les élements d'une liste à une autre
  jsonObjAbscisse={};
  jsonObjGB={};
  jsonObjOrdonnee={};
  metrique=["somme","moyenne","max","min"]
  selected: {start: Moment, end: Moment};
  constructor(public itemsService: ItemsService){

  }


  /*
  data = {'param1': "Nom du produit", 
  'param2': [{"nom":"boutique","metrique":"GB"},{"nom":"Rémunération finale","metrique":"somme"}],
  'where':  [{"nom":"Date début","value":"GB"},{"nom":"Date fin","value":"somme"}],
  'display': 'stackv',
  'seuil':'200'};
  */
  ngOnInit()
  {
    this.value = [new Date(), new Date()];
    this.itemsService.data["period"]=[]
    this.itemsService.data["period"].push(this.Prepare_JSON_DATE(this.value[0],"debut_période"))
    this.itemsService.data["period"].push(this.Prepare_JSON_DATE(this.value[1],"fin_période"))
    console.log("aa"+this.itemsService.data)
    this.ChangingFunction()
  }

  change($event){
    this.itemsService.data["period"]=[]
    // Begin Date
    let JSON_OBj={}
    if ($event.value==null)
    {
    this.is_Date_Range_NULL=true
    console.log("event value NULL")
    }
    else
    {
    let full_begin_date=new Date($event.value[0])
    let full_end_date=new Date($event.value[1])

    this.itemsService.data["period"].push(this.Prepare_JSON_DATE(full_begin_date,"debut_période"))
    //JSON_OBj={}
   

    this.itemsService.data["period"].push(this.Prepare_JSON_DATE(full_end_date,"fin_période"))
    console.log("testee "+this.itemsService.data)
    this.itemsService.emitTaskGroups()
    console.log("On change method here")
    }

  }

   Prepare_JSON_DATE(full_date,alias_date)
  {
    let JSON_OBj={}
    let date=(full_date.getDate()<10)?'0'+full_date.getDate():full_date.getDate();
    date+="/";
    date=((full_date.getMonth()+1)<10)?date+"0"+(full_date.getMonth()+1).toString():date+(full_date.getMonth()+1).toString();
    date+="/"+full_date.getFullYear()
    JSON_OBj["name"]=alias_date
    JSON_OBj["value"]=date

    return JSON_OBj;
  }
 
  onTaskDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    
    this.itemsService.emitTaskGroups(); // Exécuter cette méthode pour émettre les données , si on n'émet pas les données on ne pourra jamais les récupérer
  }

  ChangingFunction()
  {
    this.taskGroupsSubscription = this.itemsService.taskGroupsSubject.subscribe(
      (taskGroups: any[]) => {
        if (this.is_Date_Range_NULL==true)
        return
        console.log(this.itemsService.data["period"])
        this.isAbscisseValid=false
        this.isOrdonneeValid=false
        this.isGroupByValid=false
        this.isMultiParamsGroupByAllowed=false
        this.taskGroups = taskGroups;
        this.data["param2"]=[]
        this.data["GroupBy"]=[]
        this.data["param1"]=[]
        taskGroups.some(function (child) {
          switch(child.title){
            case "Abscisse":
            if(child.tasks.length==0 || child.tasks.length>1)
            {
            this.itemsService.can_send_api_request=false;console.log("IS abscisse valid"+this.isAbscisseValid);return true;
            }
           console.log("Abscisse section")
            this.data["param1"]=child.tasks[0]['title'];
            this.isAbscisseValid=true
            break;
            case "GROUP BY":
              console.log("GROUP BY section")
                switch(this.itemsService.data["display"])
                {
                  case "area":
                    
                    if (child.tasks.length==0){this.isMultiParamsGroupByAllowed=true;this.itemsService.can_send_api_request=false;return true;}
                    this.isGroupByValid=true;
                    this.isMultiParamsGroupByAllowed=true;break; 
                  case "line":
                    if (child.tasks.length==0){this.isMultiParamsGroupByAllowed=true;this.itemsService.can_send_api_request=false;return true;}
                    this.isGroupByValid=true;
                    this.isMultiParamsGroupByAllowed=true;break; 
                  case "stackv":
                    if (child.tasks.length==0){this.isMultiParamsGroupByAllowed=true;return true;}
                    this.isGroupByValid=true;
                    this.isMultiParamsGroupByAllowed=true;
                   break;         
                  case "pie":
                    if (child.tasks.length==0)this.isGroupByValid=true;
                    else {this.isMultiParamsGroupByAllowed=false;this.itemsService.can_send_api_request=false;return true;}break;
                  case "vbarchart":
                    if (child.tasks.length==0)this.isGroupByValid=true;
                    else {this.isMultiParamsGroupByAllowed=false;this.itemsService.can_send_api_request=false;return true;}break;   
                  case "horizbarchart":
                    if (child.tasks.length==0)this.isGroupByValid=true;
                    else {this.isMultiParamsGroupByAllowed=false;this.itemsService.can_send_api_request=false;return true;}break; 
                  default: return true;
                    
                }
              for (var i=0;i<child.tasks.length;i++)
              {
                this.jsonObjGB={}
                this.jsonObjGB["nom"]=child.tasks[i].title;
                this.data["GroupBy"].push(this.jsonObjGB);
              }
              break;
            case "Ordonnée":
              var compteur=0;
              if(child.tasks.length==0)return null;
              this.isOrdonneeValid=true
              this.itemsService.can_send_api_request=true;
              while (compteur<child.tasks.length)
              {
                if (this.metrique.indexOf(child.tasks[compteur].title) !== -1)
              {
                this.jsonObjOrdonnee["metrique"]=child.tasks[compteur].title;
                this.jsonObjOrdonnee["nom"]=child.tasks[compteur+1].title;
                compteur+=2;
              }
              else
              {
                this.jsonObjOrdonnee["nom"]=child.tasks[compteur].title;
                this.jsonObjOrdonnee["metrique"]="N/A";
                compteur++;
              }
              this.data["param2"].push(this.jsonObjOrdonnee);
              }
              this.data["display"]="stackv";
              this.itemsService.data=this.data;
              this.itemsService.emitData();
              console.log("After emit DATA FUNCTION CALL")
              console.log(this.data)
            break;
            default:console.log("Error on switch Boucle");
          }
        },this);
      }
    );
    this.itemsService.emitTaskGroups(); // Exécuter cette méthode pour émettre les données , si on n'émet pas les données on ne pourra jamais les récupérer
      
     


  }

  ngOnDestroy() {
    this.taskGroupsSubscription.unsubscribe();
  }
}
