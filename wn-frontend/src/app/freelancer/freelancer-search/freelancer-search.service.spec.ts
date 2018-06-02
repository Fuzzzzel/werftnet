import { TestBed, inject } from '@angular/core/testing'

import { FreelancerSearchService } from './freelancer-search.service'
import { UtilService } from '../../core/util.service'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('FreelancerSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        UtilService,
        FreelancerSearchService
      ]
    })
  })

  it('should be created', inject([FreelancerSearchService], (service: FreelancerSearchService) => {
    expect(service).toBeTruthy()
  }))
})
