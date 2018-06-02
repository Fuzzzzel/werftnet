import { Component, OnInit, Input } from '@angular/core'
import { CoreData, CoreDataService } from '../../core/core-data.service'
import { FreelancerEditService } from './freelancer-edit.service'
import { Freelancer } from '../freelancer.model'
import { PriceLine } from '../../shared/model/price-line.model'
import { UtilService } from '../../core/util.service'
import { FreelancerSearchService } from '../freelancer-search/freelancer-search.service'

@Component({
  selector: 'app-freelancer-edit',
  templateUrl: './freelancer-edit.component.html',
  styleUrls: ['./freelancer-edit.component.scss']
})
export class FreelancerEditComponent implements OnInit {

  fl_edit: Freelancer
  coreData: CoreData = new CoreData()
  new_price_line: PriceLine = new PriceLine()


  constructor(
    public util: UtilService,
    private coreDataService: CoreDataService,
    private freelancerEditService: FreelancerEditService,
    private freelancerSearchService: FreelancerSearchService
  ) { }


  saveFreelancer() {
    return new Promise<Freelancer>((resolve, reject) => {
      this.freelancerEditService.saveFreelancer(this.fl_edit)
        .then((freelancer) => {
          this.freelancerSearchService.searchFreelancers(null);
          resolve(freelancer)
          this.util.historyBack();
        })
        .catch((error) => {
          alert(error.msg)
          reject(error)
        })
    })
  }

  deleteFreelancer() {
    return new Promise<any>((resolve, reject) => {
      this.freelancerEditService.deleteFreelancer(this.fl_edit)
        .then(() => {
          this.freelancerSearchService.searchFreelancers(null);
          resolve()
          this.util.historyBack();
        })
        .catch((error) => {
          alert(error.message)
          reject()
        })
    })
  }

  cancelEdit() {
    // this.freelancerSearchService.searchFreelancers(null)
    this.util.historyBack()
  }


  addPrice = function (new_price_line) {
    if ((new_price_line.price_unit != null) && (new_price_line.service != null) && (new_price_line.price_per_unit != null)) {
      this.util.addCopyToArray(this.fl_edit.prices, new_price_line)
    }
  }


  ngOnInit() {
    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })

    this.fl_edit = this.freelancerEditService.getFreelancerToEdit()
  }
}
