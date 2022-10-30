import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoadingStateService } from '../../core/services/loading-state.service';
import { LOGIN } from '../../core/http-interceptors/request-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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

  ngOnInit(): void {}

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
