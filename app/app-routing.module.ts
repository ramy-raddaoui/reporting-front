import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';
import { StackedVBarChartComponent } from './stacked-vbar-chart/stacked-vbar-chart.component';
import { HorizBarChartComponent } from './horiz-bar-chart/horiz-bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';


const routes: Routes = [
  {path: '' , component: PieChartComponent },
  {path: 'pie' , component: PieChartComponent },
  {path: 'area' , component: AreaChartComponent },
  {path: 'vbarchart' , component: VerticalBarChartComponent },
  {path: 'svbarchart' , component: StackedVBarChartComponent },
  {path: 'horizbarchart' , component: HorizBarChartComponent },
  {path: 'linechart' , component: LineChartComponent },


  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
