import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { buildEmptyTask } from '@entities/task.model';
import { TimerService } from '@services/timer.service';
import { ProjectSelectorMenuComponent } from '../project-selector-menu/project-selector-menu.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  @ViewChild(ProjectSelectorMenuComponent) projectSelectorMenu: ProjectSelectorMenuComponent | undefined;

  task = buildEmptyTask()
  isTimerRunning = false

  timerRunningSubscription: Subscription | undefined
  taskSubscription: Subscription | undefined

  constructor(public timerService: TimerService) { }

  ngOnInit(): void {
    this.timerRunningSubscription = this.timerService.isTimerRunning$.subscribe(value => this.isTimerRunning = value)
    this.taskSubscription = this.timerService.currentTask$.subscribe(value => this.task = value)
  }

  ngOnDestroy(): void {
    this.timerRunningSubscription?.unsubscribe()
    this.taskSubscription?.unsubscribe()
  }

  onChangeTaskDescription(newValue: string) {
    this.timerService.updateCurrentTask({ ...this.task, description: newValue})
  }

  onStartStopTimer() {
    if (!this.isTimerRunning) { this.startTimer() } else { this.endTimer() }
  }

  private startTimer() {
    this.timerService.startTimer()
  }

  private endTimer() {
    this.timerService.endTimer()
  }
}
