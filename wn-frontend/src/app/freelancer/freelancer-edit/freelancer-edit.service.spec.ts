import { TestBed, inject } from '@angular/core/testing';

import { FreelancerEditService } from './freelancer-edit.service';
import { UtilService } from '../../core/util.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FreelancerSearchService } from '../freelancer-search/freelancer-search.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Freelancer } from '../freelancer.model';
const freelancerMock = require('./../freelancer.mock.json');

describe('FreelancerEditService', () => {
  let location: Location
  let router: Router
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
        UtilService,
        FreelancerSearchService
      ]
    });
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    router.initialNavigation()
  });

  it('should be created', inject([FreelancerEditService], (service: FreelancerEditService) => {
    expect(service).toBeTruthy();
  }));


  it('should get freelancer and run edit',
    inject([FreelancerEditService, HttpTestingController], (service: FreelancerEditService, backend: HttpTestingController) => {
      service.getFreelancerByIdAndEdit(1)
      const req = backend.expectOne('/freelancers/1');
      expect(req.request.method).toBe("GET");
      req.flush(freelancerMock, { status: 200, statusText: 'Ok' });

      // expect(location.path()).toBe('freelancer/edit');
    })
  )

  it('should save freelancer', inject([FreelancerEditService, HttpTestingController], (service: FreelancerEditService, backend: HttpTestingController) => {
    service.saveFreelancer(freelancerMock)

    const req = backend.expectOne('/freelancers/1');
    expect(req.request.method).toBe("POST");
    req.flush(freelancerMock, { status: 200, statusText: 'Ok' });
  }))

  it('should delete freelancer', inject([FreelancerEditService, HttpTestingController], (service: FreelancerEditService, backend: HttpTestingController) => {
    const freelancerToDelete = new Freelancer()
    freelancerToDelete.id = 1
    spyOn(window, 'confirm').and.returnValue(true);
    service.deleteFreelancer(freelancerToDelete)
    const req = backend.expectOne('/freelancers/' + freelancerToDelete.id);
    expect(req.request.method).toBe("DELETE");
    req.flush({}, { status: 200, statusText: 'Ok' });
  }));
});
