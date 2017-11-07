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
import MDCTextfieldHelpTextAdapter from './adapter';
import {cssClasses, strings} from './constants';


/**
 * @extends {MDCFoundation<!MDCTextfieldHelpTextAdapter>}
 * @final
 */
class MDCTextfieldHelpTextFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses;
  }

  /** @return enum {string} */
  static get strings() {
    return strings;
  }

  /**
   * {@see MDCTextfieldHelpTextAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextfieldHelpTextAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCTextfieldHelpTextAdapter} */ ({
      addClassToHelptext: () => {},
      removeClassFromHelptext: () => {},
      helptextHasClass: () => false,
      setHelptextAttr: () => {},
      removeHelptextAttr: () => {},
    });
  }

  /**
   * @param {!MDCTextfieldHelpTextAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCTextfieldHelpTextAdapter} */ ({})) {
    super(Object.assign(MDCTextfieldHelpTextFoundation.defaultAdapter, adapter));
  }
  
  /**
   * Makes the help text visible to screen readers.
   * @private
   */
  showHelptext() {
    this.adapter_.removeHelptextAttr(strings.ARIA_HIDDEN);
  }

  /**
   * Updates the state of the Textfield's help text based on validity and
   * the Textfield's options.
   * @param {boolean} isValid
   */
  updateHelptext(isValid) {
    const helptextIsPersistent = this.adapter_.helptextHasClass(cssClasses.HELPTEXT_PERSISTENT);
    const helptextIsValidationMsg = this.adapter_.helptextHasClass(cssClasses.HELPTEXT_VALIDATION_MSG);
    const validationMsgNeedsDisplay = helptextIsValidationMsg && !isValid;

    if (validationMsgNeedsDisplay) {
      this.adapter_.setHelptextAttr(strings.ROLE, 'alert');
    } else {
      this.adapter_.removeHelptextAttr(strings.ROLE);
    }

    if (helptextIsPersistent || validationMsgNeedsDisplay) {
      return;
    }
    this.hideHelptext_();
  }

  /**
   * Hides the help text from screen readers.
   * @private
   */
  hideHelptext_() {
    this.adapter_.setHelptextAttr(strings.ARIA_HIDDEN, 'true');
  }
}

export default MDCTextfieldHelpTextFoundation;
