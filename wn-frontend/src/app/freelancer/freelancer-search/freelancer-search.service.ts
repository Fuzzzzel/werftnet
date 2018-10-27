import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FreelancersLoaded } from './freelancers-loaded.model';
import { UtilService } from '../../core/util.service';
import { FreelancerSearchParams } from './freelancers-search-params.model';
import { Freelancer } from '../freelancer.model';

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

  clearFreelancersLoaded() {
    this.$freelancersLoaded.next(new FreelancersLoaded())
    this.lastSearchParams = new FreelancerSearchParams()
  }

  getLastSearchParams() {
    return this.lastSearchParams;
  }

  searchFreelancers(searchParams) {
    if (searchParams) {
      this.lastSearchParams = searchParams;
    }

    return new Promise<FreelancersLoaded>((resolve, reject) => {
      // Set up post request
      const req = this.http.post<FreelancersLoaded>(
        '/freelancers/search',
        searchParams || this.lastSearchParams
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          for (let i = 0; i < data.items.length; i++) {
            this.util.orderPrices(data.items[i].prices);
          }
          this.$freelancersLoaded.next(data);
          resolve(data)
        },
        error => {
          reject(error)
        });

    })
  }

}
