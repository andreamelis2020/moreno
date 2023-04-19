import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Partners } from '../models/data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http: HttpClient) { }

  baseURL = 'http://localhost:8080/api/partners';

  getData(): Observable<Partners[]> {
    return this.http.get<Partners[]>(this.baseURL);
  }

  getProducts() {
    return this.http.get<any>(this.baseURL)
      .toPromise()
      .then(res => <Partners[]>res.data)
      .then(data => { return data; });
  }

  getEntry(id) {
    return this.http.get<Partners>(this.baseURL + "/" + id)
  }

  editEntry = (partner: Partners) => {
    return this.http.put(this.baseURL + '/' + partner.id, {
      "id": partner.id,
      "nome": partner.nome

    });
  }

  create = (partner: Partners) => {
    return this.http.post<Partners>(this.baseURL, {
      "id": partner.id,
      "nome": partner.nome
    });
  };

  deleteNews(id) {
    return this.http.delete(this.baseURL + "/" + id)
  }

  getEntryByComune(partner) {
    return this.http.get<Partners>(this.baseURL + "/" + partner)
  }
}