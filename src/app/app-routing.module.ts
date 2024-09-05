import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./bill-generate/bill-generate.module').then(m => m.BillGenerateModule) },
  { path: 'header', loadChildren: () => import('./app-header/app-header.module').then(m => m.AppHeaderModule) },
  { path: 'register-form', loadChildren: () => import('./register-form/register-form.module').then(m => m.RegisterFormModule) },
  { path: 'bill-generate', loadChildren: () => import('./bill-generate/bill-generate.module').then(m => m.BillGenerateModule) },
  { path: 'yarn-data', loadChildren: () => import('./yarn-data/yarn-data.module').then(m => m.YarnDataModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
