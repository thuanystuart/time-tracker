import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { requestTypesList, requestTypes } from '../http-interceptors/request-types';

type loadingType = Record<typeof requestTypesList[number], boolean>

@Injectable({
  providedIn: 'root',
})
export class LoadingStateService {

  private isLoadingSource: BehaviorSubject<loadingType> = new BehaviorSubject<loadingType>({} as loadingType)
  isLoading$: Observable<loadingType> = this.isLoadingSource.asObservable()

  constructor() { }

  setLoading(requestType: requestTypes) {
    const updatedLoading: loadingType = {...this.isLoadingSource.value, [requestType]: true}
    this.isLoadingSource.next(updatedLoading)
  }

  setLoaded(requestType: requestTypes) {
    const updatedLoading: loadingType = {...this.isLoadingSource.value, [requestType]: false}
    this.isLoadingSource.next(updatedLoading)
  }
}

export const LoadingStateServiceFactory = () =>
  new LoadingStateService()
