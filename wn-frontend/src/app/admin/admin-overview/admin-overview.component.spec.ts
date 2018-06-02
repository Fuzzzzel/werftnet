import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AdminOverviewComponent } from './admin-overview.component'
import { SharedModule } from '../../shared/shared.module'

describe('AdminOverviewComponent', () => {
  let component: AdminOverviewComponent
  let fixture: ComponentFixture<AdminOverviewComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        AdminOverviewComponent
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
