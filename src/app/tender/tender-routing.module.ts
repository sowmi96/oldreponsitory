import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenderLoginComponent } from './tender-login/tender-login.component';
import { TenderComponent } from './tender.component';

const routes: Routes = [
  {
    path: 'login',
    component: TenderLoginComponent,
    data: { title: 'tender' }
  },
  {
    path: '',
    component: TenderComponent,
    data: { title: 'knt scheme' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule {}
