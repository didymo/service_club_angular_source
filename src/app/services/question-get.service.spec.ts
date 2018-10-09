import { TestBed, inject } from '@angular/core/testing';

import { QuestionGetService } from './question-get.service';

describe('QuestionGetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionGetService]
    });
  });

  it('should be created', inject([QuestionGetService], (service: QuestionGetService) => {
    expect(service).toBeTruthy();
  }));
});
