import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing'
import { CoreDataService } from '../../core/core-data.service'
import { SharedModule } from '../../shared/shared.module'
import { UtilService } from '../../core/util.service'
import { FreelancerSearchComponent } from './freelancer-search.component'
import { FreelancerSearchService } from './freelancer-search.service'
import { FormsModule } from '@angular/forms'
import { FreelancerModule } from '../freelancer.module'
import { FreelancerCompactComponent } from '../freelancer-compact/freelancer-compact.component'
import { RouterTestingModule } from '@angular/router/testing'
import { FreelancerEditService } from '../freelancer-edit/freelancer-edit.service'
import { NgbPaginationConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CoreDataServiceMock } from '../../core/core-data.service-mock'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FreelancersLoaded } from './freelancers-loaded.model';
import { Freelancer } from '../freelancer.model';
import { FreelancerSearchParams } from './freelancers-search-params.model';

describe('FreelancerSearchComponent', () => {
  let component: FreelancerSearchComponent
  let fixture: ComponentFixture<FreelancerSearchComponent>
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
          },
          {
            path: 'freelancer/new',
            redirectTo: ''
          }
        ]),
        NgbModule.forRoot()
      ],
      declarations: [
        FreelancerSearchComponent,
        FreelancerCompactComponent
      ],
      providers: [
        UtilService,
        FreelancerSearchService,
        FreelancerEditService,
        NgbPaginationConfig,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents()

    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(FreelancerSearchComponent)
    component = fixture.componentInstance
    tick()
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should search freelancers', fakeAsync(() => {
    component.searchFreelancers()

    tick()
    const req = backend.expectOne('/freelancers/search')
    expect(req.request.method).toBe("POST")
    req.flush(new FreelancersLoaded(), { status: 200, statusText: 'Ok' })
  }))

  it('should clear search parameters and result', fakeAsync(() => {
    component.searchParams = new FreelancerSearchParams()
    component.searchParams.page = 1
    component.searchParams.name = 'Test'
    component.searchFreelancers()

    tick()
    const req = backend.expectOne('/freelancers/search')
    expect(req.request.method).toBe("POST")
    req.flush(new FreelancersLoaded(), { status: 200, statusText: 'Ok' })
    expect(component.searchParams.name).toEqual('Test')
    component.clearSearch()
    expect(component.searchParams.name).not.toBeDefined()
  }))

  it('should fail to search freelancers', fakeAsync(() => {
    component.searchFreelancers()

    tick()
    const req = backend.expectOne('/freelancers/search')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  }))

  it('should edit freelancer', fakeAsync(() => {
    const freelancer = new Freelancer()
    freelancer.id = 1
    component.editFreelancer(freelancer)
    tick()
  }))

  it('should create new freelancer', fakeAsync(() => {
    component.editFreelancer()
    tick()
  }))
})
