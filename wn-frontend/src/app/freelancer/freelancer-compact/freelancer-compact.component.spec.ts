import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerCompactComponent } from './freelancer-compact.component';
import { SharedModule } from '../../shared/shared.module';
import { UtilService } from '../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FreelancerEditService } from '../freelancer-edit/freelancer-edit.service';
import { CoreDataService } from '../../core/core-data.service';
import { FreelancerSearchService } from '../freelancer-search/freelancer-search.service';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { Component, ViewChild } from '@angular/core';
import { Freelancer } from '../freelancer.model';
let freelancerMock = require('./../freelancer.mock.json');

describe('FreelancerCompactComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        FreelancerCompactComponent,
        TestHostComponent
      ],
      providers: [
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock },
        FreelancerEditService,
        FreelancerSearchService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostComponent.freelancerCompactComponent.freelancer = freelancerMock;
    /*
    testHostFixture.detectChanges(); */
  });

  it('should create', () => {
    // testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('.compact-default')).toBeTruthy();
  });

  // -------------- Mock up host component ----------------

  @Component({
    selector: `host-component`,
    template: `<app-freelancer-compact></app-freelancer-compact>`
  })
  class TestHostComponent {
    @ViewChild(FreelancerCompactComponent)

    public freelancerCompactComponent: FreelancerCompactComponent
  }

});
