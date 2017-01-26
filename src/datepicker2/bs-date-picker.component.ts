import { Component, Inject, Input, EventEmitter, Output } from '@angular/core';
import { BsDatePickerOptions } from './common/bs-date-picker-options.provider';
import { OnChange } from '../utils/decorators';
import { BsDatePickerState } from './common/bs-date-picker-state.provider';

@Component({
  selector: 'bs-datepicker',
  exportAs: 'bs-datepicker',
  template:`
<div class="bs-datepicker-multiple">
  <div class="left">
    <bs-date-picker-view bsRole="left"></bs-date-picker-view>
    <!--<bs-date-picker-view bsRole="right"></bs-date-picker-view>-->
  </div>
  <div class="right">
    <bs-custom-range-picker></bs-custom-range-picker>
  </div>
  <!--<div class="bs-datepicker-btns">-->
    <!--<button class="label-success colored"><span>Apply</span></button>-->
    <!--<button><span>Cancel</span></button>-->
  <!--</div>-->
</div>
`,
  providers: [BsDatePickerState]
})
export class BsDatePickerComponent {
// here will be parsed options and set defaults
  @Input() @OnChange() public config: BsDatePickerOptions;
  public configChange: EventEmitter<BsDatePickerOptions> = new EventEmitter();

  @Input() @OnChange() public bsValue: any;
  @Output() public bsValueChange: EventEmitter<any> = new EventEmitter();

  public constructor(@Inject(BsDatePickerOptions) datePickerOptions: BsDatePickerOptions, dps: BsDatePickerState) {
    dps.selectedDateChange.subscribe((v: any) => {this.bsValue = v && v.toDate && v.toDate() || v;});
    this.configChange.subscribe((v: any) => {
      datePickerOptions.update(v);
    });
  }
}
