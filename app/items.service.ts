import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  data={}
  taskGroups: any[] = [
    {
      title: "Abscisse",
      id: "Abscisse",
      tasks: [
        {
          id: 0,
          title: "boutique",
          description: ""
        },
        /*{
          id: 1,
          title: "Acheter du pain",
          description: "Aller acheter du pain à la boulangerie"
        },
        {
          id: 2,
          title: "Faire les courses",
          description: "Prendre du lait, des céréales et des bananes"
        }
        */
      ]
    },
    {
      title: "GROUP BY",
      id: "GROUP BY",
      tasks: [
         /*    
        {
          id: 0,
          title: "Nom du produit",
        },
        
        {
          id: 1,
          title: "boutique",
        },
   
        {
          id: 2,
          title: "Préparer une quiche",
          description: "Voir la recette de la quiche"
        }
        */
      ]
    },
    {
      title: "Ordonnée",
      id: "Ordonnée",
      tasks: [
        {
          id: 0,
          title: "somme",
        },
        
        {
          id: 1,
          title: "Rémunération finale",
        }/*,
        {
          id: 2,
          title: "somme",
        },
        
        {
          id: 3,
          title: "Rémunération finale",
        }
       */
      ]
    }
  ];
  
  taskGroupsSubject = new Subject<any[]>();
  dataSubject=new Subject<any>();
  constructor() { }

  emitTaskGroups() {
    this.taskGroupsSubject.next(this.taskGroups);
  }
  emitData() {
    this.dataSubject.next(this.data);
  }
}
