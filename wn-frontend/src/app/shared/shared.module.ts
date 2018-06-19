import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { PropMultiSelectComponent } from './components/prop-multi-select/prop-multi-select.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MultiselectDropdownModule,
    InlineEditorModule,
    NgSelectModule
  ],
  declarations: [
    PropMultiSelectComponent,
    SafeUrlPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    PropMultiSelectComponent,
    SafeUrlPipe,
    MultiselectDropdownModule,
    InlineEditorModule,
    NgSelectModule
  ],
  providers: [
    HttpClient
  ]
})
export class SharedModule { }
