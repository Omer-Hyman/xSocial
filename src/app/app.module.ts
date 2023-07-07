import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateSpotComponent } from './create-spot/create-spot.component';
import { SpotViewComponent } from './spot-view/spot-view.component';

@NgModule({
  declarations: [
    AppComponent, 
    MapComponent, 
    LoginComponent, 
    NavBarComponent, 
    CreateSpotComponent,
    SpotViewComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({}),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
