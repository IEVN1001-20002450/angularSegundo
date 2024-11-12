import { Routes } from '@angular/router';

export default [
    {
        path: 'pizzeria',
        loadComponent: () => import('./registro/registro.component').then(m => m.RegistroComponent),
    },
    {
        path: 'resumen',
        loadComponent: () => import('./resumen/resumen.component').then(m => m.ResumenComponent),
    },
    {
        path: 'ventas',
        loadComponent: () => import('./ventas_realizadas/ventas_realizadas.component').then(m => m.VentasComponent),
    }
] as Routes;