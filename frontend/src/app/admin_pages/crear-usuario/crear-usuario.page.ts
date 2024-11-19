import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../service/api/usuarios.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {
  id?: number;
  nombre: string = '';
  usuario: string = '';
  clave: string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private toastController: ToastController
  ) { 
  }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit() {
    const token = localStorage.getItem('token');

    if(token){
      this.usuarioService.postUsuario(token, this.id ?? 0, this.nombre, this.usuario, this.clave ).subscribe(
      async(response) => {
        console.log(response);
        if(response.message === "Usuario creado con éxito"){
          this.goBack();
        } else {
          this.presentToast('Error al crear el usuario');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/admin/gestion-usuarios']);
  }

  private resetForm() {
    this.id = undefined;
    this.nombre = '';
    this.usuario = '';
    this.clave = '';
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: "El ID del usuario ya existe",
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
  }
}
