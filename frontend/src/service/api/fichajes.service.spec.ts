import { TestBed } from '@angular/core/testing';

import { FichajesService } from './fichajes.service';

describe('FichajesService', () => {
  let service: FichajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
