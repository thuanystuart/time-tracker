import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { AppLayoutComponent } from '@pages/app-layout/app-layout.component';
import { HomepageComponent } from '@pages/homepage/homepage.component';
import { LoginComponent } from '@pages/login/login.component';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { SignUpComponent } from '@pages/sign-up/sign-up.component';
import { CoreModule } from '../core/core.module';
import { TopBarComponent } from './app-layout/top-bar/top-bar.component';
import { TimerComponent } from './app-layout/timer/timer.component';
import { TaskCardComponent } from './homepage/task-card/task-card.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    AppLayoutComponent,
    HomepageComponent,
    PageNotFoundComponent,
    TopBarComponent,
    TimerComponent,
    TaskCardComponent,
  ],
  imports: [
    CoreModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
