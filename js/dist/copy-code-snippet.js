/*!
    * Bootstrap Pretty copy-code-snippet.js 0.2.2 (https://github.com/bootstrap-pretty/bootstrap-pretty#readme)
    * Based on Bootstrap 5.3.0-alpha1 (https://getbootstrap.com/docs/5.3/getting-started/introduction/)
    * Copyright 2011-2023 Bootstrap (https://getbootstrap.com)
    * Copyright 2024 Bootstrap Pretty (https://bootstrappretty.dev)
    * Original code licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    * Licensed under MIT (https://github.com/bootstrap-pretty/bootstrap-pretty/blob/master/LICENSE)
    */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('clipboard'), require('./bootstrap/tooltip.js')) :
    typeof define === 'function' && define.amd ? define(['clipboard', './bootstrap/tooltip'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.CopyCodeSnippet = factory(global.clipboard, global.Tooltip));
})(this, (function (ClipboardJS, Tooltip) { 'use strict';

    /**
     * --------------------------------------------------------------------------
     * Bootstrap Pretty (0.2.2): copy-code-snippet.js
     * Licensed under Apache-2.0 (https://github.com/bootstrap-pretty/bootstrap-pretty/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    const copyCodeSnippet = () => {
      const copyCodeSnippetTrigger = new ClipboardJS('.bp-copy-code-snippet-trigger');
      copyCodeSnippetTrigger.on('success', e => {
        const tooltip = Tooltip.getOrCreateInstance(e.trigger);
        e.clearSelection();
        tooltip.setContent({
          '.tooltip-inner': 'Copied!'
        });
        setTimeout(() => {
          tooltip.hide();
          tooltip.setContent({
            '.tooltip-inner': 'Copy'
          });
        }, 2000);
      });
    };
    copyCodeSnippet();

    return copyCodeSnippet;

}));
//# sourceMappingURL=copy-code-snippet.js.map
