import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../../models/user.model'
import { MatSnackBar } from '@angular/material/snack-bar';

interface Credential {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  isLoggedIn: boolean = false
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  user: User | null = null
  redirectUrl: string | null = null;

  signUp(user: User): Observable<User> {
    this.loading.next(true)
    return this.http.post<User>('signup', user)
    .pipe(
      tap(() => {
        this.loading.next(false)
      }),
      catchError(error => {
        this.loading.next(false)
        if (error.error) {
          this.snackBar.open(error.error, undefined, { duration: 2000 })
        }
        return throwError(() => new Error(error.message))
      })
    )
  }

  login(credential: Credential): Observable<User> {
    this.loading.next(true)
    return this.http.post<User>('login', credential)
    .pipe(
      tap(user => {
        this.loading.next(false)
        this.user = user
        this.isLoggedIn = true
      }),
      catchError(error => {
        this.loading.next(false)
        if (error.error) {
          this.snackBar.open(error.error, undefined, { duration: 2000 })
        }
        return throwError(() => new Error(error.message))
      })
    )
  }

  logout(): Observable<boolean> {
    return this.http.post('logout', null)
    .pipe(
      tap(() => {
        this.user = null
        this.isLoggedIn = false
      }),
      map(() => {
        return false
      }),
      catchError(error => {
        this.loading.next(false)
        if (error.error) {
          this.snackBar.open(error.error, undefined, { duration: 2000 })
        }
        return throwError(() => new Error(error.message))
      })
    )
  }
}
