import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';
import { RESTService } from '../rest.service';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {
  single = [];


   
  view: any[] = [900, 600];
  multi: any[]
  dataSubscription: Subscription;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      var id = params.get('id');
      this.itemsService.setidChart(id)

    });
    this.itemsService.data["display"]="area";
    this.dataSubscription = this.itemsService.dataSubject.subscribe(
      (data: any) => {
        if (this.itemsService.can_send_api_request)
        {
        this.itemsService.data["display"]="area";
        this.getAreaChart()
        }
        else
        console.log("Sorry !!!! I can't SEND API REQUEST")


      }
      );
    //  this.itemsService.emitData();
    this.itemsService.emitTaskGroups()
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
    public itemsService: ItemsService,
    private activatedRoute:ActivatedRoute
  ) {
    Object.assign(this, { multi });
  }

  onSelect(event) {
    console.log(event);
  }



}
