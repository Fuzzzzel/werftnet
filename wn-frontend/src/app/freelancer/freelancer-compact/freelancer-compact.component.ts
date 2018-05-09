import { Component, Input, OnInit } from '@angular/core';
import { Freelancer } from '../freelancer.model';
import { UtilService } from '../../core/util.service';
import { FreelancerEditService } from '../freelancer-edit/freelancer-edit.service';

@Component({
  selector: 'app-freelancer-compact',
  templateUrl: './freelancer-compact.component.html',
  styleUrls: ['./freelancer-compact.component.scss']
})
export class FreelancerCompactComponent implements OnInit {

  @Input('fl')
  freelancer: Freelancer;

  constructor(
    private util: UtilService,
    private freelancerEditService: FreelancerEditService
  ) { }

  editFreelancer(freelancerId: number) {
    // Reload freelancer or pass empty new freelancer
    this.freelancerEditService.editFreelancer(freelancerId)
  }

  getCombinedDisplayName(entity) {
    return this.util.getCombinedDisplayName(entity);
  }

  ngOnInit() {
  }

}
