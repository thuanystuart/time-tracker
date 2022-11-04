import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Duration } from 'luxon';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

  startTime = 0
  duration = Duration.fromMillis(0)
  source = interval(1000)
  timerSubscription : Subscription | undefined
  isTimerRunning = false

  startStopTimer() {
    if (!this.isTimerRunning) {
      this.startTime = Date.now()
      this.timerSubscription = this.source.subscribe(() => {
        this.duration = Duration.fromMillis(Date.now() - this.startTime)
      })
    } else {
      this.duration = Duration.fromMillis(0)
      this.timerSubscription?.unsubscribe()
    }
    this.isTimerRunning = !this.isTimerRunning
  }

}
