import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddressDetailsService} from '../address.details/address.details.service';

@Injectable()
export class CompanyAddressRecordService {

  constructor() {
  }

  public static getReactiveModel(fb: FormBuilder): FormGroup {
    if (!fb) return null;
    return fb.group({
        id: -1,
        detailsDirty: [false, Validators.required],
        companyName:["",Validators.required],
        addressDetails: AddressDetailsService.getReactiveModel(fb)
      }
    );
  }

  /** returns a data model for this **/
  public static getEmptyModel(){

    let addressModel=AddressDetailsService.getEmptyModel()
    let companyModel={
      id:'',
      company:''
    };
    return this.extend(companyModel,addressModel)
  }

  public static mapFormModelToDataModel(formRecord: FormGroup, addressRecordModel,countryList) {
    addressRecordModel.id = formRecord.controls.id.value;
    addressRecordModel.company = formRecord.controls.companyName.value;
    AddressDetailsService.mapFormModelToDataModel((<FormGroup>formRecord.controls.addressDetails), addressRecordModel,countryList);

  }


  public static mapDataModelFormModel(addressRecordModel, formRecord: FormGroup) {
    formRecord.controls.id.setValue(addressRecordModel.id);
    AddressDetailsService.mapDataModelToFormModel(addressRecordModel, <FormGroup>formRecord.controls.addressDetails);
  }

  public  static extend(dest, src) {
    for(var key in src) {
      dest[key] = src[key];
    }
    return dest;
  }

}
