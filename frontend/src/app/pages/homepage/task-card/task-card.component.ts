import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '@entities/task.model';
import { TimeEntry } from '@entities/timeEntry.model';
import { Duration } from 'luxon';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task : Task | TimeEntry | undefined
  @Input() isTask = true
  @Input() isExpanded = false
  @Output() delete = new EventEmitter<Task | TimeEntry>()
  @Output() restart = new EventEmitter<Task>()
  @Output() togglePanel = new EventEmitter<void>()

  duration = Duration.fromMillis(0)

  ngOnInit(): void {
    if (this.task) {
      this.duration = (this.task.end_datetime).diff(this.task.start_datetime)
    }
  }

  countChildren(): number {
    return (this.isTask && (this.task as Task).time_entries?.length) || 0
  }

  onDelete() {
    this.delete.emit(this.task)
  }

  onStart() {
    this.task && this.restart.emit(this.task);
  }

  onTogglePanel() {
    this.togglePanel.emit();
  }
}
