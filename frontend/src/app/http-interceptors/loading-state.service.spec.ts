import { TestBed } from '@angular/core/testing';

import { LoadingStateService } from './loading-state.service';

describe('LoadingStateService', () => {
  let service: LoadingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
