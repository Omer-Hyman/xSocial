import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateSpotComponent } from './create-spot/create-spot.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login or register' },
  { path: 'map', component: MapComponent, title: 'Map' },
  { path: 'create-spot', component: CreateSpotComponent, title: 'Create spot' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
