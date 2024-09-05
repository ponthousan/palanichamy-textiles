import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHeaderComponent } from './resource/app-header.component';

const routes: Routes = [
  { path: '', component: AppHeaderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppHeaderRoutingModule { }
