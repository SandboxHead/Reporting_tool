import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytemplateComponent } from './mytemplate.component';

describe('MytemplateComponent', () => {
  let component: MytemplateComponent;
  let fixture: ComponentFixture<MytemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
