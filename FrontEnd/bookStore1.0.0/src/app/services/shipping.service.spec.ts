import { TestBed, inject } from '@angular/core/testing';

import { ShippingService } from './shipping.service';

describe('ShippingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShippingService]
    });
  });

  it('should ...', inject([ShippingService], (service: ShippingService) => {
    expect(service).toBeTruthy();
  }));
});
