import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitMapSaverComponent } from './init-map-saver.component';

describe('InitMapSaverComponent', () => {
  let component: InitMapSaverComponent;
  let fixture: ComponentFixture<InitMapSaverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitMapSaverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitMapSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
