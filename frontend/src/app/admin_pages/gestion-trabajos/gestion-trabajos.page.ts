import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/service/api/trabajos.service';
@Component({
  selector: 'app-gestion-trabajos',
  templateUrl: './gestion-trabajos.page.html',
  styleUrls: ['./gestion-trabajos.page.scss'],
})
export class GestionTrabajosPage implements OnInit {
  trabajos: any[] = [];

  constructor(private trabajosService: TrabajosService) { }

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

}
