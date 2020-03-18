import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';
import { RESTService } from '../rest.service';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';
@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {
  single = [];

  data = {'param1': "boutique", 
  'param2': [{"nom":"Nom du produit","metrique":"GB"},{"nom":"Rémunération finale","metrique":"somme"}],
  'metrique': 'somme',
  'display': 'stackv',
  'seuil':'200'};
   
  view: any[] = [700, 300];
  multi: any[]
  dataSubscription: Subscription;

  ngOnInit(): void {
    this.itemsService.data["display"]="area";
    this.dataSubscription = this.itemsService.dataSubject.subscribe(
      (data: any) => {
        this.getAreaChart()
      }
      );
      this.itemsService.emitData();
  }
  getAreaChart()
  {
     this.restapi.PieandHistchartGetDATA(this.itemsService.data).subscribe(
       response => this.handleSuccessfulResponse(response),
       error=>this.handleErrorResponse(error)
     );
  }
 

  handleSuccessfulResponse(response)
  {
    console.log(response)
    this.multi=response
  }
  handleErrorResponse(error)
  {
    console.log("Une erreur a survenue !!!"+error)
  }
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Abscisse';
  yAxisLabel: string = 'Ordonnée';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    public restapi:RESTService,
    public itemsService: ItemsService
  ) {
    Object.assign(this, { multi });
  }

  onSelect(event) {
    console.log(event);
  }



}
