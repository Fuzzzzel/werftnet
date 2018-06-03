import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { UserService } from './user/user.service'
import { UtilService } from './core/util.service'
import { CoreDataService } from './core/core-data.service'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { TopNavComponent } from './layout/top-nav/top-nav.component'
import { User } from './user/user.model'
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let app: any
  let backend: HttpTestingController
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TopNavComponent
      ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            redirectTo: ''
          },
          {
            path: 'home',
            redirectTo: ''
          }
        ]),
        NgbDropdownModule.forRoot()
      ],
      providers: [
        CoreDataService,
        UserService,
        UtilService
      ]
    }).compileComponents()
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(AppComponent)
    app = fixture.debugElement.componentInstance
    tick()
  }))

  /**
   * Test if the App can be created
   */
  it('should create the app', () => {
    expect(app).toBeTruthy()
  })

  it('should no user be logged in on init', fakeAsync(() => {
    expect(app.isUserLoggedIn()).toBeFalsy()
    expect(app.userHasRole('ROLE_USER')).toBeFalsy()
  }))

  it('should fail to auto login', fakeAsync(() => {
    fixture.detectChanges()
    spyOn(window, 'alert').and.returnValue(true)
    tick()
    const req = backend.expectOne('/get_logged_in_user')
    expect(req.request.method).toBe("GET")
    req.flush(null, { status: 404, statusText: '404 Not Found' })
  }))



  /**
   * Test if the title is displayed correctly
   */
  it(`should have as title 'WerftNET Version 1.1'`, async(() => {
    expect(app.title).toEqual('WerftNET Version 1.1')
  }))

  it('should test for a user logged in', fakeAsync(() => {
    fixture.detectChanges()
    tick()

    const req = backend.expectOne('/get_logged_in_user')
    expect(req.request.method).toBe("GET")

    let user = new User()
    user.id = 1
    user.username = 'testuser'
    user.roles = ['ROLE_USER']
    req.flush(user, { status: 200, statusText: 'Ok' })

    expect(app.isUserLoggedIn()).toBeTruthy()
    expect(app.userHasRole('ROLE_USER')).toBeTruthy()
  }))
})
