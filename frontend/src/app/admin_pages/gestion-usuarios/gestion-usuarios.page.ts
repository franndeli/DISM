import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../service/api/usuarios.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.page.html',
  styleUrls: ['./gestion-usuarios.page.scss'],
})
export class GestionUsuariosPage implements OnInit {
  usuarios: any[] = [];

  constructor(
    private toastcontroller: ToastController, 
    private alertController: AlertController, 
    private usuariosService: UsuariosService, 
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.ngOnInit();
  }
  
  ngOnInit() {
    const token = localStorage.getItem('token')

    if(token){
      this.usuariosService.getUsuarios(token, 'Usuario').subscribe(
        async(response) => {
          // console.log(response.body);
          this.usuarios = response.body;
        }
      )
    }
  }

  createUser() {
    this.router.navigate(['/admin/crear-usuario']);
  }

  editUser(id: number) {
    this.router.navigate(['/admin/editar-usuario', id]);
  }

  async deleteUser(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Está seguro de que desea eliminar este usuario?',
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
              this.usuariosService.deleteUsuario(token, id).subscribe(
                async(response) => {
                  console.log(response);
                  this.usuarios = this.usuarios.filter(usuario => usuario.idUsuario !== id);
                  this.presentToast('Usuario eliminado con éxito');
                },
                async(error) => {
                  console.error(error);
                  this.presentToast('Error al eliminar el usuario');
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
