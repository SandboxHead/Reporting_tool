import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPopupComponent } from './chart-popup.component';

describe('ChartPopupComponent', () => {
  let component: ChartPopupComponent;
  let fixture: ComponentFixture<ChartPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
