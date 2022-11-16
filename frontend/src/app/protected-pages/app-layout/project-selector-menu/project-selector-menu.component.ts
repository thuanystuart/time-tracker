import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenu } from '@angular/material/menu';
import { AddProjectDialogComponent } from '../add-project-dialog/add-project-dialog.component';

@Component({
  selector: 'app-project-selector-menu',
  templateUrl: './project-selector-menu.component.html',
  styleUrls: ['./project-selector-menu.component.scss']
})
export class ProjectSelectorMenuComponent {

  constructor(private dialog: MatDialog) {}

  @ViewChild(MatMenu, {static: true}) projectMenu : MatMenu | undefined;

  onAddProject() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, { width: "max(30vw, 250px)" })

    dialogRef.afterClosed().subscribe((projectName) => {
      console.log("name: ", projectName);
    })
  }
}
