import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.page.html',
  styleUrls: ['./inicio-admin.page.scss'],
})
export class InicioAdminPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  gestionarFichajes(){
    this.route.navigate(['admin/gestion-fichajes']);
  }

  gestionarTrabajos(){
    this.route.navigate(['admin/gestion-trabajos']);
  }

  gestionarUsuarios(){
    this.route.navigate(['admin/gestion-usuarios']);
  }

}
