import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from 'src/app/models/estado.model';
import { Observable } from 'rxjs';
import { Cidade } from '../../models/cidade.model';
import { of } from 'rxjs';

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

  consultaCEP(cep: string) {

    console.log(cep);

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}
