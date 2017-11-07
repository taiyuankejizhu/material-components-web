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
import MDCTextfieldAdapter from './adapter';
import MDCTextfieldFoundation from './foundation';
import {MDCTextfieldInput, MDCTextfieldInputFoundation} from './input';

/**
 * @extends {MDCComponent<!MDCTextfieldFoundation>}
 * @final
 */
class MDCTextfield extends MDCComponent {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);
    /** @private {?MDCTextfieldInput} */
    this.input_;
    /** @private {?Element} */
    this.label_;
    /** @type {?Element} */
    this.helptextElement;
    /** @type {?MDCRipple} */
    this.ripple;
    /** @private {?Element} */
    this.bottomLine_;
    /** @private {?Element} */
    this.icon_;
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
    const inputElement = this.root_.querySelector(strings.INPUT_SELECTOR);
    this.input_ = new MDCTextfieldInput(inputElement);
    this.label_ = this.root_.querySelector(strings.LABEL_SELECTOR);
    this.helptextElement = null;
    this.ripple = null;
    if (inputElement.hasAttribute('aria-controls')) {
      this.helptextElement = document.getElementById(inputElement.getAttribute('aria-controls'));
    }
    if (this.root_.classList.contains(cssClasses.BOX)) {
      this.ripple = rippleFactory(this.root_);
    };
    if (!this.root_.classList.contains(cssClasses.TEXTAREA)) {
      this.bottomLine_ = this.root_.querySelector(strings.BOTTOM_LINE_SELECTOR);
    };
    if (!this.root_.classList.contains(cssClasses.TEXT_FIELD_ICON)) {
      this.icon_ = this.root_.querySelector(strings.ICON_SELECTOR);
    };
  }

  destroy() {
    if (this.input_) {
      this.input_.destroy();
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
   * @return {!MDCTextfieldFoundation}
   */
  getDefaultFoundation() {
    return new MDCTextfieldFoundation(/** @type {!MDCTextfieldAdapter} */ (Object.assign({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      addClassToLabel: (className) => {
        const label = this.label_;
        if (label) {
          label.classList.add(className);
        }
      },
      removeClassFromLabel: (className) => {
        const label = this.label_;
        if (label) {
          label.classList.remove(className);
        }
      },
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      registerTextFieldInteractionHandler: (evtType, handler) => this.root_.addEventListener(evtType, handler),
      deregisterTextFieldInteractionHandler: (evtType, handler) => this.root_.removeEventListener(evtType, handler),
      notifyIconAction: () => this.emit(MDCTextfieldFoundation.strings.ICON_EVENT, {}),
      registerInputInteractionHandler: (evtType, handler) => this.input_.listen(evtType, handler),
      deregisterInputInteractionHandler: (evtType, handler) => this.input_.listen(evtType, handler),
      getInputFoundation: () => this.input_.foundation,
    },
    this.getHelptextAdapterMethods_(),
    this.getBottomLineAdapterMethods_(),
    this.getIconAdapterMethods_())));
  }

  /**
   * @return {!{
   *   setIconAttr: function(string, string): undefined,
   * }}
   */
  getIconAdapterMethods_() {
    return {
      setIconAttr: (name, value) => {
        if (this.icon_) {
          this.icon_.setAttribute(name, value);
        }
      },
    };
  }

  /**
   * @return {!{
   *   addClassToBottomLine: function(string): undefined,
   *   removeClassFromBottomLine: function(string): undefined,
   *   setBottomLineAttr: function(string, string): undefined,
   *   registerTransitionEndHandler: function(function()): undefined,
   *   deregisterTransitionEndHandler: function(function()): undefined,
   * }}
   */
  getBottomLineAdapterMethods_() {
    return {
      addClassToBottomLine: (className) => {
        if (this.bottomLine_) {
          this.bottomLine_.classList.add(className);
        }
      },
      removeClassFromBottomLine: (className) => {
        if (this.bottomLine_) {
          this.bottomLine_.classList.remove(className);
        }
      },
      setBottomLineAttr: (attr, value) => {
        if (this.bottomLine_) {
          this.bottomLine_.setAttribute(attr, value);
        }
      },
      registerTransitionEndHandler: (handler) => {
        if (this.bottomLine_) {
          this.bottomLine_.addEventListener('transitionend', handler);
        }
      },
      deregisterTransitionEndHandler: (handler) => {
        if (this.bottomLine_) {
          this.bottomLine_.removeEventListener('transitionend', handler);
        }
      },
    };
  }

  /**
   * @return {!{
   *   addClassToHelptext: function(string): undefined,
   *   removeClassFromHelptext: function(string): undefined,
   *   helptextHasClass: function(string): boolean,
   *   setHelptextAttr: function(string, string): undefined,
   *   removeHelptextAttr: function(string): undefined,
   * }}
   */
  getHelptextAdapterMethods_() {
    return {
      addClassToHelptext: (className) => {
        if (this.helptextElement) {
          this.helptextElement.classList.add(className);
        }
      },
      removeClassFromHelptext: (className) => {
        if (this.helptextElement) {
          this.helptextElement.classList.remove(className);
        }
      },
      helptextHasClass: (className) => {
        if (!this.helptextElement) {
          return false;
        }
        return this.helptextElement.classList.contains(className);
      },
      setHelptextAttr: (name, value) => {
        if (this.helptextElement) {
          this.helptextElement.setAttribute(name, value);
        }
      },
      removeHelptextAttr: (name) => {
        if (this.helptextElement) {
          this.helptextElement.removeAttribute(name);
        }
      },
    };
  }
}

export {MDCTextfield, MDCTextfieldFoundation};
