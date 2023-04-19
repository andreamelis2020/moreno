import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipi_contratto } from '../models/data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoContrattoService {

  constructor(private http: HttpClient) { }

  baseURL = 'http://localhost:8080/api/tipi_contratto';

  getData(): Observable<Tipi_contratto[]> {
    return this.http.get<Tipi_contratto[]>(this.baseURL);
  }

  getProducts() {
    return this.http.get<any>(this.baseURL)
      .toPromise()
      .then(res => <Tipi_contratto[]>res.data)
      .then(data => { return data; });
  }

  getEntry(id) {
    return this.http.get<Tipi_contratto>(this.baseURL + "/" + id)
  }

  editEntry = (partner: Tipi_contratto) => {
    return this.http.put(this.baseURL + '/' + partner.id, {
      "id": partner.id,
      "nome": partner.nome

    });
  }

  create = (partner: Tipi_contratto) => {
    return this.http.post<Tipi_contratto>(this.baseURL, {
      "id": partner.id,
      "nome": partner.nome
    });
  };

  deleteNews(id) {
    return this.http.delete(this.baseURL + "/" + id)
  }

  getEntryByComune(partner) {
    return this.http.get<Tipi_contratto>(this.baseURL + "/" + partner)
  }
}