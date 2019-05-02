import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventService } from './event/event.service';
import { SharedModule } from '../shared/shared.module';
import { EventComponent } from './event/event.component';

@NgModule({
  imports: [CommonModule, EventsRoutingModule, SharedModule],
  declarations: [EventComponent],
  providers: [EventService],
  exports: [EventComponent]
})
export class EventsModule {}
