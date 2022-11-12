import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeEntry } from '@entities/timeEntry.model';
import { Task } from '@entities/task.model';
import { Observable, tap } from 'rxjs';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class TimeEntryService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private taskService: TaskService) { }

  createTimeEntry(timeEntry: TimeEntry): Observable<Task> {
    return this.http.post<Task>('time_entry', timeEntry)
    .pipe(
      tap(updatedTask => {
        this.taskService.setTaskById(updatedTask.id || 0, updatedTask)
      })
    )
  }

  deleteTimeEntry(time_entry: TimeEntry): Observable<Task> {
    return this.http.delete<Task>(`time_entry?id=${time_entry.id}`)
    .pipe(
      tap(updatedTask => {
        this.taskService.setTaskById(updatedTask.id || 0, updatedTask)
      })
    )
  }
}
