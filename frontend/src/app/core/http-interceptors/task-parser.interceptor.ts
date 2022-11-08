import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { RawTask, Task } from '@entities/task.model';
import { RawTimeEntry, TimeEntry } from '@entities/timeEntry.model';

@Injectable()
export class TaskParserInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url?.endsWith('/task') && request.method != 'DELETE') {
      return next.handle(request).pipe(
        map((event: HttpEvent<unknown>) => {
          let parsedEvent = event
          if (event instanceof HttpResponse && event.status === 200 && event.body) {
            if (Array.isArray(event.body)) {
              parsedEvent = event.clone({
                body: event.body.map((rawTask: RawTask) => this.parseTask(rawTask))
              })
            } else {
              parsedEvent = event.clone({
                body: this.parseTask(event.body as RawTask)
              })
            }
          }
          return parsedEvent
        })
      )
    } else if (request.url?.endsWith('/time_entry') && request.method != 'DELETE') {
      return next.handle(request).pipe(
        map((event: HttpEvent<unknown>) => {
          let parsedEvent = event
          if (event instanceof HttpResponse && event.status === 200 && event.body) {
            if (Array.isArray(event.body)) {
              parsedEvent = event.clone({
                body: event.body.map((rawTimeEntry: RawTimeEntry) => this.parseTimeEntry(rawTimeEntry))
              })
            } else {
              parsedEvent = event.clone({
                body: this.parseTimeEntry(event.body as RawTimeEntry)
              })
            }
          }
          return parsedEvent
        })
      )
    } else {
      return next.handle(request)
    }
  }

  private parseTimeEntry(rawTimeEntry: RawTimeEntry): TimeEntry {
    return {
      ...rawTimeEntry,
      end_datetime: DateTime.fromISO(rawTimeEntry.end_datetime),
      start_datetime: DateTime.fromISO(rawTimeEntry.start_datetime)
    }
  }

  private parseTask(rawTask: RawTask): Task {
    const time_entries = rawTask.time_entries?.map((time_entry) => this.parseTimeEntry(time_entry))

    const task : Task = {
      ...rawTask,
      end_datetime: DateTime.fromISO(rawTask.end_datetime),
      start_datetime: DateTime.fromISO(rawTask.start_datetime),
      time_entries: time_entries,
    }

    return task
  }
}
