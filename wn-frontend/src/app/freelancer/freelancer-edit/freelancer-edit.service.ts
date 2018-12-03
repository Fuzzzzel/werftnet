import { Injectable } from '@angular/core';
import { Freelancer } from '../freelancer.model';
import { UtilService } from '../../core/util.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FreelancerEditService {

  constructor(
    private util: UtilService,
    private http: HttpClient
  ) {

  }

  prepareEditFreelancer(id: number) {
    return new Promise<Freelancer>((resolve, reject) => {
      if (id && id > 0) {
        // Reload freelancer before editing
        this.getFreelancerById(id)
          .then((freelancer) => {
            resolve(freelancer)
          })
          .catch((error) => {
            reject(error)
          })
      } else {
        resolve(new Freelancer())
      }
    })
  }

  prepareFreelancerToSave(freelancerToSave) {
    return new Promise<Freelancer>((resolve, reject) => {
      // Kopie des Freelancers erstellen, um Datum in yyyy-mm-dd String zu wandeln, falls vorhanden
      let fl_save = this.util.cloneDeep(freelancerToSave);

      if (freelancerToSave.date_of_birth) {
        try {
          let dateObj = new Date(freelancerToSave.date_of_birth)
          fl_save.date_of_birth = dateObj.toISOString().slice(0, 10)
          resolve(fl_save)
        } catch (error) {
          reject(new Error('Datum wurde nicht korrekt angegeben'))
        }
      } else {
        resolve(fl_save)
      }
    })
  }


  /**
   * Save changes on server
   * 
   * @param freelancerToSave Data for the freelancer to be updated
   */
  saveFreelancer(freelancerToSave) {
    return new Promise<Freelancer>((resolve, reject) => {
      this.prepareFreelancerToSave(freelancerToSave)
        .then((freelancerPrepared) => {
          // Set up post request
          const req = this.http.post<Freelancer>(
            '/freelancers' + (freelancerPrepared.id ? '/' + freelancerPrepared.id : ''),
            freelancerPrepared
          )

          // Execute post request and subscribe to response
          req.subscribe(
            data => {
              resolve(data)
            },
            error => {
              reject(new Error("Fehler beim Speichern:" + error.error))
            });
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  deleteFreelancer(freelancerToDelete) {

    return new Promise<any>((resolve, reject) => {
      if (!confirm('Freelancer ' + freelancerToDelete.name2 + ', ' + freelancerToDelete.name1 + ' wirklich löschen?!')) {
        reject()
        return
      }

      // Set up post request
      const req = this.http.delete<Freelancer>(
        '/freelancers/' + freelancerToDelete.id
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve(data)
        },
        error => {
          reject(new Error("Fehler beim Löschen:" + error.message))
        });

    })
  }

  getFreelancerById(id: number) {
    // Set up post request
    const req = this.http.get<Freelancer>(
      '/freelancers/' + id
    )

    return new Promise<Freelancer>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve(data)
        },
        error => {
          reject(error);
        });
    })
  }
}
