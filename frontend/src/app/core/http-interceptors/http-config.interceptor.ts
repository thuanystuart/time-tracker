import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json; charset=UTF-8',
    }),
    withCredentials: true,
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      ...this.httpOptions,
      url: environment.baseUrl + request.url
    })
    return next.handle(request)
  }
}
