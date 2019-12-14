import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPageMainComponent } from './index-page-main/index-page-main.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ReserveCarComponent } from './reserve-car/reserve-car.component';





const routes: Routes = [
  { path: '', component: IndexPageMainComponent },
  { path: 'createprofile', component: CreateProfileComponent },
  { path: 'reservecar', component: ReserveCarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
