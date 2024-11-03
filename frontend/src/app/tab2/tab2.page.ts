import { Component, OnInit } from '@angular/core';
import { FichajesService } from '../service/api/fichajes.service';
import { TrabajosService } from '../service/api/trabajos.service';
import { ToastController } from '@ionic/angular';

import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
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
      this.fichajesService.getFichajesUsuario(token, idUsuario!, this.fechaActual, true).subscribe(
        (response) => {
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
              const fechaEntrada = new Date(ultimoFichaje.FechaHoraEntrada);
              const fechaActual = new Date(this.fechaActual);

              const diferenciaMilisegundos = fechaActual.getTime() - fechaEntrada.getTime();
              this.horasTrabajadas = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));

              console.log('Horas trabajadas desde el último registro:', this.horasTrabajadas);
            }
          } else {
            this.trabajosService.getTrabajos(token).subscribe(
              (response) => {
                console.log("Trabajos obtenidos", response);
                this.trabajos = response.body;
              }
            );
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
    fecha.setHours(fecha.getHours() + 1);

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

    const fechaAhora = new Date();
    fechaAhora.setHours(fechaAhora.getHours() + 1);

    const fecha = fechaAhora.toISOString();

    console.log(fichaje);

    if (token) {
      this.fichajesService.putFichajeUsuario(
        token, 
        fichaje.idFichaje, 
        fichaje.FechaHoraEntrada,
        fecha,
        this.horasTrabajadas,
        usuario,
        fichaje.idTrabajo,
        fichaje.GeolocalizacionLatitud,
        fichaje.GeolocalizacionLongitud
      ).subscribe(
        (response) => {
          console.log("Fichaje finalizado", response);
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
        console.log("Fichaje realizado:", response)
      }
    )

    location.reload();
  }

  async locate(){
    const coordinates = await Geolocation.getCurrentPosition();

    //Geolocalización
    this.latitud = coordinates.coords.latitude;
    this.longitud = coordinates.coords.longitude;
    console.log("Posición actual", coordinates);

    //Georreferenciación
    this.urlNomination = 'https://nominatim.openstreetmap.org/reverse?format=json&lat='
      + this.latitud + '&lon=' + this.longitud + '&addressdetails=1';
    
    this.http.get(this.urlNomination).subscribe((data: any) => {
      this.direccionGeorreferenciada = data.display_name;
      console.log('Address Data', this.direccionGeorreferenciada);
    });
  }

}
