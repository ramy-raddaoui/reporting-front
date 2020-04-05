import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
import { RESTService } from '../rest.service';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';
@Component({
  selector: 'app-horiz-bar-chart',
  templateUrl: './horiz-bar-chart.component.html',
  styleUrls: ['./horiz-bar-chart.component.css']
})
export class HorizBarChartComponent implements OnInit {

  single: any[];
  view: any[] = [900, 600];
  data = {};
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true; 
  yAxisLabel: string = 'Ordonnée';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Abscisse';
  dataSubscription: Subscription;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    public restapi:RESTService,
    public itemsService: ItemsService
  ) {
    Object.assign(this, { single })
  }

  getHorizBarChartData()
  {
     this.restapi.PieandHistchartGetDATA(this.itemsService.data).subscribe(
       response => this.handleSuccessfulResponse(response),
       error=>this.handleErrorResponse(error)
     );
  }


  handleSuccessfulResponse(response)
  {
    console.log(response)
    this.single=response
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
    this.itemsService.data["display"]="horizbarchart";
    this.dataSubscription = this.itemsService.dataSubject.subscribe(
      (data: any) => {
        if (this.itemsService.can_send_api_request)
        {
        this.itemsService.data["display"]="horizbarchart";
        this.getHorizBarChartData()
        }
        else
        console.log("Sorry !!!! I can't SEND API REQUEST")
      }
      );
     // this.itemsService.emitData();
     this.itemsService.emitTaskGroups()
  }

}
