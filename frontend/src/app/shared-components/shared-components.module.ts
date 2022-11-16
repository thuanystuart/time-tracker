import { NgModule } from '@angular/core';
import { ProjectSelectorComponent } from './project-selector/project-selector.component';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { ProjectSelectorMenuComponent } from './project-selector-menu/project-selector-menu.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    ProjectSelectorComponent,
    AddProjectDialogComponent,
    ProjectSelectorMenuComponent
  ],
  exports: [
    ProjectSelectorComponent,
  ],
  imports: [
    CoreModule
  ]
})
export class SharedComponentsModule { }
