import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CustomerSearchParams } from './customer-search-params.model';
import { UtilService } from '../../core/util.service';
import { CustomersLoaded } from './customers-loaded.model';

@Injectable()
export class CustomerSearchService {

  private $customersLoaded: BehaviorSubject<CustomersLoaded>;
  private lastSearchParams: CustomerSearchParams = new CustomerSearchParams();

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) {
    this.$customersLoaded = <BehaviorSubject<CustomersLoaded>>new BehaviorSubject(new CustomersLoaded);
  }

  getCustomersLoaded() {
    return this.$customersLoaded.asObservable();
  }

  getLastSearchParams() {
    return this.lastSearchParams;
  }

  searchCustomers(searchParams) {
    if (searchParams) {
      this.lastSearchParams = searchParams;
    }

    return new Promise<CustomersLoaded>((resolve, reject) => {
      // Set up post request
      const req = this.http.post<CustomersLoaded>(
        '/customers/search',
        searchParams || this.lastSearchParams
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          // Prepare data fetched from server
          this.$customersLoaded.next(data);
          resolve(data)
        },
        error => {
          reject(error)
        });
    })
  }

}
