import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing'

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
import { PriceUnit, Service, Language } from '../../shared/model/common.model';
import { FreelancersLoaded } from '../freelancer-search/freelancers-loaded.model';
import { FreelancerEditPriceComponent } from '../freelancer-edit-price/freelancer-edit-price.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
const freelancerMock = require('./../freelancer.mock.json')

describe('FreelancerEditComponent', () => {
  let component: FreelancerEditComponent
  let fixture: ComponentFixture<FreelancerEditComponent>
  let backend: HttpTestingController
  let freelancerEditService: FreelancerEditService

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        FreelancerEditComponent,
        FreelancerEditPriceComponent
      ],
      providers: [
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock },
        FreelancerEditService,
        FreelancerSearchService
      ]
    })
      .compileComponents()

    backend = TestBed.get(HttpTestingController)
    freelancerEditService = TestBed.get(FreelancerEditService)
    fixture = TestBed.createComponent(FreelancerEditComponent)
    component = fixture.componentInstance
    tick()
    fixture.detectChanges()
    component.fl_edit = freelancerMock
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should save freelancer', fakeAsync(() => {
    component.saveFreelancer()
    tick()

    // Save freelancer
    const req = backend.expectOne('/freelancers/1')
    expect(req.request.method).toBe("POST")
    req.flush(component.fl_edit, { status: 200, statusText: 'OK' })
  }))

  it('should fail to save freelancer', fakeAsync(() => {
    component.saveFreelancer()

    tick()
    const req = backend.expectOne('/freelancers/1')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }))

  it('should delete freelancer', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteFreelancer()

    tick()
    const req = backend.expectOne('/freelancers/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(component.fl_edit, { status: 200, statusText: 'OK' })
  }))


  it('should fail to delete freelancer', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteFreelancer()

    tick()
    const req = backend.expectOne('/freelancers/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }))

  it('should add freelancer price', () => {
    let priceLine = new PriceLine()
    priceLine.lng_source = new Language()
    priceLine.lng_target = new Language()
    priceLine.price_unit = new PriceUnit()
    priceLine.price_per_unit = 0.20
    priceLine.service = new Service()

    component.addPrice(priceLine)
  })

  it('should toggle freelancer price line', () => {
    component.toggleEditPrice({ id: 1 })
  })

  it('should fail to add freelancer price', () => {
    let priceLine = new PriceLine()
    component.addPrice(priceLine)
  })

  it('should cancel edit', () => {
    component.cancelEdit()
  })

  it('should clear all values but the name', () => {
    component.fl_edit.name1 = 'Test Name'
    component.fl_edit.phone = 'Test Phone'

    component.clearAllButName()

    expect(component.fl_edit.name1).toEqual('Test Name')
    expect(component.fl_edit.phone).toBeFalsy()
  })
})
