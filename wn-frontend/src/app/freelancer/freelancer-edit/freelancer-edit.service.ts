import { Injectable } from '@angular/core';
import { Freelancer } from '../freelancer.model';
import { UtilService } from '../../core/util.service';
import { HttpClient } from '@angular/common/http';
import { FreelancerSearchService } from '../freelancer-search/freelancer-search.service';

@Injectable()
export class FreelancerEditService {

  private freelancerToEdit: Freelancer = new Freelancer();

  constructor(
    private util: UtilService,
    private http: HttpClient,
    private freelancerSearchService: FreelancerSearchService
  ) {

  }

  getFreelancerToEdit() {
    return this.freelancerToEdit;
  }


  /**
   * Save changes on server
   * 
   * @param freelancerToSave Data for the freelancer to be updated
   */
  saveFreelancer(freelancerToSave) {
    this.freelancerToEdit = freelancerToSave;

    // Kopie des Freelancers erstellen, um Datum in yyyy-mm-dd String zu wandeln, falls vorhanden
    let fl_save = this.util.cloneDeep(this.freelancerToEdit);
    if (this.freelancerToEdit.date_of_birth) {
      let dateObj = new Date(this.freelancerToEdit.date_of_birth)
      if (dateObj.getTime() !== NaN) {
        fl_save.date_of_birth = dateObj.toISOString().slice(0, 10)
      } else {
        alert('Datum wurde nicht korrekt eingegeben')
        return
      }

    }

    console.log(fl_save)
    // Set up post request
    const req = this.http.post<Freelancer>(
      '/freelancer/editFreelancer',
      fl_save
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        this.freelancerToEdit = data;
        this.freelancerSearchService.searchFreelancers(null);
        this.util.historyBack();
      },
      error => {
        alert("Fehler beim Speichern:" + error.message);
      });

    return
  }

  deleteFreelancer(freelancerToDelete) {
    if (!confirm('Freelancer ' + freelancerToDelete.name2 + ', ' + freelancerToDelete.name1 + ' wirklich löschen?!')) {
      return;
    }

    // Set up post request
    const req = this.http.post<Freelancer>(
      '/freelancer/deleteFreelancer',
      freelancerToDelete.id
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        this.freelancerSearchService.searchFreelancers(null);
        this.util.historyBack();
      },
      error => {
        alert("Fehler beim Löschen:" + error.message);
      });

    return
  }

  /**
   * Loads freelancer by id and switches to edit view if found
   * 
   * @param id Id of the freelancer to be edited
   */
  getFreelancerByIdAndEdit(id: number) {
    // Set up post request
    const req = this.http.get<Freelancer>(
      '/freelancer/' + id
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        this.freelancerToEdit = data;
        console.log(data);
        this.util.goTo('/freelancer/edit');
      },
      error => {
        alert(error.message);
      });

    return
  }

  editFreelancer(id: number) {
    this.freelancerToEdit = new Freelancer();
    if (id && id > 0) {
      // Reload freelancer before editing
      this.getFreelancerByIdAndEdit(id);
    } else {
      this.util.goTo('/freelancer/edit');
    }
  }

}
