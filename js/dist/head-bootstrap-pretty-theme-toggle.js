/*!
    * Bootstrap Pretty head-bootstrap-pretty-theme-toggle.js 0.2.2 (https://github.com/bootstrap-pretty/bootstrap-pretty#readme)
    * Based on Bootstrap 5.3.0-alpha1 (https://getbootstrap.com/docs/5.3/getting-started/introduction/)
    * Copyright 2011-2023 Bootstrap (https://getbootstrap.com)
    * Copyright 2024 Bootstrap Pretty (https://bootstrappretty.dev)
    * Original code licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    * Licensed under MIT (https://github.com/bootstrap-pretty/bootstrap-pretty/blob/master/LICENSE)
    */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.HeadBootstrapPrettyThemeToggle = factory());
})(this, (function () { 'use strict';

    /**
     * --------------------------------------------------------------------------
     * Bootstrap Pretty (0.2.2): head-bootstrap-pretty-theme-toggle.js
     * Licensed under Apache-2.0 (https://github.com/bootstrap-pretty/bootstrap-pretty/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    const showActiveTheme = theme => {
      const activeThemeIcon = document.querySelector('.theme-icon-active');
      const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
      const svgOfActiveBtn = btnToActive.querySelector('svg');
      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active');
        element.querySelector('svg:nth-of-type(2)').classList.add('d-none');
      });
      btnToActive.classList.add('active');
      btnToActive.querySelector('svg:nth-of-type(2)').classList.remove('d-none');
      activeThemeIcon.outerHTML = svgOfActiveBtn.outerHTML;
      document.querySelector('#bp-theme-dropdown svg').classList.add('theme-icon-active');
    };
    const themeDropdown = () => {
      const storedTheme = localStorage.getItem('theme');
      const getPreferredTheme = () => {
        if (storedTheme) {
          return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };
      const setTheme = theme => {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-bs-theme', theme);
        }
      };
      setTheme(getPreferredTheme());
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (storedTheme !== 'light' || storedTheme !== 'dark') {
          setTheme(getPreferredTheme());
        }
      });
      window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme());
        document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
          toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value');
            localStorage.setItem('theme', theme);
            setTheme(theme);
            showActiveTheme(theme);
          });
        });
      });
    };
    themeDropdown();

    return themeDropdown;

}));
//# sourceMappingURL=head-bootstrap-pretty-theme-toggle.js.map
