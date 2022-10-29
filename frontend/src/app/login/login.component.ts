import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subscription } from 'rxjs';

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

  errorMatcher = this.em
  loading = false
  loadingSubscription: Subscription

  constructor(private router: Router, private auth: AuthService, private fb: FormBuilder, private em: ErrorStateMatcher) {
    this.loadingSubscription = this.auth.loading.subscribe(newValue => this.loading = newValue)
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe()
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
