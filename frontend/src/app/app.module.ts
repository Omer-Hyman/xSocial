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
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./token.interceptor";

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
    ReactiveFormsModule,
    HttpClientModule
    // TODO: remove httpclientmodule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
