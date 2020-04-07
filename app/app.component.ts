import { Component, OnInit, OnDestroy, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemsService } from './items.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem,copyArrayItem } from '@angular/cdk/drag-drop';
import { Moment } from 'moment';
import {formatDate} from '@angular/common'
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { FilterComponent } from './filter/filter.component';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import { formatLabel, escapeLabel } from '@swimlane/ngx-charts';
import { barChart, lineChartSeries } from './combo-chart/combo-chart-data';

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
  is_checkbox_date_checked=true
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
  connectedTo = ["0","1","2"];
  actionSplit = {
    isVisibleA: true,
    isVisibleB: true,
    isPresentA: true,
    isPresentB: true,
    logs: ''
 }

meta_data = [];
metriques=[];



//

view = [500,400];
showXAxis = true;
showYAxis = true;
gradient = false;
showLegend = true;
legendTitle = 'Legend';
legendPosition = 'right';
showXAxisLabel = true;
xAxisLabel = 'Country';
showYAxisLabel = true;
yAxisLabel = 'GDP Per Capita';
showGridLines = true;
innerPadding = '10%';
animations: boolean = true;
barChart: any[] = barChart;
lineChartSeries: any[] = lineChartSeries;
lineChartScheme = {
  name: 'coolthree',
  selectable: true,
  group: 'Ordinal',
  domain: ['#01579b', '#7aa3e5', '#a8385d', '#00bfa5']
};

comboBarScheme = {
  name: 'singleLightBlue',
  selectable: true,
  group: 'Ordinal',
  domain: ['#01579b']
};

showRightYAxisLabel: boolean = true;
yAxisLabelRight: string = 'Utilization';


yLeftAxisScale(min, max) {
  return { min: `${min}`, max: `${max}` };
}

yRightAxisScale(min, max) {
  return { min: `${min}`, max: `${max}` };
}

yLeftTickFormat(data) {
  return `${data.toLocaleString()}`;
}

yRightTickFormat(data) {
  return `${data}%`;
}


constructor(public itemsService: ItemsService,public dialog:MatDialog){
this.meta_data=this.itemsService.meta_data;
this.metriques=this.itemsService.metriques;
}

onTaskDrop(event: CdkDragDrop<any[]>) {
  console.log(event)

if (["cdk-drop-list-0","cdk-drop-list-1"].indexOf(event.previousContainer["id"])>-1)
{
  this.itemsService.taskGroups[event.container["id"]].tasks.splice(event.currentIndex, 0, {
    id: event.previousIndex,
    title: event.previousContainer.data[event.previousIndex]["title"],
    description: ""
  });
}
else
{
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    
  } else {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }
}
  this.itemsService.emitTaskGroups(); // Exécuter cette méthode pour émettre les données , si on n'émet pas les données on ne pourra jamais les récupérer
}


  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
     
    } else {

       transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
     
    } 
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
    this.value = [new Date("10/01/2019"), new Date("12/31/2019")];
    this.data["period"]=[]
    this.data["where"]=[]
    this.data["period"].push(this.Prepare_JSON_DATE(this.value[0],"debut_période"))
    this.data["period"].push(this.Prepare_JSON_DATE(this.value[1],"fin_période"))

    this.ChangingFunction()
  }

  change_checkbox($event)
  {
   this.is_checkbox_date_checked=$event["checked"]
   if (this.is_checkbox_date_checked && this.value!=null)
   {
    this.data["period"].push(this.Prepare_JSON_DATE(this.value[0],"debut_période"))
    this.data["period"].push(this.Prepare_JSON_DATE(this.value[1],"fin_période"))
   }
   else
   this.data["period"]=[]
   this.itemsService.emitTaskGroups()
  }

  
  change($event){
    this.data["period"]=[]
    // Begin Date
    let JSON_OBj={}
    if ($event.value==null)
    {
    this.is_Date_Range_NULL=true
    console.log("event value NULL")
    }
    else
    {
     this.is_Date_Range_NULL=false
    let full_begin_date=new Date($event.value[0])
    let full_end_date=new Date($event.value[1])

    this.data["period"].push(this.Prepare_JSON_DATE(full_begin_date,"debut_période"))
    //JSON_OBj={}
   
    
    this.data["period"].push(this.Prepare_JSON_DATE(full_end_date,"fin_période"))
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

  delete(task,taskGroup_title)
  {
   let index_in_array;
   switch (taskGroup_title)
   {
   case "Abscisse":
    index_in_array=this.itemsService.taskGroups[0].tasks.indexOf(task)
    this.itemsService.taskGroups[0].tasks.splice(index_in_array,1);break;
    case "GROUP BY":
    this.itemsService.taskGroups[1].tasks.splice(index_in_array,1);break;
   case "Ordonnée":
    this.itemsService.taskGroups[2].tasks.splice(index_in_array,1);break;
   default: console.log("Error on remove Item")

   } 
   this.itemsService.emitTaskGroups()
  }

  

  filter(task)
  {
   this.dialog.open(FilterComponent, {
    height: '700px',
    width: '1100px',
    disableClose : false,
    data: {'task':task,
          'dialog':this.dialog}
  });
  }
 

  ChangingFunction()
  {
    this.taskGroupsSubscription = this.itemsService.taskGroupsSubject.subscribe(
      (taskGroups: any[]) => {
        if (this.is_Date_Range_NULL==true && this.is_checkbox_date_checked){console.log("this.is_Date_Range_NULL==true");return;}
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
            this.itemsService.can_send_api_request=false;return true;
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
                    console.log("stackedv")
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
              if(child.tasks.length==0)
              {
              this.itemsService.can_send_api_request=false;return true;
              }
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
              this.data["where"]=this.itemsService.data["where"]
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
/*
export let lineChartSeries = [
  {
    name: 'Tablets',
    series: [
          {
      name: 'USA',
      value: 50
    },
      {
        value: 80,
        name: 'United Kingdom'
      },
      {
        value: 85,
        name: 'France'
      },
      {
        value: 90,
        name: 'Japan'
      },
      {
        value: 100,
        name: 'China'
      }
    ]
  },
    {
    name: 'Cell Phones',
    series: [
          {
      value: 10,
      name: 'USA'
    },
      {
        value: 20,
        name: 'United Kingdom'
      },
      {
        value: 30,
        name: 'France'
      },
      {
        value: 40,
        name: 'Japan'
      },
      {
        value: 10,
        name: 'China'
      }
    ]
  },
    {
    name: 'Computers',
    series: [
          {
      value: 2,
      name: 'USA',
  
    },
      {
        value: 4,
        name: 'United Kingdom'
      },
      {
        value: 20,
        name: 'France'
      },
      {
        value: 30,
        name: 'Japan'
      },
      {
        value: 35,
        name: 'China'
      }
    ]
  }
  ];
  
  export let barChart: any = [
  {
    name: 'USA',
    value: 50000
  },
  {
    name: 'United Kingdom',
    value: 30000
  },
  {
    name: 'France',
    value: 10000
  },
  {
    name: 'Japan',
    value: 5000
  },
  {
    name: 'China',
    value: 500
  }
  ];
  
  
  
*/