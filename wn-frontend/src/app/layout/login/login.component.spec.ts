import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'
import { UserService } from '../../user/user.service'
import { UtilService } from '../../core/util.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { User } from '../../user/user.model'
import { RouterTestingModule } from '@angular/router/testing'
import { SharedModule } from '../../shared/shared.module'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            redirectTo: ''
          }
        ])
      ],
      providers: [
        UtilService,
        UserService
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should send login request',
    async(inject([UserService, HttpTestingController],
      (userService: UserService, backend: HttpTestingController) => {

        const compiled = fixture.debugElement.nativeElement
        compiled.querySelector('#username').text = 'testuser'
        compiled.querySelector('#password').text = 'testpass'
        compiled.querySelector('#login_button').click()

        backend.expectOne('/login_check')
      })
    )
  )
})
