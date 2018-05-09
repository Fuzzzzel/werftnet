import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FreelancersLoaded } from './freelancers-loaded.model';
import { UtilService } from '../../core/util.service';
import { FreelancerSearchParams } from './freelancers-search-params.model';

@Injectable()
export class FreelancerSearchService {

  private $freelancersLoaded: BehaviorSubject<FreelancersLoaded>;
  private lastSearchParams: FreelancerSearchParams = new FreelancerSearchParams();

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) {
    this.$freelancersLoaded = <BehaviorSubject<FreelancersLoaded>>new BehaviorSubject(new FreelancersLoaded);
  }

  getFreelancersLoaded() {
    return this.$freelancersLoaded.asObservable();
  }

  getLastSearchParams() {
    return this.lastSearchParams;
  }

  searchFreelancers(searchParams) {
    if (searchParams) {
      this.lastSearchParams = searchParams;
    }

    // Set up post request
    const req = this.http.post<FreelancersLoaded>(
      '/freelancer/searchFreelancers',
      searchParams || this.lastSearchParams
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        console.log(data);
        for (let i = 0; i < data.items.length; i++) {
          this.util.orderPrices(data.items[i].prices);
        }
        this.$freelancersLoaded.next(data);
      },
      error => {
        // ToDo: Implement error handler
      });

    return
  }

}
