import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from 'src/app/models/estado.model';
import { Observable } from 'rxjs';
import { Cidade } from '../../models/cidade.model';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

const apiIBGE = environment.cidadesEndpoint;
const apiCEP = environment.cepEndpoint;

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  getEstadosJson(): Observable<Estado[]> {
    return this.http.get<Estado[]>('assets/estados.json');
  }

  getMunicipios(id: string): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(apiIBGE + `${id}/municipios`);
  }

  buscaCEP(cep: string) {
    cep = cep.replace(/\D/g, '');
    if (cep !== '') {
      const validacao = /^[0-9]{8}$/;

      if (validacao.test(cep)) {
        return this.http.get(apiCEP + `${cep}/json`);
      }
    }

    return of({});
  }
}
