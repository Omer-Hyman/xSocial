import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { CreateSpotPage } from './pages/create-spot/create-spot.page';

const routes: Routes = [
  { path: 'login', component: LoginPage, title: 'Login or register'},
  { path: 'create-spot/:lat/:long', component: CreateSpotPage, title: 'Create spot' },
  { path: 'home', component: HomePage, title: 'Home' },
  { path: '**', component: LoginPage, title: 'Login or register' },
];
   
// TODO: switch from route params to shared service for state management??
// https://www.reddit.com/r/Angular2/comments/16av43w/best_way_to_pass_data_to_another_component_when/?rdt=49684

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
