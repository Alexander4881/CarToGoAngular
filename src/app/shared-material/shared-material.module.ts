import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

import { MatButtonModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';



@NgModule({
  exports: [MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, LayoutModule, FlexLayoutModule, MatMenuModule, MatIconModule, OverlayModule, PortalModule, MatToolbarModule, MatTooltipModule, MatStepperModule, MatRadioModule, MatCardModule, MatTableModule, MatProgressSpinnerModule, MatExpansionModule, MatListModule],
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MatDatepickerModule,
  ]
})
export class SharedMaterialModule { }
