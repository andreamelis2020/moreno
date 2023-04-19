import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruoli } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class RuoloService {
  baseURL = 'http://localhost:8080/api/ruoli';

  constructor(private http: HttpClient) { }

  getData(): Observable<Ruoli[]> {
    return this.http.get<Ruoli[]>(this.baseURL);
  }

  getCustomersLarge2(): Observable<Ruoli[]> {
    return this.http.get<Ruoli[]>(this.baseURL);
}

  getProducts() {
    return this.http.get<any>(this.baseURL)
      .toPromise()
      .then(res => <Ruoli[]>res.data)
      .then(data => { return data; });
  }

  getEntry(userId) {
    return this.http.get<Ruoli>(this.baseURL + "/" + userId)
  }

  deleteNews(id) {
    return this.http.delete(this.baseURL + "/" + id)
  }

  getEntryByComune(comune) {
    return this.http.get<Ruoli>(this.baseURL + "/"  + comune)
  }

  editEntry = (ruolo: Ruoli) => {
    return this.http.put(this.baseURL + '/' + ruolo.userId, {
      "roleId": ruolo.roleId,
      "userId": ruolo.userId
    });
  }

}