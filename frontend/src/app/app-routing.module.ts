import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { CreateSpotPage } from './pages/create-spot/create-spot.page';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage, title: 'Login or register'},
  // { path: 'login', component: LoginComponent, title: 'Login or register' },
  // { path: 'map/:id', component: MapComponent, title: 'Map'},
  { path: 'create-spot/:id', component: CreateSpotPage, title: 'Create spot' },
  { path: 'home/:id', component: HomePage, title: 'Home' },
  { path: '**', component: LoginPage, title: 'Login or register' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
