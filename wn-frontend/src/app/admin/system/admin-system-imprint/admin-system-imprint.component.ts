import { Component, OnInit } from '@angular/core'
import { UtilService } from '../../../core/util.service'
import { SystemInfoService } from '../system-info.service'

@Component({
  selector: 'app-admin-system-imprint',
  templateUrl: './admin-system-imprint.component.html',
  styleUrls: ['./admin-system-imprint.component.scss']
})
export class AdminSystemImprintComponent implements OnInit {

  public imprint: string

  constructor(private imprintService: SystemInfoService, private util: UtilService) { }

  ngOnInit() {
    this.imprintService.getImprint().subscribe((imprint) => {
      this.imprint = imprint
    })
  }
}
