import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor() {}

  // Para activar el estado de carga
  showLoading() {
    this.loadingSubject.next(true);
  }

  // Para desactivar el estado de carga
  hideLoading() {
    this.loadingSubject.next(false);
  }
}
