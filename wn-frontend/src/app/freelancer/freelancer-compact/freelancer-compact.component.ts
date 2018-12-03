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
    private util: UtilService
  ) { }

  editFreelancer() {
    this.util.goTo(`freelancer/edit/${this.freelancer.id}`)
  }

  getCombinedDisplayName(entity) {
    return this.util.getCombinedDisplayName(entity)
  }


}
