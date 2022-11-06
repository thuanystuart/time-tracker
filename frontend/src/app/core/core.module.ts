import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { LoadingStateInterceptor } from '@interceptors/loading-state.interceptor';
import { HttpConfigInterceptor } from '@interceptors/http-config.interceptor';
import { MatUIModule } from './mat-ui/mat-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '@services/auth.service';
import { initializeAppFactory } from '@initializers/app.initializer';
import { TaskParserInterceptor } from '@interceptors/task-parser.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatUIModule,
  ],
  exports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatUIModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingStateInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TaskParserInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initializeAppFactory, deps: [AuthService], multi: true },
  ],
})
export class CoreModule { }
