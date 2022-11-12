import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from '@pages/pages.module';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { ProtectedPagesModule } from './protected-pages/protected-pages.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedComponentsModule,
    PagesModule,
    ProtectedPagesModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
