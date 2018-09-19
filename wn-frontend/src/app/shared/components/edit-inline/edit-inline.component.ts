import { Component, OnInit, ViewChild, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SimpleEntity } from '../../model/simple-entity.model';

const EDIT_INLINE_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditInlineComponent),
  multi: true
};

@Component({
  selector: 'app-edit-inline',
  templateUrl: './edit-inline.component.html',
  providers: [EDIT_INLINE_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./edit-inline.component.scss']
})
export class EditInlineComponent implements ControlValueAccessor, OnInit {

  @ViewChild('editInlineControl') editInlineControl; // input DOM element
  @Input() label: string = '';  // Label value for input element
  @Input() type: string = 'text'; // The type of input element
  @Input() required: boolean = false; // Is input requried?
  @Input() disabled: boolean = false; // Is input disabled?
  private _value: string = ''; // Private variable for input value
  private previousValue: string = ''; // The value before clicking to edit
  public editing: boolean = false; // Is Component in edit mode?
  public onChange: any = Function.prototype; // Trascend the onChange event
  public onTouched: any = Function.prototype; // Trascend the onTouch event

  @Output()
  save: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit() {
  }

  // Control Value Accessors for ngModel
  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  // Required for ControlValueAccessor interface
  writeValue(value: any) {
    this._value = value;
  }

  // Required forControlValueAccessor interface
  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  // Required forControlValueAccessor interface
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  // Do stuff when the input element loses focus
  onBlur($event: Event) {
    if (this._value !== this.previousValue) {
      this.save.emit(this._value)
    }
    this.editing = false;
  }

  // Start the editting process for the input element
  edit(value) {
    if (this.disabled) {
      return;
    }

    this.previousValue = value;
    this.editing = true;
    setTimeout(() => {
      (this.editInlineControl.nativeElement as HTMLInputElement).focus()
    })
  }

}
