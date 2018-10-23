import { TestBed } from '@angular/core/testing';

import { TmpObjectSaveService } from './tmp-object-save.service';

describe('TmpObjectSaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TmpObjectSaveService = TestBed.get(TmpObjectSaveService);
    expect(service).toBeTruthy();
  });
});
