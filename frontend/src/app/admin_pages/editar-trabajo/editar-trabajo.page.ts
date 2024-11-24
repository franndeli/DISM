import { Component, OnInit } from '@angular/core';
import { TrabajosService } from 'src/service/api/trabajos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-trabajo',
  templateUrl: './editar-trabajo.page.html',
  styleUrls: ['./editar-trabajo.page.scss'],
})
export class EditarTrabajoPage implements OnInit {
  nombre: string = '';
  trabajoID!: number;

  constructor(private trabajoService: TrabajosService, 
    private route: ActivatedRoute,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    if (id) {
      this.trabajoID = +id;
    } else {
      // Handle the case when id is null
      this.presentToast('Error: ID de usuario no encontrado');
      this.goBack();
    }
    this.loadTrabajoData();
  }

  loadTrabajoData() {
    const token = localStorage.getItem('token');
    if (token) {
      // console.log(this.trabajoID);
      this.trabajoService.getTrabajoById(token, this.trabajoID).subscribe(
        async (response) => {
          // console.log(response);
          const user = response.body;
          this.nombre = user[0].Nombre;
        }
      );
    }
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.trabajoService.updateTrabajo(token, this.trabajoID, this.nombre).subscribe(
        async (response) => {
          // console.log(response);
          if (response.message === "Trabajo modificado con éxito") {
            this.presentToast('Trabajo actualizado con éxito');
            this.goBack();
          } else {
            this.presentToast('Error al actualizar el trabajo');
          }
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/admin/gestion-trabajos']);
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
