import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Project } from '@entities/project.model';
import { ProjectSelectorMenuComponent } from '@shared-components/project-selector-menu/project-selector-menu.component';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss']
})
export class ProjectSelectorComponent {

  @ViewChild(ProjectSelectorMenuComponent, {static: true}) projectSelectorMenu: ProjectSelectorMenuComponent | undefined;
  @Input() projectName: string | undefined
  @Input() small = false
  @Output() selectProject = new EventEmitter<Project>()

  onSelectProject(project: Project) {
    this.selectProject.emit(project)
  }
}
