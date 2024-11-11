import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getTrabajos(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get(`${this.apiUrl}/trabajos`, {headers} );
  }
}
