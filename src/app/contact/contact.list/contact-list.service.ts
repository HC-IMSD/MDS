import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CompanyContactRecordService} from '../company-contact-record/company-contact-record.service';
import {IMasterDetails} from '../../master-details';

import {ContactDetailsService} from '../contact.details/contact.details.service';
import {ListService} from '../../list-service';

@Injectable()
export class ContactListService extends ListService implements IMasterDetails {

  /***
   *  The data list of contact records
   * @type {{id: number; contact: string; city: string; country: {id: string; text: string}}[]}
   */
  private contactList = [];
  private countryList = [];

  constructor() {
    super();
    this.contactList = [
      /* {
         id: 1,
         contact: 'contact1',
         city: 'city1',
         country:
           {
             "id": "ABW",
             "text": "Aruba"
           }
       },
       {
         id: 2,
         contact: 'contact2',
         city: 'city2',
         country:
           {
             "id": "ABW",
             "text": "Aruba"
           }
       }*/
    ];

    this.initIndex(this.contactList);
  }

  /**
   * Gets the array of  model records
   * @returns {{id: number; contact: string; city: string; country: {id: string; text: string}}[]}
   */
  public getModelRecordList() {
    return this.contactList;
  }

  /**
   * Sets the data model. Converts the data model to the form model
   * @param value
   */
  public setModelRecordList(value) {

    this.contactList = value;
  }

  /**
   * Adds
   * @param record
   */
  addContact(record) {
    // TODO error checking
    this.contactList.push(record);
  }

  getContactModel() {

    return CompanyContactRecordService.getEmptyModel();
  }

  getContactFormRecord(fb: FormBuilder) {

    return CompanyContactRecordService.getReactiveModel(fb);
  }


  public contactFormToData(record: FormGroup, contactModel) {
    CompanyContactRecordService.mapFormModelToDataModel(record, contactModel, this.countryList);
    return (record);

  }

  public createFormDataList(modelDataList, countryList, fb: FormBuilder, theList) {
    for (let i = 0; i < modelDataList.length; i++) {
      const formRecord = CompanyContactRecordService.getReactiveModel(fb);
      this.contactDataToForm(modelDataList[i], formRecord, countryList);
      theList.push(formRecord);
    }
  }

  public contactDataToForm(contactModel, record: FormGroup, countryList) {
    CompanyContactRecordService.mapDataModelFormModel(contactModel, record, countryList);
    return (record);
  }


  public setCountryList(countryList) {
    this.countryList = countryList;
  }


  public saveRecord(record: FormGroup) {
    if (this.getRecordId(record) === -1) {
      this.setRecordId(record, this.getNextIndex());
      let contactModel = this.getContactModel();
      this.contactFormToData(record, contactModel);
      this.contactList.push(contactModel);
      return contactModel.id;
    } else {
      let modelRecord = this.getModelRecord(record.controls.id.value);
      let updatedModel = this.contactFormToData(record, modelRecord);
    }
  }

  public getModelRecord(id: number) {
    let modelList = this.getModelRecordList();

    for (let i = 0; i < modelList.length; i++) {
      if (modelList[i].id === id) {
        return modelList[i];
      }
    }
    return null;
  }

  deleteModelRecord(id): boolean {
    let modelList = this.getModelRecordList();
    for (let i = 0; i < modelList.length; i++) {
      if (modelList[i].id === id) {
        this.contactList.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  public getRecordId(record: FormGroup) {
    return ContactDetailsService.getRecordId(record);
  }

  public setRecordId(record: FormGroup, value: number): void {
    ContactDetailsService.setRecordId(record, value);
  }


}