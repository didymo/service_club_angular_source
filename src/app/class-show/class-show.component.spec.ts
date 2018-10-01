import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassShowComponent } from './class-show.component';

describe('ClassShowComponent', () => {
  let component: ClassShowComponent;
  let fixture: ComponentFixture<ClassShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
