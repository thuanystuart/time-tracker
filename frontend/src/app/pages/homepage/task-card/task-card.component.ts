import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '@entities/task.model';
import { TimeEntry } from '@entities/timeEntry.model';
import { DateTime, Duration } from 'luxon';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task : Task | TimeEntry | undefined
  @Output() delete = new EventEmitter<number>()

  duration = Duration.fromMillis(0)

  ngOnInit(): void {
    if (this.task) {
      this.duration = (this.task.end_datetime).diff(this.task.start_datetime)
    }
  }

  onDelete() {
    this.delete.emit(this.task?.id)
  }
}
