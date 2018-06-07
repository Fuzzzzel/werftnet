import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core'
import { SimpleEntity, SimpleEntityCollection } from '../../model/simple-entity.model'
import { UtilService } from '../../../core/util.service'
import { FormControl, FormGroup } from '@angular/forms'

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect'

@Component({
  selector: 'app-prop-multi-select',
  templateUrl: './prop-multi-select.component.html',
  styleUrls: ['./prop-multi-select.component.scss']
})
export class PropMultiSelectComponent implements OnInit {

  @Input('objarray')
  objarray: SimpleEntity[]

  @Input('valuearray')
  valuearray: SimpleEntityCollection

  currentSelection: number[] = []
  valuelist: IMultiSelectOption[] = []

  rerenderNgSelect: boolean = false

  // Settings configuration
  // singleSelect: boolean = false

  multiselectSettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: true
  }

  multiselectTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: '-- Bitte wählen --',
    allSelected: 'All selected',
  }

  constructor(
    public util: UtilService,
    private cdRef: ChangeDetectorRef
  ) { }

  addSelectedItems() {
    for (let i = 0; i < this.currentSelection.length; i++) {
      let element = null

      for (let va = 0; va < this.valuearray.values.length; va++) {
        if (this.valuearray.values[va].id === this.currentSelection[i]) {
          element = this.valuearray.values[va]
          break
        }
      }

      if (element && !this.util.isObjectIdInArray(this.objarray, element)) {
        this.util.addCopyToArray(this.objarray, element)
      }
    }

    this.currentSelection = []
    this.util.orderArrayByName(this.objarray)

    this.doReRenderNg2Select()
  }

  removeSelectedItem(item) {
    this.util.removeFromArray(this.objarray, item)
    this.doReRenderNg2Select()
  }

  doReRenderNg2Select() {
    this.rerenderNgSelect = true
    this.cdRef.detectChanges()
    this.valuelist = this.prepareValueArray(this.valuearray)
    this.rerenderNgSelect = false
  }

  prepareValueArray(valuearray) {
    let valuelist = Object.assign([], valuearray.values)
    this.objarray.map((value) => {
      this.util.removeFromArray(valuelist, value)
    })
    this.util.orderArrayByName(valuelist)
    valuelist = this.convertToSelectFormat(valuelist)
    return valuelist
  }


  public refreshValue(value: any): void {
    this.currentSelection = value
  }

  convertToSelectFormat(simpleEntityArray: SimpleEntity[]) {
    const result = []
    for (let i = 0; i < simpleEntityArray.length; i++) {
      result.push({
        id: simpleEntityArray[i].id,
        name: simpleEntityArray[i].name
      })
    }

    return result
  }

  ngOnInit() {
    this.util.orderArrayByName(this.objarray)
    this.valuelist = this.prepareValueArray(this.valuearray)
  }

}
