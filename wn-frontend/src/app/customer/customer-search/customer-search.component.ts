import { Component, OnInit } from '@angular/core'
import { Customer } from '../customer.model'
import { CustomersLoaded } from './customers-loaded.model'
import { CustomerSearchParams } from './customer-search-params.model'
import { CustomerSearchService } from './customer-search.service'
import { CustomerEditService } from '../customer-edit/customer-edit.service'
import { CoreDataService, CoreData } from '../../core/core-data.service'
import { UtilService } from '../../core/util.service'

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {

  customersLoaded: CustomersLoaded = new CustomersLoaded()
  searchParams: CustomerSearchParams = new CustomerSearchParams()
  coreData: CoreData = new CoreData()

  constructor(
    public util: UtilService,
    private coreDataService: CoreDataService,
    private customerSearchService: CustomerSearchService,
    private customerEditService: CustomerEditService
  ) { }

  ngOnInit() {
    this.searchParams = this.customerSearchService.getLastSearchParams()

    this.customerSearchService.getCustomersLoaded().subscribe((customersLoaded) => {
      this.customersLoaded = customersLoaded
    })


    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })

  }

  searchCustomers(searchParams) {
    this.customerSearchService.searchCustomers(searchParams)
  }

  clearSearch() {
    this.searchParams = new CustomerSearchParams()
    this.customerSearchService.clearCustomersLoaded()
  }

  editCustomer(customerToEdit: Customer = null) {
    this.customerEditService.prepareEditCustomer(customerToEdit && customerToEdit.id)
      .then((customer) => {
        if (customer.id) {
          this.util.goTo('customer/edit')
        } else {
          this.util.goTo('customer/new')
        }
      })
      .catch((error) => {
        alert('Kunde konnte nicht gespeichert werden: ' + error.message)
      })
  }
}
