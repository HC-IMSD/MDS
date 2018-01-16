import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CompanyData} from './company.interfaces';
import {Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {AddressListComponent} from './address.list/address.list.component';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'App component';
  public myForm: FormGroup; // our form model
  @ViewChildren(AddressListComponent) addressLists: QueryList<AddressListComponent>
  public errorList={};

// we will use form builder to simplify our syntax
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    //create the blank form
    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      addresses: this._fb.array([])
    });
  }
  ngAfterViewInit() {
    this.addressLists.forEach(addressList => console.log(addressList));

    this.addressLists.changes.subscribe(list => {
      list.forEach(writer => console.log(writer));
    })
  }


 initAddress() {
    // initialize our address
   // this.indexId++;
    return this._fb.group({
      id: [14],
      address: ['test1', Validators.required],
      city: ['test1']
    });
  }

  processErrors(errorList){
    let errors={};
    if(!errorList) return;
    errorList.forEach(err => {
        console.log(err)
   /*   if(errors.hasOwnProperty(err.))*/
      })

  }


/*
  removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['addresses'];
    control.removeAt(i);
  }
*/


  save(model: CompanyData) {
    // call API to save customer
    //console.log(model);
  }


}
