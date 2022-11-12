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
import { ProjectSelectorMenuComponent } from './app-layout/project-selector-menu/project-selector-menu.component';

@NgModule({
  declarations: [
    AppLayoutComponent,
    HomepageComponent,
    TopBarComponent,
    TimerComponent,
    TaskCardComponent,
    TimeEntryCardComponent,
    TaskAccordionComponent,
    ProjectSelectorMenuComponent,
  ],
  imports: [
    CoreModule,
    ProtectedPagesRoutingModule
  ],
})
export class ProtectedPagesModule { }
