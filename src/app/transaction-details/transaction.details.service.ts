import {AfterViewInit, Injectable, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalsService} from '../globals/globals.service';
import {ValidationService} from '../validation.service';
import {ListService} from '../list-service';

@Injectable()
export class TransactionDetailsService {

  // private static licenceAppTypeList: Array<any> = TransactionDetailsService.getRawLicenceAppTypeList();
  private static lang = GlobalsService.ENGLISH;

  constructor() {
  }

  /**
   * Gets the reactive forms Model for address details
   * @param {FormBuilder} fb
   * @returns {any}
   */
  public getReactiveModel(fb: FormBuilder) {
    if (!fb) {return null; }
    return fb.group({
      dossierId: ['', [Validators.required, ValidationService.dossierIdValidator]],
      dossierType: ['Medical device', []],
      manuCompanyId: ['', [Validators.required, ValidationService.companyIdValidator]],
      manuContactId: ['', [Validators.required, ValidationService.dossierContactIdValidator]],
      reguCompanyId: ['', [Validators.required, ValidationService.regulatoryCompanyIdValidator]],
      reguContactId: ['', [Validators.required, ValidationService.regulatoryContactIdValidator]],
      activityLead: ['', Validators.required],
      activityType: ['', Validators.required],
      descriptionType: ['', Validators.required],
      deviceClass: ['', Validators.required],
      amendReason: ['', Validators.required],
      classChange: [false, []],
      licenceChange: [false, []],
      deviceChange: [false, []],
      processChange: [false, []],
      qualityChange: [false, []],
      designChange: [false, []],
      materialsChange: [false, []],
      labellingChange: [false, []],
      safetyChange: [false, []],
      purposeChange: [false, []],
      addChange: [false, []],
      licenceNum: ['', [Validators.required, ValidationService.licenceNumValidator]],
      appNum: ['', [Validators.required, ValidationService.appNumValidator]],
      appNumOpt: ['', [ValidationService.appNumValidator]],
      meetingId: '',
      deviceName: ['', Validators.required],
      licenceName: ['', Validators.required],
      requestDate: ['', Validators.required],
      briefDesc: ['', Validators.required],
      transDescription: [null, []],
      hasDdt: [false, []],
      hasDdtMan: ['', ValidationService.checkboxRequiredValidator],
      hasAppInfo: [false, []],
      isSolicitedInfo: ['', Validators.required]
    });
  }

  /**
   * Gets an empty data model
   *
   */
  public getEmptyModel() {

    return (
      {
        dossier_id: '',
        dossier_type: 'Medical Device',
        company_id: '',
        manufacturing_contact_id: '',
        regulatory_company_id: '',
        regulatory_contact_id: '',
        regulatory_activity_lead: '',
        regulatory_activity_type: '',
        description_type: '',
        device_class: '',
        amend_reasons: {
          classification_change: '',
          licence_change: '',
          device_change: '',
          process_change: '',
          quality_change: '',
          design_change: '',
          materials_change: '',
          labelling_change: '',
          safety_change: '',
          purpose_change: '',
          add_delete_change: ''
        },
        licence_number: '',
        application_number: '',
        meeting_id: '',
        device_name: '',
        proposed_licence_name: '',
        request_date: '',
        brief_description: '',
        transaction_description: '',
        has_ddt: '',
        has_app_info: '',
        is_solicited_info: ''
      }
    );
  }

  /**
   * Gets an data array
   *
   */
 // public static getActivityLeads() {
 //   return ['Medical Device Bureau'];
 // }

 // public static getRawActivityTypes() {
 //   return ['Minor Change', 'Licence', 'Licence Amendment', 'S.36/39/40/41', 'MD-PV' ];
//  }

  /**
   * Gets an yesno array
   *
   */
  public getYesNoList() {
    return [
      GlobalsService.YES,
      GlobalsService.NO
    ];
  }

  /**
   * Gets an data array
   *
   */
  public static getDeviceClassList() {
    return [
      {
        id: 'DC2',
        en: 'Class II',
        fr: 'fr_Class II'
      },
      {
        id: 'DC3',
        en: 'Class III',
        fr: 'fr_Class III'
      },
      {
        id: 'DC4',
        en: 'Class IV',
        fr: 'fr_Class IV'
      }
    ];
  }

