import { Component, OnInit } from '@angular/core';
import { FichajesService } from 'src/service/api/fichajes.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestion-fichajes',
  templateUrl: './gestion-fichajes.page.html',
  styleUrls: ['./gestion-fichajes.page.scss'],
})
export class GestionFichajesPage implements OnInit {

  fichajes: any[] = [];

  constructor(private fichajesservice: FichajesService, private http: HttpClient) { }

  ngOnInit() {
    const token = localStorage.getItem('token');

    if(token){
      this.fichajesservice.getFichajesUsuario(token, '').subscribe(
        async(response) => {
          console.log('Fichajes obtenidos', response);
          if (response.body != undefined){
            this.fichajes = response.body.map((fichaje: any) => {
              return {
                ...fichaje,
                FechaHoraEntrada: this.convertirFechaFormatoLegible(fichaje.FechaHoraEntrada),
                FechaHoraSalida: fichaje.FechaHoraSalida ? this.convertirFechaFormatoLegible(fichaje.FechaHoraSalida) : null,
                direccion: ''
              };
            });

            for (let fichaje of this.fichajes) {
              if (fichaje.GeolocalizacionLatitud && fichaje.GeolocalizacionLongitud) {
                fichaje.direccion = await this.obtenerDireccion(
                  fichaje.GeolocalizacionLatitud,
                  fichaje.GeolocalizacionLongitud
                );
              }
              // console.log(fichaje);
            }
          }
        }
      )
    }
  }

  convertirFechaFormatoLegible(fecha: string): string {
    const date = new Date(fecha);
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const día = String(date.getDate()).padStart(2, '0');
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');
  
    return `${año}-${mes}-${día} ${horas}:${minutos}:${segundos}`;
  }

  async obtenerDireccion(lat: number, lon: number): Promise<string> {
    const urlNom = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='
      + lat + '&lon=' + lon + '&addressdetails=1';

    // console.log(urlNom);

    return new Promise((resolve, reject) => {
      this.http.get(urlNom).subscribe(
        (data: any) => {
          const direccion = data.display_name || 'Dirección no disponible';
          resolve(direccion);
        },
        (error) => {
          console.error('Error al obtener la dirección:', error);
          resolve('Error al obtener la dirección');
        }
      );
    });
  }

  editarFichaje(fichaje: any){

  }

}
