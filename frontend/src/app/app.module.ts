import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '@pages/login/login.component';
import { HomepageComponent } from '@pages/homepage/homepage.component';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { SignUpComponent } from '@pages/sign-up/sign-up.component';
import { CoreModule } from './core/core.module';
import { PagesModule } from '@pages/pages.module';
import { SharedComponentsModule } from './shared-components/shared-components.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    SignUpComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CoreModule,
    SharedComponentsModule,
    PagesModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
