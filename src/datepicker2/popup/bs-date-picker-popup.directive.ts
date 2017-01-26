import {
  Directive, Input, Output, EventEmitter, OnInit, OnDestroy, Renderer,
  ElementRef, TemplateRef, ViewContainerRef
} from '@angular/core';

// import { BsCalendarOptionsClass } from '../common/bs-calendar-options.provider';
import { ComponentLoaderFactory, ComponentLoader } from '../../component-loader';
import { BsDatePickerContainer } from './bs-date-picker-container.component';
import { BsDatePickerState } from '../common/bs-date-picker-state.provider';
import { OnChange } from '../../utils/decorators';
import { BsDatePickerOptions } from '../common/bs-date-picker-options.provider';

/**
 * A lightweight, extensible directive for fancy popover creation.
 */
@Directive({
  selector: '[bsDatePickerPopup]',
  exportAs: 'bs-date-picker-popup',
  providers: [BsDatePickerState]
})
export class BsDatePickerPopupDirective implements OnInit, OnDestroy {
  /**
   * Placement of a popover. Accepts: "top", "bottom", "left", "right"
   */
  @Input() public placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  @Input() public triggers: string = 'click';
  /**
   * A selector specifying the element the popover should be appended to.
   * Currently only supports "body".
   */
  @Input() public container: string = 'body';

  /**
   * Returns whether or not the popover is currently being shown
   */
  @Input()
  public get isOpen(): boolean {
    return this._datepicker.isShown;
  }

  public set isOpen(value: boolean) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Emits an event when the popover is shown
   */
  @Output() public onShown: EventEmitter<any>;
  /**
   * Emits an event when the popover is hidden
   */
  @Output() public onHidden: EventEmitter<any>;

  // here will be parsed options and set defaults
  @Input() @OnChange() public config: BsDatePickerOptions;
  public configChange: EventEmitter<BsDatePickerOptions> = new EventEmitter();

  @Input() @OnChange() public bsValue: any;
  @Output() public bsValueChange: EventEmitter<any> = new EventEmitter();

  private _datepicker: ComponentLoader<BsDatePickerContainer>;

  public constructor(_elementRef: ElementRef,
                     _renderer: Renderer,
                     _viewContainerRef: ViewContainerRef,
                     datePickerOptions: BsDatePickerOptions,
                     _state: BsDatePickerState,
                     cis: ComponentLoaderFactory) {
    this._datepicker = cis
      .createLoader<BsDatePickerContainer>(_elementRef, _viewContainerRef, _renderer)
      .provide({provide: BsDatePickerState, useValue: _state});
    // Object.assign(this, _state);
    this.onShown = this._datepicker.onShown;
    this.onHidden = this._datepicker.onHidden;

    _state.selectedDateChange.subscribe((v: any) => {
      this.bsValue = v && v.toDate && v.toDate() || v;
      if (v) {
        this.hide();
      }
    });
    this.configChange.subscribe((v: any) => {
      datePickerOptions.update(v);
    });
  }

  /**
   * Opens an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  public show(): void {
    if (this._datepicker.isShown) {
      return;
    }

    this._datepicker
      .attach(BsDatePickerContainer)
      .to(this.container)
      .position({attachment: this.placement})
      .show({});
  }

  /**
   * Closes an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  public hide(): void {
    if (this.isOpen) {
      this._datepicker.hide();
    }
  }

  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  public toggle(): void {
    if (this.isOpen) {
      return this.hide();
    }

    this.show();
  }

  public ngOnInit(): any {
    this._datepicker.listen({
      triggers: this.triggers,
      show: () => this.show(),
      hide: () => this.hide(),
      toggle: () => this.toggle()
    });
  }

  public ngOnDestroy(): any {
    this._datepicker.dispose();
  }
}