  /**
   * Gets an data array
   *
   */
  public static getLicenceDescriptions(lang) {
    const descArray = TransactionDetailsService._convertListText(TransactionDetailsService.getRawTransDescList(), lang);
    return [descArray[0], descArray[1], descArray[4], descArray[5],
      descArray[8], descArray[9], descArray[10], descArray[11], descArray[12], descArray[14]];
  }

  /**
   * Gets an data array
   *
   */
  public static getFaxbackDescriptions(lang) {
    const descArray = TransactionDetailsService._convertListText(TransactionDetailsService.getRawTransDescList(), lang);
    return [descArray[8], descArray[9], descArray[11]];
  }

  public static getS36394041Descriptions(lang) {
    const descArray = TransactionDetailsService._convertListText(TransactionDetailsService.getRawTransDescList(), lang);
    return [descArray[2], descArray[3], descArray[6], descArray[7], descArray[12]];
  }

  public static getMDPVDescriptions(lang) {
    const descArray = TransactionDetailsService._convertListText(TransactionDetailsService.getRawTransDescList(), lang);
    return [descArray[13]];
  }

  /**
   * Gets an data array
   *
   */
  public static getDossierType() {
    return [
      {
        id: 'D23',
        en: 'Medical Device',
        fr: 'Medical Device'
      }
    ];
  }

  /**
   {
       // id: 'B14-20160301-10 ',
       // en: 'Post-market Vigilance',
       // fr: 'Post-market Vigilance'
     }
   */

  private static getRawActivityLeadList() {
    return  [
      {
        id: 'B14-20160301-08',
        en: 'Medical Device Bureau',
        fr: 'Medical Device Bureau'
      },
      {
        id: 'B14-20160301-10',
        en: 'Post-market Vigilance',
        fr: 'Post-market Vigilance'
      }];
  }

  public static getActivityLeadList(lang) {
    return TransactionDetailsService._convertListText(TransactionDetailsService.getRawActivityLeadList(), lang);
  }

  public static getRawActivityTypeList() {
    return [
      {
        id: 'B02-20160301-033',
        en: 'Minor Change',
        fr: 'Minor Change'
      },
      {
        id: 'B02-20160301-039',
        en: 'Licence',
        fr: 'Licence'
      },
      {
        id: 'B02-20160301-040',
        en: 'Licence Amendment',
        fr: 'Licence Amendment'
      },
      {
        id: 'B02-20160301-081',
        en: 'S.36/39/40/41',
        fr: 'S.36/39/40/41'
      },
      {
        id: 'B02-20160621-01',
        en: 'MD-PV',
        fr: 'MD-PV'
      }
    ];
  }

  public static getActivityTypeList(lang) {
    return TransactionDetailsService._convertListText(TransactionDetailsService.getRawActivityTypeList(), lang);
  }

  public static getActivityTypeMDBList(lang) {
    const descArray = TransactionDetailsService._convertListText(TransactionDetailsService.getRawActivityTypeList(), lang);
    return [descArray[0], descArray[1], descArray[2], descArray[3]];
  }

  public static getActivityTypePVList(lang) {
    const descArray = TransactionDetailsService._convertListText(TransactionDetailsService.getRawActivityTypeList(), lang);
    return [descArray[4]];
  }

  public static getTransDescList(lang) {
    return TransactionDetailsService._convertListText(TransactionDetailsService.getRawTransDescList(), lang);
  }

