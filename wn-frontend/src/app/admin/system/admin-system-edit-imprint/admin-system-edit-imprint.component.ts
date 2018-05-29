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
    return new Promise<string>((resolve, reject) => {
      this.imprintService.saveImprint(this.imprint)
        .then((imprint) => {
          resolve(imprint)
          this.util.historyBack()
        })
        .catch((error) => {
          reject(new Error('Fehler beim Speichern des Impressums!'))
        })
    })
  }

}
