import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'

import { AdminSystemEditImprintComponent } from './admin-system-edit-imprint.component'
import { SharedModule } from '../../../shared/shared.module'
import { AdminSystemEditImprintService } from './admin-system-edit-imprint.service'
import { UtilService } from '../../../core/util.service'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('AdminSystemEditImprintComponent', () => {
  let component: AdminSystemEditImprintComponent
  let fixture: ComponentFixture<AdminSystemEditImprintComponent>
  let backend: HttpTestingController

  beforeEach(fakeAsync(() => {
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
      .compileComponents()
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(AdminSystemEditImprintComponent)
    component = fixture.componentInstance
    tick()
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should cancel saving', () => {
    component.cancelSaveImprint()
  })

  it('should save imprint', fakeAsync(() => {
    const req = backend.expectOne('/admin/settings/imprint')
    expect(req.request.method).toBe("GET")
    req.flush('New Imprint Text', { status: 200, statusText: 'Imprint Text' })

    component.imprint = 'Imprint Text'
    component.saveImprint()
    tick()

    const req2 = backend.expectOne('/admin/settings/imprint')
    expect(req2.request.method).toBe("POST")
    req2.flush('New Imprint Text', { status: 200, statusText: 'OK' })
  }))

  it('should fail to save imprint', fakeAsync(() => {
    const req = backend.expectOne('/admin/settings/imprint')
    expect(req.request.method).toBe("GET")
    req.flush('New Imprint Text', { status: 200, statusText: 'Imprint Text' })

    spyOn(window, 'alert').and.returnValue(true)

    component.imprint = 'Imprint Text'
    component.saveImprint()
    tick()

    const req2 = backend.expectOne('/admin/settings/imprint')
    expect(req2.request.method).toBe("POST")
    req2.flush('New Imprint Text', { status: 404, statusText: '404 Not Found' })
  }))
})
