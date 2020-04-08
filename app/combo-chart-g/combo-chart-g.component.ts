import { Component, OnInit } from '@angular/core';
import { barChart, lineChartSeries } from './combo-chart-data';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import { formatLabel, escapeLabel } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-combo-chart-g',
  templateUrl: './combo-chart-g.component.html',
  styleUrls: ['./combo-chart-g.component.css']
})
export class ComboChartGComponent implements OnInit {

  //

view = [900,700];
showXAxis = true;
showYAxis = true;
gradient = false;
showLegend = true;
legendTitle = 'Legend';
legendPosition = 'right';
showXAxisLabel = true;
xAxisLabel = 'boutique';
showYAxisLabel = true;
yAxisLabel = 'Pourcentage'//'Pourcentage';
showGridLines = true;
innerPadding = '10%';
animations: boolean = true;
barChart: any[] = barChart;
lineChartSeries: any[] = lineChartSeries;
lineChartScheme = {
  name: 'coolthree',
  selectable: true,
  group: 'Ordinal',
  domain: ['#01579b', '#7aa3e5', '#a8385d', '#00bfa5']
};

comboBarScheme = {
  name: 'singleLightBlue',
  selectable: true,
  group: 'Ordinal',
  domain: ['#01579b']
};

showRightYAxisLabel: boolean = true;
yAxisLabelRight: string =''//= 'Pourcentage';


yLeftAxisScale(min, max) {
  return { min: `${min}`, max: `${max}` };
}

yRightAxisScale(min, max) {
  return { min: `${min}`, max: `${max}` };
}

yLeftTickFormat(data) {
  return `${data.toLocaleString()}`;
}

yRightTickFormat(data) {
  return `${data}`;
}


  constructor() { }

  ngOnInit(): void {
  }

}
