import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageMainComponent } from './index-page-main.component';

describe('IndexPageMainComponent', () => {
  let component: IndexPageMainComponent;
  let fixture: ComponentFixture<IndexPageMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
