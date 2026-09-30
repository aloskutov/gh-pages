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
  #grid;
  #items;
  #resizeObserver;

  /**
   * Конструктор класса
   * @param {string} gridSelector - Селектор грида
   * @param {string} itemSelector - Селектор элементов грида
   */
  constructor(gridSelector, itemSelector) {
    this.#grid = document.querySelector(gridSelector);

    if (!this.#grid) throw new Error(`Grid not found: ${gridSelector}`);

    this.#items = Array.from(this.#grid.querySelectorAll(itemSelector));
    this.#resizeObserver = null;

    this.#resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => this.#run());
    });
    this.#resizeObserver.observe(this.#grid);
  }

  /**
   * Основной метод класса
   */
  #run() {
    this.#resetStyle();
    this.#hideRemainingItems();
  }

  /**
   * Получает количество колонок грида
   * @returns {number} Количество колонок. 0 если грид скрыт или не отрисован
   */
  #getColumns() {
    const computedColumns = getComputedStyle(this.#grid).gridTemplateColumns;
    return !computedColumns || computedColumns === 'none'
      ? 0
      : computedColumns.split(' ').length;
  }

  /**
   * Сбрасывает стили у скрытых элементов грида
   */
  #resetStyle() {
    for (const item of this.#items) {
      item.style.display = '';
    }
  }

  /**
   * Скрывает элементы последней строки, если она неполная
   */
  #hideRemainingItems() {
    const columns = this.#getColumns();

    if (columns > 0) {
      const totalItems = this.#items.length;
      const remainingItems = totalItems % columns;

      if (remainingItems > 0) {
        this.#items.slice(-remainingItems).forEach((item) => {
          item.style.display = 'none';
        });
      }
    }
  }

  /**
   * Деструктор класса — отключает наблюдатель и освобождает ресурсы
   */
  destroy() {
    if (!this.#resizeObserver) return;

    this.#resizeObserver.disconnect();
    this.#resizeObserver = null;
    this.#resetStyle();
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
/**
 * Класс управления боковым меню через кнопку-бургер
 */
class Hamburger {
  #button;
  #menu;
  #openLabel;
  #closeLabel;
  #scrollToTop;
  #handleClick;
  #handleKeydown;
  #desktopQuery;
  #handleDesktopChange;

  static DEFAULT_MENU_SELECTOR = '#side-menu';
  static DESKTOP_BREAKPOINT = '(min-width: 1024px)';

  /**
   * Конструктор класса
   * @param {string} buttonSelector — селектор кнопки
   * @param {string} menuSelector — селектор меню
   * @param {object} options — опции: openLabel, closeLabel, scrollToTop
   */
  constructor(
    buttonSelector,
    menuSelector = Hamburger.DEFAULT_MENU_SELECTOR,
    options = {}
  ) {
    this.#button = document.querySelector(buttonSelector);
    this.#menu = document.querySelector(menuSelector);

    if (!this.#button) throw new Error(`Button not found: ${buttonSelector}`);
    if (!this.#menu) throw new Error(`Menu not found: ${menuSelector}`);

    this.#openLabel = options.openLabel ?? 'Open menu';
    this.#closeLabel = options.closeLabel ?? 'Close menu';
    this.#scrollToTop = options.scrollToTop ?? false;

    this.#init();

    this.#desktopQuery = window.matchMedia(Hamburger.DESKTOP_BREAKPOINT);
    this.#handleDesktopChange = (event) => {
      if (event.matches) {
        this.#enableMenu();
      } else if (!this.#isOpen()) {
        this.#disableMenu();
      }
    };

    this.#desktopQuery.addEventListener('change', this.#handleDesktopChange);
    this.#handleDesktopChange(this.#desktopQuery);

    this.#handleClick = () => this.#toggle();
    this.#handleKeydown = (event) => {
      if (event.key === 'Escape' && this.#isOpen()) {
        this.#close();
        this.#button.focus();
      }
    };

    this.#button.addEventListener('click', this.#handleClick);
  }

  /**
   * Установка базовых атрибутов
   */
  #init() {
    if (!this.#button.hasAttribute('aria-expanded')) {
      this.#button.setAttribute('aria-expanded', 'false');
    }

    this.#button.setAttribute('aria-controls', this.#menu.id);
    this.#button.setAttribute('aria-label', this.#openLabel);
  }

  /**
   * Проверяем открыто ли меню
   * @returns {boolean} true, если открыто
   */
  #isOpen() {
    return this.#button.getAttribute('aria-expanded') === 'true';
  }

  /**
   * Делает меню доступным для скринридера и Tab
   */
  #enableMenu() {
    this.#menu.removeAttribute('aria-hidden');
    this.#menu.removeAttribute('inert');
  }

  /**
   * Скрывает меню от скринридера и исключает из Tab
   */
  #disableMenu() {
    this.#menu.setAttribute('aria-hidden', 'true');
    this.#menu.setAttribute('inert', '');
  }

  /**
   * Открывает меню
   */
  #open() {
    this.#button.setAttribute('aria-expanded', 'true');
    this.#button.setAttribute('aria-label', this.#closeLabel);
    if (!this.#desktopQuery.matches) {
      this.#enableMenu();
    }
    document.addEventListener('keydown', this.#handleKeydown);
  }

  /**
   * Закрывает меню
   */
  #close() {
    this.#button.setAttribute('aria-expanded', 'false');
    this.#button.setAttribute('aria-label', this.#openLabel);

    if (!this.#desktopQuery.matches) {
      this.#disableMenu();
    }

    document.removeEventListener('keydown', this.#handleKeydown);

    if (this.#scrollToTop) {
      this.#menu.scrollTop = 0;
    }
  }

  /**
   * Переключает состояние меню
   */
  #toggle() {
    this.#isOpen() ? this.#close() : this.#open();
  }

  /**
   * Деструктор класса — отключает обработчики и освобождает ресурсы
   */
  destroy() {
    this.#button.removeEventListener('click', this.#handleClick);
    document.removeEventListener('keydown', this.#handleKeydown);
    this.#desktopQuery.removeEventListener('change', this.#handleDesktopChange);
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