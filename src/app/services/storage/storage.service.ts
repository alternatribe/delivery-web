import { Inject, Injectable, InjectionToken } from '@angular/core';
import { AsyncSubject } from 'rxjs';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage!: Storage;
  private iniciado = new AsyncSubject<Boolean>();

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {
  }

  public async init() {
    this._storage = this.storage;
    this.iniciado.next(true);
    this.iniciado.complete();
  }

  public async set(key: string, value: any) {
    await this.iniciado.toPromise();
    return this._storage?.setItem(key, value);
  }

  public async get(key: string) {
    await this.iniciado.toPromise();
    return this._storage?.getItem(key);
  }

  public async remove(key: string) {
    await this.iniciado.toPromise();
    return this._storage?.removeItem(key);
  }

  public async clear() {
    await this.iniciado.toPromise();
    return this._storage?.clear();
  }

}
