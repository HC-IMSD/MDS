import {
  Component, Input, Output, OnInit, SimpleChanges, OnChanges, EventEmitter, ViewChildren, QueryList,
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ControlMessagesComponent} from '../../error-msg/control-messages.component/control-messages.component';
import {DeviceDetailsService} from './device.details.service';
import {isArray} from 'util';


@Component({
  selector: 'device-details',
  templateUrl: 'device.details.component.html'
})

/**
 * Device Details Component is used for Company form
 */
export class DeviceDetailsComponent implements OnInit, OnChanges, AfterViewInit {

  public deviceFormLocalModel: FormGroup;
  @Input('group') public deviceRecord: FormGroup;
  @Input() detailsChanged: number;
  @Input() showErrors: boolean;
  @Output() errorList = new EventEmitter(true);
  @ViewChildren(ControlMessagesComponent) msgList: QueryList<ControlMessagesComponent>;

  // For the searchable select box, only accepts/saves id and text.
  // Will need to convert
  public showFieldErrors: boolean = false;
  private detailsService: DeviceDetailsService;

  constructor(private _fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.showFieldErrors = false;
    this.showErrors = false;
    this.detailsService = new DeviceDetailsService();
  }

  ngOnInit() {
    if (!this.deviceFormLocalModel) {
      this.deviceFormLocalModel = DeviceDetailsService.getReactiveModel(this._fb);
    }
    this.detailsChanged = 0;

  }

  ngAfterViewInit() {
    this.msgList.changes.subscribe(errorObjs => {
      let temp = [];
      this._updateErrorList(errorObjs);

      /* errorObjs.forEach(
         error => {
           temp.push(error);
         }
       );
       this.errorList.emit(temp);*/
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
    this.errorList.emit(temp);

  }

  ngOnChanges(changes: SimpleChanges) {

    // since we can't detect changes on objects, using a separate flag
    if (changes['detailsChanged']) { // used as a change indicator for the model
      // console.log("the details cbange");
      if (this.deviceRecord) {
        this.setToLocalModel();

      } else {
        this.deviceFormLocalModel = DeviceDetailsService.getReactiveModel(this._fb);
        this.deviceFormLocalModel.markAsPristine();
      }

    }
    if (changes['showErrors']) {

      this.showFieldErrors = changes['showErrors'].currentValue;
      let temp = [];
      if (this.msgList) {
        this.msgList.forEach(item => {
          temp.push(item);
           console.log(item);
        });
      }
      this.errorList.emit(temp);
    }

  }

  /**
   * Uses the updated reactive forms model locally
   */

  setToLocalModel() {
    this.deviceFormLocalModel = this.deviceRecord;
    if (!this.deviceFormLocalModel.pristine) {
      this.deviceFormLocalModel.markAsPristine();
    }
  }
}

