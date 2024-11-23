import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../service/api/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.page.html',
  styleUrls: ['./gestion-usuarios.page.scss'],
})
export class GestionUsuariosPage implements OnInit {
  usuarios: any[] = [];

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ionViewWillEnter() {
    this.ngOnInit();
  }
  
  ngOnInit() {
    const token = localStorage.getItem('token')

    if(token){
      this.usuariosService.getUsuarios(token, 'Usuario').subscribe(
        async(response) => {
          console.log(response.body);
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

}
