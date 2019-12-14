import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveCarShowDetailsComponent } from './reserve-car-show-details.component';

describe('ReserveCarShowDetailsComponent', () => {
  let component: ReserveCarShowDetailsComponent;
  let fixture: ComponentFixture<ReserveCarShowDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveCarShowDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveCarShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
