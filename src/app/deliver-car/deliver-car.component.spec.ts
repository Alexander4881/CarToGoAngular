import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverCarComponent } from './deliver-car.component';

describe('DeliverCarComponent', () => {
  let component: DeliverCarComponent;
  let fixture: ComponentFixture<DeliverCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
