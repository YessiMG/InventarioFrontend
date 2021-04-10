import { TestBed } from '@angular/core/testing';

import { VirtualWarehouseService } from './virtual-warehouse.service';

describe('VirtualWarehouseService', () => {
  let service: VirtualWarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualWarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
