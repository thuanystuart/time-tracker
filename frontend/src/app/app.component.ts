import { ApplicationInitStatus, APP_INITIALIZER, Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(@Inject(APP_INITIALIZER) public appInit: ApplicationInitStatus) { }
}
