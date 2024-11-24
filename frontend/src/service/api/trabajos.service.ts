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

  getTrabajoById(token: string, id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    // console.log(id);
    return this.http.get(`${this.apiUrl}/trabajos/${id}`, { headers });
  }

  updateTrabajo(token: string, id: number, nombre: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    const body = {
      idTrabajo: id,
      nombre: nombre,
    }

    return this.http.put(`${this.apiUrl}/trabajos/${id}`, body, {headers});
  }

  createTrabajo(token:string, id?:number, nombre?: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    const body = {
      idTrabajo: id,
      nombre: nombre,
    }

    return this.http.post(`${this.apiUrl}/trabajos`, body, {headers});
  }
}
