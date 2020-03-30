import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';
import { RESTService } from '../rest.service';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  multi: any[];
  view: any[] = [900, 600];
    data = {'param1': "Abscisse", 
  'param2': [{"nom":"Rémunération par produit","metrique":"somme"},{"nom":"objectif par produit","metrique":"somme"}],
  'metrique': 'somme',
 // 'display': 'bar',
 'display': 'line',
  'seuil':'200'};
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = this.data.param1;
  yAxisLabel: string = "Ordonnées";
  timeline: boolean = true;
  dataSubscription: Subscription;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    public restapi:RESTService,
    public itemsService: ItemsService
  ) {
    Object.assign(this, { multi });
  }

  getLineChartData()
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

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    this.itemsService.data["display"]="line";
    this.dataSubscription = this.itemsService.dataSubject.subscribe(
      (data: any) => {
        if (this.itemsService.can_send_api_request)
        {
          this.itemsService.data["display"]="line";
          this.getLineChartData()
        }
        else
        console.log("Sorry !!!! I can't SEND API REQUEST")
      }
      );
      this.itemsService.emitData();  }

}