  public static getRawTransDescList() {
    return [
      {
        id: 'ACD',
        en: 'Appeal Comprehensive Document',
        fr: 'Appeal Comprehensive Document'
      },
      {
        id: 'LIA',
        en: 'Letter of Intent to Appeal',
        fr: 'Letter of Intent to Appeal'
      },
      {
        id: 'LIOH',
        en: 'Letter of Intent to Invoke Opportunity to be Heard',
        fr: 'Letter of Intent to Invoke Opportunity to be Heard'
      },
      {
        id: 'OHCD',
        en: 'Opportunity to be Heard Comprehensive Document',
        fr: 'Opportunity to be Heard Comprehensive Document'
      },
      {
        id: 'RAIL',
        en: 'Response to Additional Information Letter',
        fr: 'Response to Additional Information Letter'
      },
      {
        id: 'RS',
        en: 'Response to Screening Deficiency Letter',
        fr: 'Response to Screening Deficiency Letter'
      },
      {
        id: 'RS36L',
        en: 'Response to S.36 Letter',
        fr: 'Response to S.36 Letter'
      },
      {
        id: 'RS39L',
        en: 'Response to S.39 Letter',
        fr: 'Response to S.39 Letter'
      },
      {
        id: 'WR',
        en: 'Withdrawal Request',
        fr: 'Withdrawal Request'
      },
      {
        id: 'INITIAL',
        en: 'Initial',
        fr: 'Initial'
      },
      {
        id: 'MM',
        en: 'Minutes of Meeting',
        fr: 'Minutes of Meeting'
      },
      {
        id: 'RER',
        en: 'Response to E-mail Request',
        fr: 'Response to E-mail Request'
      },
      {
        id: 'UD',
        en: 'Unsolicited Information',
        fr: 'Unsolicited Information'
      },
      {
        id: 'RMHPDR',
        en: 'Response to MHPD Request',
        fr: 'Response to MHPD Request'
      },
      {
        id: 'PRCI',
        en: 'Public Release of Clinical Information',
        fr: 'Public Release of Clinical Information'
      }
    ];
  }

