import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
declare var pdfMake: any;
@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.css']
})
export class ExportPDFComponent implements OnInit {
  docDefinition: any;
  constructor() { }

  ngOnInit(): void {

  
    setTimeout(() => {
      // Charts are now rendered
      const chart = document.getElementById('chart');
      html2canvas(chart, {
        height: 1000,
        width: 1000,
        scale: 3,
        backgroundColor: null,
        logging: false,
        onclone: (document) => {
          document.getElementById('chart').style.visibility = 'visible';
        }
      }).then((canvas) => {
        // Get chart data so we can append to the pdf
        const chartData = canvas.toDataURL();
        // Prepare pdf structure
        const docDefinition = { content: [],
          styles: {
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5],
              alignment: 'left'
            },
            subsubheader: {
              fontSize: 12,
              italics: true,
              margin: [0, 10, 0, 25],
              alignment: 'left'
            }
          },
          defaultStyle: {
            // alignment: 'justify'
          }
        };

        // Add some content to the pdf
        const title = {text: 'Résultat de votre export en PDF', style: 'subheader'};
        const description = {text: 'Vous trouver ci dessous l\'objet exporté', style: 'subsubheader'};
        docDefinition.content.push(title);
        docDefinition.content.push(description);
        // Push image of the chart
        docDefinition.content.push({image: chartData, width: 600});
        this.docDefinition = docDefinition;
        // pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');
      });
    }, 2000);
  }

  rederBarChart(){
    html2canvas(document.getElementById('barChart'), {height: 500})
      .then((canvas) => {
        document.body.appendChild(canvas);
      })
  }
  
    rederGroupedBarChart(){
      html2canvas(document.getElementById('groupedBarChart'), {height: 500})
        .then((canvas) => {
          document.body.appendChild(canvas);
        });
    }
  
    downloadChart() {
      // Download PDF
      if (this.docDefinition) {
          pdfMake.createPdf(this.docDefinition).download('chartToPdf' + '.pdf');
      } else {
        console.log('Chart is not yet rendered!');
      }
  
    }

}
