import { TestBed, inject } from '@angular/core/testing';

import { QuestionResultService } from './question-result.service';

describe('QuestionResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionResultService]
    });
  });

  it('should be created', inject([QuestionResultService], (service: QuestionResultService) => {
    expect(service).toBeTruthy();
  }));
});
