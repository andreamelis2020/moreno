import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Campagne } from '../models/data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampagnaService {

  constructor(private http: HttpClient) { }

  baseURL = 'http://localhost:8080/api/campagne';

  getData(): Observable<Campagne[]> {
    return this.http.get<Campagne[]>(this.baseURL);
  }

  getProducts() {
    return this.http.get<any>(this.baseURL)
      .toPromise()
      .then(res => <Campagne[]>res.data)
      .then(data => { return data; });
  }

  getEntry(id) {
    return this.http.get<Campagne>(this.baseURL + "/" + id)
  }

  editEntry = (partner: Campagne) => {
    return this.http.put(this.baseURL + '/' + partner.id, {
      "id": partner.id,
      "nome": partner.nome
    });
  }

  create = (partner: Campagne) => {
    return this.http.post<Campagne>(this.baseURL, {
      "id": partner.id,
      "nome": partner.nome
    });
  };

  deleteNews(id) {
    return this.http.delete(this.baseURL + "/" + id)
  }

  getEntryByComune(partner) {
    return this.http.get<Campagne>(this.baseURL + "/" + partner)
  }
}