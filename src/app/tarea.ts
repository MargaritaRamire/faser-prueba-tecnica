export class Tarea {
    constructor(
      public id: number,
      public titulo: string,
      public minutos: number,
      public selected: boolean = false, // Inicializamos en false
      public destacada: boolean = false, // Inicializamos en false
     
    ) {}
  }
  