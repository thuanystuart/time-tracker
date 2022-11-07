import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '@entities/task.model';

@Component({
  selector: 'app-task-accordion',
  templateUrl: './task-accordion.component.html',
  styleUrls: ['./task-accordion.component.scss']
})
export class TaskAccordionComponent {

  @Input() task : Task | undefined
  @Output() deleteTask = new EventEmitter<number>()
  @Output() deleteTimeEntry = new EventEmitter<number>()
  @Output() restartTask = new EventEmitter<Task>()
  isPanelOpen = false

  onDeleteTask(id : number) {
    this.deleteTask.emit(id)
  }

  onDeleteTimeEntry(id : number) {
    this.deleteTimeEntry.emit(id)
  }

  onRestart(task: Task) {
    this.restartTask.emit(task)
  }

  onTogglePanelOpen() {
    this.isPanelOpen = !this.isPanelOpen
  }
}
