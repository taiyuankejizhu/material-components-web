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
import MDCTextareaFoundation from './textarea/foundation';
import MDCTextareaAdapter from './textarea/adapter';
import MDCTextfieldAdapter from './adapter';
import {strings} from './constants';
import MDCTextfieldInputFoundation from './input/foundation';
import MDCTextfieldLabelFoundation from './label/foundation';
import MDCTextfieldBottomLineFoundation from './bottom-line/foundation';
import MDCTextfieldHelpTextFoundation from './help-text/foundation';


/**
 * @extends {MDCFoundation<!MDCTextfieldAdapter>}
 * @final
 */
class MDCTextfieldFoundation extends MDCTextareaFoundation {
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
    return /** @type {!MDCTextfieldAdapter} */ Object.assign(MDCTextareaFoundation.defaultAdapter, {
      getBottomLineFoundation: () => {},
      getHelpTextFoundation: () => {},
    });
  }

  /**
   * @param {!MDCTextfieldAdapter=} adapter
   */
  constructor(adapter = /** @type {!MDCTextfieldAdapter} */ ({})) {
    super(Object.assign(MDCTextfieldFoundation.defaultAdapter, adapter));

    /** @private {function(!Event): undefined} */
    this.setPointerXOffset_ = (evt) => {
      const bottomLine = this.adapter_.getBottomLineFoundation();
      if (bottomLine) {
        bottomLine.setBottomLineTransformOrigin(evt);
      }
    }
  }

  /**
   * Activates the text field focus state.
   * @private
   */
  activateFocus_() {
    super.activateFocus_();
    const bottomLine = this.adapter_.getBottomLineFoundation();
    if (bottomLine) {
      bottomLine.activateFocus();
    }
    const helpText = this.adapter_.getHelpTextFoundation();
    if (helpText){
      helpText.showHelptext();
    }
  }

  /**
   * Updates the Textfield's valid state based on the supplied validity.
   * @param {boolean} isValid
   * @private
   */
  changeValidity_(isValid) {
    super.changeValidity_();
    const helpText = this.adapter_.getHelpTextFoundation();
    if (helpText){
      helpText.updateHelptext(isValid);
    }
  }
}

export default MDCTextfieldFoundation;
