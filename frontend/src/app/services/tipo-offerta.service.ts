import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipi_offerta } from '../models/data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoOffertaService {

  constructor(private http: HttpClient) { }

  baseURL = 'http://localhost:8080/api/tipi_offerta';

  getData(): Observable<Tipi_offerta[]> {
    return this.http.get<Tipi_offerta[]>(this.baseURL);
  }

  getProducts() {
    return this.http.get<any>(this.baseURL)
      .toPromise()
      .then(res => <Tipi_offerta[]>res.data)
      .then(data => { return data; });
  }

  getEntry(id) {
    return this.http.get<Tipi_offerta>(this.baseURL + "/" + id)
  }

  editEntry = (partner: Tipi_offerta) => {
    return this.http.put(this.baseURL + '/' + partner.id, {
      "id": partner.id,
      "nome": partner.nome

    });
  }

  create = (partner: Tipi_offerta) => {
    return this.http.post<Tipi_offerta>(this.baseURL, {
      "id": partner.id,
      "nome": partner.nome
    });
  };

  deleteNews(id) {
    return this.http.delete(this.baseURL + "/" + id)
  }

  getEntryByComune(partner) {
    return this.http.get<Tipi_offerta>(this.baseURL + "/" + partner)
  }
}