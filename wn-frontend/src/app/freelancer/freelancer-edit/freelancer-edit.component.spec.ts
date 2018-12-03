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
import { ActivatedRouteStub } from './../../test/activated-route-stub';
import { ActivatedRoute } from '@angular/router';
const freelancerMock = require('./../freelancer.mock.json')

describe('FreelancerEditComponent', () => {
  let component: FreelancerEditComponent
  let fixture: ComponentFixture<FreelancerEditComponent>
  let backend: HttpTestingController
  let freelancerEditService: FreelancerEditService
  let activatedRoute: ActivatedRouteStub

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
        FreelancerSearchService,
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub
        }
      ]
    })
      .compileComponents()

    backend = TestBed.get(HttpTestingController)
    freelancerEditService = TestBed.get(FreelancerEditService)
    fixture = TestBed.createComponent(FreelancerEditComponent)
    component = fixture.componentInstance
    spyOn(component.ngxUiLoaderService, 'start').and.returnValue(true)
    spyOn(component.ngxUiLoaderService, 'stop').and.returnValue(true)
    tick()
  }))

  function initWithFreelancer() {
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any
    activatedRoute.testParamMap = { freelancerId: 1 }
    fixture.detectChanges()

    const fl_edit = freelancerMock

    const req = backend.expectOne('/freelancers/' + fl_edit.id)
    expect(req.request.method).toBe("GET")
    req.flush(fl_edit, { status: 200, statusText: 'OK' })
    tick()
  }

  it('should create', fakeAsync(() => {
    initWithFreelancer()
    expect(component).toBeTruthy()
  }))

  it('should fail to load freelancer', fakeAsync(() => {
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any
    activatedRoute.testParamMap = { freelancerId: 1 }
    fixture.detectChanges()

    const fl_edit = freelancerMock

    spyOn(window, 'alert').and.returnValue(true)
    const req = backend.expectOne('/freelancers/' + fl_edit.id)
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: 'NOT FOUND' })
    tick()
  }))

  it('should save freelancer', fakeAsync(() => {
    initWithFreelancer()
    component.saveFreelancer()
    tick()

    // Save freelancer
    const req = backend.expectOne('/freelancers/1')
    expect(req.request.method).toBe("POST")
    req.flush(component.fl_edit, { status: 200, statusText: 'OK' })
  }))

  it('should fail to save freelancer', fakeAsync(() => {
    initWithFreelancer()
    component.saveFreelancer()

    tick()
    const req = backend.expectOne('/freelancers/1')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }))

  it('should delete freelancer', fakeAsync(() => {
    initWithFreelancer()
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteFreelancer()

    tick()
    const req = backend.expectOne('/freelancers/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(component.fl_edit, { status: 200, statusText: 'OK' })
  }))


  it('should fail to delete freelancer', fakeAsync(() => {
    initWithFreelancer()
    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteFreelancer()

    tick()
    const req = backend.expectOne('/freelancers/1')
    expect(req.request.method).toBe("DELETE")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }))

  it('should add freelancer price', fakeAsync(() => {
    initWithFreelancer()
    let priceLine = new PriceLine()
    priceLine.lng_source = new Language()
    priceLine.lng_target = new Language()
    priceLine.price_unit = new PriceUnit()
    priceLine.price_per_unit = 0.20
    priceLine.service = new Service()

    component.addPrice(priceLine)
  }))

  it('should toggle freelancer price line', fakeAsync(() => {
    initWithFreelancer()
    component.toggleEditPrice({ id: 1 })
  }))

  it('should fail to add freelancer price', fakeAsync(() => {
    initWithFreelancer()
    let priceLine = new PriceLine()
    component.addPrice(priceLine)
  }))

  it('should cancel edit', fakeAsync(() => {
    initWithFreelancer()
    component.cancelEdit()
  }))

  it('should clear all values but the name', fakeAsync(() => {
    initWithFreelancer()
    component.fl_edit.name1 = 'Test Name'
    component.fl_edit.phone = 'Test Phone'

    component.clearAllButName()

    expect(component.fl_edit.name1).toEqual('Test Name')
    expect(component.fl_edit.phone).toBeFalsy()
  }))
})
