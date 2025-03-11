// src/app/model/configuracion.model.ts
export class Configuracion {
    constructor(
      public nombre: string,
      public apellido: string,
      public maximo: number,
      public intentos: number
    ) {}
}
  