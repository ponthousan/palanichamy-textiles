import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillGenerateRoutingModule } from './bill-generate-routing.module';
import { BillGenerateComponent } from './resource/bill-generate.component';

import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TableModule} from 'primeng/table';

import {DropdownModule} from 'primeng/dropdown';
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [BillGenerateComponent],
  imports: [
    CommonModule,
    BillGenerateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TableModule,
    DropdownModule,
    TranslateModule.forRoot({
      loader: {
         provide: TranslateLoader,
         useFactory: httpTranslateLoader,
         deps: [HttpClient]
         }
      })
  ],
  providers: [BsDatepickerConfig],

})
export class BillGenerateModule { }