  public static mapFormModelToDataModel(formRecord: FormGroup, transactionModel) {
    const activityLeadList = TransactionDetailsService.getActivityLeadList(TransactionDetailsService.lang);
    const activityTypeList = TransactionDetailsService.getActivityTypeList(TransactionDetailsService.lang);
    const descArray = TransactionDetailsService.getTransDescList(TransactionDetailsService.lang);
    const dcArray = TransactionDetailsService._convertListText(
            TransactionDetailsService.getDeviceClassList(), TransactionDetailsService.lang);
    transactionModel.dossier_id = formRecord.controls.dossierId.value;
    transactionModel.dossier_type = {
      '__text': 'Medical Device',
      '_id': 'D23',
      '_label_en': 'Medical Device',
      '_label_fr': 'Medical Device'
    };

    if (formRecord.controls.manuCompanyId.value) {
      transactionModel.company_id = 'k' + formRecord.controls.manuCompanyId.value;
    }
    transactionModel.manufacturing_contact_id = formRecord.controls.manuContactId.value;
    if (formRecord.controls.reguCompanyId.value) {
      transactionModel.regulatory_company_id = 'k' + formRecord.controls.reguCompanyId.value;
    }
    transactionModel.regulatory_contact_id = formRecord.controls.reguContactId.value;
   // transactionModel.regulatory_activity_lead = formRecord.controls.activityLead.value;

    if (formRecord.controls.activityLead.value) {
      const recordIndex1 = ListService.getRecord(activityLeadList, formRecord.controls.activityLead.value, 'id');
      if (recordIndex1 > -1) {
        transactionModel.regulatory_activity_lead = {
          '__text': activityLeadList[recordIndex1].text,
          '_id': activityLeadList[recordIndex1].id,
          '_label_en': activityLeadList[recordIndex1].en,
          '_label_fr': activityLeadList[recordIndex1].fr
        };
      }
    } else {
      transactionModel.regulatory_activity_lead = null;
    }

    // transactionModel.activity_type = formRecord.controls.activityType.value;
    if (formRecord.controls.activityType.value) {
      const recordIndex2 = ListService.getRecord(activityTypeList, formRecord.controls.activityType.value, 'id');
      if (recordIndex2 > -1) {
        transactionModel.regulatory_activity_type = {
          '__text': activityTypeList[recordIndex2].text,
          '_id' : activityTypeList[recordIndex2].id,
          '_label_en': activityTypeList[recordIndex2].en,
          '_label_fr': activityTypeList[recordIndex2].fr
        };
      }
    } else {
      transactionModel.regulatory_activity_type = null;
    }

    if (formRecord.controls.descriptionType.value) {
      const recordIndex3 = ListService.getRecord(descArray, formRecord.controls.descriptionType.value, 'id');
      if (recordIndex3 > -1) {
        transactionModel.description_type = {
          '__text': descArray[recordIndex3].text,
          '_id': descArray[recordIndex3].id,
          '_label_en': descArray[recordIndex3].en,
          '_label_fr': descArray[recordIndex3].fr
        };
      }
    } else {
      transactionModel.description_type = null;
    }
    // transactionModel.device_class = formRecord.controls.deviceClass.value;
    if (formRecord.controls.deviceClass.value) {
      const recordIndex4 = ListService.getRecord(dcArray, formRecord.controls.deviceClass.value, 'id');
      if (recordIndex4 > -1) {
        transactionModel.device_class = {
          '__text': dcArray[recordIndex4].text,
          '_id': dcArray[recordIndex4].id,
          '_label_en': dcArray[recordIndex4].en,
          '_label_fr': dcArray[recordIndex4].fr
        };
      }
    } else {
      transactionModel.device_class = null;
    }
    transactionModel.amend_reasons.classification_change = formRecord.controls.classChange.value ? GlobalsService.YES : GlobalsService.NO;
    transactionModel.amend_reasons.licence_change = formRecord.controls.licenceChange.value ? GlobalsService.YES : GlobalsService.NO;
    transactionModel.amend_reasons.device_change = formRecord.controls.deviceChange.value ? GlobalsService.YES : GlobalsService.NO;
    transactionModel.amend_reasons.process_change = formRecord.controls.processChange.value ? GlobalsService.YES : GlobalsService.NO;
    transactionModel.amend_reasons.quality_change = formRecord.controls.qualityChange.value ? GlobalsService.YES : GlobalsService.NO;
    transactionModel.amend_reasons.design_change = formRecord.controls.designChange.value ? GlobalsService.YES : GlobalsService.NO;
    transactionModel.amend_reasons.materials_change = formRecord.controls.materialsChange.value ? GlobalsService.YES : GlobalsService.NO;
    transactionModel.amend_reasons.labelling_change = formRecord.controls.labellingChange.value ? GlobalsService.YES : GlobalsService.NO;
    transactionModel.amend_reasons.safety_change = formRecord.controls.safetyChange.value ? GlobalsService.YES : GlobalsService.NO;
    transactionModel.amend_reasons.purpose_change = formRecord.controls.purposeChange.value ? GlobalsService.YES : GlobalsService.NO;
    transactionModel.amend_reasons.add_delete_change = formRecord.controls.addChange.value ? GlobalsService.YES : GlobalsService.NO;
    transactionModel.licence_number = formRecord.controls.licenceNum.value;
    if (formRecord.controls.descriptionType.value !== descArray[9].id &&
      formRecord.controls.descriptionType.value !== descArray[2].id &&
      formRecord.controls.descriptionType.value !== descArray[3].id &&
      formRecord.controls.descriptionType.value !== descArray[6].id &&
      formRecord.controls.descriptionType.value !== descArray[7].id &&
      formRecord.controls.descriptionType.value !== descArray[10].id &&
      formRecord.controls.descriptionType.value !== descArray[12].id) {
      transactionModel.application_number = formRecord.controls.appNum.value;
    } else if (formRecord.controls.descriptionType.value === descArray[2].id  ||
            formRecord.controls.descriptionType.value === descArray[3].id  ||
            formRecord.controls.descriptionType.value === descArray[6].id  ||
            formRecord.controls.descriptionType.value === descArray[7].id  ||
            formRecord.controls.descriptionType.value === descArray[10].id  ||
            formRecord.controls.descriptionType.value === descArray[12].id ) {
      transactionModel.application_number = formRecord.controls.appNumOpt.value;
    }
    transactionModel.meeting_id = formRecord.controls.meetingId.value;
    transactionModel.device_name = formRecord.controls.deviceName.value;
    transactionModel.proposed_licence_name = formRecord.controls.licenceName.value;
    transactionModel.request_date = formRecord.controls.requestDate.value;
    transactionModel.brief_description = formRecord.controls.briefDesc.value;
    transactionModel.transaction_description = TransactionDetailsService._setConcatDetails(transactionModel);
    if (formRecord.controls.deviceChange.value ||
        (formRecord.controls.activityType.value === activityTypeList[1].id &&
              formRecord.controls.descriptionType.value === descArray[9].id)) {
      transactionModel.has_ddt = formRecord.controls.hasDdtMan.value ? GlobalsService.YES : GlobalsService.NO;
    } else {
      transactionModel.has_ddt = formRecord.controls.hasDdt.value ? GlobalsService.YES : GlobalsService.NO;
    }
    transactionModel.has_app_info = formRecord.controls.hasAppInfo.value ? GlobalsService.YES : GlobalsService.NO;
    transactionModel.is_solicited_info = formRecord.controls.isSolicitedInfo.value;
  }

