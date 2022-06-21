/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/components/cards.js":
/*!************************************!*\
  !*** ./public/components/cards.js ***!
  \************************************/
/***/ (() => {

eval("const product = Vue.component('product', {\r\n    data() {\r\n        return {\r\n            notSelected: 'Сказочное заморское яство',\r\n            selected: 'Котэ не одобряет?'\r\n        }\r\n    },\r\n    props: ['product'],\r\n    methods: {\r\n        checkDeclination(number, txt, cases = [2, 0, 1, 1, 1, 2]) {\r\n            return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]] \r\n        },\r\n        chooseProduct(product) {\r\n            product.isSelected = !product.isSelected;\r\n            if (product.isSelected === false) {\r\n                this.originalText(product);\r\n            }\r\n        },\r\n        changeText(product) {\r\n            if (!!product.isSelected) {\r\n                product.title = this.selected;\r\n            }\r\n        },\r\n        originalText(product) {\r\n            product.title = this.notSelected;\r\n        }\r\n    },\r\n    template: `\r\n        <div \r\n            class=\"card-block\"\r\n        >\r\n            <button \r\n                class=\"card-block__button-field\" \r\n                @click=\"chooseProduct(product)\" \r\n                :disabled='!product.inStock'\r\n            >\r\n                <div \r\n                    v-bind:class=\"['card-border', { active: !!product.isSelected }, { 'card-border-mask': !product.inStock } ]\" \r\n                >            \r\n                    <div\r\n                        v-bind:class=\"[!product.inStock ? 'card-mask' : '','card']\"\r\n                        v-on:mouseover=\"(event) => changeText(product)\"\r\n                        v-on:mouseleave=\"() => originalText(product)\"\r\n                    >\r\n                        <div class=\"card-text\">\r\n                            <p \r\n                                v-if=\"product.title == this.notSelected\"\r\n                                class=\"card-text__title\"\r\n                            >\r\n                                {{ product.title }}\r\n                            </p>\r\n                            <p \r\n                                v-else=\"product.title == this.selected\"\r\n                                class=\"card-text__title card-text__title-hovered\"\r\n                            >\r\n                                {{ product.title }}\r\n                            </p>\r\n                            <h2 class=\"card-text__brand\">Нямушка</h2>\r\n                            <h3 class=\"card-text__taste\">{{ product.taste }}</h3>\r\n                            <p class=\"card-text__detail\">\r\n                                <span>{{ product.portions }}</span> {{ checkDeclination(product.portions, ['порция', 'порции', 'порций']) }}\r\n                            </p>\r\n                            <p \r\n                                v-if=\"product.gift > 0\" \r\n                                class=\"card-text__detail\"\r\n                            >\r\n                                <span v-if=\"product.gift > 1\">\r\n                                    {{ product.gift }}\r\n                                </span>\r\n                                <span v-else=\"product.gift = 1\"></span>\r\n                                <span>{{ checkDeclination(product.gift, ['мышь', 'мыши', 'мышей']) }}</span> в подарок\r\n                            </p>\r\n                            <p \r\n                                v-if=\"product.weight >= 5\" \r\n                                class=\"card-text__detail\"\r\n                            >\r\n                                заказчик доволен\r\n                            </p>\r\n                        </div>\r\n                        <div v-bind:class=\"['card-weight', { active: !!product.isSelected }, { 'card-weight-mask': !product.inStock }]\">\r\n                            <svg viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                                <circle cx=\"40\" cy=\"40\" r=\"40\"/>\r\n                            </svg>\r\n                            <div class=\"card-weight__text\">\r\n                                <p class=\"card-weight__text-value\">{{ product.weight }}</p>\r\n                                <p class=\"card-weight__text-measure\">кг</p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </button>\r\n            <p v-if=\"!!product.inStock && !product.isSelected\"\r\n                class=\"card-block__text\"\r\n            >\r\n                Чего сидишь? Порадуй котэ, \r\n                <button \r\n                    class=\"card-block__button\" \r\n                    @click=\"chooseProduct(product)\"\r\n                    :disabled='!product.inStock'\r\n                >\r\n                    купи\r\n                </button><span>.</span>\r\n            </p>\r\n            <p v-if=\"!!product.inStock && !!product.isSelected\"\r\n                class=\"card-block__text\"\r\n            >\r\n                {{ product.description }}\r\n            </p>\r\n            <p v-if=\"!product.inStock\"\r\n                class=\"card-block__text card-block__text-notInStock\"\r\n            >\r\n                Печалька, {{ product.taste }} закончился.\r\n            </p>\r\n        </div>\r\n    `\r\n})\r\nconst cards = Vue.component('cards', {\r\n    components: { product },\r\n    data () {\r\n        return {\r\n            products: [],\r\n        }\r\n    },\r\n    mounted () {\r\n        this.$parent.getJson('../public/DB/getProducts.json')\r\n           .then(data => {\r\n               for(let el of data){\r\n                   this.products.push(el);\r\n               }\r\n           });\r\n    },\r\n    template: `\r\n                <div>\r\n                    <section class=\"container\">\r\n                        <h1>Ты сегодня покормил кота?</h1>\r\n                        <product \r\n                            v-for=\"product of products\" \r\n                            :key=\"product.id_product\"\r\n                            :product=\"product\"\r\n                        >\r\n                        </product>\r\n                    </section>\r\n                </div>\r\n    `\r\n})\n\n//# sourceURL=webpack://funbox/./public/components/cards.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ (() => {

eval("const app = new Vue({\r\n    el: '#app',\r\n    data: {},\r\n    components: { cards },\r\n    methods: {\r\n        async getJson(url) {\r\n            try {\r\n                const result = await fetch(url);\r\n                return await result.json();\r\n            } catch (error) {\r\n                console.log(error);\r\n            }\r\n        },\r\n    },\r\n})\n\n//# sourceURL=webpack://funbox/./public/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/js/main.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/components/cards.js"]();
/******/ 	
/******/ })()
;