import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/service/api/trabajos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-trabajo',
  templateUrl: './crear-trabajo.page.html',
  styleUrls: ['./crear-trabajo.page.scss'],
})
export class CrearTrabajoPage implements OnInit {
  trabajoNombre: string = '';
  trabajoID?: number;

  constructor(private route: Router, private trabajoService: TrabajosService) { }

  ngOnInit() {
  }

  onSubmit() {
    const token = localStorage.getItem('token');

    console.log(this.trabajoID);

    if(token){
      console.log(this.trabajoID);
      this.trabajoService.createTrabajo(token, this.trabajoID, this.trabajoNombre).subscribe(
      async(response) => {
        console.log(response);
        if(response.message === "Trabajo creado con éxito"){
          this.goBack();
        } else {
          console.log('Error al crear el trabajo');
        }
      });
    }
  }

  goBack() {
    this.route.navigate(['/admin/gestion-trabajos']);
  }

}
