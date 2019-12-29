import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from './shared-material/shared-material.module';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IndexPageMainComponent } from './index-page-main/index-page-main.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ReserveCarComponent, ShowCarDetailsDialog } from './reserve-car/reserve-car.component';
import { ReserveCarShowDetailsComponent } from './reserve-car-show-details/reserve-car-show-details.component';
import { OrderListComponent, ShowDeliverCarDialog } from './order-list/order-list.component';
import { DeliverCarComponent } from './deliver-car/deliver-car.component';
import { HelpComponent } from './help/help.component';
import { HelpDetailComponent } from './help-detail/help-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexPageMainComponent,
    CreateProfileComponent,
    ReserveCarComponent, ShowCarDetailsDialog,
    ReserveCarShowDetailsComponent,
    OrderListComponent, ShowDeliverCarDialog, DeliverCarComponent, HelpComponent, HelpDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    CommonModule
  ],
  entryComponents: [ReserveCarComponent, ShowCarDetailsDialog, OrderListComponent, ShowDeliverCarDialog ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
