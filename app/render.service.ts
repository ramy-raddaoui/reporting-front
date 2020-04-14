import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
  renderSubject = new Subject<any[]>();

  
  emitrender() {
    this.renderSubject.next();
  }
  constructor() { }


}
