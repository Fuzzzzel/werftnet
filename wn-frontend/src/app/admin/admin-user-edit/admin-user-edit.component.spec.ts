import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserEditComponent } from './admin-user-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataServiceMock } from '../../core/core-data.service-mock';
import { CoreDataService } from '../../core/core-data.service';
import { UtilService } from '../../core/util.service';
import { AdminUserService } from '../admin-user.service';
import { AdminUserEditService } from './admin-user-edit.service';

describe('AdminUserEditComponent', () => {
  let component: AdminUserEditComponent;
  let fixture: ComponentFixture<AdminUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        UtilService,
        AdminUserService,
        AdminUserEditService,
        { provide: CoreDataService, useClass: CoreDataServiceMock }
      ],
      declarations: [AdminUserEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
