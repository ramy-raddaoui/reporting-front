import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';


const routes: Routes = [
  {path: '' , component: PieChartComponent },
  {path: 'pie' , component: PieChartComponent },
  {path: 'area' , component: AreaChartComponent },
  {path: 'vbarchart' , component: VerticalBarChartComponent },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
