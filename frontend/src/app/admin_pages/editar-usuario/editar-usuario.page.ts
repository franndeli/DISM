import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../service/api/usuarios.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {
  idUsuario!: number;
  nombre: string = '';
  usuario: string = '';
  clave: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuariosService: UsuariosService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    if (id) {
      this.idUsuario = +id;
    } else {
      // Handle the case when id is null
      this.presentToast('Error: ID de usuario no encontrado');
      this.goBack();
    }
    this.loadUserData();
  }

  loadUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      this.usuariosService.getUsuarioById(token, this.idUsuario).subscribe(
        async (response) => {
          // console.log(response);
          const user = response.body;
          this.nombre = user.Nombre;
          this.usuario = user.Usuario;
          this.clave = user.Clave;
        }
      );
    }
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.usuariosService.updateUsuario(token, this.idUsuario, this.nombre, this.usuario, this.clave).subscribe(
        async (response) => {
          // console.log(response);
          if (response.message === "Usuario modificado con éxito") {
            this.presentToast('Usuario actualizado con éxito');
            this.goBack();
          } else {
            this.presentToast('Error al actualizar el usuario');
          }
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/admin/gestion-usuarios']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }
}
