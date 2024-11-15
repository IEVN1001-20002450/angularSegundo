import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren:()=> import('./auth/features/auth.routes')
    },
    {
        path:'formulario',
        loadChildren:()=> import('./formulario/ejemplo1/formulario.routes')
    },
    {
        path:'formulario',
        loadChildren:()=> import('./formulario/resistencias/res.routes')
    },
    {
        path:'formulario',
        loadChildren:()=> import('./formulario/empleados/emp.routes')
    },
    {
        path:'formulario',
        loadChildren:()=> import('./formulario/pizzeria/pizz.routes')
    },
    {
        path:'utl',
        loadChildren:()=> import('./utl/utl.routes')
    }
];