import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositoriosPage } from './repositorios.page';

const routes: Routes = [
  {
    path: '',
    component: RepositoriosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepositoriosPageRoutingModule {}
