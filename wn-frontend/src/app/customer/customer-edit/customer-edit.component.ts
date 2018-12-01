import { Component, OnInit } from '@angular/core'
import { CoreData, CoreDataService } from '../../core/core-data.service'
import { CustomerEditService } from './customer-edit.service'
import { Customer } from '../customer.model'
import { UtilService } from '../../core/util.service'
import { CustomerSearchService } from '../customer-search/customer-search.service'
import { ActivatedRoute } from '@angular/router'
import { NgxUiLoaderService } from 'ngx-ui-loader'

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  cust_edit: Customer = new Customer()
  coreData: CoreData = new CoreData()
  isLoaded: boolean = false

  constructor(
    private route: ActivatedRoute,
    public util: UtilService,
    private coreDataService: CoreDataService,
    private customerEditService: CustomerEditService,
    private customerSearchService: CustomerSearchService,
    public ngxUiLoaderService: NgxUiLoaderService
  ) {
  }

  ngOnInit() {
    this.ngxUiLoaderService.start()
    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })

    const customerIdString = this.route.snapshot.paramMap.get('customerId')
    const customerId = parseInt(customerIdString)

    this.customerEditService
      .prepareEditCustomer(customerId)
      .then(customer => {
        this.cust_edit = customer
        this.ngxUiLoaderService.stop()
      })
      .catch((error) => {
        this.ngxUiLoaderService.stop()
        alert(`Fehler beim Laden des Kunden: ${error}`)
      })
  }

  ngOnDestroy() {
    this.ngxUiLoaderService.stop()
  }

  saveCustomer() {
    this.customerEditService.saveCustomer(this.cust_edit)
      .then((customer) => {
        this.customerSearchService.searchCustomers(null)
        this.util.historyBack()
      })
      .catch((error) => {
        alert('Kunde konnte nicht gespeichert werden: ' + error.message)
      })
  }

  deleteCustomer() {
    this.customerEditService.deleteCustomer(this.cust_edit)
      .then(() => {
        this.customerSearchService.searchCustomers(null)
        this.util.historyBack()
      })
      .catch((error) => {
        alert('Kunde konnte nicht gelöscht werden: ' + error.message)
      })
  }

  cancelEdit() {
    // this.customerSearchService.searchCustomers(null)
    this.util.historyBack()
  }

}
