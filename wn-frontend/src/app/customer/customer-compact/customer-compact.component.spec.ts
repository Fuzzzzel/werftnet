import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompactComponent } from './customer-compact.component';
import { UtilService } from '../../core/util.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataService } from '../../core/core-data.service';
import { CustomerSearchService } from '../customer-search/customer-search.service';
import { CustomerEditService } from '../customer-edit/customer-edit.service';
import { ViewChild, Component } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Customer, CustomerContact } from '../customer.model';
let customerMock = require('./../customer.mock.json');

describe('CustomerCompactComponent', () => {
  let component: CustomerCompactComponent;
  let fixture: ComponentFixture<CustomerCompactComponent>;
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        CustomerCompactComponent
      ],
      providers: [
        UtilService,
        CustomerEditService,
        CustomerSearchService
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(CustomerCompactComponent);
    component = fixture.componentInstance;
    component.customer = customerMock;
    backend = TestBed.get(HttpTestingController)
  }));

  it('should create', () => {
    expect(fixture.nativeElement.querySelector('.compact-default')).toBeTruthy();
  });

  it('should edit customer', () => {
    let customer = new Customer()
    customer.id = 1
    component.editCustomer(customer)
  })

  it('should edit customer contact', () => {
    let customer = new Customer()
    customer.id = 1
    let contact = new CustomerContact()
    contact.id = 2
    component.editcontact(customer, contact)
  })
});
