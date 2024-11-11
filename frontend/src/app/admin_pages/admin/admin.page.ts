import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('idUsuario');
            localStorage.removeItem('rol');
            this.router.navigate(['']);
          }
        }
      ]
    });

    await alert.present();
  }
  
  ngOnInit() {
  }

}
