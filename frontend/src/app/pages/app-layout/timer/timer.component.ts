import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Duration, DateTime } from 'luxon';
import { buildEmptyTask } from '@entities/task.model';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnDestroy {

  constructor(private taskService: TaskService) { }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe()
  }

  task = buildEmptyTask()
  duration = Duration.fromMillis(0)
  timer = interval(1000)
  timerSubscription : Subscription | undefined
  isTimerRunning = false

  startStopTimer() {
    if (!this.isTimerRunning) { this.startTimer() } else { this.endTimer() }
  }

  private startTimer() {
    this.isTimerRunning = true
    this.task.start_datetime = DateTime.now()
    this.timerSubscription = this.timer.subscribe(() => {
      this.duration = DateTime.now().diff(this.task.start_datetime)
    })
  }

  private endTimer() {
    this.task.end_datetime = DateTime.now()
    this.taskService.createTask(this.task).subscribe(() => {
      this.resetTimer()
    })
  }

  resetTimer() {
    this.duration = Duration.fromMillis(0)
    this.task = buildEmptyTask()
    this.isTimerRunning = false
    this.timerSubscription?.unsubscribe()
  }
}
