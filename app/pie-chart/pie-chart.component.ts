import { Component, NgModule, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
import { BrowserModule } from '@angular/platform-browser';
import { RESTService } from '../rest.service';
import { HttpHeaders } from '@angular/common/http';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
   single = [];
    data = {};
 dataSubscription: Subscription;
 // single: any[];
 view: any[] = [900, 600];
   
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
 constructor( 
    public restapi:RESTService,
    public itemsService: ItemsService
  ) {
    Object.assign(this, { single });
  }

  


  /*
  @ViewChild('content') content:ElementRef
  downloadPDF()
  {
    setTimeout(()=>{    //<<<---    using ()=> syntax
      
 }, 5000);
    let doc=new jsPDF()
    let specialElementHandlers= {
      '#editor': function(element,renderer){
      return true;
    }
  };
  let content=this.content.nativeElement;
  doc.fromHTML(content.innerHTML,30,30,{
    'width': 500,
    'elementHandlers': specialElementHandlers
  });
  doc.save('report.pdf');
}
*/


  ngOnInit() {
    this.itemsService.data["display"]="pie";
    this.dataSubscription = this.itemsService.dataSubject.subscribe(
      (data: any) => {
        if (this.itemsService.can_send_api_request)
        {
        this.itemsService.data["display"]="pie";
        this.getPieChartData()
        }
        else
        console.log("Sorry !!!! I can't SEND API REQUEST")
      }
      );
      this.itemsService.emitData();  
    }

  ngOnDestroy()
  {
  }
 
  getPieChartData()
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

}
