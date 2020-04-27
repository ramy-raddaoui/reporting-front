import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';
import { StackedVBarChartComponent } from './stacked-vbar-chart/stacked-vbar-chart.component';
import { HorizBarChartComponent } from './horiz-bar-chart/horiz-bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AppComponent } from './app.component';
import { DragAndDropHorizBarComponent } from './drag-and-drop-horiz-bar/drag-and-drop-horiz-bar.component';
import { StackedHorizbarChartComponent } from './stacked-horizbar-chart/stacked-horizbar-chart.component';
import { ComboChartGComponent } from './combo-chart-g/combo-chart-g.component';
import { MatTableComponent } from './mat-table/mat-table.component';


const routes: Routes = [
  {path: '' , component: AppComponent },
  {path: 'pie' , component: PieChartComponent },
  {path: 'area' , component: AreaChartComponent },
  {path: 'vbarchart' , component: VerticalBarChartComponent },
  {path: 'stackv' , component: StackedVBarChartComponent },
  {path: 'stackv/:id' , component: StackedVBarChartComponent },
  {path: 'shbarchart' , component: StackedHorizbarChartComponent},
  {path: 'horizbarchart' , component: HorizBarChartComponent },
  {path: 'line' , component: LineChartComponent },
  {path: 'combo' , component: ComboChartGComponent },
  {path: 'dragdrop' , component: DragAndDropHorizBarComponent },
  {path: 'matable' , component: MatTableComponent },




  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
