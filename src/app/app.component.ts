import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tareas: Tarea[] = [];
  nuevoTitulo: string = '';
  nuevaDuracion: number | null = null;
  ordenAscendente: boolean = true;

  constructor(public service: AppService) {}

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas);
    } else {
      this.obtenerTareas(); // Si no hay tareas guardadas, obtener de la API
    }
  }

  async obtenerTareas() {
    this.tareas = await this.service.obtenerTareas();
    this.guardarTareasEnLocalStorage(); // Guardar tareas en localStorage
  }

  toggleSelectAll(seleccionar: boolean) {
    this.tareas.forEach(tarea => tarea.selected = seleccionar);
  }

  guardarTareasEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }
}
