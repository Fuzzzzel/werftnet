import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropMultiSelectComponent } from './prop-multi-select.component';
import { SharedModule } from '../../shared.module';
import { UtilService } from '../../../core/util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, ViewChild } from '@angular/core';
import { SimpleEntityCollection } from '../../model/simple-entity.model';

describe('PropMultiSelectComponent', () => {
  let component: PropMultiSelectComponent;
  // let fixture: ComponentFixture<PropMultiSelectComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

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
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostComponent.propMultiSelectComponent.valuearray = new SimpleEntityCollection();
    testHostComponent.propMultiSelectComponent.objarray = [];
  });

  it('should create', () => {
    expect(testHostFixture.nativeElement.querySelector('.prop-multi-select')).toBeTruthy();
  });

  // -------------- Mock up host component ----------------

  @Component({
    selector: `host-component`,
    template: `<app-prop-multi-select></app-prop-multi-select>`
  })
  class TestHostComponent {
    @ViewChild(PropMultiSelectComponent)

    public propMultiSelectComponent: PropMultiSelectComponent
  }

});
