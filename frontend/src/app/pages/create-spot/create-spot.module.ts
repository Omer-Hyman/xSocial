import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSpotPageRoutingModule } from './create-spot-routing.module';

import { CreateSpotPage } from './create-spot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSpotPageRoutingModule
  ],
  declarations: [CreateSpotPage]
})
export class CreateSpotPageModule {}
