import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FreelancerEditComponent } from './freelancer-edit.component'
import { SharedModule } from '../../shared/shared.module'
import { RouterTestingModule } from '@angular/router/testing'
import { UtilService } from '../../core/util.service'
import { CoreDataService } from '../../core/core-data.service'
import { FreelancerEditService } from './freelancer-edit.service'
import { FreelancerSearchService } from '../freelancer-search/freelancer-search.service'
import { CoreDataServiceMock } from '../../core/core-data.service-mock'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Freelancer } from '../freelancer.model';
import { PriceLine } from '../../shared/model/price-line.model';
import { PriceUnit, Service } from '../../shared/model/common.model';
const freelancerMock = require('./../freelancer.mock.json')

describe('FreelancerEditComponent', () => {
  let component: FreelancerEditComponent
  let fixture: ComponentFixture<FreelancerEditComponent>
  let backend: HttpTestingController
  let freelancerEditService: FreelancerEditService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        FreelancerEditComponent
      ],
      providers: [
        UtilService,
        FreelancerEditService,
        FreelancerSearchService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    freelancerEditService = TestBed.get(FreelancerEditService)
    fixture = TestBed.createComponent(FreelancerEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.fl_edit = freelancerMock
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should save freelancer', (done) => {
    component.saveFreelancer()
      .then(() => {
        done()
      })

    setTimeout(() => {
      const req = backend.expectOne('/freelancers/1')
      expect(req.request.method).toBe("POST")
      req.flush(component.fl_edit, { status: 200, statusText: 'OK' })
    }, 50)
  })


  it('should fail to save freelancer', (done) => {
    component.saveFreelancer()
      .catch(() => {
        done()
      })

    setTimeout(() => {
      const req = backend.expectOne('/freelancers/1')
      expect(req.request.method).toBe("POST")
      req.flush(null, { status: 404, statusText: 'Not Found' })
    }, 50)
  })

  it('should delete freelancer', (done) => {
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteFreelancer()
      .then(() => {
        done()
      })
    const req = backend.expectOne('/freelancers/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(component.fl_edit, { status: 200, statusText: 'OK' })
  })


  it('should fail to delete freelancer', (done) => {
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteFreelancer()
      .catch(() => {
        done()
      })
    const req = backend.expectOne('/freelancers/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  })

  it('should add freelancer price', () => {
    let priceLine = new PriceLine()
    priceLine.price_unit = new PriceUnit()
    priceLine.price_per_unit = 0.20
    priceLine.service = new Service()

    component.addPrice(priceLine)
  })

  it('should fail to add freelancer price', () => {
    let priceLine = new PriceLine()
    component.addPrice(priceLine)
  })

  it('should cancel edit', () => {
    component.cancelEdit()
  })
})
