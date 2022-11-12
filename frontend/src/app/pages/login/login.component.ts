import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoadingStateService } from '@services/loading-state.service';
import { LOGIN } from '@interceptors/request-context';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  readonly LOGIN = LOGIN

  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    public em: ErrorStateMatcher,
    public loading: LoadingStateService) {
  }

  login = () => {
    this.auth.login(this.loginForm.getRawValue()).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate([''])
      }
    })
  }

  signUp = () => {
    this.router.navigate(['create-account'])
  }

}
