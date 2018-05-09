import { TestBed, inject } from '@angular/core/testing';

import { CustomerSearchService } from './customer-search.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilService } from '../../core/util.service';
import { CoreDataService } from '../../core/core-data.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomerSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CoreDataService,
        UtilService,
        CustomerSearchService
      ]
    });
  });

  it('should be created', inject([CustomerSearchService], (service: CustomerSearchService) => {
    expect(service).toBeTruthy();
  }));
});
