import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Duration, DateTime } from 'luxon';
import { Task } from '@entities/task.model';
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

  taskDescription = ''
  startTime = 0
  duration = Duration.fromMillis(0)
  timer = interval(1000)
  timerSubscription : Subscription | undefined
  isTimerRunning = false

  startStopTimer() {
    if (!this.isTimerRunning) { this.startTimer() } else { this.endTimer() }
  }

  private buildTask () : Task {
    return {
      description: this.taskDescription,
      start_datetime: DateTime.fromMillis(this.startTime).toISO(),
      end_datetime: DateTime.now().toISO(),
    }
  }

  private startTimer() {
    this.startTime = Date.now()
    this.isTimerRunning = true
    this.timerSubscription = this.timer.subscribe(() => {
      this.duration = Duration.fromMillis(Date.now() - this.startTime)
    })
  }

  private endTimer() {
    this.taskService.createTask(this.buildTask()).subscribe(() => {
      this.resetTimer()
    })
  }

  resetTimer() {
    this.duration = Duration.fromMillis(0)
    this.taskDescription = ""
    this.isTimerRunning = false
    this.timerSubscription?.unsubscribe()
  }
}
