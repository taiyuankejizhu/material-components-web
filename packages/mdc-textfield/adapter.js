/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
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

import MDCTextfieldInputFoundation from './input/foundation';
import MDCTextfieldLabelFoundation from './label/foundation';

/**
 * Adapter for MDC Textfield.
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Textfield into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
class MDCTextfieldAdapter {
  /**
   * Adds a class to the root Element.
   * @param {string} className
   */
  addClass(className) {}

  /**
   * Removes a class from the root Element.
   * @param {string} className
   */
  removeClass(className) {}

  /**
   * Sets an attribute on the icon Element.
   * @param {string} name
   * @param {string} value
   */
  setIconAttr(name, value) {}

  /**
   * Returns true if classname exists for a given target element.
   * @param {?EventTarget} target
   * @param {string} className
   * @return {boolean}
   */
  eventTargetHasClass(target, className) {}

  /**
   * Registers an event handler on the root element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */
  registerTextFieldInteractionHandler(type, handler) {}

  /**
   * Deregisters an event handler on the root element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */
  deregisterTextFieldInteractionHandler(type, handler) {}

  /**
   * Emits a custom event "MDCTextfield:icon" denoting a user has clicked the icon.
   */
  notifyIconAction() {}

  /**
   * Adds a class to the bottom line element.
   * @param {string} className
   */
  addClassToBottomLine(className) {}

  /**
   * Removes a class from the bottom line element.
   * @param {string} className
   */
  removeClassFromBottomLine(className) {}

  /**
   * Adds a class to the help text element. Note that in our code we check for
   * whether or not we have a help text element and if we don't, we simply
   * return.
   * @param {string} className
   */
  addClassToHelptext(className) {}

  /**
   * Removes a class from the help text element.
   * @param {string} className
   */
  removeClassFromHelptext(className) {}

  /**
   * Returns whether or not the help text element contains the given class.
   * @param {string} className
   * @return {boolean}
   */
  helptextHasClass(className) {}

  /**
   * Registers an event listener on the native input element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  registerInputInteractionHandler(evtType, handler) {}

  /**
   * Deregisters an event listener on the native input element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  deregisterInputInteractionHandler(evtType, handler) {}

  /**
   * Registers an event listener on the bottom line element for a "transitionend" event.
   * @param {function(!Event): undefined} handler
   */
  registerTransitionEndHandler(handler) {}

  /**
   * Deregisters an event listener on the bottom line element for a "transitionend" event.
   * @param {function(!Event): undefined} handler
   */
  deregisterTransitionEndHandler(handler) {}

  /**
   * Sets an attribute with a given value on the bottom line element.
   * @param {string} attr
   * @param {string} value
   */
  setBottomLineAttr(attr, value) {}

  /**
   * Sets an attribute with a given value on the help text element.
   * @param {string} name
   * @param {string} value
   */
  setHelptextAttr(name, value) {}

  /**
   * Removes an attribute from the help text element.
   * @param {string} name
   */
  removeHelptextAttr(name) {}

  /** 
   * @return {MDCTextfieldInputFoundation}
   */
  getInputFoundation() {}

  /** 
   * @return {MDCTextfieldLabelFoundation}
   */
  getLabelFoundation() {}
}

export default MDCTextfieldAdapter;
