import { Component } from '@angular/core';
import { TaskService } from '@services/task.service';
import { TimerService } from '@services/timer.service';
import { Task } from '@entities/task.model';
import { TimeEntryService } from '@services/time-entry.service';
import { TimeEntry } from '@entities/timeEntry.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {

  constructor(
    public taskService : TaskService,
    private timerService: TimerService,
    private timeEntryService: TimeEntryService
  ) { }

  onDeleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe()
  }

  onDeleteTimeEntry(timeEntry: TimeEntry) {
    this.timeEntryService.deleteTimeEntry(timeEntry).subscribe()
  }

  onRestart(task: Task) {
    this.timerService.startTimer(task)
  }
}
