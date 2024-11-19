import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getUsuarios(token: string, role: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    
    return this.http.get(`${this.apiUrl}/usuarios`, {headers} );
  }
}
