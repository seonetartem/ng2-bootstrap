import { Component, Input, OnInit } from '@angular/core';
import { BsDatePickerOptions } from './common/bs-date-picker-options.provider';
import { BsCalendarOptionsClass } from './common/bs-calendar-options.provider';
import { BsDatePickerState } from './common/bs-date-picker-state.provider';

// todo: rename to calendar
@Component({
  selector: 'bs-date-picker-view',
  exportAs: 'bs-date-picker-view',
  template: `
<div class="bs-datepicker bs-timepicker label-success" role="application"
     *ngIf="isShown"
     [ngSwitch]="options.viewMode">
  <bs-current-date></bs-current-date>
  <bs-day-picker *ngSwitchCase="'days'"></bs-day-picker>
  <bs-month-picker *ngSwitchCase="'months'"></bs-month-picker>
  <bs-year-picker *ngSwitchCase="'years'"></bs-year-picker>
  <!--<bs-datetimepicker></bs-datetimepicker>-->
</div>
`
})
export class BsDatePickerViewComponent implements OnInit {
  public isShown: boolean = true;
  public options: BsDatePickerOptions;
  public cOptions: BsCalendarOptionsClass;
  @Input() public bsRole: string;

  public constructor(datePickerState: BsDatePickerState, datePickerOptions: BsDatePickerOptions, cOptions: BsCalendarOptionsClass) {
    this.options = datePickerOptions;
    this.cOptions = cOptions;
    datePickerState.showCalendarsChange.subscribe((v: boolean) => this.isShown = v);
  }

  public ngOnInit(): void {
    this.cOptions.update({
      bsRole: this.bsRole
    });
  }
}
