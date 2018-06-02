import { async, ComponentFixture, TestBed } from '@angular/core/testing'
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

describe('FreelancerSearchComponent', () => {
  let component: FreelancerSearchComponent
  let fixture: ComponentFixture<FreelancerSearchComponent>
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
        NgbModule
      ],
      declarations: [
        FreelancerSearchComponent,
        FreelancerCompactComponent
      ],
      providers: [
        CoreDataServiceMock,
        UtilService,
        FreelancerSearchService,
        FreelancerEditService,
        NgbPaginationConfig,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(FreelancerSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should search freelancers', (done) => {
    component.searchFreelancers({})
      .then(() => {
        done()
      })

    const req = backend.expectOne('/freelancers/search')
    expect(req.request.method).toBe("POST")
    req.flush(new FreelancersLoaded(), { status: 200, statusText: 'Ok' })
  })

  it('should search freelancers', (done) => {
    component.searchFreelancers({})
      .catch(() => {
        done()
      })

    const req = backend.expectOne('/freelancers/search')
    expect(req.request.method).toBe("POST")
    req.flush(null, { status: 404, statusText: 'Not Found' })
  })

  it('should edit freelancer', (done) => {
    component.editFreelancer(new Freelancer())
      .then((freelancer) => {
        done()
      })
  })

  it('should fail to edit freelancer', (done) => {
    let freelancer = new Freelancer()
    freelancer.id = 1
    spyOn(window, 'alert').and.returnValue(true)
    component.editFreelancer(freelancer)
      .catch((error) => {
        done()
      })

    const req = backend.expectOne('/freelancers/1')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: 'Not Found' })

  })
})
