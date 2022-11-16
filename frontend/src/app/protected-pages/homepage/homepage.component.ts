import { Component } from '@angular/core';
import { TaskService } from '@services/task.service';
import { TimerService } from '@services/timer.service';
import { TimeEntryService } from '@services/time-entry.service';
import { Task } from '@entities/task.model';
import { TimeEntry } from '@entities/timeEntry.model';
import { DateTime } from 'luxon';
import { Project } from '@entities/project.model';

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

  onSelectProject(taskProject: [Task | undefined, Project]) {
    this.taskService.updateTask({'id': taskProject[0]?.id, 'project_id': taskProject[1].id}).subscribe()
  }

  trackByGroupedTasks(_index: number, groupedTasks: [DateTime, Task[]]) {
    return groupedTasks[0].toISO()
  }

  trackByTasks(_index: number, task: Task) {
    return task.id?.toString() + "|" + ((task.time_entries?.length || 0) > 1).toString()
  }
}
