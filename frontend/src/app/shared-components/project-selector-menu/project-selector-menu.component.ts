import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenu } from '@angular/material/menu';
import { buildEmptyProject, Project } from '@entities/project.model';
import { ProjectService } from '@services/project.service';
import { TimerService } from '@services/timer.service';
import { AddProjectDialogComponent } from '../add-project-dialog/add-project-dialog.component';

@Component({
  selector: 'app-project-selector-menu',
  templateUrl: './project-selector-menu.component.html',
  styleUrls: ['./project-selector-menu.component.scss']
})
export class ProjectSelectorMenuComponent {

  constructor(private dialog: MatDialog, public projectService: ProjectService, private timerService: TimerService) {}

  @ViewChild(MatMenu, {static: true}) projectMenu : MatMenu | undefined;

  @Output() selectProject = new EventEmitter<Project>()

  onSelectProject(project: Project) {
    this.selectProject.emit(project)
  }

  onAddProject() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, { width: "max(30vw, 250px)" })

    dialogRef.afterClosed().subscribe((projectName) => {
      if (projectName != "") {
        this.projectService.createProject({ ...buildEmptyProject(), 'name': projectName }).subscribe()
      }
    })
  }
}
