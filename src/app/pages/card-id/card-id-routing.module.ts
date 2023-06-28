import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardIDPage } from './card-id.page';

const routes: Routes = [
  {
    path: '',
    component: CardIDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardIDPageRoutingModule {}
