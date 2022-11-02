import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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

  isLoggedIn: boolean = false
  user: User | null = null
  redirectUrl: string | null = null

  signUp(user: User): Observable<User> {
    return this.http.post<User>('signup', user, {
      context: new HttpContext().set(REQUEST_TYPE, SIGN_UP),
    })
    .pipe(
      catchError(error => {
        if (error.error) {
          this.snackBar.open(error.error, undefined, { duration: 2000 })
        }
        return throwError(() => new Error(error.message))
      })
    )
  }

  login(credential: Credential): Observable<User> {
    return this.http.post<User>('login', credential, {
      context: new HttpContext().set(REQUEST_TYPE, LOGIN),
    })
    .pipe(
      tap(user => {
        this.user = user
        this.isLoggedIn = true
      }),
      catchError(error => {
        if (error.error) {
          this.snackBar.open(error.error, undefined, { duration: 2000 })
        }
        return throwError(() => new Error(error.message))
      })
    )
  }

  logout(): Observable<boolean> {
    return this.http.post('logout', null, {
      context: new HttpContext().set(REQUEST_TYPE, LOGOUT),
    })
    .pipe(
      tap(() => {
        this.user = null
        this.isLoggedIn = false
      }),
      map(() => {
        return false
      }),
      catchError(error => {
        if (error.error) {
          this.snackBar.open(error.error, undefined, { duration: 2000 })
        }
        return throwError(() => new Error(error.message))
      })
    )
  }

  checkLogin(): Observable<boolean> {
    return this.http.get<User>('current_user')
    .pipe(
      tap(user => {
        this.user = user
        this.isLoggedIn = true
        return true
      }),
      map(() => {
        return false
      }),
      catchError(error => {
        this.isLoggedIn = false
        if (error.status == 401) {
          return of(false)
        } else {
          return throwError(() => new Error(error.message))
        }
      })
    )
  }
}
