import { Component } from '@angular/core';
import { TaskService } from '@services/task.service';
import { TimerService } from '@services/timer.service';
import { Task } from '@entities/task.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {

  constructor(public taskService : TaskService, private timerService: TimerService) { }

  onDeleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe()
  }

  onDeleteTimeEntry(id: number) {
    // this.taskService.deleteTask(id).subscribe()
  }

  onRestart(task: Task) {
    this.timerService.startTimer(task)
  }
}
