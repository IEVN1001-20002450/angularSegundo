import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './empleados.component.html',
  styles: ``
})
export default class EmpleadosComponent {
  empleados: any[] = [];
  formGroup: FormGroup;
  mostrarTabla = false;
  matriculaAccion = '';
  editMode = false;
  empleadoEditIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    const storedEmpleados = localStorage.getItem('empleados');
    if (storedEmpleados) {
      this.empleados = JSON.parse(storedEmpleados);
    }

    this.formGroup = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18)]],
      horasTrabajadas: ['', [Validators.required, Validators.min(0)]],
    });
  }

  registrarEmpleado() {
    const empleadoExistente = this.empleados.find(emp => emp.matricula === this.formGroup.value.matricula);

    if (!this.editMode && empleadoExistente) {
      alert('La matrícula ya existe.');
      return;
    }

    const empleado = this.crearEmpleado(this.formGroup.value);

    if (this.editMode && this.empleadoEditIndex !== null) {
      this.empleados[this.empleadoEditIndex] = empleado;
      this.editMode = false;
      this.empleadoEditIndex = null;
    } else {
      this.empleados.push(empleado);
    }

    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    this.formGroup.reset();
  }

  crearEmpleado(data: any) {
    const horasExtras = data.horasTrabajadas > 40 ? data.horasTrabajadas - 40 : 0;
    const horasPorPagar = Math.min(data.horasTrabajadas, 40) * 70;
    const pagoTotal = horasPorPagar + (horasExtras * 140);

    return {
      matricula: data.matricula,
      nombre: data.nombre,
      correo: data.correo,
      edad: data.edad,
      horasTrabajadas: data.horasTrabajadas,
      horasExtras,
      horasPorPagar,
      pagoTotal,
    };
  }

  calcularPago(empleado: any) {
    return {
      pagoHorasNormales: Math.min(empleado.horasTrabajadas, 40) * 70,
      pagoHorasExtras: empleado.horasExtras * 140,
      subTotal: empleado.pagoTotal,
    };
  }

  calcularTotal() {
    return this.empleados.reduce((total, emp) => total + emp.pagoTotal, 0);
  }

  modificarMatricula() {
    const index = this.empleados.findIndex(emp => emp.matricula === this.matriculaAccion);

    if (index !== -1) {
      const empleado = this.empleados[index];
      this.formGroup.patchValue({
        matricula: empleado.matricula,
        nombre: empleado.nombre,
        correo: empleado.correo,
        edad: empleado.edad,
        horasTrabajadas: empleado.horasTrabajadas,
      });
      this.editMode = true;
      this.empleadoEditIndex = index;
    } else {
      alert(`Empleado con matrícula ${this.matriculaAccion} no encontrado.`);
    }
  }

  eliminarMatricula() {
    const index = this.empleados.findIndex(emp => emp.matricula === this.matriculaAccion);

    if (index !== -1) {
      this.empleados.splice(index, 1);
      localStorage.setItem('empleados', JSON.stringify(this.empleados));
    } else {
      alert(`Empleado con matrícula ${this.matriculaAccion} no encontrado.`);
    }
  }

  imprimirTabla() {
    this.mostrarTabla = true;
  }

  eliminarTodo() {
    if (confirm('¿Estás seguro de que deseas eliminar todos los empleados? Esta acción no se puede deshacer.')) {
      this.empleados = [];
      localStorage.removeItem('empleados');
      this.mostrarTabla = false;
      alert('Todos los empleados han sido eliminados.');
    }
  }
}
