import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGetComponent } from './question-get.component';

describe('QuestionGetComponent', () => {
  let component: QuestionGetComponent;
  let fixture: ComponentFixture<QuestionGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
