import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  data={}
  private idChart=null;

  setidChart(idChart){
    this.idChart = idChart;
  }

  getIdChart(){
    return this.idChart;
  }
  clearIdChart()
  {
    this.idChart=null
  }

  public can_send_api_request=false
  data_filter=[]
  data_function=[]
  metriques = [
    'Achievement',
    'Payment',
    'Target',
    'Realization',
  ];


  meta_data = [
    {
      title: "Métadonnées",
      id: "Métadonnées",
      tasks: [
     /*   {
          id: 0,
          title: "boutique",
        },
        
      {
          id: 1,
          title: "Nom du produit",
        },
       */
      ]
    },
    {
      title: "Métriques",
      id: "Métriques",
      tasks: [
      /*  {
          id: 0,
          title: "Rémunération finale",
        },
        
      {
          id: 1,
          title: "objectif par produit",
        },
     */
      ]
    } 
  ];


  taskGroups: any[] = [
    {
      title: "Abscisse",
      id: "Abscisse",
      tasks: [
      
        {
          id: 0,
          title: "boutique",
        },
       /*    
      {
          id: 1,
          title: "produit",
        },
     */
      ]
    },
    {
      title: "GROUP BY",
      id: "GROUP BY",
      tasks: [
   /*  */
       {
          id: 0,
          title: "Nom du produit",
          description: ""
        },
  
    
        
        
      ]
    },
    {
      title: "Ordonnée",
      id: "Ordonnée",
      tasks: [ 
      {
          id: 0,
          title: "Remuneration par produit",
        },
     /*        
        {
          id: 1,
          title: "objectif par produit",
        },
             
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
