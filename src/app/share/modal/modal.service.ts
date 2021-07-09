import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: any[] = [];
  private _isOpen = new BehaviorSubject<boolean>(false);

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string | undefined) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string) {
    const modal = this.modals.find(x => x.id === id);
    modal.open();
  }

  close(id: string) : Observable<boolean> {
    const modal = this.modals.find(x => x.id === id);
    modal.close();
    this._isOpen.next(true);
    return this._isOpen;
  }
}
