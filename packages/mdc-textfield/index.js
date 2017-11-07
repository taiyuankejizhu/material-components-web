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
import {MDCTextarea} from './textarea';
import {MDCRipple} from '@material/ripple';

import {strings} from './constants';
import MDCTextfieldAdapter from './adapter';
import MDCTextfieldFoundation from './foundation';
import MDCTextareaFoundation from './textarea/foundation';
import {MDCTextfieldInput} from './input';
import {MDCTextfieldLabel} from './label';
import {MDCTextfieldBottomLine} from './bottom-line';
import {MDCTextfieldHelpText} from './help-text';

/**
 * @extends {MDCComponent<!MDCTextfieldFoundation>}
 * @final
 */
class MDCTextfield extends MDCTextarea {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);
    /** @type {?MDCTextfieldHelpText} */
    this.helpText_;
    /** @private {?MDCTextfieldBottomLine} */
    this.bottomLine_;
  }

  /**
   * @param {!Element} root
   * @return {!MDCTextfield}
   */
  static attachTo(root) {
    return new MDCTextfield(root);
  }

  /**
   * @param {(function(!Element): !MDCRipple)=} rippleFactory A function which
   * creates a new MDCRipple.
   */
  initialize(rippleFactory = (el) => new MDCRipple(el)) {
    super.initialize(rippleFactory);
    const inputElement = this.getInputElement_();
    if (inputElement.hasAttribute('aria-controls')) {
      const helpTextElement = document.getElementById(inputElement.getAttribute('aria-controls'));
      if (helpTextElement) {
        this.helpText_ = new MDCTextfieldHelpText(helpTextElement);
      }
    }
    if (!this.root_.classList.contains(MDCTextareaFoundation.cssClasses.TEXTAREA)) {
      const bottomLinElement = this.root_.querySelector(strings.BOTTOM_LINE_SELECTOR);
      this.bottomLine_ = new MDCTextfieldBottomLine(bottomLinElement);
    };
  }

  destroy() {
    if (this.bottomLine_) {
      this.bottomLine_.destroy();
    }
    if (this.helpText_) {
      this.helpText_.destroy();
    }
    super.destroy();
  }

  /**
   * @return {!MDCTextfieldFoundation}
   */
  getDefaultFoundation() {
    return new MDCTextfieldFoundation(/** @type {!MDCTextfieldAdapter} */ Object.assign(
      MDCTextarea.createAdapter(this.root_, this.input_, this.label_, this.icon_),
      {getBottomLineFoundation: () => {
        if (this.bottomLine_) {
          return this.bottomLine_.foundation;
        }
        return null;
      },
      getHelpTextFoundation: () => {
        if (this.helpText_) {
          return this.helpText_.foundation;
        }
        return null;
        }
      }
      ));
  }
}

export {MDCTextfield, MDCTextfieldFoundation, MDCTextarea, MDCTextareaFoundation};
