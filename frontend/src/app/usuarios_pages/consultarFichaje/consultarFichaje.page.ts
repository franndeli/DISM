import { Component, OnInit } from '@angular/core';
import { FichajesService } from '../../../service/api/fichajes.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultarFichaje',
  templateUrl: './consultarFichaje.page.html',
  styleUrls: ['./consultarFichaje.page.scss']
})
export class consultarFichaje implements OnInit {
  fichajes: any[] = [];

  latitud: number = 0;
  longitud: number = 0;

  fechaActual!: string;
  dia: any;
  mes: any;

  direccionGeorreferenciada: any;
  urlNom: any;

  constructor(private fichajesService: FichajesService, private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const idUsuario = localStorage.getItem('idUsuario');

    this.fechaComprobacionRegistro();
    this.setFecha();

    const hora = parseInt(this.fechaActual.split('T')[1].split('.')[0]);

    if (token) {
      this.fichajesService.getFichajesUsuario(token, idUsuario!, this.fechaActual, hora).subscribe(
        async (response) => {
          if(response.body != undefined) {
            console.log('Fichajes obtenidos:', response);
            this.fichajes = response.body.map((fichaje: any) => ({
              ...fichaje,
              FechaHoraEntrada: this.convertirFechaFormatoLegible(fichaje.FechaHoraEntrada),
              FechaHoraSalida: fichaje.FechaHoraSalida ? this.convertirFechaFormatoLegible(fichaje.FechaHoraSalida) : null,
              direccion: ''
            }));

            // Iterar sobre los fichajes y obtener la dirección
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
        },
        (error) => {
          console.error('Error al obtener los fichajes:', error);
        }
      );
    } else {
      console.error('Token no encontrado, no se puede obtener fichajes');
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

  fechaComprobacionRegistro(){
    const fecha = new Date();
    fecha.setHours(fecha.getHours());

    this.fechaActual = fecha.toISOString();
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

  setFecha() {
    const fecha = new Date();
    this.dia = String(fecha.getDate()).padStart(2, '0');
    
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    this.mes = meses[fecha.getMonth()];
  }
}
