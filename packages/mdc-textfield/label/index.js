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
import {MDCRipple} from '@material/ripple';

import {cssClasses, strings} from './constants';
import MDCTextfieldLabelAdapter from './adapter';
import MDCTextfieldLabelFoundation from './foundation';

/**
 * @extends {MDCComponent<!MDCTextfieldLabelFoundation>}
 * @final
 */
class MDCTextfieldLabel extends MDCComponent {

  /**
   * @param {!Element} root
   * @return {!MDCTextfieldLabel}
   */
  static attachTo(root) {
    return new MDCTextfieldLabel(root);
  }

  /**
   * @return {MDCTextfieldLabelFoundation}.
   */
  get foundation() {
    return this.foundation_;
  }

  /**
   * @return {!MDCTextfieldLabelFoundation}
   */
  getDefaultFoundation() {
    return new MDCTextfieldLabelFoundation(/** @type {!MDCTextfieldLabelAdapter} */ (Object.assign({
      addClassToLabel: (className) => this.root_.classList.add(className),
      removeClassFromLabel: (className) => this.root_.classList.remove(className),
    })));
  }
}

export {MDCTextfieldLabel, MDCTextfieldLabelFoundation};
