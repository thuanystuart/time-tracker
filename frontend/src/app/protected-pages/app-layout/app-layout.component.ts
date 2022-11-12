import { Component } from '@angular/core';
import { TaskService } from '@services/task.service';
import { TimeEntryService } from '@services/time-entry.service';
import { TimerService } from '@services/timer.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  providers: [TaskService, TimerService, TimeEntryService],
})
export class AppLayoutComponent { }
