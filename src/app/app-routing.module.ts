import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./bill-generate/bill-generate.module').then(m => m.BillGenerateModule) },
  { path: 'header', loadChildren: () => import('./app-header/app-header.module').then(m => m.AppHeaderModule) },
  { path: 'shop-register', loadChildren: () => import('./shop-register/shop-register.module').then(m => m.RegisterFormModule) },
  { path: 'bill-generate', loadChildren: () => import('./bill-generate/bill-generate.module').then(m => m.BillGenerateModule) },
  { path: 'yarn-data', loadChildren: () => import('./yarn-data/yarn-data.module').then(m => m.YarnDataModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
