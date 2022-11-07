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

  onDeleteTask(id : number) {
    this.deleteTask.emit(id)
  }

  onDeleteTimeEntry(id : number) {
    this.deleteTimeEntry.emit(id)
  }
}
