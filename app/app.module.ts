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
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MatCheckboxModule   } from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatListModule} from '@angular/material/list'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input'; 
import { FlexLayoutModule } from "@angular/flex-layout";
import { StackedHorizbarChartComponent } from './stacked-horizbar-chart/stacked-horizbar-chart.component';
import { ExportPDFComponent } from './export-pdf/export-pdf.component';
import { FilterComponent } from './filter/filter.component';
import { MenuOfChartsComponent } from './menu-of-charts/menu-of-charts.component';
import { AngularSplitModule } from 'angular-split';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularBlockUiDynamicModule } from 'angular-block-ui-dynamic';
import {MatTableModule} from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ComboChartComponent } from './combo-chart/combo-chart.component';
import { ComboSeriesVerticalComponent } from './combo-chart/combo-series-vertical.component';
import { ComboChartGComponent } from './combo-chart-g/combo-chart-g.component';
import { GroupFunctionComponent } from './group-function/group-function.component';
import { MatTableComponent } from './mat-table/mat-table.component';
import { GlobalInformationsComponent } from './global-informations/global-informations.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatSelectModule} from '@angular/material/select'; 
import { MatFormFieldModule } from '@angular/material/form-field';
library.add(fas); 
import {MatNativeDateModule} from '@angular/material/core';
import { FavorisComponent } from './favoris/favoris.component';
import { FilterPipe } from './favoris/filter.pipe';
//import { MatMomentDateModule } from "@angular/material-moment-adapter";

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    AreaChartComponent,
    VerticalBarChartComponent,
    StackedVBarChartComponent,
    HorizBarChartComponent,
    LineChartComponent,
    DragAndDropHorizBarComponent,
    StackedHorizbarChartComponent,
    ExportPDFComponent,
    FilterComponent,
    MenuOfChartsComponent,
    ComboChartComponent,
    ComboSeriesVerticalComponent,
    ComboChartGComponent,
    GroupFunctionComponent,
    MatTableComponent,
    GlobalInformationsComponent,
    FavorisComponent,
    FilterPipe
  ],
  imports: [ 
    BrowserModule,
    MatPaginatorModule,
    AppRoutingModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    DateRangePickerModule ,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule ,
    MatToolbarModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatTableModule,
    MatTableExporterModule,
    AngularBlockUiDynamicModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularSplitModule.forRoot(),
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent] 
})
export class AppModule { }
