import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '@entities/task.model';
import { Map } from 'immutable'
import { BehaviorSubject, catchError, map, Observable, ObservableInput, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getTasks().subscribe()
  }

  private tasksSource: BehaviorSubject<Map<number, Task>> = new BehaviorSubject<Map<number, Task>>(Map<number, Task>())
  tasks$: Observable<Task[]> = this.tasksSource.asObservable().pipe(map(tasks => Array.from(tasks.values())))

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('task')
    .pipe(
      tap(tasks => {
        this.tasksSource.next(tasks.reduce((acc, task) => acc.set(task.id || 0, task), Map<number, Task>()))
      }),
      catchError(error => {
        return this.handleError(error)
      })
    )
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`task?id=${id}`)
    .pipe(
      tap(() => {
        this.tasksSource.next(this.tasksSource.value.delete(id))
      }),
      catchError(error => {
        return this.handleError(error)
      })
    )
  }

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
}
