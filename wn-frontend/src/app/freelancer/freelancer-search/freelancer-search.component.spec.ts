import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreDataService } from '../../core/core-data.service';
import { SharedModule } from '../../shared/shared.module';
import { UtilService } from '../../core/util.service';
import { FreelancerSearchComponent } from './freelancer-search.component';
import { FreelancerSearchService } from './freelancer-search.service';
import { FormsModule } from '@angular/forms';
import { FreelancerModule } from '../freelancer.module';
import { FreelancerCompactComponent } from '../freelancer-compact/freelancer-compact.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FreelancerEditService } from '../freelancer-edit/freelancer-edit.service';
import { NgbPaginationConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';

describe('FreelancerComponent', () => {
  let component: FreelancerSearchComponent;
  let fixture: ComponentFixture<FreelancerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
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
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
