import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
import { RESTService } from '../rest.service';
import { Subject, Subscription } from 'rxjs';
import { ItemsService } from '../items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css']
})
export class VerticalBarChartComponent implements OnInit {

  single: any[];
  multi: any[];
  data = {};
  view: any[] = [900, 600];
  dataSubscription: Subscription;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Abscisse';
  showYAxisLabel = true;
  yAxisLabel = 'Ordonnée';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    public restapi:RESTService,
    public itemsService: ItemsService,
    private activatedRoute:ActivatedRoute
  ) {
    Object.assign(this, { single })
  }

  getVBarChartData()
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
  onSelect(event) {
    console.log(event);
  } 


  TestSubject()
  {
    const subject = new Subject<number>();
 
    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`)
    });
    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`)
    });
     
   // subject.next(1);
   // subject.next(2);
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      var id = params.get('id');
      this.itemsService.setidChart(id)
    });
    this.itemsService.data["display"]="vbarchart";
    this.dataSubscription = this.itemsService.dataSubject.subscribe(
      (data: any) => {
        if (this.itemsService.can_send_api_request)
        {
        this.itemsService.data["display"]="vbarchart";
        this.getVBarChartData()
        }
        else
        console.log("Sorry !!!! I can't SEND API REQUEST")
      }
      );
      //this.itemsService.emitData();
      this.itemsService.emitTaskGroups()
  }

}