  public static mapDataModelToFormModel(transactionModel, formRecord: FormGroup, lang) {
    formRecord.controls.dossierId.setValue(transactionModel.dossier_id);
    if (transactionModel.company_id) {
      formRecord.controls.manuCompanyId.setValue(transactionModel.company_id.slice(1));
    }
    formRecord.controls.manuContactId.setValue(transactionModel.manufacturing_contact_id);
    if (transactionModel.regulatory_company_id) {
      formRecord.controls.reguCompanyId.setValue(transactionModel.regulatory_company_id.slice(1));
    }
    formRecord.controls.reguContactId.setValue(transactionModel.regulatory_contact_id);

    /**
     formRecord.controls.activityLead.setValue(transactionModel.activity_lead);
     formRecord.controls.activityType.setValue(transactionModel.activity_type);
*/

    if (transactionModel.regulatory_activity_lead) {
      const activityLeads = TransactionDetailsService._convertListText(TransactionDetailsService.getRawActivityLeadList(), lang);
      const recordIndex = ListService.getRecord(activityLeads, transactionModel.regulatory_activity_lead._id, 'id');
      if (recordIndex > -1) {
        formRecord.controls.activityLead.setValue(activityLeads[recordIndex].id);
      } else {
        formRecord.controls.activityLead.setValue(null);
      }
    } else {
      formRecord.controls.activityLead.setValue(null);
    }


    const activityTypes = TransactionDetailsService._convertListText(TransactionDetailsService.getRawActivityTypeList(), lang);
    if (transactionModel.regulatory_activity_type) {
      const recordIndex = ListService.getRecord(activityTypes, transactionModel.regulatory_activity_type._id, 'id');
      if (recordIndex > -1) {
        formRecord.controls.activityType.setValue(activityTypes[recordIndex].id);
      } else {
        formRecord.controls.activityType.setValue(null);
      }
    } else {
      formRecord.controls.activityType.setValue(null);
    }

    const descriptions = TransactionDetailsService._convertListText(TransactionDetailsService.getRawTransDescList(), lang);
    if (transactionModel.description_type) {
      const recordIndex = ListService.getRecord(descriptions, transactionModel.description_type._id, 'id');
      if (recordIndex > -1) {
        formRecord.controls.descriptionType.setValue(descriptions[recordIndex].id);
      } else {
        formRecord.controls.descriptionType.setValue(null);
      }
    } else {
      formRecord.controls.descriptionType.setValue(null);
    }

    // formRecord.controls.deviceClass.setValue(transactionModel.device_class);
    const dcs = TransactionDetailsService._convertListText(TransactionDetailsService.getDeviceClassList(), lang);
    if (transactionModel.device_class) {
      const recordIndex = ListService.getRecord(descriptions, transactionModel.device_class._id, 'id');
      if (recordIndex > -1) {
        formRecord.controls.deviceClass.setValue(dcs[recordIndex].id);
      } else {
        formRecord.controls.deviceClass.setValue(null);
      }
    } else {
      formRecord.controls.deviceClass.setValue(null);
    }
    const clsc = transactionModel.amend_reasons.classification_change === GlobalsService.YES ? true : false;
    formRecord.controls.classChange.setValue(clsc);
    const licc = transactionModel.amend_reasons.licence_change === GlobalsService.YES ? true : false;
    formRecord.controls.licenceChange.setValue(licc);
    const decc = transactionModel.amend_reasons.device_change === GlobalsService.YES ? true : false;
    formRecord.controls.deviceChange.setValue(decc);
    const proc = transactionModel.amend_reasons.process_change === GlobalsService.YES ? true : false;
    formRecord.controls.processChange.setValue(proc);
    const quac = transactionModel.amend_reasons.quality_change === GlobalsService.YES ? true : false;
    formRecord.controls.qualityChange.setValue(quac);
    const desc = transactionModel.amend_reasons.design_change === GlobalsService.YES ? true : false;
    formRecord.controls.designChange.setValue(desc);
    const matc = transactionModel.amend_reasons.materials_change === GlobalsService.YES ? true : false;
    formRecord.controls.materialsChange.setValue(matc);
    const labc = transactionModel.amend_reasons.labelling_change === GlobalsService.YES ? true : false;
    formRecord.controls.labellingChange.setValue(labc);
    const safc = transactionModel.amend_reasons.safety_change === GlobalsService.YES ? true : false;
    formRecord.controls.safetyChange.setValue(safc);
    const purc = transactionModel.amend_reasons.purpose_change === GlobalsService.YES ? true : false;
    formRecord.controls.purposeChange.setValue(purc);
    const addc = transactionModel.amend_reasons.add_delete_change === GlobalsService.YES ? true : false;
    formRecord.controls.addChange.setValue(addc);
    if (clsc || licc || decc || proc || quac || desc || matc || labc || safc || purc || addc) {
      formRecord.controls.amendReason.setValue('reasonFilled');
    }
    formRecord.controls.licenceNum.setValue(transactionModel.licence_number);
    if (transactionModel.description_type._id &&
      (transactionModel.description_type._id === descriptions[2].id ||
        transactionModel.description_type._id === descriptions[3].id ||
        transactionModel.description_type._id === descriptions[6].id ||
        transactionModel.description_type._id === descriptions[7].id ||
        transactionModel.description_type._id === descriptions[10].id ||
        transactionModel.description_type._id === descriptions[12].id)) {
      formRecord.controls.appNumOpt.setValue(transactionModel.application_number);
    } else {
      formRecord.controls.appNum.setValue(transactionModel.application_number);
    }
    formRecord.controls.meetingId.setValue(transactionModel.meeting_id);
    formRecord.controls.deviceName.setValue(transactionModel.device_name);
    formRecord.controls.licenceName.setValue(transactionModel.proposed_licence_name);
    formRecord.controls.requestDate.setValue(transactionModel.request_date);
    formRecord.controls.briefDesc.setValue(transactionModel.brief_description);
    formRecord.controls.transDescription.setValue(transactionModel.transaction_description);
    const hasddt = transactionModel.has_ddt === GlobalsService.YES ? true : false;
    if (formRecord.controls.deviceChange.value ||
      (transactionModel.regulatory_activity_type._id === activityTypes[1].id &&
            transactionModel.description_type._id === descriptions[9].id)) {
      formRecord.controls.hasDdtMan.setValue(hasddt);
    } else {
      formRecord.controls.hasDdt.setValue(hasddt);
    }
    const hasapp = transactionModel.has_app_info === GlobalsService.YES ? true : false;
    formRecord.controls.hasAppInfo.setValue(hasapp);
    formRecord.controls.isSolicitedInfo.setValue(transactionModel.is_solicited_info);
  }

