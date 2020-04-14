import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import html2canvas from 'html2canvas';
@Injectable({
  providedIn: 'root'
})
export class RenderService {
  renderSubject = new Subject<any[]>();
  docDefinition: any;

  
  emitrender() {
    this.renderSubject.next();
  }
  constructor() { }

  updaterenderedChart()
  {
    
  }
}
