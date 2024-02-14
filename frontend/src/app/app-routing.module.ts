import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { CreateSpotComponent } from './components/create-spot/create-spot.component';
import { HomeComponent } from './components/home/home.component';
import { LoginPage } from './pages/login/login.page';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage, title: 'Login or register'},
  // { path: 'login', component: LoginComponent, title: 'Login or register' },
  // { path: 'map/:id', component: MapComponent, title: 'Map'},
  { path: 'create-spot/:id', component: CreateSpotComponent, title: 'Create spot' },
  { path: 'home/:id', component: HomeComponent, title: 'Home' },
  { path: '**', component: LoginComponent, title: 'Login or register' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'create-spot',
    loadChildren: () => import('./pages/create-spot/create-spot.module').then( m => m.CreateSpotPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
