import { Component, OnInit } from '@angular/core';
import { FichajesService } from 'src/service/api/fichajes.service';
import { UsuariosService } from 'src/service/api/usuarios.service';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as Leaflet from 'leaflet';

import { icon, Marker } from 'leaflet';

@Component({
  selector: 'app-gestion-fichajes',
  templateUrl: './gestion-fichajes.page.html',
  styleUrls: ['./gestion-fichajes.page.scss'],
})
export class GestionFichajesPage implements OnInit {
  fichajes: any[] = [];
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  filtroUsuario: string = '';
  desplegableAbierto: boolean = false;
  usuarioSeleccionado: any = null;

  fechaInicio: string = '';

  token?: any;

  constructor(private fichajesservice: FichajesService, 
    private http: HttpClient, 
    private router: Router,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.token = token;
  
    if (token) {
      this.fichajesservice.getFichajesUsuario(token, '').subscribe(
        async (response) => {
          if (response.body != undefined) {
            this.fichajes = response.body.map((fichaje: any) => {
              return {
                ...fichaje,
                FechaHoraEntrada: this.convertirFechaFormatoLegible(fichaje.FechaHoraEntrada),
                FechaHoraSalida: fichaje.FechaHoraSalida ? this.convertirFechaFormatoLegible(fichaje.FechaHoraSalida) : null,
                direccion: '',
                mostrarMapa: false,
              };
            });
  
            for (let fichaje of this.fichajes) {
              if (fichaje.GeolocalizacionLatitud && fichaje.GeolocalizacionLongitud) {
                fichaje.direccion = await this.obtenerDireccion(
                  fichaje.GeolocalizacionLatitud,
                  fichaje.GeolocalizacionLongitud
                );
              }
            }
          }
        }
      );
  
      this.usuarioService.getUsuarios(token, 'Usuario').subscribe((response) => {
        if (response.body != undefined) {
          this.usuarios = response.body;
          this.usuariosFiltrados = [...this.usuarios]; // Inicializar la lista filtrada
        }
      });
    }
  }
  

  toggleDesplegable() {
    this.desplegableAbierto = !this.desplegableAbierto;
  }

  filtrarUsuarios() {
    // Filtrar usuarios por el término de búsqueda
    const term = this.filtroUsuario.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter((usuario) =>
      usuario.Nombre.toLowerCase().includes(term)
    );
  }

  aplicarFiltros() {
    // Verificar si hay filtros aplicados
    const tieneFiltros = this.usuarioSeleccionado || this.fechaInicio;
  
    if (tieneFiltros) {
      console.log('Filtros aplicados. Ejecutando búsqueda...');
      this.buscarFichajes(); // Llama al método para obtener fichajes filtrados
    } else {
      console.log('Sin filtros aplicados. Obteniendo todos los fichajes...');
      this.ngOnInit(); // Llama al método inicial para obtener todos los fichajes
    }
  }
  

  // seleccionarUsuario(usuario: any) {
  //   console.log(`Usuario seleccionado: ${usuario.Nombre}`);
  //   this.usuarioSeleccionado = usuario;
  //   this.filtroUsuario = usuario.Nombre; 
  //   this.desplegableAbierto = false;
  //   console.log(this.desplegableAbierto);
  // }

  borrarSeleccionUsuario() {
    this.usuarioSeleccionado = null;
    this.filtroUsuario = '';
    console.log('Selección de usuario borrada');
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
      + lon + '&lon=' + lat + '&addressdetails=1';

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

  mostrarMapa(lat: number, long: number, mapId: string) {
    const mapContainer = document.getElementById(mapId);
  
    if (!mapContainer) {
      console.error(`No se encontró el contenedor del mapa con ID: ${mapId}`);
      return;
    }
  
    if (mapContainer.hasChildNodes()) {
      console.log(`El mapa con ID ${mapId} ya está inicializado`);
      return;
    }
  
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
  
    Marker.prototype.options.icon = iconDefault;
  
    const map = Leaflet.map(mapId).setView([long, lat], 8);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© Ionic Leaflet',
    }).addTo(map);
  
    Leaflet.marker([long, lat]).addTo(map)
      .bindPopup('Fichaje realizado aquí')
      .openPopup();
  }
  
  toggleMapa(fichaje: any) {
    const mapId = `mapId-${fichaje.idFichaje}`;
  
    if (!fichaje.mostrarMapa) {
      fichaje.mostrarMapa = true;
  
      setTimeout(() => {
        const mapContainer = document.getElementById(mapId);
        
        if (mapContainer) {
          
          this.mostrarMapa(fichaje.GeolocalizacionLatitud, fichaje.GeolocalizacionLongitud, mapId);
        } else {
          console.error(`No se encontró el contenedor del mapa con ID: ${mapId}`);
        }
      }, 0);
    } else {
      fichaje.mostrarMapa = false;
    }
  }

  actualizarFiltros(tipo: string, valor: any) {
    if (tipo === 'usuario') {
      this.usuarioSeleccionado = valor;
      console.log(`Usuario seleccionado: ${this.usuarioSeleccionado?.Nombre || 'Ninguno'}`);
      this.desplegableAbierto = false;
    } else if (tipo === 'fechaInicio') {
      this.fechaInicio = valor;
      console.log(`Fecha Inicio: ${this.fechaInicio}`);
    }
  
    // Llamar a la lógica de aplicar filtros
    this.aplicarFiltros();
  }
  

  buscarFichajes() {
    console.log('Buscando fichajes con los siguientes filtros:');
    console.log('Usuario:', this.usuarioSeleccionado?.Nombre || 'No seleccionado');
    console.log('Fecha Inicio:', this.fechaInicio || 'No especificada');
  
    const fecha = this.fechaInicio ? new Date(this.fechaInicio).toISOString() : undefined;
    const usuarioId = this.usuarioSeleccionado?.idUsuario || undefined;
  
    this.fichajesservice.getFichajeBuscador(this.token, usuarioId, fecha).subscribe(async (response) => {
      console.log('Datos de fichajes encontrados:', response.body);
  
      // Verifica si `response.body` es un array o un objeto único
      if (Array.isArray(response.body)) {
        this.fichajes = response.body.map((fichaje: any) => this.procesarFichaje(fichaje));
      } else if (response.body && typeof response.body === 'object') {
        this.fichajes = [this.procesarFichaje(response.body)];
      } else {
        console.error('Formato inesperado de la respuesta:', response.body);
        this.fichajes = [];
      }
  
      console.log('Fichajes procesados:', this.fichajes);
    });
  }
  
  // Método para procesar cada fichaje y formatear los campos
  procesarFichaje(fichaje: any): any {
    return {
      ...fichaje,
      FechaHoraEntrada: this.convertirFechaFormatoLegible(fichaje.FechaHoraEntrada),
      FechaHoraSalida: fichaje.FechaHoraSalida
        ? this.convertirFechaFormatoLegible(fichaje.FechaHoraSalida)
        : null,
      direccion: '',
      mostrarMapa: false,
    };
  }
  
  
}