  /***
   * Converts the list iteems of id, label_en, and label_Fr
   * @param rawList
   * @param lang
   * @private
   */
  private static _convertListText(rawList, lang) {
    const result = [];
    if (lang === GlobalsService.FRENCH) {
      rawList.forEach(item => {
        item.text = item.fr;
        result.push(item);
        //  console.log(item);
      });
    } else {
      rawList.forEach(item => {
        item.text = item.en;
        // console.log("adding country"+item.text);
        result.push(item);
        // console.log(item);
      });
    }
    return result;
  }

  private static _setConcatDetails(transactionModel) {
    let rDate = '';
    let concatText = '';
    // const dTypeList = TransactionDetailsService.getRawTransDescList();
    if (transactionModel.description_type) {
      concatText = transactionModel.description_type._label_en;
      // if (transactionModel.descriptionType.value.id === dTypeList[9].id) {
      //   concatText = enDescription;
      //   if (transactionModel.deviceClass) {
      //     concatText += ' with device class: ' + transactionModel.deviceClass;
      //   }
      //   if (transactionModel.deviceName) {
      //     concatText += ', and name of device: ' + transactionModel.deviceName;
      //   }
      // }
      if (transactionModel.request_date) {
        rDate = TransactionDetailsService._convertDate(transactionModel.request_date);
        concatText += ' dated ' + rDate;
      }
      if (transactionModel.application_number) {
        concatText += ' with application number: ' + transactionModel.application_number;
      }
      if (transactionModel.meeting_id) {
        concatText = 'Meeting ID, ' + transactionModel.meeting_id + ', ' + concatText;
      }
      if (transactionModel.brief_description) {
        concatText += ', and brief description: ' + transactionModel.brief_description;
      }
    }
    return concatText;
  }

  private static _convertDate(value) {

    if (!value) {return ''; }
    const date = new Date(value);
    const m_names = ['Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'];
    const result = m_names[date.getMonth()] + '. ' + date.getDate() + ', ' + date.getFullYear();
    return result;
  }

}
