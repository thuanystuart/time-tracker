import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '@entities/user.model';
import { ERROR_HANDLER_CONFIG, LOGIN, LOGOUT, REQUEST_TYPE, SIGN_UP } from '@interceptors/request-context';

interface Credential {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn = false
  private userSource: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined)
  user$: Observable<User | undefined> = this.userSource.asObservable()
  redirectUrl: string | null = null

  signUp(user: User): Observable<User> {
    return this.http.post<User>('signup', user, {
      context: new HttpContext().set(REQUEST_TYPE, SIGN_UP),
    })
  }

  login(credential: Credential): Observable<User> {
    return this.http.post<User>('login', credential, {
      context: new HttpContext().set(REQUEST_TYPE, LOGIN),
    })
    .pipe(
      tap(user => {
        this.userSource.next(user)
        this.isLoggedIn = true
      })
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
      })
    )
  }

  checkLogin(): Observable<void> {
    return this.http.get<User>('current_user', {
      context: new HttpContext().set(ERROR_HANDLER_CONFIG, { handle: false }),
    })
    .pipe(
      tap(user => {
        this.userSource.next(user)
        this.isLoggedIn = true
      }),
      map(() => void 0),
      catchError(() => {
        this.isLoggedIn = false
        return of(undefined)
      })
    )
  }
}
