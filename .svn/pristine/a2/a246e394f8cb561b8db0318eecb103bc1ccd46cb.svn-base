import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareerDetailsComponent } from './career-details/career-details.component';
import { CareerLoginComponent } from './career-login/career-login.component';
import { CareersApplyComponent } from './careers-apply/careers-apply.component';

const routes: Routes = [
  {
    path: 'details',
    component: CareerDetailsComponent,
    data: { title: 'Career Details' }
  },
  {
    path: 'login',
    component: CareerLoginComponent,
    data: { title: 'Career Login' }
  },
  {
    path: 'apply/:id',
    component: CareersApplyComponent,
    data: { title: 'Careers Apply' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareersRoutingModule {}
