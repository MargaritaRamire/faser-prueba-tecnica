import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tareas: Tarea[] = []; // Arreglo para almacenar las tareas
  nuevoTitulo: string = ''; // Título de la nueva tarea
  nuevaDuracion: number | null = null; // Duración de la nueva tarea
  ordenAscendenteTitulo: boolean = true; // Control para ordenación por título
  ordenAscendenteDuracion: boolean = true; // Control para ordenación por duración

  constructor(public service: AppService) {}

  ngOnInit() {
    this.cargarTareas(); // Cargar tareas al iniciar el componente
  }

  cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas'); // Obtener tareas del localStorage
    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas); // Parsear tareas guardadas
    } else {
      this.obtenerTareas(); // Si no hay tareas guardadas, obtener de la API
    }
  }

  async obtenerTareas() {
    this.tareas = await this.service.obtenerTareas(); // Obtener tareas desde el servicio
    this.guardarTareasEnLocalStorage(); // Guardar tareas en localStorage
  }

  agregarTarea() {
    if (this.nuevoTitulo && this.nuevaDuracion) {
      const nuevaTarea = new Tarea(
        this.tareas.length + 1, // ID para la nueva tarea
        this.nuevoTitulo, // Título de la nueva tarea
        this.nuevaDuracion, // Duración de la nueva tarea
        false // Inicializamos la tarea como no seleccionada
      );
      this.tareas.push(nuevaTarea); // Agregar nueva tarea al arreglo
      this.nuevoTitulo = ''; // Limpiar el campo de título
      this.nuevaDuracion = null; // Limpiar el campo de duración

      this.guardarTareasEnLocalStorage(); // Actualizar localStorage al agregar una nueva tarea
    }
  }

  eliminarTareasSeleccionadas() {
    // Filtrar las tareas seleccionadas y actualizarlas en el arreglo
    this.tareas = this.tareas.filter(tarea => !tarea.selected);
    this.guardarTareasEnLocalStorage(); // Actualizar localStorage al eliminar tareas
  }

  // Ordenar tareas por título
  ordenarPorTitulo() {
    this.tareas.sort((a, b) => {
      if (this.ordenAscendenteTitulo) {
        return a.titulo.localeCompare(b.titulo); // Orden ascendente
      } else {
        return b.titulo.localeCompare(a.titulo); // Orden descendente
      }
    });
    this.ordenAscendenteTitulo = !this.ordenAscendenteTitulo; // Alternar estado de orden
  }

  // Ordenar tareas por duración
  ordenarPorDuracion() {
    this.tareas.sort((a, b) => {
      if (this.ordenAscendenteDuracion) {
        return a.minutos - b.minutos; // Orden ascendente
      } else {
        return b.minutos - a.minutos; // Orden descendente
      }
    });
    this.ordenAscendenteDuracion = !this.ordenAscendenteDuracion; // Alternar estado de orden
  }

  toggleSelectAll(seleccionar: boolean) {
    // Cambiar el estado de selección de todas las tareas
    this.tareas.forEach(tarea => tarea.selected = seleccionar);
  }

  guardarTareasEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas)); // Guardar tareas en localStorage
  }
}
