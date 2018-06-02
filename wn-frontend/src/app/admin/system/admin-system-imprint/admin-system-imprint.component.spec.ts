import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AdminSystemImprintComponent } from './admin-system-imprint.component'
import { SharedModule } from '../../../shared/shared.module'
import { UtilService } from '../../../core/util.service'
import { SystemInfoService } from '../system-info.service'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('AdminSystemImprintComponent', () => {
  let component: AdminSystemImprintComponent
  let fixture: ComponentFixture<AdminSystemImprintComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        SystemInfoService,
        UtilService
      ],
      declarations: [AdminSystemImprintComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSystemImprintComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
