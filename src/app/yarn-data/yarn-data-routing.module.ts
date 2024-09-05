import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YarnDataComponent } from './resource/yarn-data.component';
const routes: Routes = [
  {
    path: '', component: YarnDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YarnDataRoutingModule { }
