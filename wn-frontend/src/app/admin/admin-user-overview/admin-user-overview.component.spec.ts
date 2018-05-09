import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserOverviewComponent } from './admin-user-overview.component';
import { SharedModule } from '../../shared/shared.module';
import { UtilService } from '../../core/util.service';
import { AdminUserService } from '../admin-user.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminUserOverviewComponent', () => {
  let component: AdminUserOverviewComponent;
  let fixture: ComponentFixture<AdminUserOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        AdminUserService,
        UtilService
      ],
      declarations: [AdminUserOverviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
