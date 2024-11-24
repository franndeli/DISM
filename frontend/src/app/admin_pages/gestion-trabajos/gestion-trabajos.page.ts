import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/service/api/trabajos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gestion-trabajos',
  templateUrl: './gestion-trabajos.page.html',
  styleUrls: ['./gestion-trabajos.page.scss'],
})
export class GestionTrabajosPage implements OnInit {
  trabajos: any[] = [];

  constructor(private trabajosService: TrabajosService, private route: Router) { }

  ionViewWillEnter() {
    this.ngOnInit();
  }
  
  ngOnInit() {
    const token = localStorage.getItem('token')

    if(token) {
      this.trabajosService.getTrabajos(token).subscribe(
        (response) => {
          // console.log("Trabajos obtenidos", response);
          this.trabajos = response.body;
        }
      )
    }
  }

  crearTrabajo() {
    this.route.navigate(['/admin/crear-trabajo']);
  }

  editarTrabajo(id: number){
    this.route.navigate(['/admin/editar-trabajo', id]);
  }

}
