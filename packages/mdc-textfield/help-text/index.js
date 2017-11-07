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
import MDCTextfieldHelpTextAdapter from './adapter';
import MDCTextfieldHelpTextFoundation from './foundation';

/**
 * @extends {MDCComponent<!MDCTextfieldHelpTextFoundation>}
 * @final
 */
class MDCTextfieldHelpText extends MDCComponent {

  /**
   * @param {!Element} root
   * @return {!MDCTextfield}
   */
  static attachTo(root) {
    return new MDCTextfieldHelpText(root);
  }

  /**
   * @return {MDCTextfieldHelpTextFoundation} True if the Textfield is disabled.
   */
  get foundation() {
    return this.foundation_;
  }

  /**
   * @return {!MDCTextfieldHelpTextFoundation}
   */
  getDefaultFoundation() {
    return new MDCTextfieldHelpTextFoundation(/** @type {!MDCTextfieldHelpTextAdapter} */ (Object.assign({
      addClassToHelptext: (className) => this.root_.classList.add(className),
      removeClassFromHelptext: (className) => this.root_.classList.remove(className),
      helptextHasClass: (className) => this.root_.classList.contains(className),
      setHelptextAttr: (name, value) => this.root_.setAttribute(name, value),
      removeHelptextAttr: (name) => this.root_.removeAttribute(name),
    })));
  }
}

export {MDCTextfieldHelpText, MDCTextfieldBottomLineFoundation};
