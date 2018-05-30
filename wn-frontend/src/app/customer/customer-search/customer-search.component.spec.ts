import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreDataService } from '../../core/core-data.service';
import { SharedModule } from '../../shared/shared.module';
import { UtilService } from '../../core/util.service';
import { CustomerSearchComponent } from './customer-search.component';
import { CustomerSearchService } from './customer-search.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerCompactComponent } from '../customer-compact/customer-compact.component';
import { CustomerEditService } from '../customer-edit/customer-edit.service';
import { NgbPagination, NgbModule, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Customer } from '../customer.model';

describe('CustomerSearchComponent', () => {
  let component: CustomerSearchComponent;
  let fixture: ComponentFixture<CustomerSearchComponent>;
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'customer/edit',
            redirectTo: ''
          }
        ]),
        NgbModule
      ],
      declarations: [
        CustomerSearchComponent,
        CustomerCompactComponent
      ],
      providers: [
        UtilService,
        CustomerSearchService,
        CustomerEditService,
        NgbPaginationConfig,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(CustomerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search customers', () => {
    component.searchCustomers(null)
  })

  it('should edit customer', (done) => {
    let customerToEdit = new Customer()
    customerToEdit.id = 1
    component.editCustomer(customerToEdit)
      .then(() => {
        done()
      })
    const req = backend.expectOne('/customers/' + customerToEdit.id);
    expect(req.request.method).toBe("GET");
    req.flush(customerToEdit, { status: 200, statusText: 'OK' });
  })

  it('should fail to edit customer', (done) => {
    let customerToEdit = new Customer()
    customerToEdit.id = 1
    component.editCustomer(customerToEdit)
      .catch((error) => {
        done()
      })
    const req = backend.expectOne('/customers/' + customerToEdit.id);
    expect(req.request.method).toBe("GET");
    req.flush(customerToEdit, { status: 404, statusText: 'Not Found' });
  })
});
