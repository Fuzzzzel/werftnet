import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FreelancerCompactComponent } from './freelancer-compact.component'
import { SharedModule } from '../../shared/shared.module'
import { RouterTestingModule } from '@angular/router/testing'
import { UtilService } from '../../core/util.service'
import { CoreDataService } from '../../core/core-data.service'
import { CoreDataServiceMock } from '../../core/core-data.service-mock'
import { FreelancerEditService } from '../freelancer-edit/freelancer-edit.service'
import { FreelancerSearchService } from '../freelancer-search/freelancer-search.service'
import { Freelancer } from '../freelancer.model'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
const freelancerMock = require('./../freelancer.mock.json')

describe('FreelancerCompactComponent', () => {
  let component: FreelancerCompactComponent
  let fixture: ComponentFixture<FreelancerCompactComponent>
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'freelancer/edit',
            redirectTo: ''
          }
        ]),
      ],
      declarations: [
        FreelancerCompactComponent
      ],
      providers: [
        UtilService,
        FreelancerSearchService,
        FreelancerEditService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(FreelancerCompactComponent)
    component = fixture.componentInstance
    component.freelancer = freelancerMock
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should go to edit freelancer', (done) => {
    component.editFreelancer()
      .then((freelancer) => {
        done()
      })

    const req = backend.expectOne('/freelancers/' + freelancerMock.id)
    expect(req.request.method).toBe("GET")
    req.flush(freelancerMock, { status: 200, statusText: 'Ok' })
  })

  it('should fail to go to edit freelancer', (done) => {
    component.editFreelancer()
      .catch((error) => {
        done()
      })

    spyOn(window, 'alert').and.returnValue(true)
    const req = backend.expectOne('/freelancers/' + freelancerMock.id)
    expect(req.request.method).toBe("GET")
    req.flush(freelancerMock, { status: 404, statusText: 'Not Found' })
  })

  it('should return combined display name', () => {
    component.getCombinedDisplayName({})
  })
})
