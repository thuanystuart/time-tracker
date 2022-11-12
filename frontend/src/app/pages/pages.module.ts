import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from '@pages/login/login.component';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { SignUpComponent } from '@pages/sign-up/sign-up.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CoreModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
