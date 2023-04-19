import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permessi } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class PermessoService {
  baseURL = 'http://localhost:8080/api/permesso';

  constructor(private http: HttpClient) { }

  getData(): Observable<Permessi[]> {
    return this.http.get<Permessi[]>(this.baseURL);
  }

  getCustomersLarge2(): Observable<Permessi[]> {
    return this.http.get<Permessi[]>(this.baseURL);
}

  getProducts() {
    return this.http.get<any>(this.baseURL)
      .toPromise()
      .then(res => <Permessi[]>res.data)
      .then(data => { return data; });
  }

  getEntry(id) {
    return this.http.get<Permessi>(this.baseURL + "/" + id)
  }

  deleteNews(id) {
    return this.http.delete(this.baseURL + "/" + id)
  }

  getEntryByComune(comune) {
    return this.http.get<Permessi>(this.baseURL + "/"  + comune)
  }

}