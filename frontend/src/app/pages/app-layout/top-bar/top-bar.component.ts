import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@entities/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  constructor(public authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login'])
    })
  }

}
