import { Component, OnInit } from '@angular/core';
import { AdminSystemEditImprintService } from './admin-system-edit-imprint.service';
import { UtilService } from '../../../core/util.service';

@Component({
  selector: 'app-admin-system-edit-imprint',
  templateUrl: './admin-system-edit-imprint.component.html',
  styleUrls: ['./admin-system-edit-imprint.component.scss']
})
export class AdminSystemEditImprintComponent implements OnInit {

  public imprint: string

  constructor(private imprintService: AdminSystemEditImprintService, private util: UtilService) { }

  ngOnInit() {
    this.imprintService.getImprint().subscribe((imprint) => {
      this.imprint = imprint
    })
  }

  cancelSaveImprint() {
    this.util.historyBack()
  }

  saveImprint() {
    this.imprintService.saveImprint(this.imprint)
      .then(() => { this.util.historyBack() })
      .catch((error) => {
        alert('Fehler beim Speichern des Impressums!')
      })
  }

}
