import { TestBed } from '@angular/core/testing';

import { LoadingStateInterceptor } from './loading-state.interceptor';

describe('LoadingStateInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoadingStateInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoadingStateInterceptor = TestBed.inject(LoadingStateInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
