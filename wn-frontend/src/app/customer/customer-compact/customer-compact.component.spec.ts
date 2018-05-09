import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompactComponent } from './customer-compact.component';
import { UtilService } from '../../core/util.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataService } from '../../core/core-data.service';
import { CustomerSearchService } from '../customer-search/customer-search.service';
import { CustomerEditService } from '../customer-edit/customer-edit.service';
import { ViewChild, Component } from '@angular/core';
let customerMock = require('./../customer.mock.json');

describe('CustomerCompactComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        CustomerCompactComponent,
        TestHostComponent
      ],
      providers: [
        UtilService,
        CustomerEditService,
        CustomerSearchService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostComponent.customerCompactComponent.customer = customerMock;
  });

  it('should create', () => {
    expect(testHostFixture.nativeElement.querySelector('.compact-default')).toBeTruthy();
  });

  // -------------- Mock up host component ----------------

  @Component({
    selector: `host-component`,
    template: `<app-customer-compact></app-customer-compact>`
  })
  class TestHostComponent {
    @ViewChild(CustomerCompactComponent)

    public customerCompactComponent: CustomerCompactComponent
  }
});
