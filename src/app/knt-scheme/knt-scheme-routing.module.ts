import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KntSchemeLoginComponent } from './knt-scheme-login/knt-scheme-login.component';
import { KntschemeGuard } from '../kntscheme.guard';
import { KntSchemeComponent } from './knt-scheme.component';

const routes: Routes = [
  {
    path: 'login',
    component: KntSchemeLoginComponent,
    data: { title: 'knt scheme login' },
    canActivate: [KntschemeGuard]
  },
  {
    path: '',
    component: KntSchemeComponent,
    data: { title: 'knt scheme' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KntSchemeRoutingModule {}
