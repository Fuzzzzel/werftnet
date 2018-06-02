import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AdminUserOverviewComponent } from './admin-user-overview.component'
import { SharedModule } from '../../shared/shared.module'
import { UtilService } from '../../core/util.service'
import { AdminUserService } from '../admin-user.service'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { User } from '../../user/user.model'

describe('AdminUserOverviewComponent', () => {
  let component: AdminUserOverviewComponent
  let fixture: ComponentFixture<AdminUserOverviewComponent>
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'admin/usermanagement/edit_user/1',
            redirectTo: ''
          }
        ])
      ],
      providers: [
        AdminUserService,
        UtilService
      ],
      declarations: [AdminUserOverviewComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(AdminUserOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should go to edit view', () => {
    component.editUser(1)
  })
})
