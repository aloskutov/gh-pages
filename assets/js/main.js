/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/modules/adjust-last-row.js"
/*!**************************************************!*\
  !*** ./src/assets/js/modules/adjust-last-row.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Класс скрывающий последнюю строку грида, если она не заполнена
 */
class AdjustLastRow {
  /** @private */
  _grid;

  /** @private */
  _items;

  /** @private */
  _resizeObserver;

  /**
   * Конструктор класса
   * @param {string} gridSelector - Селектор грида
   * @param {string} itemSelector - Селектор элементов грида
   */
  constructor(gridSelector, itemSelector) {
    this._grid = document.querySelector(gridSelector);
    this._items = this._grid ? this._grid.querySelectorAll(itemSelector) : [];
    this._resizeObserver = null;

    this.run();

    this._resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => this.run());
    });
    this._resizeObserver.observe(this._grid);
  }

  /**
   * Основной метод класса
   * @public
   */
  run() {
    this.resetStyle();
    this.hideRemainingItems();
  }

  /**
   * Получает количество колонок грида
   * @public
   * @returns {number|null} Количество колонок или null, если грид скрыт или не отрисован
   */
  getColumns() {
    const computedColumns = getComputedStyle(this._grid).gridTemplateColumns;
    return !computedColumns || computedColumns === null
      ? false
      : computedColumns.split(' ').length;
  }

  /**
   * Сбрасывает стили у скрытых элементов грида
   * @private
   */
  resetStyle() {
    this._items.forEach((item) => {
      item.style.display = '';
    });
  }

  /**
   * Скрывает элементы последней строки, если она неполная
   * @private
   */
  hideRemainingItems() {
    const columns = this.getColumns();

    if (columns) {
      const totalItems = this._items.length;
      const remainingItems = totalItems % columns;

      if (remainingItems > 0) {
        const startIndex = totalItems - remainingItems;
        for (let i = startIndex; i < totalItems; i++) {
          this._items[i].style.display = 'none';
        }
      }
    }
  }

  /**
   * Деструктор класса — отключает наблюдатель и освобождает ресурсы
   * @public
   */
  destroy() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdjustLastRow);


/***/ },

/***/ "./src/assets/js/modules/hamburger.js"
/*!********************************************!*\
  !*** ./src/assets/js/modules/hamburger.js ***!
  \********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Hamburger {
  /** @private */
  _button;
  /** @private */
  _menu;
  /** @private */
  _openLabel;
  /** @private */
  _closeLabel;
  /** @private */
  _handleClick;

  /**
   * Конструктор класса
   * @param {string} buttonSelector селектор кнопки
   * @param {string} menuSelector селектор меню
   * @param {object} options объект опций openLabel, closeLabel, scrollToTop
   */
  constructor(buttonSelector, menuSelector = '#top-menu', options = {}) {
    this._button = document.querySelector(buttonSelector);
    this._menu = document.querySelector(menuSelector);

    if (!this._button) throw new Error(`Button not found: ${buttonSelector}`);
    if (!this._menu) throw new Error(`Menu not found: ${menuSelector}`);

    this._openLabel = options.openLabel ?? 'Open menu';
    this._closeLabel = options.closeLabel ?? 'Close menu';
    this._scrollToTop = options.scrollToTop ?? false;

    this._init();

    this._handleClick = () => this._handleMenuToggle();
    this._button.addEventListener('click', () => this._handleMenuToggle());
  }

  /**
   * Установка базовых значений
   */
  _init() {
    if (!this._button.hasAttribute('aria-expanded')) {
      this._button.setAttribute('aria-expanded', 'false');
    }

    this._button.setAttribute('aria-controls', this._menu.id);
    this._button.setAttribute('aria-label', this._openLabel);
  }

  /**
   * Обработчик события клика по кнопке
   */
  _handleMenuToggle() {
    const isExpanded = this._button.getAttribute('aria-expanded') === 'true';

    this._button.setAttribute('aria-expanded', String(!isExpanded));
    this._button.setAttribute('aria-label', isExpanded ? this._openLabel : this._closeLabel);
    this._menu.setAttribute('aria-hidden', String(isExpanded));

    // При закрытии меню, прокручиваем его в начало
    if (isExpanded && this._scrollToTop) { this._menu.scrollTop = 0; }
  }

  /**
   * Деструктор класса
   */
  destroy() {
    this._button.removeEventListener('click', () => this._handleMenuToggle());
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hamburger);


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_adjust_last_row_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/adjust-last-row.js */ "./src/assets/js/modules/adjust-last-row.js");
/* harmony import */ var _modules_hamburger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/hamburger.js */ "./src/assets/js/modules/hamburger.js");



new _modules_adjust_last_row_js__WEBPACK_IMPORTED_MODULE_0__["default"]('.cards', '.cards__item');
new _modules_hamburger_js__WEBPACK_IMPORTED_MODULE_1__["default"]('.hamburger', '#side-menu', {
  openLabel: 'Open menu',
  closeLabel: 'Close menu',
  scrollToTop: true
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map