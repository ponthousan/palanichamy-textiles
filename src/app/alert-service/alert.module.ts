import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './resource/alert.component';
import { AlertService } from './service/alert.service';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AlertComponent],
  providers: [AlertService]
})
export class AlertModule { }
