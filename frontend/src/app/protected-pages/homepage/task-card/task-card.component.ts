import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { buildEmptyTask, Task } from '@entities/task.model';
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
    this.duration = (this.task.end_datetime).diff(this.task.start_datetime)
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
