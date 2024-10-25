/*!
    * Bootstrap Pretty alert.js 0.2.2 (https://github.com/bootstrap-pretty/bootstrap-pretty#readme)
    * Based on Bootstrap 5.3.0-alpha1 (https://getbootstrap.com/docs/5.3/getting-started/introduction/)
    * Copyright 2011-2023 Bootstrap (https://getbootstrap.com)
    * Copyright 2024 Bootstrap Pretty (https://bootstrappretty.dev)
    * Original code licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    * Licensed under MIT (https://github.com/bootstrap-pretty/bootstrap-pretty/blob/master/LICENSE)
    */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('./util/index.js'), require('./dom/event-handler.js'), require('./base-component.js'), require('./util/component-functions.js')) :
  typeof define === 'function' && define.amd ? define(['./util/index', './dom/event-handler', './base-component', './util/component-functions'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Alert = factory(global.Index, global.EventHandler, global.BaseComponent, global.ComponentFunctions));
})(this, (function (index_js, EventHandler, BaseComponent, componentFunctions_js) { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.3.0-alpha1): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME = 'alert';
  const DATA_KEY = 'bs.alert';
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_CLOSE = `close${EVENT_KEY}`;
  const EVENT_CLOSED = `closed${EVENT_KEY}`;
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_SHOW = 'show';

  /**
   * Class definition
   */

  class Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME;
    }

    // Public
    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
      if (closeEvent.defaultPrevented) {
        return;
      }
      this._element.classList.remove(CLASS_NAME_SHOW);
      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE);
      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    }

    // Private
    _destroyElement() {
      this._element.remove();
      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
  }

  /**
   * Data API implementation
   */

  componentFunctions_js.enableDismissTrigger(Alert, 'close');

  /**
   * jQuery
   */

  index_js.defineJQueryPlugin(Alert);

  return Alert;

}));
//# sourceMappingURL=alert.js.map
