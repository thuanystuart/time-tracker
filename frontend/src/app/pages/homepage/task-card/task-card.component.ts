import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '@entities/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task : Task | undefined
  @Output() deleteTask = new EventEmitter<number>()

  onDeleteTask() {
    this.deleteTask.emit(this.task?.id)
  }
}
