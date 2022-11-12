import { NgModule } from '@angular/core';

import { ProtectedPagesRoutingModule } from './protected-pages-routing.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { TimerComponent } from './app-layout/timer/timer.component';
import { TopBarComponent } from './app-layout/top-bar/top-bar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TaskAccordionComponent } from './homepage/task-accordion/task-accordion.component';
import { TaskCardComponent } from './homepage/task-card/task-card.component';

import { CoreModule } from '../core/core.module';
import { TimeEntryCardComponent } from './homepage/time-entry-card/time-entry-card.component';

@NgModule({
  declarations: [
    AppLayoutComponent,
    HomepageComponent,
    TopBarComponent,
    TimerComponent,
    TaskCardComponent,
    TimeEntryCardComponent,
    TaskAccordionComponent,
  ],
  imports: [
    CoreModule,
    ProtectedPagesRoutingModule
  ],
})
export class ProtectedPagesModule { }
