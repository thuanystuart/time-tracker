import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signUpForm = this.fb.nonNullable.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService, public em: ErrorStateMatcher) { }

  signUp = () => {
    this.auth.signUp(this.signUpForm.getRawValue()).subscribe(() => {
      this.router.navigate(['login'])
    })
  }

}
