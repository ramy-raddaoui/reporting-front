import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemsService } from './items.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy{
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
    this.ChangingFunction()
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
            if(child.tasks.length==0)break;
            this.data["param1"]=child.tasks[0]['title'];
            break;
            case "GROUP BY":
              if(child.tasks.length==0)break;
              this.jsonObjGB["nom"]=child.tasks[0]['title'];
              this.data["GroupBy"].push(this.jsonObjGB);
              break;
            case "Ordonnée":
              var compteur=0;
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
