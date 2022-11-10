import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeEntry } from '@entities/timeEntry.model';
import { Task } from '@entities/task.model';
import { Observable, catchError, throwError, ObservableInput, tap } from 'rxjs';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class TimeEntryService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private taskService: TaskService) { }

  createTimeEntry(timeEntry: TimeEntry): Observable<TimeEntry> {
    return this.http.post<Task>('time_entry', timeEntry)
    .pipe(
      tap(updatedTask => {
        this.taskService.setTaskById(updatedTask.id || 0, updatedTask)
      }),
      catchError(error => { return this.handleError(error) })
    )
  }

  deleteTimeEntry(time_entry: TimeEntry): Observable<void> {
    return this.http.delete<Task>(`time_entry?id=${time_entry.id}`)
    .pipe(
      tap(updatedTask => {
        this.taskService.setTaskById(updatedTask.id || 0, updatedTask)
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
