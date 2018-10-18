import { TestBed, inject } from '@angular/core/testing';

import { DrupalConnectionService } from './drupal-connection.service';

describe('DrupalConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrupalConnectionService]
    });
  });

  it('should be created', inject([DrupalConnectionService], (service: DrupalConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
