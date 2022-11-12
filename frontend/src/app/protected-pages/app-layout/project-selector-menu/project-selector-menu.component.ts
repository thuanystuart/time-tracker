import { Component, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-project-selector-menu',
  templateUrl: './project-selector-menu.component.html',
  styleUrls: ['./project-selector-menu.component.scss']
})
export class ProjectSelectorMenuComponent {
  @ViewChild(MatMenu, {static: true}) projectMenu : MatMenu | undefined;
}
