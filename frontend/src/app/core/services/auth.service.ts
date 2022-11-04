import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { BehaviorSubject, Observable, ObservableInput, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '@entities/user.model'
import { MatSnackBar } from '@angular/material/snack-bar';
import { LOGIN, LOGOUT, REQUEST_TYPE, SIGN_UP } from '@interceptors/request-types';

interface Credential {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  isLoggedIn = false
  private userSource: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined)
  user$: Observable<User | undefined> = this.userSource.asObservable()
  redirectUrl: string | null = null

  handleError(error: any, showAlert = true): ObservableInput<any> {
    let message = 'An unknown error occured.'
    switch(error.status) {
      case 0:
        message = 'There was a problem connecting to the server.'
        break
      case 401:
        message = 'User is not authorized.'
        break
      case 400:
        if (typeof error.error == 'string') message = error.error
        break
      default:
    }
    if (showAlert) this.snackBar.open(message, undefined, { duration: 2000 })
    return throwError(() => new Error(error.message))
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>('signup', user, {
      context: new HttpContext().set(REQUEST_TYPE, SIGN_UP),
    })
    .pipe(
      catchError(error => { return this.handleError(error) })
    )
  }

  login(credential: Credential): Observable<User> {
    return this.http.post<User>('login', credential, {
      context: new HttpContext().set(REQUEST_TYPE, LOGIN),
    })
    .pipe(
      tap(user => {
        this.userSource.next(user)
        this.isLoggedIn = true
      }),
      catchError(error => { return this.handleError(error) })
    )
  }

  logout(): Observable<boolean> {
    return this.http.post('logout', null, {
      context: new HttpContext().set(REQUEST_TYPE, LOGOUT),
    })
    .pipe(
      tap(() => {
        this.userSource.next({} as User)
        this.isLoggedIn = false
      }),
      map(() => {
        return false
      }),
      catchError(error => { return this.handleError(error) })
    )
  }

  checkLogin(): Observable<void> {
    return this.http.get<User>('current_user')
    .pipe(
      tap(user => {
        this.userSource.next(user)
        this.isLoggedIn = true
      }),
      catchError(error => {
        this.isLoggedIn = false
        if (error.status == 401) {
          return of(false)
        } else {
          return this.handleError(error, false)
        }
      })
    )
  }
}
