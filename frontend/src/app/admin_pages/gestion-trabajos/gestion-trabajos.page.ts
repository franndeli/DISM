import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/service/api/trabajos.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-gestion-trabajos',
  templateUrl: './gestion-trabajos.page.html',
  styleUrls: ['./gestion-trabajos.page.scss'],
})
export class GestionTrabajosPage implements OnInit {
  trabajos: any[] = [];

  constructor(
    private alertController: AlertController,
    private toastcontroller: ToastController,
    private trabajosService: TrabajosService,
    private route: Router
  ) { }

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

  async deleteTrabajo(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Está seguro de que desea eliminar este trabajo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            const token = localStorage.getItem('token');
            if (token) {
              this.trabajosService.deleteTrabajos(token, id).subscribe(
                async(response) => {
                  console.log(response);
                  this.trabajos = this.trabajos.filter(trabajo => trabajo.idTrabajo !== id);
                  this.presentToast('Trabajo eliminado con éxito');
                },
                async(error) => {
                  console.error(error);
                  this.presentToast('Error al eliminar el trabajo');
                }
              );
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastcontroller.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
