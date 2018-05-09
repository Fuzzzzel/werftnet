import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangePwdComponent } from './user-change-pwd.component';
import { SharedModule } from '../../shared/shared.module';
import { UtilService } from '../../core/util.service';
import { UserService } from '../user.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserChangePwdComponent', () => {
  let component: UserChangePwdComponent;
  let fixture: ComponentFixture<UserChangePwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        UtilService,
        UserService
      ],
      declarations: [UserChangePwdComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
