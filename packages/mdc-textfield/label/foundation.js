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
import MDCTextfieldLabelAdapter from './adapter';
import {cssClasses} from './constants';


/**
 * @extends {MDCFoundation<!MDCTextfieldLabelAdapter>}
 * @final
 */
class MDCTextfieldLabelFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses;
  }

  /**
   * {@see MDCTextfieldLabelAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTextfieldLabelAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCTextfieldLabelAdapter} */ ({
      addClassToLabel: () => {},
      removeClassFromLabel: () => {},
    });
  }

  /**
   * @param {!MDCTextfieldLabelAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCTextfieldLabelAdapter} */ ({})) {
    super(Object.assign(MDCTextfieldLabelFoundation.defaultAdapter, adapter));
  }

  floatLabel() {
    this.adapter_.addClassToLabel(cssClasses.LABEL_FLOAT_ABOVE);
    this.adapter_.removeClassFromLabel(cssClasses.LABEL_SHAKE);
  }

  /**
   * Deactives the Textfield's focus state.
   * @param {boolean} hasValidInput
   */
  deactivateFocus(hasValidInput) {
    this.adapter_.removeClassFromLabel(cssClasses.LABEL_SHAKE);

    if (hasValidInput) {
      this.adapter_.removeClassFromLabel(cssClasses.LABEL_FLOAT_ABOVE);
    }
  }

  /**
   * Updates the Textfield's valid state based on the supplied validity.
   * @param {boolean} isValid
   */
  changeValidity(isValid) {
    if (!isValid) {
      this.adapter_.addClassToLabel(cssClasses.LABEL_SHAKE);
    }
  }
}

export default MDCTextfieldLabelFoundation;
