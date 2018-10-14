import { TestBed, inject } from '@angular/core/testing';

import { TmpSaveService } from './tmp-save.service';

import {Config} from './config';

describe('TmpSaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TmpSaveService]
    });
  });

  it('should be created', inject([TmpSaveService], (service: TmpSaveService) => {
    expect(service).toBeTruthy();
  }));
});
