/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import MDCFoundation from '@material/base/foundation';
import {MDCTextfieldInputAdapter, NativeInputType} from './adapter';
import {strings} from './constants';


/**
 * @extends {MDCFoundation<!MDCTextfieldInputAdapter>}
 * @final
 */
class MDCTextfieldInputFoundation extends MDCFoundation {

  /** @return enum {string} */
  static get strings() {
    return strings;
  }

  /**
   * {@see MDCTextfieldInputAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextfieldInputAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCTextfieldAdapter} */ ({
      registerInteractionHandler: () => {},
      deregisterInteractionHandler: () => {},
      getNativeInput: () => {},
    });
  }

  /**
   * @param {!MDCTextfieldInputAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCTextfieldInputAdapter} */ ({})) {
    super(Object.assign(MDCTextfieldInputFoundation.defaultAdapter, adapter));

    /** @private {boolean} */
    this.isFocused_ = false;
    /** @private {boolean} */
    this.receivedUserInput_ = false;
    /** @private {function(): undefined} */
    this.inputFocusHandler_ = () => this.activateFocus_();
    /** @private {function(): undefined} */
    this.inputBlurHandler_ = () => this.deactivateFocus_();
    /** @private {function(): undefined} */
    this.inputInputHandler_ = () => this.autoCompleteFocus_();
    /** @private {function(): undefined} */
    this.inputPressedHandler_ = () =>  this.notifyPressedAction_();
  }

  init() {
    this.adapter_.registerInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.registerInteractionHandler('input', this.inputInputHandler_);
    ['mousedown', 'touchstart'].forEach((evtType) => {
      this.adapter_.registerInteractionHandler(evtType, this.inputPressedHandler_);
    });
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.deregisterInteractionHandler('input', this.inputInputHandler_);
    ['mousedown', 'touchstart'].forEach((evtType) => {
      this.adapter_.deregisterInteractionHandler(evtType, this.inputPressedHandler_);
    });
  }

  /**
   * Activates the text field focus state.
   * @private
   */
  activateFocus_() {
    this.isFocused_ = true;
    this.adapter_.notifyFocusAction();
  }

  /**
   * Activates the Textfield's focus state in cases when the input value
   * changes without user input (e.g. programatically).
   * @private
   */
  autoCompleteFocus_() {
    if (!this.receivedUserInput_) {
      this.activateFocus_();
    }
  }

  /**
   * Deactives the Textfield's focus state.
   * @private
   */
  deactivateFocus_() {
    this.isFocused_ = false;
    const input = this.getNativeInput_();

    if (!input.value && !this.isBadInput()) {
      this.receivedUserInput_ = false;
    }

    this.adapter_.notifyBlurAction();
  }

  notifyPressedAction_() {
    this.adapter_.notifyPressedAction();
  }

  /**
   * @return {boolean} True if the Textfield input fails validity checks.
   */
  isBadInput() {
    const input = this.getNativeInput_();
    return input.validity ? input.validity.badInput : input.badInput;
  }

  /**
   * @return {string} Returns the value 
   */
   getValue() {
    return this.getNativeInput_().value;
   }

  /**
   * @return {boolean}
   */
   checkValidity() {
    return this.getNativeInput_().checkValidity();
   }

  /**
   * @return {boolean} True if the Textfield is disabled.
   */
  isDisabled() {
    return this.getNativeInput_().disabled;
  }

  /**
   * @param {boolean} disabled Sets the textfield disabled or enabled.
   */
  setDisabled(disabled) {
    this.getNativeInput_().disabled = disabled;
  }

  /**
   * @return {!Element|!NativeInputType} The native text input from the
   * host environment, or a dummy if none exists.
   * @private
   */
  getNativeInput_() {
    return this.adapter_.getNativeInput() ||
    /** @type {!NativeInputType} */ ({
      checkValidity: () => true,
      value: '',
      disabled: false,
      badInput: false,
    });
  }
}

export default MDCTextfieldInputFoundation;
