import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { CreateSpotComponent } from './components/create-spot/create-spot.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login or register' },
  { path: 'map/:id', component: MapComponent, title: 'Map'},
  { path: 'create-spot/:id', component: CreateSpotComponent, title: 'Create spot' },
  { path: '**', component: LoginComponent, title: 'Login or register' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
