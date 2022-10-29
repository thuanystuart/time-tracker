import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../../models/user.model'

interface Credential {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn: boolean = false
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  user: User | null = null
  redirectUrl: string | null = null;
  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json; charset=UTF-8',
    }),
    withCredentials: true,
  }

  signUp(user: User): Observable<User> {
    this.loading.next(true)
    return this.http.post<User>('http://localhost:5000/signup', user, this.httpOptions)
    .pipe(
      tap(() => {
        this.loading.next(false)
      }),
      catchError(error => {
        this.loading.next(false)
        return throwError(() => new Error(error.message))
      })
    )
  }

  login(credential: Credential): Observable<User> {
    this.loading.next(true)
    return this.http.post<User>('http://localhost:5000/login', credential, this.httpOptions)
    .pipe(
      tap(user => {
        this.loading.next(false)
        this.user = user
        this.isLoggedIn = true
      }),
      catchError(error => {
        this.loading.next(false)
        return throwError(() => new Error(error.message))
      })
    )
  }

  logout(): Observable<boolean> {
    return this.http.post('http://localhost:5000/logout', null, this.httpOptions)
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
        return throwError(() => new Error(error.message))
      })
    )
  }
}
