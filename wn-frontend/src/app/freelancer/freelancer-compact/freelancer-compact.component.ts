import { Component, Input, OnInit } from '@angular/core'
import { Freelancer } from '../freelancer.model'
import { UtilService } from '../../core/util.service'
import { FreelancerEditService } from '../freelancer-edit/freelancer-edit.service'

@Component({
  selector: 'app-freelancer-compact',
  templateUrl: './freelancer-compact.component.html',
  styleUrls: ['./freelancer-compact.component.scss']
})
export class FreelancerCompactComponent {

  @Input('fl')
  freelancer: Freelancer

  constructor(
    private util: UtilService,
    private freelancerEditService: FreelancerEditService
  ) { }

  editFreelancer() {
    // Reload freelancer or pass empty new freelancer
    this.freelancerEditService.prepareEditFreelancer(this.freelancer.id)
      .then((freelancer) => {
        this.util.goTo('freelancer/edit')
      })
      .catch((error) => {
        alert('Freelancer konnte nicht gespeichert werden: ' + error.message)
      })
  }

  getCombinedDisplayName(entity) {
    return this.util.getCombinedDisplayName(entity)
  }


}
