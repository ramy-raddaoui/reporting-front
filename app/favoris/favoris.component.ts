import { Component, OnInit, Inject } from '@angular/core';
import { CHARTS } from  './charts';
import { RESTService } from '../rest.service';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

interface Chart {
  name: string;
}

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})

export class FavorisComponent implements OnInit {
  charts= [];
  searchText: string;
  favorisCharts:Subscription;
  favorisChartsOfAliasTable:Subscription;
  DataChartSubscription:Subscription;
  tableAlias:any
  constructor(public dialog:MatDialog,private router:Router,private dialogRef:MatDialogRef<FavorisComponent>,public rest:RESTService,public itemsService: ItemsService,@Inject(MAT_DIALOG_DATA) public selectedValueoftableAlias) 
  {
    this.tableAlias=this.selectedValueoftableAlias["selectedValueoftableAlias"]
  }
  ngOnInit(): void {

    // you must delete this after
    this.rest.getFullChartData(1).subscribe(
      (data: any) => {
    
           console.log(data)

      },
      (error) => {
        console.log('An error occured' + error);
      },
      () => {
        console.log('Observable complete!');
      }
      );

      
    this.charts=[]
    this.favorisCharts=this.rest.getChartsByuser(1,this.tableAlias).subscribe(
      (data: any) => {
        this.getFavorisCharts(data)
      }
      );
  }
  getFavorisCharts(data) {
    let JSONOBJ;
    for (let i=0;i<data.length;i++)
    {
      JSONOBJ={}
      JSONOBJ["id"]=data[i][0]
      JSONOBJ["name"]=data[i][1]
      JSONOBJ["description"]=data[i][2]
      this.charts.push(JSONOBJ)
    }

  }

  close() {
    this.dialogRef.close();
  }

  getChartData(id)
  {
    this.favorisChartsOfAliasTable=this.rest.getChartData(id).subscribe(
      (data: any) => {
        this.getDataChart(data)
      }
      );
  }
  getDataChart(data: any) {

    for (let i=0;i<this.itemsService.taskGroups.length;i++)
    {
      this.itemsService.taskGroups[i]["tasks"]=[]
    }

  
    let GROUP_BY=data["GROUP BY"];
    let abscisse=data["abscisse"];
    let conditions=data["conditions"];
    let ordonnee=data["ordonnee"]
    let chartID=data["id"]
    //set abscisse data to drag and drop abscisse zone
    this.itemsService.taskGroups[0]["tasks"].push({id:abscisse["id"],title:abscisse["title"]})
    // set group By data to drag and drop GROUP BY zone
    for (let i=0;i<GROUP_BY.length;i++)
    {
      this.itemsService.taskGroups[1]["tasks"].push({id:GROUP_BY[i]["id"],title:GROUP_BY[i]["title"]})
    }
    //set ordonnee data to drag and drop Ordonnee Zone
    for (let i=0;i<ordonnee.length;i++)
    {
      console.log(ordonnee[i]["nom"])
      this.itemsService.taskGroups[2]["tasks"].push({id:i,title:ordonnee[i]["nom"]})
    }
    this.itemsService.data_filter=[]
    // We have to fill conditions associated to saved chart
    for (let i=0;i<conditions.length;i++)
    {
      this.itemsService.data_filter.push(conditions[i])
    }
    this.itemsService.data_function=[]
    // we have to fill metric functions associated to saved chart
    for (let i=0;i<ordonnee.length;i++)
    {
      console.log(ordonnee[i])
      this.itemsService.data_function.push(ordonnee[i])
    }
    this.itemsService.emitTaskGroups()
    this.close()
    this.router.navigate([data["display"],chartID]);
    console.log(data);
    
  }

}
