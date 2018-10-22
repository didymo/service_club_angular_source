import { TestBed } from '@angular/core/testing';

import { TmpGetService } from './tmp-get.service';

describe('TmpGetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TmpGetService = TestBed.get(TmpGetService);
    expect(service).toBeTruthy();
  });
});
