import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { buildEmptyTask, Task } from '@entities/task.model';
import { TimeEntry } from '@entities/timeEntry.model';
import { Duration } from 'luxon';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task : Task = buildEmptyTask()
  @Input() isExpanded = false
  @Output() delete = new EventEmitter<Task>()
  @Output() restart = new EventEmitter<Task>()
  @Output() togglePanel = new EventEmitter<void>()

  duration = Duration.fromMillis(0)

  ngOnInit(): void {
    this.duration = Duration.fromMillis(this.task.time_entries?.reduce(
      (acc, timeEntry: TimeEntry) => {
        return acc + (timeEntry.end_datetime).diff(timeEntry.start_datetime).toMillis()
      }, 0) || 0)
  }

  countChildren(): number {
    return this.task.time_entries?.length || 0
  }

  onDelete() {
    this.delete.emit(this.task)
  }

  onStart() {
    this.restart.emit(this.task);
  }

  onTogglePanel() {
    this.togglePanel.emit();
  }
}
