import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { LoadingStateInterceptor } from './http-interceptors/loading-state.interceptor';
import { HttpConfigInterceptor } from './http-interceptors/http-config.interceptor';
import { MatUIModule } from './mat-ui/mat-ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatUIModule,
  ],
  exports: [
    BrowserModule,
    ReactiveFormsModule,
    MatUIModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingStateInterceptor, multi: true },
  ],
})
export class CoreModule { }
