import { Injectable } from '@angular/core';
import { Freelancer } from './freelancer.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {

  private $freelancerDropdownValues: BehaviorSubject<Freelancer[]>

  constructor(
    private http: HttpClient
  ) {
    this.$freelancerDropdownValues = <BehaviorSubject<Freelancer[]>>new BehaviorSubject([])
    this.refreshFreelancerDropdownValues()
  }

  getFreelancerDropdownValues() {
    return this.$freelancerDropdownValues.asObservable()
  }

  refreshFreelancerDropdownValues(): void {
    this.fetchFreelancerDropdownValues()
      .then((data) => {
        this.$freelancerDropdownValues.next(data)
      })
      .catch((error) => {
        alert('Lieferanten für die Dropdownauswahl konnten nicht geladen werden: ' + error.message)
      })
  }

  fetchFreelancerDropdownValues() {
    return new Promise<Freelancer[]>((resolve, reject) => {
      const req = this.http.get<Freelancer[]>(
        '/freelancers/dropdownvalues'
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
