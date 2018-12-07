import {
  Component, Input, Output, OnInit, SimpleChanges, OnChanges, EventEmitter, ViewChildren, QueryList,
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ControlMessagesComponent} from '../error-msg/control-messages.component/control-messages.component';
import {TransactionFeesService} from './transaction.fees.service';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {GlobalsService} from '../globals/globals.service';
import {ListService} from '../list-service';
import {isArray} from 'util';
import {noUndefined} from '@angular/compiler/src/util';


@Component({
  selector: 'transaction-fees',
  templateUrl: 'transaction.fees.component.html'
})

/**
 * Sample component is used for nothing
 */
export class TransactionFeesComponent implements OnInit, OnChanges, AfterViewInit {

  public transFeesFormLocalModel: FormGroup;
  @Input('group') public transFeesFormRecord: FormGroup;
  @Input() detailsChanged: number;
  @Input() showErrors: boolean;
  @Input() transFeesModel;
  @Input() lang;
  @Output() feesErrorList = new EventEmitter(true);
  @ViewChildren(ControlMessagesComponent) msgList: QueryList<ControlMessagesComponent>;

  // For the searchable select box, only accepts/saves id and text.
  // Will need to convert
  public yesNoList: Array<any> = [];
  public appNatureFeesList: Array<any> = [];
  public showFieldErrors = false;
  private feesService: TransactionFeesService;

  constructor(private _fb: FormBuilder,
              private http: HttpClient, private translate: TranslateService,
              private cdr: ChangeDetectorRef) {
    this.showFieldErrors = false;
    this.showErrors = false;
    this.feesService = new TransactionFeesService();
    this.yesNoList = this.feesService.getYesNoList();
  }

  async ngOnInit() {
    if (!this.transFeesFormLocalModel) {
      this.transFeesFormLocalModel = this.feesService.getReactiveModel(this._fb);
    }
    this.detailsChanged = 0;
    this.appNatureFeesList = TransactionFeesService.getAppNatureFeesList(this.lang);
  }

  ngAfterViewInit() {
    this.msgList.changes.subscribe(errorObjs => {
      let temp = [];
      this._updateErrorList(errorObjs);
    });
    this.msgList.notifyOnChanges();

  }

  private _updateErrorList(errorObjs) {
    let temp = [];
    if (errorObjs) {
      errorObjs.forEach(
        error => {
          temp.push(error);
        }
      );
    }
    this.feesErrorList.emit(temp);

  }


  ngOnChanges(changes: SimpleChanges) {

    // since we can't detect changes on objects, using a separate flag
    if (changes['detailsChanged']) { // used as a change indicator for the model
      // console.log("the details cbange");
      if (this.transFeesFormRecord) {
        this.setToLocalModel();

      } else {
        this.transFeesFormLocalModel = this.feesService.getReactiveModel(this._fb);
        this.transFeesFormLocalModel.markAsPristine();
      }
    }
    if (changes['showErrors']) {

      this.showFieldErrors = changes['showErrors'].currentValue;
      let temp = [];
      if (this.msgList) {
        this.msgList.forEach(item => {
          temp.push(item);
          // console.log(item);
        });
      }
      this.feesErrorList.emit(temp);
    }
    if (changes['transFeesFormLocalModel']) {
      console.log('**********the Transaction fees changed');
      this.transFeesFormRecord = this.transFeesFormLocalModel;
    }
    if (changes['transFeesModel']) {
      const dataModel = changes['transFeesModel'].currentValue;
      if (!this.transFeesFormLocalModel) {
        this.transFeesFormLocalModel = this.feesService.getReactiveModel(this._fb);
        this.transFeesFormLocalModel.markAsPristine();
      }
      TransactionFeesService.mapDataModelToFormModel(dataModel, (<FormGroup>this.transFeesFormLocalModel));
    }
  }

  /**
   * Uses the updated reactive forms model locally
   */

  setToLocalModel() {
    this.transFeesFormLocalModel = this.transFeesFormRecord;
    if (!this.transFeesFormLocalModel.pristine) {
      this.transFeesFormLocalModel.markAsPristine();
    }
  }

  onblur() {
    // console.log('input is typed');
    TransactionFeesService.mapFormModelToDataModel((<FormGroup>this.transFeesFormLocalModel),
      this.transFeesModel);
  }

