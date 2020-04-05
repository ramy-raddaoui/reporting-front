import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  data={}
  can_send_api_request=false
  data_filter=[]

 


  taskGroups: any[] = [
    {
      title: "Abscisse",
      id: "Abscisse",
      tasks: [
        
         /*{
          id: 0,
          title: "boutique",
          description: ""
        },
        
      {
          id: 1,
          title: "produit",
          description: ""
        },
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
          description: ""
        },
  
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
          id: 1,
          title: "objectif par produit",
          description: ""
        }
        
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
