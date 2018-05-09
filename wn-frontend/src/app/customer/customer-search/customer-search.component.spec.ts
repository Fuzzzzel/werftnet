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

describe('CustomerSearchComponent', () => {
  let component: CustomerSearchComponent;
  let fixture: ComponentFixture<CustomerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(CustomerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
