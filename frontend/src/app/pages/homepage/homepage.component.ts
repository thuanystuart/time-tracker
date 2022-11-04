import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {

  constructor(private auth: AuthService, private router: Router) { }

  logout = () => {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['login'])
    })
  }

}
