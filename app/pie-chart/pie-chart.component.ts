import { Component, NgModule, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
import { BrowserModule } from '@angular/platform-browser';
import { RESTService } from '../rest.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
   single = [];
    data = {'param1': "nom intervenant", 
    'param2': [{"nom":"ventes par produit","metrique":"somme"}],
            'metrique': 'somme',
            'seuil':'500',
            'display' : 'pie'};

  constructor( 
    public restapi:RESTService
  ) {
    Object.assign(this, { single });
  }
  ngOnInit() {
    this.getPieChartData()
  }

  ngOnDestroy()
  {
  }
 
  getPieChartData()
  {
     this.restapi.PieandHistchartGetDATA(this.data).subscribe(
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
 // single: any[];
  view: any[] = [700, 400];
   
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };



  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
