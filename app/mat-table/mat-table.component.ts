import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ItemsService } from '../items.service';
import { RenderService } from '../render.service';

/*export interface PeriodicElement {
  
}

*/
@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent implements OnInit {
  @Output() filteremmiter = new EventEmitter<any>();
  /*let mapOfProducts = new Map();
  mapOfProducts.set('key1', 'value 1');
  mapOfProducts.set('key2', 5);
  console.log(mapOfProducts.get('key1'));
  */
   ELEMENT_DATA = [];
   Column=[]
   displayedColumns: string[] ;
   dataSource: MatTableDataSource<any>;
   @ViewChild('scheduledOrdersPaginator') paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
  constructor(public itemsService: ItemsService,public render:RenderService)
  {
    
  }
  @Input() data: any;
  @Input() dataLineChart: any;

  ngOnInit(): void {
   // console.log(this.data);
  }
  ngOnChanges() {
    console.log(this.data)
    this.Column=[]
    this.displayedColumns=[]

    if (["area","stackv","stackh","line"].indexOf(this.itemsService.data["display"])>0)
    {
      this.displayedColumns.push('/')
        for (let i=0;i<this.data.length;i++)
        {
          for (let j=0;j<this.data[i]["series"].length;j++)
          {
            if (this.Column.indexOf(this.data[i]["series"][j]["name"])===-1)
              this.Column.push(this.data[i]["series"][j]["name"])
          }
          
        }

        console.log("column length"+this.Column.length); // logs undefined
        for (let i=0;i<this.Column.length;i++)
        {
          this.displayedColumns.push(this.Column[i])
        }
      /* for (let i=0;i<this.data.length;i++)
        {
          this.displayedColumns.push(this.data[i]["name"])
        }
        */
        console.log(this.displayedColumns)
        this.ELEMENT_DATA=[]
        for (let i=0;i<this.data.length;i++)
        { 
          let JSON_OBj={}
          for (let j=0;j<this.data[i]["series"].length;j++)
          {
            JSON_OBj["/"]=this.data[i]["name"]
            JSON_OBj[this.data[i]["series"][j]["name"]]=this.data[i]["series"][j]["value"]
          }
          this.ELEMENT_DATA.push(JSON_OBj)
        }
   }
   else if (this.itemsService.data["display"]==="combo")
   {
      console.log(this.dataLineChart)

      this.displayedColumns.push(this.itemsService.data["param1"])
      this.displayedColumns.push(this.itemsService.data["param2"][0]["nom"])
      this.displayedColumns.push(this.itemsService.data["param2"][1]["nom"])
      for (let i=0;i<this.data.length;i++)
      {
       let JSON_OBj={}
       JSON_OBj[this.itemsService.data["param1"]]=this.data[i]["name"]
       JSON_OBj[this.itemsService.data["param2"][0]["nom"]]=this.data[i]["value"]
       JSON_OBj[this.itemsService.data["param2"][1]["nom"]]=this.dataLineChart[0]["series"][i]["value"]
       this.ELEMENT_DATA.push(JSON_OBj)
      }
   }
   else
   {
    this.displayedColumns.push(this.itemsService.data["param1"])
     this.displayedColumns.push(this.itemsService.data["param2"][0]["nom"])
     for (let i=0;i<this.data.length;i++)
     {
      let JSON_OBj={}
      JSON_OBj[this.itemsService.data["param1"]]=this.data[i]["name"]
      JSON_OBj[this.itemsService.data["param2"][0]["nom"]]=this.data[i]["value"]
      this.ELEMENT_DATA.push(JSON_OBj)
     }
   }
    this.dataSource=new MatTableDataSource(this.ELEMENT_DATA);
    setTimeout(() => this.dataSource.paginator = this.paginator);
//this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.render.emitrender()
    }
  

//  displayedColumns: string[] = ['abscisse', 'weight', 'symbol'];

 // dataSource = this.ELEMENT_DATA;

}
