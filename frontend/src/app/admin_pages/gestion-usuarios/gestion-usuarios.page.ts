import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../service/api/usuarios.service';
@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.page.html',
  styleUrls: ['./gestion-usuarios.page.scss'],
})
export class GestionUsuariosPage implements OnInit {
  usuarios: any[] = [];

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    const token = localStorage.getItem('token')

    if(token){
      this.usuariosService.getUsuarios(token).subscribe(
        async(response) => {
          this.usuarios = response.body;
        }
      )
    }
  }

}
