import { TestBed, inject } from '@angular/core/testing';

import { FreelancerEditService } from './freelancer-edit.service';
import { UtilService } from '../../core/util.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FreelancerSearchService } from '../freelancer-search/freelancer-search.service';

describe('FreelancerEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        FreelancerEditService,
        UtilService,
        FreelancerSearchService
      ]
    });
  });

  it('should be created', inject([FreelancerEditService], (service: FreelancerEditService) => {
    expect(service).toBeTruthy();
  }));
});