  appNatureOnblur() {
    // console.log('input is typed');
    if (this.transFeesFormLocalModel.controls.appNature.value) {
      const recordIndex = ListService.getRecord(this.appNatureFeesList, this.transFeesFormLocalModel.controls.appNature.value, 'id');
      if (recordIndex > -1) {
        this.transFeesFormLocalModel.controls.fees.setValue(this.appNatureFeesList[recordIndex].fees);
      } else {
        this.transFeesFormLocalModel.controls.fees.setValue(null);
      }
    } else {
      this.transFeesFormLocalModel.controls.fees.setValue(null);
    }
    this.onblur();
  }

  isFeeAssociated() {
    if (this.transFeesFormLocalModel.controls.hasFees.value) {
      if (this.transFeesFormLocalModel.controls.hasFees.value === GlobalsService.YES) {
        return true;
      } else {
        this.transFeesFormLocalModel.controls.appNature.setValue(null);
        this.transFeesFormLocalModel.controls.appNature.markAsUntouched();
        this.transFeesFormLocalModel.controls.fees.setValue(null);
        this.transFeesFormLocalModel.controls.fees.markAsUntouched();
        // todo: add more fields under hasfees here ???
      }
    }
    return false;
  }

  // isQmsc() {
  //   const iscert = this.transFeesFormLocalModel.controls.hasQMSC.value;
  //   return (iscert && iscert === GlobalsService.YES);
  // }
  //
  // isNOIVDD() {
  //   if (this.transFeesFormLocalModel.controls.isIvdd.value) {
  //     if (this.transFeesFormLocalModel.controls.isIvdd.value === GlobalsService.NO) {
  //       return true;
  //     } else {
  //       this.transFeesFormLocalModel.controls.hasDrug.setValue(null);
  //       this.transFeesFormLocalModel.controls.hasDrug.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.hasDinNpn.setValue(null);
  //       this.transFeesFormLocalModel.controls.hasDinNpn.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.din.setValue('');
  //       this.transFeesFormLocalModel.controls.din.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.npn.setValue('');
  //       this.transFeesFormLocalModel.controls.npn.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.drugName.setValue('');
  //       this.transFeesFormLocalModel.controls.drugName.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.activeIngredients.setValue('');
  //       this.transFeesFormLocalModel.controls.activeIngredients.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.manufacturer.setValue('');
  //       this.transFeesFormLocalModel.controls.manufacturer.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.complianceUsp.setValue(false);
  //       this.transFeesFormLocalModel.controls.complianceUsp.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.complianceGmp.setValue(false);
  //       this.transFeesFormLocalModel.controls.complianceGmp.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.complianceOther.setValue(false);
  //       this.transFeesFormLocalModel.controls.complianceOther.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.otherPharmacopeia.setValue('');
  //       this.transFeesFormLocalModel.controls.otherPharmacopeia.markAsUntouched();
  //     }
  //   }
  //   return false;
  // }
  //
  // hasDrug() {
  //   if (this.transFeesFormLocalModel.controls.hasDrug.value) {
  //     if (this.transFeesFormLocalModel.controls.hasDrug.value === GlobalsService.YES) {
  //       return true;
  //     } else {
  //       this.transFeesFormLocalModel.controls.hasDinNpn.setValue(null);
  //       this.transFeesFormLocalModel.controls.hasDinNpn.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.din.setValue('');
  //       this.transFeesFormLocalModel.controls.din.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.npn.setValue('');
  //       this.transFeesFormLocalModel.controls.npn.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.drugName.setValue('');
  //       this.transFeesFormLocalModel.controls.drugName.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.activeIngredients.setValue('');
  //       this.transFeesFormLocalModel.controls.activeIngredients.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.manufacturer.setValue('');
  //       this.transFeesFormLocalModel.controls.manufacturer.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.complianceUsp.setValue(false);
  //       this.transFeesFormLocalModel.controls.complianceUsp.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.complianceGmp.setValue(false);
  //       this.transFeesFormLocalModel.controls.complianceGmp.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.complianceOther.setValue(false);
  //       this.transFeesFormLocalModel.controls.complianceOther.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.otherPharmacopeia.setValue('');
  //       this.transFeesFormLocalModel.controls.otherPharmacopeia.markAsUntouched();
  //     }
  //   }
  //   return false;
  // }
  //
  // hasDin() {
  //   if (this.transFeesFormLocalModel.controls.hasDinNpn.value) {
  //     if (this.transFeesFormLocalModel.controls.hasDinNpn.value === 'din') {
  //       return true;
  //     } else {
  //       this.transFeesFormLocalModel.controls.din.setValue('');
  //       this.transFeesFormLocalModel.controls.din.markAsUntouched();
  //     }
  //   }
  //   return false;
  // }
  //
  // hasNpn() {
  //   if (this.transFeesFormLocalModel.controls.hasDinNpn.value) {
  //     if (this.transFeesFormLocalModel.controls.hasDinNpn.value === 'npn') {
  //       return true;
  //     } else {
  //       this.transFeesFormLocalModel.controls.npn.setValue('');
  //       this.transFeesFormLocalModel.controls.npn.markAsUntouched();
  //     }
  //   }
  //   return false;
  // }
  //
  // isNoDinNpn() {
  //   if (this.transFeesFormLocalModel.controls.hasDinNpn.value) {
  //     if (this.transFeesFormLocalModel.controls.hasDinNpn.value === 'nodinnpn') {
  //       return true;
  //     } else {
  //       this.transFeesFormLocalModel.controls.drugName.setValue('');
  //       this.transFeesFormLocalModel.controls.drugName.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.activeIngredients.setValue('');
  //       this.transFeesFormLocalModel.controls.activeIngredients.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.manufacturer.setValue('');
  //       this.transFeesFormLocalModel.controls.manufacturer.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.complianceUsp.setValue(false);
  //       this.transFeesFormLocalModel.controls.complianceUsp.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.complianceGmp.setValue(false);
  //       this.transFeesFormLocalModel.controls.complianceGmp.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.complianceOther.setValue(false);
  //       this.transFeesFormLocalModel.controls.complianceOther.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.otherPharmacopeia.setValue('');
  //       this.transFeesFormLocalModel.controls.otherPharmacopeia.markAsUntouched();
  //     }
  //   }
  //   return false;
  // }
  //
  // isOtherPharmacopeia() {
  //   if (this.transFeesFormLocalModel.controls.complianceOther.value) {
  //     return true;
  //   } else {
  //     this.transFeesFormLocalModel.controls.otherPharmacopeia.setValue('');
  //     this.transFeesFormLocalModel.controls.otherPharmacopeia.markAsUntouched();
  //   }
  //   return false;
  // }
  //
  // isIt() {
  //     if (this.transFeesFormLocalModel.controls.provisionMdrIT.value) {
  //     return true;
  //   } else {
  //     this.transFeesFormLocalModel.controls.authorizationNum.setValue('');
  //     this.transFeesFormLocalModel.controls.authorizationNum.markAsUntouched();
  //   }
  //   return false;
  // }
  //
  // isSa() {
  //   if (this.transFeesFormLocalModel.controls.provisionMdrSA.value) {
  //     return true;
  //   } else {
  //     this.transFeesFormLocalModel.controls.deviceId.setValue('');
  //     this.transFeesFormLocalModel.controls.deviceId.markAsUntouched();
  //   }
  //   return false;
  // }
  //
  // isNoDeclaration() {
  //   if (this.transFeesFormLocalModel.controls.declarationConformity.value) {
  //     return (this.transFeesFormLocalModel.controls.declarationConformity.value === GlobalsService.NO);
  //   }
  //   return false;
  // }
  //
  // isRecombinant() {
  //   if (this.transFeesFormLocalModel.controls.hasRecombinant.value) {
  //     if (this.transFeesFormLocalModel.controls.hasRecombinant.value === GlobalsService.YES) {
  //       return true;
  //     } else {
  //       this.transFeesFormLocalModel.controls.isAnimalHumanSourced.setValue(null);
  //       this.transFeesFormLocalModel.controls.isAnimalHumanSourced.markAsUntouched();
  //       this.transFeesFormLocalModel.controls.isListedIddTable.setValue(null);
  //       this.transFeesFormLocalModel.controls.isListedIddTable.markAsUntouched();
  //     }
  //   }
  //   return false;
  // }
  //
  // isAnimalHumanSourced() {
  //   if (this.transFeesFormLocalModel.controls.isAnimalHumanSourced.value) {
  //     if (this.transFeesFormLocalModel.controls.isAnimalHumanSourced.value === GlobalsService.YES) {
  //       return true;
  //     } else {
  //       this.transFeesFormLocalModel.controls.isListedIddTable.setValue(null);
  //       this.transFeesFormLocalModel.controls.isListedIddTable.markAsUntouched();
  //     }
  //   }
  //   return false;
  // }
}

