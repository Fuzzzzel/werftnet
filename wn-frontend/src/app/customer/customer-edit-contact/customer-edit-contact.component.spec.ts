import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditContactComponent } from './customer-edit-contact.component';
import { SharedModule } from '../../shared/shared.module';
import { UtilService } from '../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataService } from '../../core/core-data.service';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { CustomerEditService } from '../customer-edit/customer-edit.service';
import { CustomerSearchService } from '../customer-search/customer-search.service';

describe('CustomerEditContactComponent', () => {
  let component: CustomerEditContactComponent;
  let fixture: ComponentFixture<CustomerEditContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        UtilService,
        CustomerEditService,
        CustomerSearchService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ],
      declarations: [CustomerEditContactComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
