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
  ordenAscendenteDuracion: boolean = true; // Nueva variable para el orden de duración

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

  agregarTarea() {
    if (this.nuevoTitulo && this.nuevaDuracion) {
      const nuevaTarea = new Tarea(
        this.tareas.length + 1, // ID para la nueva tarea
        this.nuevoTitulo,
        this.nuevaDuracion,
        false // Inicializamos la tarea como no seleccionada
      );
      this.tareas.push(nuevaTarea);
      this.nuevoTitulo = '';
      this.nuevaDuracion = null;

      this.guardarTareasEnLocalStorage(); // Actualizar localStorage al agregar una nueva tarea
    }
  }

  eliminarTareasSeleccionadas() {
    this.tareas = this.tareas.filter(tarea => !tarea.selected);
    this.guardarTareasEnLocalStorage(); // Actualizar localStorage al eliminar tareas
  }

  ordenarPorTitulo() {
    this.tareas.sort((a, b) => {
      if (this.ordenAscendente) {
        return a.titulo.localeCompare(b.titulo);
      } else {
        return b.titulo.localeCompare(a.titulo);
      }
    });
    this.ordenAscendente = !this.ordenAscendente;
  }

  ordenarPorDuracion() {
    this.tareas.sort((a, b) => {
      if (this.ordenAscendenteDuracion) {
        return a.minutos - b.minutos; // Orden ascendente
      } else {
        return b.minutos - a.minutos; // Orden descendente
      }
    });
    this.ordenAscendenteDuracion = !this.ordenAscendenteDuracion; // Alternar la dirección del orden
  }

  destacarTareas() {
    const hayDestacadas = this.tareas.some(tarea => tarea.destacada);

    this.tareas.forEach(tarea => {
      if (tarea.selected) {
        tarea.destacada = !hayDestacadas; // Alterna el estado de destacada
      }
    });

    this.guardarTareasEnLocalStorage(); // Actualizar localStorage al cambiar el estado de las tareas
  }

  ordenarAleatoriamente() {
    this.tareas.sort(() => Math.random() - 0.5);
  }

  toggleSelectAll(seleccionar: boolean) {
    this.tareas.forEach(tarea => tarea.selected = seleccionar);
  }

  guardarTareasEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }
}
