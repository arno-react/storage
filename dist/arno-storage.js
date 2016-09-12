(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Arno"] = factory();
	else
		root["Arno"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _LocalStorage = __webpack_require__(3);

	var _LocalStorage2 = _interopRequireDefault(_LocalStorage);

	var _Cookie = __webpack_require__(2);

	var _Cookie2 = _interopRequireDefault(_Cookie);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Storage = function () {
	    function Storage(name) {
	        _classCallCheck(this, Storage);

	        //构造函数
	        if (name == 'cookie') {
	            this.Mode = new _Cookie2.default();
	        } else {
	            this.Mode = new _LocalStorage2.default();
	        }
	    }

	    _createClass(Storage, [{
	        key: 'get',
	        value: function get(key) {
	            return this.Mode.get(key);
	        }
	    }, {
	        key: 'put',
	        value: function put(key, value, expires) {
	            this.Mode.put(key, value, expires);
	        }
	    }, {
	        key: 'remove',
	        value: function remove(key) {

	            this.Mode.remove(key);
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {

	            this.Mode.clear();
	        }
	    }, {
	        key: 'expires',
	        value: function expires(key, seconds) {

	            this.Mode.expires(key, seconds);
	        }
	    }]);

	    return Storage;
	}();

	exports.default = Storage;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StorageParent = function () {
	    function StorageParent() {//构造函数

	        _classCallCheck(this, StorageParent);
	    }

	    _createClass(StorageParent, [{
	        key: "isExpires",
	        value: function isExpires(expires) {
	            var now = +new Date();

	            if (!expires) {
	                return false;
	            }

	            if (now > parseInt(expires, 10)) {
	                return true;
	            }

	            return false;
	        }
	    }, {
	        key: "parse",
	        value: function parse(value) {
	            try {
	                value = JSON.parse(value);
	            } catch (err) {
	                return value;
	            }
	            return value;
	        }
	    }, {
	        key: "stringify",
	        value: function stringify(value) {
	            return JSON.stringify(value);
	        }
	    }]);

	    return StorageParent;
	}();

	exports.default = StorageParent;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _StorageParent2 = __webpack_require__(1);

	var _StorageParent3 = _interopRequireDefault(_StorageParent2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Cookie = function (_StorageParent) {
	    _inherits(Cookie, _StorageParent);

	    function Cookie() {
	        _classCallCheck(this, Cookie);

	        var _this = _possibleConstructorReturn(this, (Cookie.__proto__ || Object.getPrototypeOf(Cookie)).call(this)); //构造函数


	        _this.regStorageKey = /^cookie\_\_\_(.*)$/;
	        _this.get = _this.getItem;
	        _this.put = _this.setItem;
	        _this.remove = _this.removeItem;
	        _this.initCheck();
	        return _this;
	    }

	    _createClass(Cookie, [{
	        key: 'namespace',
	        value: function namespace(key) {
	            return 'cookie___' + key;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            var _this2 = this;

	            var cookies = document.cookie.split(';');
	            cookies.forEach(function (value) {
	                var key = value.split('=')[0];
	                if (_this2.regStorageKey.test(key)) {
	                    _this2.remove(key);
	                }
	            });
	            return this;
	        }
	    }, {
	        key: 'removeItem',
	        value: function removeItem(key) {

	            var exp = new Date();
	            exp.setTime(exp.getTime() - 1000);
	            var cval = this.getCookie(key);
	            if (cval) {
	                document.cookie = this.namespace(key) + '=' + cval + ';expires=' + exp.toGMTString();
	            }

	            return this;
	        }
	    }, {
	        key: 'getCookie',
	        value: function getCookie(key) {
	            var arr,
	                reg = new RegExp('(^| )' + this.namespace(key) + '=([^;]*)(;|$)');
	            if (arr = document.cookie.match(reg)) {
	                return arr[2];
	            } else {
	                return null;
	            }
	        }
	    }, {
	        key: 'getItem',
	        value: function getItem(key) {
	            var item = this.getCookie(key);
	            if (!item) {
	                return '';
	            }
	            if (item = this.parse(item)) {
	                // 如果过期了，那么就返回空字符串

	                if (this.isExpires(item['expires'])) {
	                    this.remove(key);
	                    return '';
	                }
	                return this.parse(item['val']);
	            }

	            return '';
	        }
	    }, {
	        key: 'setItem',
	        value: function setItem(key, value, expires) {
	            if (!key) {
	                return this;
	            }

	            expires = expires || 0;

	            var now = +new Date(),
	                localKey = this.namespace(key);

	            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	                value = this.this.stringify(value);
	            }

	            document.cookie = localKey + '=' + this.stringify({
	                'val': value,
	                'expires': expires ? expires * 1000 + now : ''
	            });

	            return this;
	        }
	    }, {
	        key: 'expires',
	        value: function expires(key, seconds) {
	            if (!seconds) {
	                return this;
	            }
	            var item = this.parse(this.getCookie(key));
	            if (!item || !item['val']) {
	                return this;
	            }
	            this.setItem(key, item['val'], seconds);

	            return this;
	        }
	    }, {
	        key: 'initCheck',
	        value: function initCheck() {
	            var _this3 = this;

	            var cookies = document.cookie.split(';');
	            cookies.forEach(function (value) {
	                var key = value.split('=')[0];
	                if (_this3.regStorageKey.test(key)) {
	                    var item = _this3.getCookie(key);
	                    item = _this3.parse(item);
	                    if (!item) {
	                        return;
	                    }
	                    if (_this3.isExpires(item['expires'])) {
	                        _this3.removeItem(key);
	                    }
	                }
	            });
	        }
	    }]);

	    return Cookie;
	}(_StorageParent3.default);

	exports.default = Cookie;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _StorageParent2 = __webpack_require__(1);

	var _StorageParent3 = _interopRequireDefault(_StorageParent2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LocalStorage = function (_StorageParent) {
	    _inherits(LocalStorage, _StorageParent);

	    function LocalStorage() {
	        _classCallCheck(this, LocalStorage);

	        var _this = _possibleConstructorReturn(this, (LocalStorage.__proto__ || Object.getPrototypeOf(LocalStorage)).call(this)); //构造函数


	        _this.regStorageKey = /^localstorage\_\_\_(.*)$/;
	        _this.get = _this.getItem;
	        _this.put = _this.setItem;
	        _this.remove = _this.removeItem;
	        _this.initCheck();
	        return _this;
	    }

	    _createClass(LocalStorage, [{
	        key: 'namespace',
	        value: function namespace(key) {
	            return 'localstorage___' + key;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            for (var key in window.localStorage) {
	                if (this.regStorageKey.test(key)) {
	                    window.localStorage.removeItem(key);
	                }
	            }
	            return this;
	        }
	    }, {
	        key: 'removeItem',
	        value: function removeItem(key) {
	            window.localStorage.removeItem(this.namespace(key));
	            return this;
	        }
	    }, {
	        key: 'getItem',
	        value: function getItem(key) {
	            var item = window.localStorage.getItem(this.namespace(key));
	            if (!item) {
	                return '';
	            }
	            if (item = this.parse(item)) {
	                // 如果过期了，那么就返回空字符串
	                if (this.isExpires(item['expires'])) {
	                    this.remove(key);
	                    return '';
	                }

	                return this.parse(item['val']);
	            }

	            return '';
	        }
	    }, {
	        key: 'setItem',
	        value: function setItem(key, value, expires) {
	            if (!key) {
	                return this;
	            }

	            expires = expires || 0;

	            var now = +new Date(),
	                localKey = this.namespace(key);

	            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	                value = this.stringify(value);
	            }

	            window.localStorage.setItem(localKey, this.stringify({
	                'val': value,
	                'expires': expires ? expires * 1000 + now : ''
	            }));

	            return this;
	        }
	    }, {
	        key: 'expires',
	        value: function expires(key, seconds) {
	            if (!seconds) {
	                return this;
	            }

	            var item = this.get(key);

	            if (!item || !item['val']) {
	                return this;
	            }

	            this.put(key, item['val'], seconds);

	            return this;
	        }
	    }, {
	        key: 'initCheck',
	        value: function initCheck() {
	            for (var key in window.localStorage) {
	                if (this.regStorageKey.test(key)) {
	                    var item = window.localStorage.getItem(key);
	                    item = this.parse(item);

	                    if (!item) {
	                        continue;
	                    }

	                    if (this.isExpires(item['expires'])) {
	                        this.removeItem(key);
	                    }
	                }
	            }
	        }
	    }]);

	    return LocalStorage;
	}(_StorageParent3.default);

	exports.default = LocalStorage;

/***/ }
/******/ ])
});
;