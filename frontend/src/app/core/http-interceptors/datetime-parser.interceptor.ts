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

@Injectable()
export class DateTimeParserInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<unknown>) => {
        let parsedEvent = event
        if (event instanceof HttpResponse && event.status === 200 && event.body) {
          if (Array.isArray(event.body)) {
            parsedEvent = event.clone({
              body: event.body.map((item: any) => this.parseResponse(item))
            })
          } else {
            parsedEvent = event.clone({
              body: this.parseResponse(event.body)
            })
          }
        }
        return parsedEvent
      })
    )
  }

  private parseDateTime(value: string): DateTime {
    return DateTime.fromISO(value)
  }

  private parseResponse(response: any) {
    let parsedResponse = { ...response }
    Object.entries(response).forEach(([key, item]: [string, any]) => {
      if (key.includes('datetime')) {
        parsedResponse = {
          ...parsedResponse,
          [key]: this.parseDateTime(item),
        }
      } else if(Array.isArray(item)) {
        parsedResponse = {
          ...parsedResponse,
          [key]: item.map((i: any) => this.parseResponse(i)),
        }
      } else if(typeof item === 'object' && item !== null) {
        parsedResponse = {
          ...parsedResponse,
          [key]: this.parseResponse(item),
        }
      }
    })
    return parsedResponse
  }
}
