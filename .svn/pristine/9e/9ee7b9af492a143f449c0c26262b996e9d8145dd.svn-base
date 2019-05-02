import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KntSchemeRoutingModule } from './knt-scheme-routing.module';
import { KntSchemeComponent } from './knt-scheme.component';
import { KntSchemeLoginComponent } from './knt-scheme-login/knt-scheme-login.component';
import { SharedModule } from '../shared/shared.module';
import { SchemaPopupComponent } from './schema-popup/schema-popup.component';
import { AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    KntSchemeRoutingModule,
    SharedModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    KntSchemeComponent,
    KntSchemeLoginComponent,
    SchemaPopupComponent
  ],
  exports: [KntSchemeComponent, KntSchemeLoginComponent, SchemaPopupComponent]
})
export class KntSchemeModule {}
