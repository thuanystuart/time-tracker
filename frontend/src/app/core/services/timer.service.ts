import { Injectable } from '@angular/core';
import { buildEmptyTask, Task } from '@entities/task.model';
import { DateTime, Duration } from 'luxon';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { TaskService } from './task.service';
import { TimeEntryService } from './time-entry.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(private taskService: TaskService, private timeEntryService: TimeEntryService) { }

  private isTimerRunningSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isTimerRunning$: Observable<boolean> = this.isTimerRunningSource.asObservable()

  private currentTaskSource: BehaviorSubject<Task> = new BehaviorSubject<Task>(buildEmptyTask())
  currentTask$: Observable<Task> = this.currentTaskSource.asObservable()

  private timer$ = interval(1000)
  timerSubscription: Subscription | undefined

  private durationSource: BehaviorSubject<Duration> = new BehaviorSubject<Duration>(Duration.fromMillis(0))
  duration$: Observable<Duration> = this.durationSource.asObservable()

  start_datetime = DateTime.now()

  updateCurrentTask(task: Task) {
    this.currentTaskSource.next(task)
  }

  startTimer(task: Task | undefined = undefined) {
    if (this.isTimerRunningSource.value) {
      this.endTimer(task)
    } else {
      this._startTimer(task)
    }
  }

  private _startTimer(task: Task | undefined = undefined) {
    this.start_datetime = DateTime.now()
    this.currentTaskSource.next(task || this.currentTaskSource.value)
    this.isTimerRunningSource.next(true)
    this.timerSubscription = this.timer$.subscribe(() => {
      this.durationSource.next(DateTime.now().diff(this.start_datetime))
    })
  }

  endTimer(nextTask: Task | undefined = undefined) {
    const task = this.currentTaskSource.value
    if (task.id) {
      this.timeEntryService.createTimeEntry({
        task_id: task.id,
        description: task.description,
        start_datetime: this.start_datetime,
        end_datetime: DateTime.now(),
      }, task)
      .subscribe(() => {
        this.resetTimer()
        if (nextTask) this._startTimer(nextTask)
      })
    } else {
      this.taskService.createTask({
        ...task,
        'start_datetime': this.start_datetime,
        'end_datetime': DateTime.now()
      }).subscribe(() => {
        this.resetTimer()
        if (nextTask) this._startTimer(nextTask)
      })
    }
  }

  resetTimer() {
    this.durationSource.next(Duration.fromMillis(0))
    this.currentTaskSource.next(buildEmptyTask())
    this.isTimerRunningSource.next(false)
    this.timerSubscription?.unsubscribe()
  }
}
