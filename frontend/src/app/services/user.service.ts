import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utenti } from '../models/data.model';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getModOrAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'modOrAdmin', { responseType: 'text' });
  }

  getBossOrDeveloperBoard(): Observable<any> {
    return this.http.get(API_URL + 'bossOrDeveloper', { responseType: 'text' });
  }

  getData(): Observable<Utenti[]> {
    return this.http.get<Utenti[]>(API_URL);
  }
  
  eliminaAccount(id) {
    return this.http.delete(API_URL + "elimina/" + id)
  }

}
