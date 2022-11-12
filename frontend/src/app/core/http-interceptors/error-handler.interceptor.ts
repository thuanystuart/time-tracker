import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, ObservableInput, of } from 'rxjs';
import { LoadingStateService } from '@services/loading-state.service';
import { errorHandlerType, ERROR_HANDLER_CONFIG } from './request-context';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(public loadindState: LoadingStateService, public snackBar: MatSnackBar) { }

  handleError(error: HttpErrorResponse, showAlert: boolean): ObservableInput<any> {
    let message = ''
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
        message = 'An unknown error occured.'
    }
    if (showAlert) this.snackBar.open(message, undefined, { duration: 2000 })
    return of<any>(undefined)
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const errorHandlerConfig: errorHandlerType = request.context.get(ERROR_HANDLER_CONFIG)
    if (errorHandlerConfig.handle) {
      return next.handle(request).pipe(
        catchError((error) => this.handleError(error, errorHandlerConfig.showMessage || true))
      )
    } else {
      return next.handle(request)
    }
  }

}
