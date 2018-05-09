import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AdminSimpleEntityComponent } from './admin-simple-entity.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { CoreDataService } from '../../core/core-data.service';
import { UtilService } from '../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AdminSimpleEntityComponent', () => {
  let component: AdminSimpleEntityComponent;
  let fixture: ComponentFixture<AdminSimpleEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [AdminSimpleEntityComponent],
      providers: [
        UtilService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSimpleEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([HttpTestingController], (backend: HttpTestingController) => {
    expect(component).toBeTruthy();
    backend.expectOne('/admin/simple_entity/');
    // ToDo: Send back simple entity collection with dummy values
  }));
});
