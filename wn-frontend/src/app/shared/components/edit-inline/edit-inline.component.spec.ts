import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { EditInlineComponent } from './edit-inline.component';
import { UtilService } from '../../../core/util.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared.module';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { detectChanges } from '@angular/core/src/render3';

// Rendering test
describe('EditInlineComponent (rendering)', () => {
  let testHostComponent: TestHostComponent
  let testHostFixture: ComponentFixture<TestHostComponent>
  const delayToOpenCloseEdit = 5000

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
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
    testHostFixture = TestBed.createComponent(TestHostComponent)
    testHostComponent = testHostFixture.componentInstance
    testHostFixture.detectChanges()
  });

  it('should create', () => {
    expect(testHostFixture.nativeElement.querySelector('.edit-inline')).toBeTruthy();
  });

  it('Should edit on click', fakeAsync(() => {
    testHostComponent.elementDisabled = false

    // Click to edit
    const editInlineValue = testHostFixture.nativeElement.querySelector('.edit-inline-value')
    expect(editInlineValue).toBeTruthy()
    editInlineValue.click()

    // Wait for input field to display
    testHostFixture.detectChanges()
    tick(delayToOpenCloseEdit)
    testHostFixture.detectChanges()

    // Check that input field is shown
    const editInlineInput = testHostFixture.nativeElement.querySelector('.edit-inline-input')
    expect(editInlineInput).toBeTruthy()

    // Edit content of input field
    editInlineInput.value = 'Changed Content'
    editInlineInput.dispatchEvent(new Event('input'))
    tick()

    // Blur to save
    editInlineInput.blur()
    tick(delayToOpenCloseEdit)
    testHostFixture.detectChanges()
    tick(delayToOpenCloseEdit)
    testHostFixture.detectChanges()

    expect(testHostComponent.testValue).toBe('Changed Content')
  }))


  it('Should edit on click but not save without changing value', fakeAsync(() => {
    testHostComponent.elementDisabled = false
    testHostComponent.testValue = 'test'
    testHostFixture.detectChanges()
    tick(delayToOpenCloseEdit)
    testHostFixture.detectChanges()

    // Click to edit
    const editInlineValue = testHostFixture.nativeElement.querySelector('.edit-inline-value')
    expect(editInlineValue).toBeTruthy()
    editInlineValue.click()

    // Wait for input field to display
    testHostFixture.detectChanges()
    tick(delayToOpenCloseEdit)
    testHostFixture.detectChanges()

    // Check that input field is shown
    const editInlineInput = testHostFixture.nativeElement.querySelector('.edit-inline-input')
    expect(editInlineInput).toBeTruthy()

    // Edit content of input field
    editInlineInput.value = 'test'
    editInlineInput.dispatchEvent(new Event('input'))
    tick()

    // Blur to save
    editInlineInput.blur()
    tick()
    testHostFixture.detectChanges()
    tick(delayToOpenCloseEdit)
    testHostFixture.detectChanges()

    expect(testHostComponent.testValue).toBe('test')
  }))

  it('Should not edit if disabled', fakeAsync(() => {
    testHostComponent.elementDisabled = true
    testHostFixture.detectChanges()

    // Click to edit
    const editInlineValue = testHostFixture.nativeElement.querySelector('.edit-inline-value')
    expect(editInlineValue).toBeTruthy()
    editInlineValue.click()

    // Wait for input field to display
    testHostFixture.detectChanges()
    tick(delayToOpenCloseEdit)

    // Check that input field is shown
    const editInlineInput = testHostFixture.nativeElement.querySelector('.edit-inline-input')
    expect(editInlineInput).toBeFalsy()
  }))


  // -------------- Mock up host component ----------------

  @Component({
    selector: `host-component`,
    template: `<app-edit-inline [(ngModel)]="testValue" [disabled]="elementDisabled"></app-edit-inline><input id="defocus" />`
  })
  class TestHostComponent {
    @ViewChild(EditInlineComponent)

    public editInlineComponent: EditInlineComponent
    public testValue = 'Original Value'
    public elementDisabled = false

    constructor() {
      this.testValue = 'Original Value'
      this.elementDisabled = false
    }
  }
});


// Functional test
describe('EditInlineComponent (functional)', () => {
  let component: EditInlineComponent
  let fixture: ComponentFixture<EditInlineComponent>
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

  beforeEach(() => {
    backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(EditInlineComponent)
    component = fixture.componentInstance
    component.value = 'Initial value'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should start edit on focus or click', async(() => {
    spyOn(component, 'edit')
    const editInlineValue = fixture.debugElement.nativeElement.querySelector('.edit-inline-value')
    editInlineValue.click()
    fixture.whenStable().then(() => {
      expect(component.edit).toHaveBeenCalled();
    })
  }))
})
