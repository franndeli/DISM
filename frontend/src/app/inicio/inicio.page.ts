import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class Inicio {

  constructor(private router: Router) {}

  realizarFichaje(){
    this.router.navigate(['usuarios/realizarFichaje']);
  }

  consultarFichaje(){
    this.router.navigate(['usuarios/consultarFichaje']);
  }

}
