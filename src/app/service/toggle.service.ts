import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

export enum Toggable {
  Quickview = 'quickview',
}

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private elements: Map<Toggable, Subject<boolean>> = new Map<Toggable, Subject<boolean>>([
      [Toggable.Quickview, new BehaviorSubject<boolean>(false)]
    ]);
  constructor() { }

  toggle(element: Toggable): void {
    this.elements.get(element).next(!(this.elements.get(element) as any)._value);
  }

  visible(element: Toggable): Observable<boolean> {
    return this.elements.get(element).asObservable();
  }
}
