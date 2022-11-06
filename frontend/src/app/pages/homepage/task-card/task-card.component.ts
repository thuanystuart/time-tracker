import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '@entities/task.model';
import { DateTime, Duration } from 'luxon';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task : Task | undefined
  @Output() deleteTask = new EventEmitter<number>()

  duration = Duration.fromMillis(0)
  start_datetime: DateTime = DateTime.now()
  end_datetime: DateTime = DateTime.now()

  ngOnInit(): void {
    if (this.task && this.task.start_datetime && this.task.end_datetime) {
      this.end_datetime = DateTime.fromISO(this.task.end_datetime)
      this.start_datetime = DateTime.fromISO(this.task.start_datetime)
      this.duration = this.end_datetime.diff(this.start_datetime)
    }
  }

  onDeleteTask() {
    this.deleteTask.emit(this.task?.id)
  }
}
