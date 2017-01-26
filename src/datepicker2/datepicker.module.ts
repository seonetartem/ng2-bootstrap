import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BsCurrentDateComponent } from './current-date/bs-current-date.component';
import { BsCustomRangePickerComponent } from './custom-range/bs-custom-range-picker.component';
import { BsDayPickerComponent } from './day/bs-day-picker.component';
import { BsMonthPickerComponent } from './month/bs-month-picker.component';
import { BsDateTimePickerComponent } from './time/bs-date-time-picker.component';
import { BsYearPickerComponent } from './year/bs-year-picker.component';
import { BsDatePickerViewComponent } from './bs-date-picker-view.component';
import { BsDatePickerComponent } from './bs-date-picker.component';
import { BsCalendarOptionsClass } from './common/bs-calendar-options.provider';
import { BsDatePickerOptions } from './common/bs-date-picker-options.provider';
import { BsDatePickerState } from './common/bs-date-picker-state.provider';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    BsCurrentDateComponent,
    BsCustomRangePickerComponent,
    BsDayPickerComponent,
    // DatePickerNgModel,
    BsMonthPickerComponent,
    BsDateTimePickerComponent,
    BsYearPickerComponent,
    BsDatePickerViewComponent,
    BsDatePickerComponent
  ],
  exports: [
    BsCurrentDateComponent,
    BsCustomRangePickerComponent,
    BsDayPickerComponent,
    // DatePickerNgModel,
    BsMonthPickerComponent,
    BsDateTimePickerComponent,
    BsYearPickerComponent,
    BsDatePickerViewComponent,
    BsDatePickerComponent
  ],
  providers: [BsCalendarOptionsClass, BsDatePickerOptions]
})
export class BsDatepickerModule {
}
