import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing'

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

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'freelancer/edit/:freelancerId',
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
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(FreelancerCompactComponent)
    component = fixture.componentInstance
    component.freelancer = freelancerMock
    tick()
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should go to edit freelancer', fakeAsync(() => {
    component.editFreelancer()
  }))

  it('should return combined display name', () => {
    let combinedDisplayName = component.getCombinedDisplayName(null)
    expect(combinedDisplayName).toEqual('')
  })
})
