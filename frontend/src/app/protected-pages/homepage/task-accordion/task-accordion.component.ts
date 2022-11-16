import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '@entities/project.model';
import { Task } from '@entities/task.model';
import { TimeEntry } from '@entities/timeEntry.model';

@Component({
  selector: 'app-task-accordion',
  templateUrl: './task-accordion.component.html',
  styleUrls: ['./task-accordion.component.scss']
})
export class TaskAccordionComponent {

  @Input() task : Task | undefined
  @Output() deleteTask = new EventEmitter<number>()
  @Output() deleteTimeEntry = new EventEmitter<TimeEntry>()
  @Output() restartTask = new EventEmitter<Task>()
  @Output() selectProject = new EventEmitter<[Task | undefined, Project]>()
  isPanelOpen = false

  onDeleteTask(task: Task) {
    this.deleteTask.emit(task.id)
  }

  onDeleteTimeEntry(timeEntry: TimeEntry) {
    this.deleteTimeEntry.emit(timeEntry)
  }

  onRestart(task: Task) {
    this.restartTask.emit(task)
  }

  onTogglePanelOpen() {
    this.isPanelOpen = !this.isPanelOpen
  }

  onSelectProject(project: Project) {
    this.selectProject.emit([this.task, project])
  }
}
