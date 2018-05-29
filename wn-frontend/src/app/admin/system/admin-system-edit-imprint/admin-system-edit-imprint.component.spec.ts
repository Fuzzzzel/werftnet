import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSystemEditImprintComponent } from './admin-system-edit-imprint.component';
import { SharedModule } from '../../../shared/shared.module';
import { AdminSystemEditImprintService } from './admin-system-edit-imprint.service';
import { UtilService } from '../../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AdminSystemEditImprintComponent', () => {
  let component: AdminSystemEditImprintComponent;
  let fixture: ComponentFixture<AdminSystemEditImprintComponent>;
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AdminSystemEditImprintService,
        HttpTestingController,
        UtilService
      ],
      declarations: [AdminSystemEditImprintComponent]
    })
      .compileComponents();
    backend = TestBed.get(HttpTestingController)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSystemEditImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel saving', () => {
    component.cancelSaveImprint()
  });

  xit('should save imprint', () => {
    component.imprint = 'Imprint Text'
    component.saveImprint()

    const req2 = backend.expectOne('/admin/settings/imprint')
    expect(req2.request.method).toBe("POST")
    req2.flush('New Imprint Text', { status: 200, statusText: 'OK' })
  })

  it('should fail to save imprint', () => {
    component.imprint = 'Imprint Text'
    component.saveImprint()

    spyOn(window, 'alert').and.returnValue(true);

    /*
    const req = backend.expectOne('/admin/settings/imprint')
    expect(req.request.method).toBe("POST")
    req.flush('New Imprint Text', { status: 404, statusText: '404 Not Found' })
    */
  })
});
