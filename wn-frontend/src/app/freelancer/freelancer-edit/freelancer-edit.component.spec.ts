import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerEditComponent } from './freelancer-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from '../../core/util.service';
import { CoreDataService } from '../../core/core-data.service';
import { FreelancerEditService } from './freelancer-edit.service';
import { FreelancerSearchService } from '../freelancer-search/freelancer-search.service';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';

describe('FreelancerEditComponent', () => {
  let component: FreelancerEditComponent;
  let fixture: ComponentFixture<FreelancerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        FreelancerEditComponent
      ],
      providers: [
        UtilService,
        FreelancerEditService,
        FreelancerSearchService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
