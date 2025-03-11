import { Component, OnInit } from '@angular/core';
import { Configuracion } from '../modelos/Configuracion';

@Component({
  selector: 'app-juego',
  standalone: false,
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})

export class JuegoComponent implements OnInit {

  nombre: string = '';
  apellido: string = '';
  maximo: number = 0;
  intentos: number = 0;
  juegoIniciado: boolean = false;
  juegoTerminado: boolean = false;
  intentosRestantes: number = 0;

  configuracion!: Configuracion;
  numeroAleatorio: number = 0;
  mensajeFeedback: string = '';
  numeroAdivinar: number | null = null;
  
  
  constructor() {    
  }

  ngOnInit(): void {    
  }

  recogerDatos() {
    
    if(this.intentos > 0 && this.nombre.trim() !== '' && this.apellido.trim() !== '' && this.maximo >= 4) {
      
      this.configuracion = new Configuracion(this.nombre, this.apellido, this.maximo, this.intentos);
      
      this.numeroAleatorio = Math.floor(Math.random() * this.maximo);
      console.log('Configuración:', this.configuracion);
      console.log('Número aleatorio:', this.numeroAleatorio);

      this.juegoIniciado = true;
      this.juegoTerminado = false;
      this.intentosRestantes = this.intentos;
    }
  }  
  
  comprobarNumero() {
    if (this.numeroAdivinar === null || this.numeroAleatorio === null || this.juegoTerminado) {
      return;
    }

    if (this.numeroAdivinar === this.numeroAleatorio) {
      this.mensajeFeedback = 'Has Ganado';
      this.juegoTerminado = true;
    } else {
      this.intentosRestantes--;
      
      if (this.intentosRestantes <= 0) {
        this.mensajeFeedback = `Has agotado tus intentos. El número era: ${this.numeroAleatorio}`;
        this.juegoTerminado = true;
        return;
      }

      if (this.numeroAdivinar > this.numeroAleatorio) {
        this.mensajeFeedback = 'Te pasaste';
      } else {
        const diferencia = this.numeroAleatorio - this.numeroAdivinar;
        if (diferencia === 1) {
          this.mensajeFeedback = 'Caliente';
        } else if (diferencia === 2) {
          this.mensajeFeedback = 'Templado';
        } else if (diferencia >= 3) {
          this.mensajeFeedback = 'Frío';
        }
      }
    }
  }
  
  volverAJugar(): void {
    this.juegoIniciado = false;
    this.juegoTerminado = false;
    
    this.nombre = '';
    this.apellido = '';
    this.maximo = 0;
    this.intentos = 0;
    this.numeroAdivinar = null;
    this.mensajeFeedback = '';
    this.intentosRestantes = 0;    
  }
  
}