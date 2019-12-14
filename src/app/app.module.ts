import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from './shared-material/shared-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IndexPageMainComponent } from './index-page-main/index-page-main.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ReserveCarComponent, ShowCarDetailsDialog } from './reserve-car/reserve-car.component';
import { ReserveCarShowDetailsComponent } from './reserve-car-show-details/reserve-car-show-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexPageMainComponent,
    CreateProfileComponent,
    ReserveCarComponent, ShowCarDetailsDialog,
    ReserveCarShowDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedMaterialModule
  ],
  entryComponents: [ ReserveCarComponent, ShowCarDetailsDialog ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
