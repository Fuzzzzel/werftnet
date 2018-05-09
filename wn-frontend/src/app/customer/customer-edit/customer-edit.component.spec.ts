import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditComponent } from './customer-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { UtilService } from '../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataService } from '../../core/core-data.service';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { CustomerEditService } from './customer-edit.service';
import { CustomerSearchService } from '../customer-search/customer-search.service';

describe('CustomerEditComponent', () => {
  let component: CustomerEditComponent;
  let fixture: ComponentFixture<CustomerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock },
        CustomerEditService,
        CustomerSearchService
      ],
      declarations: [CustomerEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
