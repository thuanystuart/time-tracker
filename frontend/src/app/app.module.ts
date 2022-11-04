import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from '@pages/pages.module';
import { SharedComponentsModule } from './shared-components/shared-components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedComponentsModule,
    PagesModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
