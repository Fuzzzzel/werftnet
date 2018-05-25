import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../../core/util.service';

@Injectable()
export class SystemInfoService {

  private $imprint: BehaviorSubject<string>;

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) {
    this.$imprint = <BehaviorSubject<string>>new BehaviorSubject('');
    this.fetchImprint();
  }

  getImprint() {
    return this.$imprint.asObservable()
  }

  fetchImprint() {
    const req = this.http.get<string>(
      '/admin/settings/imprint'
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        this.$imprint.next(data)
      },
      error => {
        alert('Es ist ein Fehler beim Laden des Impressums aufgetreten.\n' + error.message);
      });
  }
}
