import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSystemEditImprintComponent } from './admin-system-edit-imprint.component';
import { SharedModule } from '../../../shared/shared.module';
import { AdminSystemEditImprintService } from './admin-system-edit-imprint.service';
import { UtilService } from '../../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminSystemEditImprintComponent', () => {
  let component: AdminSystemEditImprintComponent;
  let fixture: ComponentFixture<AdminSystemEditImprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AdminSystemEditImprintService,
        UtilService
      ],
      declarations: [AdminSystemEditImprintComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSystemEditImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
