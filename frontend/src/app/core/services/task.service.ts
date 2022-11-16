import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '@entities/task.model';
import { RESPONSE_TYPE_HEADER } from '@interceptors/request-context';
import { Map } from 'immutable'
import { DateTime } from 'luxon';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) {
    this.getTasks().subscribe()
  }

  private tasksSource: BehaviorSubject<Map<number, Task>> = new BehaviorSubject<Map<number, Task>>(Map<number, Task>())
  tasks$: Observable<[DateTime, Task[]][]> = this.tasksSource.asObservable().pipe(
    map(tasks => Array.from(
      tasks
      .sort((a, b) => (a.end_datetime > b.end_datetime) ? -1 : ((a.end_datetime < b.end_datetime) ? 1 : 0))
      .toList()
      .groupBy(task => task.end_datetime.startOf('day'))
      .map(group => Array.from(group.values()))
    )),
  )

  getTaskById(id: number): Task | undefined {
    const tasks = this.tasksSource.value
    return tasks.has(id) ?  tasks.get(id) : undefined
  }

  setTaskById(id: number, task: Task) {
    this.tasksSource.next(this.tasksSource.value.set(id, task))
  }

  createTask(task: Task): Observable<Task> {
    if (task.hasOwnProperty('project')) {
      task.project_id = task.project?.id
      delete task.project
    }
    const parsedTask = {
      ...task,
      'start_datetime': task.start_datetime.toISO({ includeOffset: false }),
      'end_datetime': task.end_datetime.toISO({ includeOffset: false })
    }
    return this.http.post<Task>('task', parsedTask)
    .pipe(
      tap(task => {
        this.tasksSource.next(this.tasksSource.value.set(task.id || 0, task))
      })
    )
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('task')
    .pipe(
      tap(tasks => {
        this.tasksSource.next(tasks.reduce((acc, task) => acc.set(task.id || 0, task), Map<number, Task>()))
      })
    )
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`task?id=${id}`, {
      context: new HttpContext().set(RESPONSE_TYPE_HEADER, 'text'),
    })
    .pipe(
      tap(() => {
        this.tasksSource.next(this.tasksSource.value.delete(id))
      })
    )
  }
}
