import { TestBed, inject } from '@angular/core/testing';

import { QuestionSubmitService } from './question-submit.service';

describe('QuestionSubmitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionSubmitService]
    });
  });

  it('should be created', inject([QuestionSubmitService], (service: QuestionSubmitService) => {
    expect(service).toBeTruthy();
  }));
});
