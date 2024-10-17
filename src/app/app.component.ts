import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tareas: Tarea[] = []; // Array que contiene las tareas
  nuevoTitulo: string = ''; // Título de la nueva tarea
  nuevaDuracion: number | null = null; // Duración de la nueva tarea
  ordenAscendente: boolean = true; // Orden de las tareas

  constructor(public service: AppService) {}

  ngOnInit() {
    this.cargarTareas(); // Cargar tareas al iniciar el componente
  }

  cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas); // Cargar tareas del localStorage si existen
    } else {
      this.obtenerTareas(); // Obtener tareas de la API si no hay guardadas
    }
  }

  async obtenerTareas() {
    this.tareas = await this.service.obtenerTareas();
    this.guardarTareasEnLocalStorage(); // Guardar tareas en localStorage
  }

  agregarTarea() {
    if (this.nuevoTitulo && this.nuevaDuracion) {
      const nuevaTarea = new Tarea(
        this.tareas.length + 1, // ID para la nueva tarea
        this.nuevoTitulo,
        this.nuevaDuracion,
        false // Inicializamos la tarea como no seleccionada
      );
      this.tareas.push(nuevaTarea); // Agregar la nueva tarea al array
      this.nuevoTitulo = ''; // Limpiar el input del título
      this.nuevaDuracion = null; // Limpiar el input de duración

      this.guardarTareasEnLocalStorage(); // Actualizar localStorage
    }
  }

  eliminarTareasSeleccionadas() {
    // Filtrar las tareas seleccionadas y eliminar del array
    this.tareas = this.tareas.filter(tarea => !tarea.selected);
    this.guardarTareasEnLocalStorage(); // Actualizar localStorage después de eliminar
  }

  toggleSelectAll(seleccionar: boolean) {
    // Marcar o desmarcar todas las tareas
    this.tareas.forEach(tarea => tarea.selected = seleccionar);
  }

  guardarTareasEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas)); // Guardar tareas en localStorage
  }
}
