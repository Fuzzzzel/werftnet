import { TestBed, inject } from '@angular/core/testing'

import { FreelancerEditService } from './freelancer-edit.service'
import { UtilService } from '../../core/util.service'
import { SharedModule } from '../../shared/shared.module'
import { RouterTestingModule } from '@angular/router/testing'
import { FreelancerSearchService } from '../freelancer-search/freelancer-search.service'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { Freelancer } from '../freelancer.model'
import { NgbCalendarIslamicUmalqura } from '@ng-bootstrap/ng-bootstrap'
const freelancerMock = require('./../freelancer.mock.json')

describe('FreelancerEditService', () => {
  let location: Location
  let router: Router
  let service: FreelancerEditService
  let backend: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'freelancer/edit',
            redirectTo: ''
          }
        ])
      ],
      providers: [
        FreelancerEditService,
        UtilService
      ]
    })
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    service = TestBed.get(FreelancerEditService)
    backend = TestBed.get(HttpTestingController)
    router.initialNavigation()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })


  it('should get freelancer and run edit', (done) => {
    service.getFreelancerById(1)
      .then((freelancer) => {
        done()
      })
    const req = backend.expectOne('/freelancers/1')
    expect(req.request.method).toBe("GET")
    req.flush(freelancerMock, { status: 200, statusText: 'Ok' })

    // expect(location.path()).toBe('freelancer/edit')
  })

  it('should prepare new freelancer to edit', (done) => {
    service.prepareEditFreelancer(null)
      .then(() => {
        done()
      })
  })

  it('should fail to prepare freelancer to save', (done) => {
    let freelancerToSave = { date_of_birth: 'XYZ' }

    service.prepareFreelancerToSave(freelancerToSave)
      .catch((error) => {
        done()
      })
  })

  it('should save freelancer', (done) => {
    service.saveFreelancer(freelancerMock)
      .then((freelancer) => {
        done()
      })
      .catch((error) => {
        throw error
      })

    setTimeout(() => {
      const req = backend.expectOne('/freelancers/' + freelancerMock.id)
      expect(req.request.method).toBe("POST")
      req.flush(freelancerMock, { status: 200, statusText: 'Ok' })
    }, 25)
  })

  it('should save new freelancer', (done) => {
    service.saveFreelancer(new Freelancer())
      .then((freelancer) => {
        done()
      })
      .catch((error) => {
        throw error
      })

    setTimeout(() => {
      const req = backend.expectOne('/freelancers')
      expect(req.request.method).toBe("POST")
      req.flush(freelancerMock, { status: 200, statusText: 'Ok' })
    }, 25)
  })

  it('should fail to save freelancer (route)', (done) => {
    service.saveFreelancer(freelancerMock)
      .catch((error) => {
        done()
      })

    setTimeout(() => {
      const req = backend.expectOne('/freelancers/' + freelancerMock.id)
      expect(req.request.method).toBe("POST")
      req.flush(freelancerMock, { status: 404, statusText: 'Not Found' })
    }, 25)
  })

  it('should fail to save freelancer (preparation)', (done) => {
    service.saveFreelancer({ date_of_birth: 'XYZ' })
      .catch((error) => {
        done()
      })
  })

  it('should delete freelancer', (done) => {
    const freelancerToDelete = new Freelancer()
    freelancerToDelete.id = 1

    spyOn(window, 'confirm').and.returnValue(true)
    service.deleteFreelancer(freelancerToDelete)
      .then(() => {
        done()
      })

    const req = backend.expectOne('/freelancers/' + freelancerToDelete.id)
    expect(req.request.method).toBe("DELETE")
    req.flush({}, { status: 200, statusText: 'Ok' })
  })

  it('should fail to delete freelancer', (done) => {
    const freelancerToDelete = new Freelancer()
    freelancerToDelete.id = 1
    spyOn(window, 'confirm').and.returnValues(false, true)
    service.deleteFreelancer(freelancerToDelete)
      .catch(() => {
        service.deleteFreelancer(freelancerToDelete)
          .catch((error) => {
            done()
          })
        const req = backend.expectOne('/freelancers/' + freelancerToDelete.id)
        expect(req.request.method).toBe("DELETE")
        req.flush({}, { status: 404, statusText: 'Not Found' })
      })
  })
})
