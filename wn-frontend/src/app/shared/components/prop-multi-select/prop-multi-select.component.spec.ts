import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { PropMultiSelectComponent } from './prop-multi-select.component'
import { SharedModule } from '../../shared.module'
import { UtilService } from '../../../core/util.service'
import { RouterTestingModule } from '@angular/router/testing'
import { Component, ViewChild } from '@angular/core'
import { SimpleEntityCollection } from '../../model/simple-entity.model'
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'

// Rendering test
describe('PropMultiSelectComponent rendering', () => {
  let component: PropMultiSelectComponent
  // let fixture: ComponentFixture<PropMultiSelectComponent>
  let testHostComponent: TestHostComponent
  let testHostFixture: ComponentFixture<TestHostComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        TestHostComponent
      ],
      providers: [
        UtilService
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent)
    testHostComponent = testHostFixture.componentInstance
    testHostComponent.propMultiSelectComponent.valuearray = new SimpleEntityCollection()
    testHostComponent.propMultiSelectComponent.objarray = []
  })

  it('should create', () => {
    expect(testHostFixture.nativeElement.querySelector('.prop-multi-select')).toBeTruthy()
  })

  // -------------- Mock up host component ----------------

  @Component({
    selector: `host-component`,
    template: `<app-prop-multi-select></app-prop-multi-select>`
  })
  class TestHostComponent {
    @ViewChild(PropMultiSelectComponent)

    public propMultiSelectComponent: PropMultiSelectComponent
  }
})

// Functional test

describe('PropMultiSelectComponent', () => {
  let component: PropMultiSelectComponent
  let fixture: ComponentFixture<PropMultiSelectComponent>
  let backend: HttpTestingController

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
      ],
      providers: [
        UtilService
      ]
    })
      .compileComponents()
  }))


  const item1 = { id: 1, name: 'TestItem1' }
  const item2 = { id: 2, name: 'TestItem2' }

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(PropMultiSelectComponent)
    component = fixture.componentInstance
    component.objarray = [item1]
    component.valuearray = new SimpleEntityCollection()
    component.valuearray.display_name = 'TestEntity'
    component.valuearray.values = [item1, item2]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should add item', async(() => {
    component.refreshValue([2])
    component.addSelectedItems()
  }))

  it('should remove item', async(() => {
    component.removeSelectedItem(item1)
  }))
})
