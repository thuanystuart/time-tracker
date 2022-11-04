import { Component } from '@angular/core';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {

  constructor(public taskService : TaskService) { }

}
