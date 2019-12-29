import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPageMainComponent } from './index-page-main/index-page-main.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ReserveCarComponent } from './reserve-car/reserve-car.component';
import { OrderListComponent } from './order-list/order-list.component';
import { HelpComponent } from './help/help.component';


const routes: Routes = [
  { path: '', component: IndexPageMainComponent },
  { path: 'createprofile', component: CreateProfileComponent },
  { path: 'reservecar', component: ReserveCarComponent },
  {
    path: 'orderlist', component: OrderListComponent,
    runGuardsAndResolvers: 'always'
  },
  { path: 'help', component: HelpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
