import { Component, OnInit, Input } from '@angular/core'
import { CoreData, CoreDataService } from '../../core/core-data.service'
import { FreelancerEditService } from './freelancer-edit.service'
import { Freelancer } from '../freelancer.model'
import { PriceLine } from '../../shared/model/price-line.model'
import { UtilService } from '../../core/util.service'
import { FreelancerSearchService } from '../freelancer-search/freelancer-search.service'
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-freelancer-edit',
  templateUrl: './freelancer-edit.component.html',
  styleUrls: ['./freelancer-edit.component.scss']
})
export class FreelancerEditComponent implements OnInit {

  fl_edit: Freelancer = new Freelancer()
  coreData: CoreData = new CoreData()
  new_price_line: PriceLine = new PriceLine()
  editPrice: boolean[] = []

  constructor(
    private route: ActivatedRoute,
    public util: UtilService,
    private coreDataService: CoreDataService,
    private freelancerEditService: FreelancerEditService,
    private freelancerSearchService: FreelancerSearchService,
    public ngxUiLoaderService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.ngxUiLoaderService.start()
    this.coreDataService.getData().subscribe((data) => {
      this.coreData = data
    })

    const freelancerIdString = this.route.snapshot.paramMap.get('freelancerId')
    const freelancerId = parseInt(freelancerIdString)
    this.freelancerEditService
      .prepareEditFreelancer(freelancerId)
      .then((freelancer) => {
        this.fl_edit = freelancer
        this.ngxUiLoaderService.stop()
      })
      .catch((error) => {
        this.ngxUiLoaderService.stop()
        alert('Freelancer konnte nicht geladen werden: ' + error.message)
      })
  }

  ngOnDestroy() {
    this.ngxUiLoaderService.stop()
  }

  clearAllButName() {
    let allButNameFreelancer = new Freelancer()
    delete allButNameFreelancer["name1"]
    delete allButNameFreelancer["name2"]
    delete allButNameFreelancer["company_name"]
    allButNameFreelancer.address.id = this.fl_edit.address.id
    Object.assign(this.fl_edit, allButNameFreelancer)
  }

  saveFreelancer() {
    this.freelancerEditService.saveFreelancer(this.fl_edit)
      .then((freelancer) => {
        this.freelancerSearchService.searchFreelancers(null);
        this.util.historyBack();
      })
      .catch((error) => {
        alert('Freelancer konnte nicht gespeichert werden: ' + error.msg)
      })
  }

  deleteFreelancer() {
    this.freelancerEditService.deleteFreelancer(this.fl_edit)
      .then(() => {
        this.freelancerSearchService.searchFreelancers(null);
        this.util.historyBack();
      })
      .catch((error) => {
        alert('Freelancer konnte nicht gelöscht werden: ' + error.message)
      })
  }

  cancelEdit() {
    // this.freelancerSearchService.searchFreelancers(null)
    this.util.historyBack()
  }


  addPrice = function (new_price_line) {
    this.util.addCopyToArray(this.fl_edit.prices, new_price_line)
  }

  toggleEditPrice = function (element) {
    this.editPrice[element.id] = !this.editPrice[element.id]
  }
}
