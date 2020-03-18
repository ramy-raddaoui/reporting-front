import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-drag-and-drop-horiz-bar',
  templateUrl: './drag-and-drop-horiz-bar.component.html',
  styleUrls: ['./drag-and-drop-horiz-bar.component.css']
})
export class DragAndDropHorizBarComponent implements OnInit {
  param1={};
  param2=[];
  data:string="";
  title = 'ngxcharts';
  taskGroups: any[];
  taskGroupsSubscription: Subscription;
  taskGroupsIds: any[]; // faire la liaison entre les listes pour passer les élements d'une liste à une autre

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

    this.taskGroupsSubscription = this.itemsService.taskGroupsSubject.subscribe(
      (taskGroups: any[]) => {
        this.taskGroups = taskGroups;
        taskGroups.forEach(function (child) {
          console.log(child.tasks[0]["title"])
          switch(child.title){
            case "Abscisse":
              this.data+="{'param1':child.tasks[0]['title']}"
              console.log(this.data)
            break;
            case "GROUP BY":break;
            case "Ordonnée":break;
            default:console.log("Error on switch Boucle");
          }
       
       //   this.taskGroupsIds.push(child);
        });
      }
    );
    this.itemsService.emitTaskGroups(); // Exécuter cette méthode pour émettre les données , si on n'émet pas les données on ne pourra jamais les récupérer
  }

  onTaskDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      console.log(event)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngOnDestroy() {
    this.taskGroupsSubscription.unsubscribe();
  }
}
