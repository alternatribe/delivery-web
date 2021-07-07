import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from 'src/app/models/estado.model';
import { Observable } from 'rxjs';
import { Cidade } from '../../models/cidade.model';

const apiUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(apiUrl);
  }

  getMunicipios(id: string): Observable<Cidade> {
    return this.http.get<Cidade>(apiUrl + `${id}/municipios`);
  }
}
