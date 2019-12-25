import { TestBed } from '@angular/core/testing';

import { OrdercarService } from './ordercar.service';

describe('OrdercarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdercarService = TestBed.get(OrdercarService);
    expect(service).toBeTruthy();
  });
});
