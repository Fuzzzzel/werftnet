import { Component, OnInit } from '@angular/core'
import { Freelancer } from '../freelancer.model'
import { FreelancersLoaded } from './freelancers-loaded.model'
import { FreelancerSearchParams } from './freelancers-search-params.model'
import { FreelancerSearchService } from './freelancer-search.service'
import { FreelancerEditService } from '../freelancer-edit/freelancer-edit.service'
import { CoreDataService, CoreData } from '../../core/core-data.service'
import { UtilService } from '../../core/util.service'

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer-search.component.html',
  styleUrls: ['./freelancer-search.component.scss']
})
export class FreelancerSearchComponent implements OnInit {

  freelancersLoaded: FreelancersLoaded = new FreelancersLoaded()
  searchParams: FreelancerSearchParams = new FreelancerSearchParams()
  coreData: CoreData = new CoreData()

  constructor(
    public util: UtilService,
    private coreDataService: CoreDataService,
    private freelancerSearchService: FreelancerSearchService,
    private freelancerEditService: FreelancerEditService
  ) { }

  searchFreelancers() {
    this.freelancerSearchService.searchFreelancers(this.searchParams)
      .then((freelancersLoaded) => {
      })
      .catch((error) => {
        alert('Suche der Freelancer fehlgeschlagen: ' + error.message)
      })
  }

  editFreelancer(freelancerToEdit: Freelancer) {
    this.freelancerEditService.prepareEditFreelancer(freelancerToEdit && freelancerToEdit.id)
      .then((freelancer) => {
        this.util.goTo('freelancer/edit')
      })
      .catch((error) => {
        alert('Freelancer konnte nicht zum Bearbeiten geöffnet werden: ' + error.message)
      })
  }

  clearSearch() {
    this.searchParams = new FreelancerSearchParams()
    this.freelancerSearchService.clearFreelancersLoaded()
  }

  ngOnInit() {
    this.searchParams = this.freelancerSearchService.getLastSearchParams()

    this.freelancerSearchService.getFreelancersLoaded().subscribe((freelancersLoaded) => {
      this.freelancersLoaded = freelancersLoaded
    })


    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })

  }

}
