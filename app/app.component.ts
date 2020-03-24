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
    this.value = [new Date('1/12/2020'), new Date('2/1/2023')];

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
   this.ChangingFunction()
  }

  change($event){
    this.itemsService.data["period"]=[]
    // Begin Date
    let JSON_OBj={}
    let full_begin_date=new Date($event.value[0])
    let date_debut=(full_begin_date.getDate()<10)?"0"+full_begin_date.getDate():full_begin_date.getDate();
    date_debut+="/";
    date_debut=(full_begin_date.getMonth()<10)?date_debut+"0"+(full_begin_date.getMonth()+1).toString():date_debut+(full_begin_date.getMonth()+1).toString();
    date_debut+="/"+full_begin_date.getFullYear()
    JSON_OBj["name"]="debut_période"
    JSON_OBj["value"]=date_debut
    this.itemsService.data["period"].push(JSON_OBj)
   // console.log(this.itemsService.data["period"])
  
    // End Date
    JSON_OBj={}
    let full_end_date=new Date($event.value[1])
    let date_fin=(full_end_date.getDate()<10)?'0'+full_end_date.getDate():full_end_date.getDate();
    date_fin+="/";
    date_fin=((full_end_date.getMonth()+1)<10)?date_fin+"0"+(full_end_date.getMonth()+1).toString():date_fin+(full_end_date.getMonth()+1).toString();
    date_fin+="/"+full_end_date.getFullYear()
    JSON_OBj["name"]="fin_période"
    JSON_OBj["value"]=date_fin
    this.itemsService.data["period"].push(JSON_OBj)
    
    console.log(this.itemsService.data["period"])
    this.itemsService.emitTaskGroups()
  // console.log(date.getMonth())
    const locale = 'en-USA';
 
      //console.log(formatDate("01/12/2020", "dd/mm/yyyy",locale));

    //console.log(formatDate((date.getDate().toString()+'/'+(date.getMonth()+1).toString()+'/'+date.getFullYear().toString()).toString(), "dd/mm/yyyy",locale));

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
        this.taskGroups = taskGroups;
        this.data["param2"]=[]
        this.data["GroupBy"]=[]
        taskGroups.forEach(function (child) {
          switch(child.title){
            case "Abscisse":
            if(child.tasks.length==0){return null;}
            this.data["param1"]=child.tasks[0]['title'];
            this.isAbscisseValid=true
            break;
            
            case "GROUP BY":
                switch(this.itemsService.data["display"])
                {
                  case "area":
                    
                    if (child.tasks.length==0){this.itemsService.can_send_api_request=false;return null;}
                    this.isGroupByValid=true;
                    this.isMultiParamsGroupByAllowed=true;break; 
                  case "line":
                    if (child.tasks.length==0){this.itemsService.can_send_api_request=false;return null;}
                    this.isGroupByValid=true;
                    this.isMultiParamsGroupByAllowed=true;break; 
                  case "stackv":
                    if (child.tasks.length==0){return null;}
                    this.isGroupByValid=true;
                    this.isMultiParamsGroupByAllowed=true;
                   break;         
                  case "pie":
                    if (child.tasks.length==0)this.isGroupByValid=true;
                    else {this.isMultiParamsGroupByAllowed=false;this.itemsService.can_send_api_request=false;return null;}break;
                  case "vbarchart":
                    if (child.tasks.length==0)this.isGroupByValid=true;
                    else {this.isMultiParamsGroupByAllowed=false;this.itemsService.can_send_api_request=false;return null;}break;   
                  case "horizbarchart":
                    if (child.tasks.length==0)this.isGroupByValid=true;
                    else {this.isMultiParamsGroupByAllowed=false;this.itemsService.can_send_api_request=false;return null;}break; 
               
                    
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
