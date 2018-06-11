import { TestBed, inject } from '@angular/core/testing'

import { FreelancerSearchService } from './freelancer-search.service'
import { UtilService } from '../../core/util.service'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { FreelancersLoaded } from './freelancers-loaded.model';
const freelancerMock = require('./../freelancer.mock.json')

describe('FreelancerSearchService', () => {
  let service: FreelancerSearchService
  let backend: HttpTestingController
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
    service = TestBed.get(FreelancerSearchService)
    backend = TestBed.get(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should search freelancers', (done) => {
    service.searchFreelancers({})
      .then(() => {
        done()
      })

    const req = backend.expectOne('/freelancers/search')
    expect(req.request.method).toBe("POST")

    let freelancersLoaded = new FreelancersLoaded()
    // Set to empty array - get's prefilled with an empty PriceLine?!
    freelancerMock.prices = []
    freelancersLoaded.items.push(freelancerMock)

    req.flush(freelancersLoaded, { status: 200, statusText: 'Ok' })
  })

  it('should fail to search freelancers', (done) => {
    service.searchFreelancers(null)
      .catch(() => {
        done()
      })

    const req = backend.expectOne('/freelancers/search')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  })

})
