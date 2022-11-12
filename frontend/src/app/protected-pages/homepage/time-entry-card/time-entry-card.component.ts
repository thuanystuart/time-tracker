import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { buildEmptyTimeEntry, TimeEntry } from '@entities/timeEntry.model';
import { Duration } from 'luxon';

@Component({
  selector: 'app-time-entry-card',
  templateUrl: './time-entry-card.component.html',
  styleUrls: ['../task-card/task-card.component.scss']
})
export class TimeEntryCardComponent implements OnInit {
  @Input() timeEntry : TimeEntry = buildEmptyTimeEntry()
  @Output() delete = new EventEmitter<TimeEntry>()

  duration = Duration.fromMillis(0)

  ngOnInit(): void {
    this.duration = (this.timeEntry.end_datetime).diff(this.timeEntry.start_datetime)
  }

  onDelete() {
    this.delete.emit(this.timeEntry)
  }
}
