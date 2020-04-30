import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';
import { RESTService } from '../rest.service';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stacked-horizbar-chart',
  templateUrl: './stacked-horizbar-chart.component.html',
  styleUrls: ['./stacked-horizbar-chart.component.css']
})
export class StackedHorizbarChartComponent implements OnInit {

  multi: any[];
  view: any[] = [900, 600];
   /* data = {'param1': "Nom du produit", 
  'param2': [{"nom":"boutique","metrique":"GB"},{"nom":"Rémunération finale","metrique":"somme"}],
  'where':  [{"nom":"Date début","value":"GB"},{"nom":"Date fin","value":"somme"}],
  'display': 'stackv',
  'seuil':'200'};
  */
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "X LABEL";
  showYAxisLabel: boolean = true;
  yAxisLabel: string = "Y LABEL";
  animations: boolean = true;
  dataSubscription: Subscription;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','pink','blue']
  };

  getAreaChart()
  {
     this.restapi.PieandHistchartGetDATA(this.itemsService.data).subscribe(
       response => this.handleSuccessfulResponse(response),
       error=>this.handleErrorResponse(error)
     );
  }
 

  handleSuccessfulResponse(response)
  {
   // console.log(response)
    this.multi=response
  }
  handleErrorResponse(error)
  {
    console.log("Une erreur a survenue !!!"+error)
  }
  constructor(
    public restapi:RESTService,
    public itemsService: ItemsService,
    private activatedRoute:ActivatedRoute
  ) {
    Object.assign(this, { multi });
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      var id = params.get('id');
      this.itemsService.setidChart(id)

    });
    this.itemsService.data["display"]="shbarchart";
    this.dataSubscription = this.itemsService.dataSubject.subscribe(
      (data: any) => {
        if (this.itemsService.can_send_api_request)
        {
        this.itemsService.data["display"]="shbarchart";
        this.getAreaChart();
        }
        else
        console.log("Sorry !!!! I can't SEND API REQUEST")
        }
      );
      //this.itemsService.emitData();
      this.itemsService.emitTaskGroups()
  }


}
