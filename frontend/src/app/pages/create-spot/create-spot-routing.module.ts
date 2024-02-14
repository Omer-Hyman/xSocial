import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSpotPage } from './create-spot.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSpotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSpotPageRoutingModule {}
