import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/service/api/trabajos.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-trabajo',
  templateUrl: './crear-trabajo.page.html',
  styleUrls: ['./crear-trabajo.page.scss'],
})
export class CrearTrabajoPage implements OnInit {
  trabajoNombre: string = '';
  trabajoID?: number;

  constructor(private toastController: ToastController, private route: Router, private trabajoService: TrabajosService) { }
  
  ionViewWillEnter() {
    this.ngOnInit();
  }
  
  ngOnInit() {
    this.trabajoNombre = '';
    this.trabajoID = undefined;
  }

  onSubmit() {
    const token = localStorage.getItem('token');

    // console.log(this.trabajoID);

    if(token){
      // console.log(this.trabajoID);
      this.trabajoService.createTrabajo(token, this.trabajoID, this.trabajoNombre).subscribe(
      async(response) => {
        // console.log(response);
        if(response.message === "Trabajo creado con éxito"){
          this.presentToastBien('Trabajo creado con éxito');
          this.goBack();
        } else {
          this.presentToastMal('El ID del nuevo trabajo ya existe');
          // console.log('Error al crear el trabajo');
        }
      });
    }
  }

  goBack() {
    this.route.navigate(['/admin/gestion-trabajos']);
  }

  async presentToastBien(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  async presentToastMal(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
  }

}
