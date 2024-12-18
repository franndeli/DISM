import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/api/login.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) {}
  
  ngOnInit(): void {
   if(localStorage.getItem('idUsuario')){
    localStorage.removeItem('idUsuario')
   }
   if(localStorage.getItem('token')){
    localStorage.removeItem('token')
   }
   if(localStorage.getItem('rol')){
    localStorage.removeItem('rol')
   }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
  }

  login() {
    this.authService.login({ usuario: this.username, clave: this.password })
      .subscribe(
        (response) => {
          if(response.id == undefined){
            this.presentToast(response.message);
          } else {
            // console.log('Login:', response);
          
            localStorage.setItem('idUsuario', response.id);
            localStorage.setItem('token', response.token); 
            localStorage.setItem('rol', response.role); 
            
            if(response.role === 'Usuario'){
              this.router.navigate(['usuarios']);
            }
            else {
              this.router.navigate(['admin']);
            }
          } 
        },
        (error) => {
          console.error('Error en el login:', error);
        }
      );
  }
}
