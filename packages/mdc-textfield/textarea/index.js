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
import MDCTextareaAdapter from './adapter';
import MDCTextareaFoundation from './foundation';
import {MDCTextfieldInput} from '../input';
import {MDCTextfieldLabel} from '../label';

/**
 * @extends {MDCComponent<!MDCTextareaFoundation>}
 * @final
 */
class MDCTextarea extends MDCComponent {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);
    /** @private {?MDCTextfieldInput} */
    this.input_;
    /** @private {?MDCTextfieldLabel} */
    this.label_;
    /** @type {?MDCRipple} */
    this.ripple;
    /** @private {?Element} */
    this.icon_;
  }

  /**
   * @param {!Element} root
   * @return {!MDCTextarea}
   */
  static attachTo(root) {
    return new MDCTextarea(root);
  }

  /**
   * @param {!Element} root
   * @param {!MDCTextfieldInput} input
   * @param {!MDCTextfieldLabel} label
   * @param {?Element} icon
   * @return {!MDCTextareaAdapter}
   */
  static createAdapter(root, input, label, icon) {
    return /** @type {!MDCTextareaAdapter} */ {
      addClass: (className) => root.classList.add(className),
      removeClass: (className) => root.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      registerTextFieldInteractionHandler: (evtType, handler) => root.addEventListener(evtType, handler),
      deregisterTextFieldInteractionHandler: (evtType, handler) => root.removeEventListener(evtType, handler),
      notifyIconAction: () => this.emit(MDCTextareaFoundation.strings.ICON_EVENT, {}),
      registerInputInteractionHandler: (evtType, handler) => input.listen(evtType, handler),
      deregisterInputInteractionHandler: (evtType, handler) => input.listen(evtType, handler),
      getInputFoundation: () => input.foundation,
      getLabelFoundation: () => label.foundation,
      setIconAttr: (name, value) => {
        if (icon) {
          icon.setAttribute(name, value);
        }
      },
    };
  }

  /**
   * @param {(function(!Element): !MDCRipple)=} rippleFactory A function which
   * creates a new MDCRipple.
   */
  initialize(rippleFactory = (el) => new MDCRipple(el)) {
    this.input_ = new MDCTextfieldInput(this.getInputElement_());
    const labelElement = this.root_.querySelector(strings.LABEL_SELECTOR)
    this.label_ = new MDCTextfieldLabel(labelElement);
    this.ripple = null;
    if (this.root_.classList.contains(cssClasses.BOX)) {
      this.ripple = rippleFactory(this.root_);
    };
    if (!this.root_.classList.contains(cssClasses.TEXT_FIELD_ICON)) {
      this.icon_ = this.root_.querySelector(strings.ICON_SELECTOR);
    };
  }

  /**
   * @return {!Element}
   * @protected
   */
  getInputElement_() {
    return this.root_.querySelector(strings.INPUT_SELECTOR);
  }

  destroy() {
    if (this.input_) {
      this.input_.destroy();
    }
    if (this.label_) {
      this.label_.destroy();
    }
    if (this.ripple) {
      this.ripple.destroy();
    }
    super.destroy();
  }

  /**
   * @return {boolean} True if the Textfield is disabled.
   */
  get disabled() {
    return this.input_.foundation.isDisabled();
  }

  /**
   * @param {boolean} disabled Sets the Textfield disabled or enabled.
   */
  set disabled(disabled) {
    this.foundation_.setDisabled(disabled);
  }

  /**
   * @param {boolean} valid Sets the Textfield valid or invalid.
   */
  set valid(valid) {
    this.foundation_.setValid(valid);
  }

  /**
   * @return {!MDCTextareaFoundation}
   */
  getDefaultFoundation() {
    return new MDCTextareaFoundation(MDCTextarea.createAdapter(this.root_, this.input_, this.label_, this.icon_));
  }
}

export {MDCTextarea, MDCTextareaFoundation};
