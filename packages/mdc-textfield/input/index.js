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

import MDCComponent from '@material/base/component';

import {MDCTextfieldInputAdapter} from './adapter';
import MDCTextfieldInputFoundation from './foundation';

/**
 * @extends {MDCComponent<!MDCTextfieldInputFoundation>}
 * @final
 */
class MDCTextfieldInput extends MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCTextfieldInput}
   */
  static attachTo(root) {
    return new MDCTextfieldInput(root);
  }

  /**
   * Initiliazes the Textfield's internal state based on the environment's
   * state.
   */
  initialSyncWithDom() {
    this.disabled = this.root_.disabled;
  }

  /**
   * @return {MDCTextfieldInputFoundation}.
   */
  get foundation() {
    return this.foundation_;
  }

  /**
   * @return {!MDCTextfieldFoundation}
   */
  getDefaultFoundation() {
    return new MDCTextfieldInputFoundation(/** @type {!MDCTextfieldInputAdapter} */ (Object.assign({
      registerInteractionHandler: (evtType, handler) => this.root_.addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType, handler) => this.root_.removeEventListener(evtType, handler),
      getNativeInput: () => this.root_,
      notifyFocusAction: () => this.emit(MDCTextfieldInputFoundation.strings.FOCUS_EVENT, {}),
      notifyBlurAction: () => this.emit(MDCTextfieldInputFoundation.strings.BLUR_EVENT, {}),
      notifyPressedAction: () => this.emit(MDCTextfieldInputFoundation.strings.PRESSED_EVENT, {})
    })));
  }
}

export {MDCTextfieldInput, MDCTextfieldInputFoundation};
