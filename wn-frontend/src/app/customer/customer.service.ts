import { Injectable } from '@angular/core';
import { Customer, CustomerContact } from './customer.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../core/util.service';

@Injectable()
export class CustomerService {
  private $customerDropdownValues: BehaviorSubject<Customer[]>

  constructor(
    private http: HttpClient
  ) {
    this.$customerDropdownValues = <BehaviorSubject<Customer[]>>new BehaviorSubject([])
    this.refreshCustomerDropdownValues()
  }

  /**
     * Loads customer by id
     * 
     * @param id Id of the customer to be edited
     */
  getCustomerById(id: number) {
    // Set up post request
    const req = this.http.get<Customer>(
      '/customers/' + id
    )

    return new Promise<Customer>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve(data)
        },
        error => {
          reject(error)
        });
    })
  }

  getCustomerDropdownValues() {
    return this.$customerDropdownValues.asObservable()
  }

  refreshCustomerDropdownValues(): void {
    this.fetchCustomerDropdownValues()
      .then((data) => {
        this.$customerDropdownValues.next(data)
      })
      .catch((error) => {
        alert('Kundenwerte für die Dropdownauswahl konnten nicht geladen werden: ' + error.message)
      })
  }

  fetchCustomerDropdownValues() {
    return new Promise<Customer[]>((resolve, reject) => {
      // Set up post request
      const req = this.http.get<Customer[]>(
        '/customers/dropdownvalues'
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve(data)
        },
        error => {
          reject(new Error(error.error))
        })
    })
  }

  fetchCustomerContacts(customerId) {
    return new Promise<CustomerContact[]>((resolve, reject) => {
      // Set up post request
      const req = this.http.get<CustomerContact[]>(
        '/customers/' + customerId + '/contacts'
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve(data)
        },
        error => {
          reject(new Error(error.error))
        })
    })
  }
}
