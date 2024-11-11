import { Component, OnInit } from '@angular/core';
import { FichajesService } from '../../../service/api/fichajes.service';
import { TrabajosService } from '../../../service/api/trabajos.service';
import { ToastController } from '@ionic/angular';

import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-realizarFichaje',
  templateUrl: 'realizarFichaje.page.html',
  styleUrls: ['realizarFichaje.page.scss']
})
export class realizarFichaje implements OnInit {
  fichajes: any[] = [];
  fichajesRaw: any[] = [];

  horasTrabajadas: number = 0;
  horaEntrada: any = '';

  trabajoSeleccionado: number = 0;
  trabajos: any[] = [];

  fechaActual!: string;

  latitud: number = 0;
  longitud: number = 0;

  direccionGeorreferenciada: any;
  urlNomination: any;

  constructor(private fichajesService: FichajesService, private trabajosService: TrabajosService, private toastController: ToastController, private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const idUsuario = localStorage.getItem('idUsuario');

    this.fechaComprobacionRegistro();

    if (token) {
      this.fichajesService.getFichajesUsuario(token, idUsuario!, this.fechaActual, 12, true).subscribe(
        async (response) => {
          console.log('Fichajes obtenidos:', response);
          if(response.body != undefined) {
            this.fichajesRaw = response.body;
            this.fichajes = response.body.map((fichaje: any) => {
              return {
                ...fichaje,
                FechaHoraEntrada: this.convertirFechaFormatoLegible(fichaje.FechaHoraEntrada),
                FechaHoraSalida: fichaje.FechaHoraSalida ? this.convertirFechaFormatoLegible(fichaje.FechaHoraSalida) : null
              };
            });

            if (this.fichajes.length > 0) {
              const ultimoFichaje = this.fichajes[0];

              const mama1 = new Date(ultimoFichaje.FechaHoraEntrada);
              mama1.setHours(mama1.getHours());
              const fechaEntrada = new Date(mama1);

              const fechaActual = new Date(this.fechaActual);

              const diferenciaMilisegundos = fechaActual.getTime() - fechaEntrada.getTime();
              this.horasTrabajadas = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));

              // console.log('Horas trabajadas desde el último registro:', this.horasTrabajadas);
            }

            this.direccionGeorreferenciada = await this.obtenerDireccion(this.fichajesRaw[0].GeolocalizacionLatitud, this.fichajesRaw[0].GeolocalizacionLongitud);
          } else {
            this.trabajosService.getTrabajos(token).subscribe(
              (response) => {
                // console.log("Trabajos obtenidos", response);
                this.trabajos = response.body;
              }
            );
            this.fichajesService.getFichajesUsuario(token, idUsuario!, this.fechaActual, 3490534578943870, true).subscribe(
              (response) => {
                console.log('Fichajes fuera de las 12 horas:', response);
              }
            )
          }
        },
        (error) => {
          console.error('Error al obtener los fichajes:', error);
          // Maneja el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
        }
      );
    } else {
      console.error('Token no encontrado, no se puede obtener fichajes');
    }
  }

  fechaComprobacionRegistro(){
    const fecha = new Date();
    fecha.setHours(fecha.getHours());

    this.fechaActual = fecha.toISOString();
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      color: 'success',
      position: 'middle'
    });
    toast.present();
  }

  finalizarFichaje(){
    const token = localStorage.getItem('token');
    const usuario = parseInt(localStorage.getItem('idUsuario')!);

    const fichaje = this.fichajesRaw[0];

    // console.log(fichaje);

    const fechaAhora = new Date();
    fechaAhora.setHours(fechaAhora.getHours());

    const fecha = fechaAhora.toISOString();

    const fechaArreglada = new Date(fichaje.FechaHoraEntrada);
    fechaArreglada.setHours(fechaArreglada.getHours());

    const mama = fechaArreglada.toISOString();

    // console.log(fichaje);

    if (token) {
      this.fichajesService.putFichajeUsuario(
        token, 
        fichaje.idFichaje, 
        mama,
        fecha,
        this.horasTrabajadas,
        usuario,
        fichaje.idTrabajo,
        fichaje.GeolocalizacionLatitud,
        fichaje.GeolocalizacionLongitud
      ).subscribe(
        (response) => {
          // console.log("Fichaje finalizado", response);
          this.presentToast("Fichaje finalizado con éxito");
          // setTimeout(1500);
          setTimeout (() => location.reload(), 1500);
        },
        (error) => {
          console.error('Error al finalizar el fichaje:', error);
        }
      )
    } else {
      console.error('Token no encontrado, no se puede obtener fichajes');
    }
  }

  async realizarFichaje(){
    const token = localStorage.getItem('token');
    const usuario = parseInt(localStorage.getItem('idUsuario')!);

    await this.locate();

    // const fechaAhora = new Date();
    // fechaAhora.setHours(fechaAhora.getHours() + 1);

    // const fecha = fechaAhora.toISOString();

    const fecha = new Date(this.horaEntrada);
    fecha.setHours(fecha.getHours());

    const fechaISO = fecha.toISOString();

    this.fichajesService.postFichajeUsuario(
      token!,
      fechaISO,
      usuario!,
      this.trabajoSeleccionado,
      this.longitud,
      this.latitud,
    ).subscribe(
      (response) => {
        // console.log("Fichaje realizado:", response)
      }
    )

    location.reload();
  }

  async locate(){
    const coordinates = await Geolocation.getCurrentPosition();

    //Geolocalización
    this.latitud = coordinates.coords.latitude;
    this.longitud = coordinates.coords.longitude;
    // console.log("Posición actual", coordinates);

    // console.log(this.latitud, this.longitud);
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

  // async obtenerDireccion(){
  //   const latitud = this.fichajesRaw[0].GeolocalizacionLatitud
  //   const longitud = this.fichajesRaw[0].GeolocalizacionLongitud

  //   // console.log(latitud, longitud);
  //   //Georreferenciación
  //   this.urlNomination = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='
  //     + latitud + '&lon=' + longitud + '&addressdetails=1';

  //   // console.log(this.urlNomination);

  //   this.http.get(this.urlNomination).subscribe((data: any) => {
  //     this.direccionGeorreferenciada = data.display_name;
  //     // console.log('Address Data', this.direccionGeorreferenciada);
  //   });
  // }

}
