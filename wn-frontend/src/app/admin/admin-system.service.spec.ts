import { TestBed, inject } from '@angular/core/testing';

import { AdminSystemService } from './admin-system.service';

describe('AdminSystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminSystemService]
    });
  });

  it('should be created', inject([AdminSystemService], (service: AdminSystemService) => {
    expect(service).toBeTruthy();
  }));
});
