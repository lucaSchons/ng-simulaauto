import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./form/form.component').then((com) => com.FormComponent)
    },
    {
        path: 'form/:nome',
        loadComponent: () => import('./pagina-dinamica/pagina-dinamica.component').then((com) => com.PaginaDinamicaComponent)
    }
];
