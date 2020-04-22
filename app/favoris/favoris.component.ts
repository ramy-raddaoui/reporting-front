import { Component, OnInit } from '@angular/core';
import { CHARTS } from  './charts';
import { RESTService } from '../rest.service';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';

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
  DataChartSubscription:Subscription;
  constructor(public rest:RESTService,public itemsService: ItemsService) { }

  ngOnInit(): void {
    this.favorisCharts=this.rest.getChartsByuser(1).subscribe(
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

  getChartData(id)
  {
    this.favorisCharts=this.rest.getChartData(id).subscribe(
      (data: any) => {
        this.getDataChart(data)
      }
      );
  }
  getDataChart(data: any) {

    switch (data["display"])
    {
     // case : 
    }
    console.log(data);
  }

}
