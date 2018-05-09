import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AdminTwoLevelEntityComponent } from './admin-two-level-entity.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoreDataService } from '../../core/core-data.service';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { UtilService } from '../../core/util.service';

describe('AdminTwoLevelEntityComponent', () => {
  let component: AdminTwoLevelEntityComponent;
  let fixture: ComponentFixture<AdminTwoLevelEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [AdminTwoLevelEntityComponent],
      providers: [
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTwoLevelEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([HttpTestingController], (backend: HttpTestingController) => {
    expect(component).toBeTruthy();
    backend.expectOne('/admin/two_level_entity/');
    // ToDo: Send back simple entity collection with dummy values
  }));
});
