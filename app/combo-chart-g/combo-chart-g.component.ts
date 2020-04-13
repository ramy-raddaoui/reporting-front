import { Component, OnInit } from '@angular/core';
import { barChart, lineChartSeries } from './combo-chart-data';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import { formatLabel, escapeLabel } from '@swimlane/ngx-charts';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';
import { RESTService } from '../rest.service';
@Component({
  selector: 'app-combo-chart-g',
  templateUrl: './combo-chart-g.component.html',
  styleUrls: ['./combo-chart-g.component.css']
})
export class ComboChartGComponent implements OnInit {


view = [900,700];
showXAxis = true;
showYAxis = true;
gradient = false;
showLegend = true;
legendTitle = 'Legend';
legendPosition = 'right';
showXAxisLabel = true;
xAxisLabel = '';//boutique
showYAxisLabel = true;
yAxisLabel = ''//'Pourcentage';
showGridLines = true;
innerPadding = '10%';
animations: boolean = true;
barChart: any[] = barChart;
lineChartSeries: any[] = lineChartSeries;
dataSubscription: Subscription;
lineChartScheme = {
  name: 'coolthree',
  selectable: true,
  group: 'Ordinal',
  domain: ['#00bfa5','#7aa3e5','#a8385d']
};

comboBarScheme = {
  name: 'singleLightblue',
  selectable: true,
  group: 'Ordinal',
  domain: ['#00bfa5']
};

showRightYAxisLabel: boolean = true;
yAxisLabelRight: string =''//= 'Pourcentage';


yLeftAxisScale(min, max) {
  return { min: `${min}`, max: `${max}` };
}

yRightAxisScale(min, max) {
  return { min: `${min}`, max: `${max}` };
}

yLeftTickFormat(data) {
  return `${data.toLocaleString()}`;
}

yRightTickFormat(data) {
  return `${data}`;
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
  console.log("handleSuccessful response on combochart")
  console.log(this.restapi.isDataAPINotEmpty)
  console.log(response[0].length>0)
  if(response[0].length>0)
  {
    this.restapi.isDataAPINotEmpty=true
    this.restapi.emit_isDataAPINotEmpty()
  }
  this.barChart=response[0]
  this.lineChartSeries=response[1]
  this.yAxisLabel=this.itemsService.data["param2"][0]["nom"]
  this.yAxisLabelRight=this.itemsService.data["param2"][1]["nom"]
  this.xAxisLabel=this.itemsService.data["param1"]
 // this.lineChartSeries=response[1]
 // this.multi=response
}
handleErrorResponse(error)
{
  console.log("Une erreur a survenue !!!"+error)
}

  constructor(public itemsService: ItemsService,public restapi:RESTService) { }

  ngOnInit(): void {
    console.log("This is ngOnInit")
    this.itemsService.data["display"]="combo";
    this.dataSubscription = this.itemsService.dataSubject.subscribe(
      (data: any) => {
        if (this.itemsService.can_send_api_request)
        {
        this.itemsService.data["display"]="combo";
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
