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
import MDCTextfieldAdapter from './adapter';
import {cssClasses, strings} from './constants';
import MDCTextfieldInputFoundation from './input/foundation';
import MDCTextfieldLabelFoundation from './label/foundation';
import MDCTextfieldBottomLineFoundation from './bottom-line/foundation';
import MDCTextfieldHelpTextFoundation from './help-text/foundation';


/**
 * @extends {MDCFoundation<!MDCTextfieldAdapter>}
 * @final
 */
class MDCTextfieldFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses;
  }

  /** @return enum {string} */
  static get strings() {
    return strings;
  }

  /**
   * {@see MDCTextfieldAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextfieldAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCTextfieldAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      setIconAttr: () => {},
      eventTargetHasClass: () => {},
      registerTextFieldInteractionHandler: () => {},
      deregisterTextFieldInteractionHandler: () => {},
      notifyIconAction: () => {},
      getInputFoundation: () => {},
      getLabelFoundation: () => {},
      getBottomLineFoundation: () => {},
      getHelpTextFoundation: () => {},
    });
  }

  /**
   * @param {!MDCTextfieldAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCTextfieldAdapter} */ ({})) {
    super(Object.assign(MDCTextfieldFoundation.defaultAdapter, adapter));

    /** @private {boolean} */
    this.useCustomValidityChecking_ = false;
    /** @private {function(): undefined} */
    this.inputFocusHandler_ = () => this.activateFocus_();
    /** @private {function(): undefined} */
    this.inputBlurHandler_ = () => this.deactivateFocus_();
    /** @private {function(!Event): undefined} */
    this.setPointerXOffset_ = (evt) => {
      const bottomLine = this.adapter_.getBottomLineFoundation();
      if (bottomLine) {
        bottomLine.setBottomLineTransformOrigin(evt);
      }
    }
    /** @private {function(!Event): undefined} */
    this.textFieldInteractionHandler_ = (evt) => this.handleTextFieldInteraction_(evt);
  }

  init() {
    this.adapter_.addClass(MDCTextfieldFoundation.cssClasses.UPGRADED);
    // Ensure label does not collide with any pre-filled value.
    if (this.adapter_.getInputFoundation().getValue()) {
      this.adapter_.getLabelFoundation().floatLabel();
    }

    this.adapter_.registerInputInteractionHandler(
      MDCTextfieldInputFoundation.strings.FOCUS_EVENT, this.inputFocusHandler_);
    this.adapter_.registerInputInteractionHandler(
      MDCTextfieldInputFoundation.strings.BLUR_EVENT, this.inputBlurHandler_);
    this.adapter_.registerInputInteractionHandler(
      MDCTextfieldInputFoundation.strings.PRESSED_EVENT, this.setPointerXOffset_);
    ['click', 'keydown'].forEach((evtType) => {
      this.adapter_.registerTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler_);
    });
  }

  destroy() {
    this.adapter_.removeClass(MDCTextfieldFoundation.cssClasses.UPGRADED);
    this.adapter_.deregisterInputInteractionHandler(
      MDCTextfieldInputFoundation.strings.FOCUS_EVENT, this.inputFocusHandler_);
    this.adapter_.deregisterInputInteractionHandler(
      MDCTextfieldInputFoundation.strings.BLUR_EVENT, this.inputBlurHandler_);
    this.adapter_.deregisterInputInteractionHandler(
      MDCTextfieldInputFoundation.strings.PRESSED_EVENT, this.setPointerXOffset_);
    ['click', 'keydown'].forEach((evtType) => {
      this.adapter_.deregisterTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler_);
    });
  }

  /**
   * Handles all user interactions with the Textfield.
   * @param {!Event} evt
   * @private
   */
  handleTextFieldInteraction_(evt) {
    if (this.adapter_.getInputFoundation().disabled) {
      return;
    }

    this.receivedUserInput_ = true;

    const {target, type} = evt;
    const {TEXT_FIELD_ICON} = MDCTextfieldFoundation.cssClasses;
    const targetIsIcon = this.adapter_.eventTargetHasClass(target, TEXT_FIELD_ICON);
    const eventTriggersNotification = type === 'click' || evt.key === 'Enter' || evt.keyCode === 13;

    if (targetIsIcon && eventTriggersNotification) {
      this.adapter_.notifyIconAction();
    }
  }

  /**
   * Activates the text field focus state.
   * @private
   */
  activateFocus_() {
    this.adapter_.addClass(MDCTextfieldFoundation.cssClasses.FOCUSED);
    const bottomLine = this.adapter_.getBottomLineFoundation();
    if (bottomLine) {
      bottomLine.activateFocus();
    }
    this.adapter_.getLabelFoundation().floatLabel();
    const helpText = this.adapter_.getHelpTextFoundation();
    if (helpText){
      helpText.showHelptext();
    }
  }

  /**
   * Deactives the Textfield's focus state.
   * @private
   */
  deactivateFocus_() {
    const {FOCUSED} = MDCTextfieldFoundation.cssClasses;
    const input = this.adapter_.getInputFoundation();

    this.adapter_.removeClass(FOCUSED);
    const label = this.adapter_.getLabelFoundation();
    const hasValidInput = !input.getValue() && !input.isBadInput();
    label.deactivateFocus(hasValidInput);

    if (!this.useCustomValidityChecking_) {
      this.changeValidity_(input.checkValidity());
    }
  }

  /**
   * Updates the Textfield's valid state based on the supplied validity.
   * @param {boolean} isValid
   * @private
   */
  changeValidity_(isValid) {
    const {INVALID} = MDCTextfieldFoundation.cssClasses;
    this.adapter_.getLabelFoundation().changeValidity(isValid);
    if (isValid) {
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.addClass(INVALID);
    }
    const helpText = this.adapter_.getHelpTextFoundation();
    if (helpText){
      helpText.updateHelptext(isValid);
    }
  }

  /**
   * @param {boolean} disabled Sets the textfield disabled or enabled.
   */
  setDisabled(disabled) {
    const {DISABLED} = MDCTextfieldFoundation.cssClasses;
    this.adapter_.getInputFoundation().setDisabled(disabled);
    if (disabled) {
      this.adapter_.addClass(DISABLED);
      this.adapter_.setIconAttr('tabindex', '-1');
    } else {
      this.adapter_.removeClass(DISABLED);
      this.adapter_.setIconAttr('tabindex', '0');
    }
  }

  /**
   * @param {boolean} isValid Sets the validity state of the Textfield.
   */
  setValid(isValid) {
    this.useCustomValidityChecking_ = true;
    this.changeValidity_(isValid);
  }
}

export default MDCTextfieldFoundation;
