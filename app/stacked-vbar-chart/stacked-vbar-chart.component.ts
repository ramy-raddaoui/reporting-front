import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';
import { RESTService } from '../rest.service';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-stacked-vbar-chart',
  templateUrl: './stacked-vbar-chart.component.html',
  styleUrls: ['./stacked-vbar-chart.component.css']
})
export class StackedVBarChartComponent implements OnInit {

  multi: any[];
  view: any[] = [900, 600];
  showTable=true
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
  IsshowTable()
  {
    this.showTable = !this.showTable;
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
    private activatedRoute:ActivatedRoute,
    public restapi:RESTService,
    public itemsService: ItemsService
  ) {
    Object.assign(this, { multi });
  }
 

  onSelect(event) {
    console.log(event);
  }
  filter(event)
  {
    console.log(event);

  }
 

  
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {

      var id = params.get('id');
      this.itemsService.setidChart(id)
      console.log(id)

    });

    this.itemsService.data["display"]="stackv";
    this.dataSubscription = this.itemsService.dataSubject.subscribe(
      (data: any) => {
        if (this.itemsService.can_send_api_request)
        {
        this.itemsService.data["display"]="stackv";
        this.getAreaChart();

        }
        else
        console.log("I can't SEND API REQUEST")
        }
      );
      //this.itemsService.emitData();
      this.itemsService.emitTaskGroups()

  }

  ngOnDestroy()
  {
    this.itemsService.clearIdChart()
  }

}
