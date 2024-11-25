import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosPage } from '../../app/usuarios_pages/usuarios/usuarios.page';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getUsuarios(token: string, role: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const params = new HttpParams().set('rol', role);

    return this.http.get(`${this.apiUrl}/usuarios`, { headers, params });
  }

  getUsuarioById(token: string, id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    return this.http.get(`${this.apiUrl}/usuarios/${id}`, { headers });
  }

  postUsuario(
    token: string,
    id: number,
    nombre: string, 
    usuario: string,
    clave: string,
  ): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    const body = {
      idUsuario: id,
      Nombre: nombre,
      Usuario: usuario,
      Clave: clave,
    }

    return this.http.post(`${this.apiUrl}/usuarios`, body, { headers });
  }

  updateUsuario(
    token: string,
    id: number,
    nombre: string,
    usuario: string,
    clave: string,
  ): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    const body = {
      Nombre: nombre,
      Usuario: usuario,
      Clave: clave,
    }
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, body, { headers });
  }

  deleteUsuario(token: string, id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    
    let url = `${this.apiUrl}/usuarios`;

    if(id){
      url += `?idUsuario=${encodeURIComponent(id)}`;
    }

    return this.http.delete(url, { headers });
  }
}
