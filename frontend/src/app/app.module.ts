import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpotViewComponent } from './components/spot-view/spot-view.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CreateSpotComponent } from './components/create-spot/create-spot.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TokenInterceptor } from './token.interceptor';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent, 
    MapComponent, 
    LoginComponent, 
    NavBarComponent, 
    CreateSpotComponent,
    SpotViewComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({}),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
