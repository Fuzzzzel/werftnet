import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TopNavComponent } from './top-nav.component';
import { UserService } from '../../user/user.service';
import { UtilService } from '../../core/util.service';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopNavComponent],
      imports: [
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
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have a logged in user on creation', () => {
    expect(component.isUserLoggedIn()).toBeFalsy();
  });
});
