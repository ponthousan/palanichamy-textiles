import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YarnDataRoutingModule } from './yarn-data-routing.module';
import { YarnDataComponent } from './resource/yarn-data.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    YarnDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YarnDataRoutingModule,
    TableModule
  ]
})
export class YarnDataModule { }
