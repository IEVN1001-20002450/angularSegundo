// transacciones.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransaccionesService {
  private dataSubject = new BehaviorSubject<{ [key: string]: any }>(this.loadData());
  data$ = this.dataSubject.asObservable();

  // Variables universales
  ventasDelDia = { total: 100, items: ['item1', 'item2'] };

  setData(key: string, value: any) {
    const currentData = this.dataSubject.value;
    currentData[key] = value;
    this.dataSubject.next(currentData);
    this.saveData(currentData);
  }

  getData(key: string): any {
    return this.dataSubject.value[key];
  }

  // Métodos para acceder a las variables universales
  getVentasDelDia() {
    return this.ventasDelDia;
  }

  // Métodos específicos para cada componente
  setCurrentOrder(order: any) {
    this.setData('currentOrder', order);
  }

  getCurrentOrder() {
    return this.getData('currentOrder');
  }

  setPedidos(pedidos: any[]) {
    this.setData('pedidos', pedidos);
  }

  getPedidos() {
    return this.getData('pedidos');
  }

  setVentasDelDia(ventas: any[]) {
    this.setData('ventasDelDia', ventas);
  }

  getVentasDelDiaData() {
    return this.getData('ventasDelDia');
  }

  // Métodos para guardar y cargar datos de localStorage
  private saveData(data: { [key: string]: any }) {
    localStorage.setItem('transaccionesData', JSON.stringify(data));
  }

  private loadData(): { [key: string]: any } {
    const data = localStorage.getItem('transaccionesData');
    return data ? JSON.parse(data) : {};
  }

  // Método para guardar pedidos en localStorage
  savePedidosToLocalStorage(pedidos: any[]) {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }

  // Método para cargar pedidos desde localStorage
  loadPedidosFromLocalStorage(): any[] {
    const pedidos = localStorage.getItem('pedidos');
    return pedidos ? JSON.parse(pedidos) : [];
  }
}