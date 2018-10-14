import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitMapSearchComponent } from './init-map-search.component';

describe('InitMapSearchComponent', () => {
  let component: InitMapSearchComponent;
  let fixture: ComponentFixture<InitMapSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitMapSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitMapSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
