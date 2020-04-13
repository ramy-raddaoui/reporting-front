import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
   dataSource: any;
  @Input() data: any;
  ngOnInit(): void {
    console.log(this.data);
  }
  ngOnChanges() {
    this.Column=[]
    this.displayedColumns=[]
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
    this.dataSource=this.ELEMENT_DATA;
    }
  

//  displayedColumns: string[] = ['abscisse', 'weight', 'symbol'];

 // dataSource = this.ELEMENT_DATA;

}
