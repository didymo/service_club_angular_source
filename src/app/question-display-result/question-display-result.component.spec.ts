import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDisplayResultComponent } from './question-display-result.component';

describe('QuestionDisplayResultComponent', () => {
  let component: QuestionDisplayResultComponent;
  let fixture: ComponentFixture<QuestionDisplayResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDisplayResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDisplayResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
