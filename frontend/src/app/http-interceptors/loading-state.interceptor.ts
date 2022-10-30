import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingStateService } from './loading-state.service';
import { requestTypes, REQUEST_TYPE } from './request-types';

@Injectable()
export class LoadingStateInterceptor implements HttpInterceptor {

  constructor(public loadindState: LoadingStateService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestType: requestTypes = request.context.get(REQUEST_TYPE)
    if (requestType) {
      this.loadindState.setLoading(requestType)
    }
    return next.handle(request).pipe(
        finalize(() => this.loadindState.setLoaded(requestType))
    )
  }

}
