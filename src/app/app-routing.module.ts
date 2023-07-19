import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule),
    canActivate: [NologinGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NologinGuard]

  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [NologinGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [UserGuard]
  },
  {
    path: 'capacitaciones',
    loadChildren: () => import('./pages/capacitaciones/capacitaciones.module').then( m => m.CapacitacionesPageModule)
  },
  {
    path: 'repositorios',
    loadChildren: () => import('./pages/repositorios/repositorios.module').then( m => m.RepositoriosPageModule)
  },
  {
    path: 'pruebas/:id',
    loadChildren: () => import('./pages/pruebas/pruebas.module').then( m => m.PruebasPageModule)
  },
  {
    path: 'herramientas',
    loadChildren: () => import('./pages/herramientas/herramientas.module').then( m => m.HerramientasPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [UserGuard]
  },
  {
    path: 'resultados',
    loadChildren: () => import('./pages/resultados/resultados.module').then( m => m.ResultadosPageModule)
  },
  {
    path: 'card-id',
    loadChildren: () => import('./pages/card-id/card-id.module').then( m => m.CardIDPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },  {
    path: 'certificado',
    loadChildren: () => import('./pages/certificado/certificado.module').then( m => m.CertificadoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
