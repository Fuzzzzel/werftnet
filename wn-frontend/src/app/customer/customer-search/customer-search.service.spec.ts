import { TestBed, inject } from '@angular/core/testing'

import { CustomerSearchService } from './customer-search.service'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { UtilService } from '../../core/util.service'
import { CoreDataService } from '../../core/core-data.service'
import { RouterTestingModule } from '@angular/router/testing'

describe('CustomerSearchService', () => {
  let service: CustomerSearchService
  let backend: HttpTestingController
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
    })
    backend = TestBed.get(HttpTestingController)
    service = TestBed.get(CustomerSearchService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should search customers', (done) => {
    service.searchCustomers({ page: 1 })
      .then(() => {
        done()
      })

    const req = backend.expectOne('/customers/search')
    expect(req.request.method).toBe("POST")
    req.flush({}, { status: 200, statusText: 'OK' })
  })

  it('should fail to search customers', (done) => {
    service.searchCustomers({ page: 1 })
      .catch(() => {
        done()
      })
    const req = backend.expectOne('/customers/search')
    expect(req.request.method).toBe("POST")
    req.flush({}, { status: 404, statusText: 'Not Found' })
  })
})
