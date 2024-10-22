import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface Resistencia {
  banda1: string;
  banda2: string;
  banda3: string;
  tolerancia: string;
  resistencia: number;
  ValorMaximo: number;
  ValorMinimo: number;
}

@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resistencias.component.html',
  styleUrl: './resistencias.component.css'
})
export default class ResistenciaComponent implements OnInit {
  formGroup!: FormGroup;
  resistencias: Resistencia[] = [];
  resistenciasCalculos: Resistencia[] = [];
  mostrarTabla: boolean = false;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
    this. cargarResistencias();
    this.ImprimirResistencias();
  }

  initForm(): FormGroup {
    return this.fb.group({
      banda1: [''],
      banda2: [''],
      banda3: [''],
      tolerancia: ['']
    });
  }

  onSubmit(): void {
    const { banda1, banda2, banda3, tolerancia } = this.formGroup.value;   
    let resistencia = 0;
    let ValorMaximo = 0;
    let ValorMinimo = 0;

    const nuevaResistencia: Resistencia = {
      banda1,
      banda2,
      banda3,
      tolerancia,
      resistencia,
      ValorMaximo,
      ValorMinimo
    };


    this.resistencias.push(nuevaResistencia);
    this.RegistrarResistencias();
    this.formGroup.reset();
  }

  RegistrarResistencias(): void {
    localStorage.setItem("resistencias", JSON.stringify(this.resistencias));
    this.cargarResistencias();
  }

  cargarResistencias(): void {
    const resistenciasGuardadas = localStorage.getItem("resistencias");
    if (resistenciasGuardadas) {
      this.resistencias = JSON.parse(resistenciasGuardadas);
    }
  }


  ImprimirResistencias(): void {
    const resistenciasGuardadas = localStorage.getItem("resistencias");

    if (resistenciasGuardadas)
       {
     var jsconResistencia =  this.resistencias;
     
     this.resistencias.forEach((renglon: Resistencia) =>
     {
      let valor1 = parseInt(renglon.banda1) * 10 + parseInt(renglon.banda2);
      let valor2 = parseInt(renglon.banda3);
      let tolerancia2 = parseFloat(renglon.tolerancia);
      renglon.resistencia = valor1 * valor2;
      renglon.ValorMaximo = renglon.resistencia + (renglon.resistencia * tolerancia2);
      renglon.ValorMinimo = renglon.resistencia - (renglon.resistencia * tolerancia2);
     });
      this.resistenciasCalculos =  jsconResistencia;
    }
  }  
  
  ColorB(codigo: string): string {
    const color:any = {
      '0': 'Negro', '1': 'Marrón', '2': 'Rojo', '3': 'Naranja', '4': 'Amarillo',
      '5': 'Verde', '6': 'Azul', '7': 'Violeta', '8': 'Gris', '9': 'Blanco'
    };
    return color[codigo] || codigo;
  }

  ColorM(valor: string): string {
    const B3:any = {
      '1': 'Negro', '10': 'Marrón', '100': 'Rojo', '1000': 'Naranja',
      '10000': 'Amarillo', '100000': 'Verde', '1000000': 'Azul',
      '10000000': 'Violeta', '100000000': 'Gris', '1000000000': 'Blanco'
    };
    return B3[valor] || valor;
  }

  Tolerancia(valor: string): string {
    return valor === '0.05' ? 'Oro (±5%)' : 'Plata (±10%)';
  }

  toggleTabla(): void {
    this.mostrarTabla = !this.mostrarTabla;
    this.cargarResistencias();
  }
}