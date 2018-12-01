import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HttpRequest, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { SafeUrlPipe } from './pipes/safe-url.pipe'
import { PropMultiSelectComponent } from './components/prop-multi-select/prop-multi-select.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect'
import { NgSelectModule } from '@ng-select/ng-select'
import { EditInlineComponent } from './components/edit-inline/edit-inline.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MultiselectDropdownModule,
    NgSelectModule,
    NgxUiLoaderModule
  ],
  declarations: [
    PropMultiSelectComponent,
    SafeUrlPipe,
    EditInlineComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    PropMultiSelectComponent,
    EditInlineComponent,
    SafeUrlPipe,
    MultiselectDropdownModule,
    NgSelectModule,
    NgxUiLoaderModule
  ],
  providers: [
    HttpClient
  ]
})
export class SharedModule { }
