import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';
import { StackedVBarChartComponent } from './stacked-vbar-chart/stacked-vbar-chart.component';
import { HorizBarChartComponent } from './horiz-bar-chart/horiz-bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DragAndDropHorizBarComponent } from './drag-and-drop-horiz-bar/drag-and-drop-horiz-bar.component';
import { FormsModule } from '@angular/forms';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    AreaChartComponent,
    VerticalBarChartComponent,
    StackedVBarChartComponent,
    HorizBarChartComponent,
    LineChartComponent,
    DragAndDropHorizBarComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    DateRangePickerModule ,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
