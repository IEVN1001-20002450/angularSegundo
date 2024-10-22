import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  hT: number;
  hP: number;
  hEx: number;
  subtotal: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export default class EmpleadosComponent implements OnInit {
  formGroup: FormGroup;
  empleados: Empleado[] = [];
  totalAPagar: number = 0;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18)]],
      hT: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadEmpleados();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const empleado: Empleado = { ...this.formGroup.value };
      empleado.hP = Math.min(empleado.hT, 40);
      empleado.hEx = Math.max(empleado.hT - 40, 0);
      empleado.subtotal = empleado.hP * 70 + empleado.hEx * 140;

      this.empleados.push(empleado);
      this.saveEmpleados();
      this.formGroup.reset();
    }
  }

  modificarEmpleado() {
    const matriculaModificar = (document.getElementById('matricula_modificar') as HTMLInputElement).value;
    
    // Cambio en la forma de buscar empleado
    const empleadoEncontrado = this.empleados.find(e => e.matricula === matriculaModificar);
    if (empleadoEncontrado) {
      this.formGroup.setValue({ 
        matricula: empleadoEncontrado.matricula, 
        nombre: empleadoEncontrado.nombre, 
        correo: empleadoEncontrado.correo, 
        edad: empleadoEncontrado.edad, 
        hT: empleadoEncontrado.hT 
      });
      this.eliminarEmpleado(); // Eliminar el empleado encontrado para luego agregarlo de nuevo
    } else {
      alert('Empleado no encontrado');
    }
  }

  eliminarEmpleado() {
    const matriculaEliminar = (document.getElementById('matricula_modificar') as HTMLInputElement).value;

    // Cambio en la forma de encontrar y eliminar empleado
    this.empleados = this.empleados.filter(e => e.matricula !== matriculaEliminar);
    
    if (this.empleados.length < this.empleados.length - 1) {
      this.saveEmpleados();
    } else {
      alert('Empleado no encontrado');
    }
  }

  generarTabla() {
    this.calcularTotalAPagar();
  }

  imprimirTabla() {
    window.print();
  }

  private saveEmpleados() {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  private loadEmpleados() {
    const storedEmpleados = localStorage.getItem('empleados');
    if (storedEmpleados) {
      this.empleados = JSON.parse(storedEmpleados);
      this.calcularTotalAPagar();
    }
  }

  private calcularTotalAPagar() {
    this.totalAPagar = this.empleados.reduce((total, empleado) => total + empleado.subtotal, 0);
  }
}
