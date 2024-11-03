import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichajesService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getFichajesUsuario(token: string, idUsuario: string, FechaHoraInicio?: string, buscarFechaFinNula: boolean = false): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    
    let url = `${this.apiUrl}/fichajes?idUsuario=${encodeURIComponent(idUsuario)}`;
    
    if (FechaHoraInicio) {
      url += `&fechaInicio=${encodeURIComponent(FechaHoraInicio)}`;
    }

    if (buscarFechaFinNula) {
      url += `&fechaFinIsNull=true`;
    }

    return this.http.get(url, { headers });
  }

  putFichajeUsuario(
    token: string,
    idFichaje: string,
    fechaEntrada: string, 
    fechaSalida: string,
    horasTrabajadas: number,
    idUsuario: number, 
    idTrabajo: number, 
    geolocalizacionLongitud: number, 
    geolocalizacionLatitud: number 
  ){
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    const body = {
      fechaHoraEntrada: fechaEntrada,
      fechaHoraSalida: fechaSalida,
      horasTrabajadas: horasTrabajadas,
      idUsuario: idUsuario,
      idTrabajo: idTrabajo,
      geolocalizacionLatitud: geolocalizacionLatitud,
      geolocalizacionLongitud: geolocalizacionLongitud
    }

    console.log(body);

    return this.http.put(`${this.apiUrl}/fichajes/${idFichaje}`, body, { headers } )
  }

  postFichajeUsuario(token: string, fechaEntrada: string, idUsuario: string, idTrabajo: string, geolocalizacionLongitud: number, geolocalizacionLatitud: number ){
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    const body = {
      fechaHoraEntrada: fechaEntrada,
      idUsuario: idUsuario,
      idTrabajo: idTrabajo,
      geolocalizacionLatitud: geolocalizacionLatitud,
      geolocalizacionLongitud: geolocalizacionLongitud
    }

    return this.http.post(`${this.apiUrl}/fichajes`, body, { headers } )
  }
}
