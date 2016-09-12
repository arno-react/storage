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

	var _LocalStorage = __webpack_require__(6);

	var _LocalStorage2 = _interopRequireDefault(_LocalStorage);

	var _Cookie = __webpack_require__(5);

	var _Cookie2 = _interopRequireDefault(_Cookie);

	var _cacheStorage = __webpack_require__(7);

	var _cacheStorage2 = _interopRequireDefault(_cacheStorage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Storage = function () {
	    function Storage(name) {
	        _classCallCheck(this, Storage);

	        //构造函数
	        if (name == 'cookie') {
	            this.Mode = new _Cookie2.default();
	        } else if (name == 'lru') {
	            this.Mode = new _cacheStorage2.default();
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

	var events = __webpack_require__(4);
	var inherits = __webpack_require__(3);

	module.exports = LRU;

	function LRU(opts) {
	  if (!(this instanceof LRU)) return new LRU(opts);
	  if (typeof opts === 'number') opts = { max: opts };
	  if (!opts) opts = {};
	  events.EventEmitter.call(this);
	  this.cache = {};
	  this.head = this.tail = null;
	  this.length = 0;
	  this.max = opts.max || 1000;
	  this.maxAge = opts.maxAge || 0;
	}

	inherits(LRU, events.EventEmitter);

	Object.defineProperty(LRU.prototype, 'keys', {
	  get: function get() {
	    return Object.keys(this.cache);
	  }
	});

	LRU.prototype.clear = function () {
	  this.cache = {};
	  this.head = this.tail = null;
	  this.length = 0;
	};

	LRU.prototype.remove = function (key) {
	  if (typeof key !== 'string') key = '' + key;
	  if (!this.cache.hasOwnProperty(key)) return;

	  var element = this.cache[key];
	  delete this.cache[key];
	  this._unlink(key, element.prev, element.next);
	  return element.value;
	};

	LRU.prototype._unlink = function (key, prev, next) {
	  this.length--;

	  if (this.length === 0) {
	    this.head = this.tail = null;
	  } else {
	    if (this.head === key) {
	      this.head = prev;
	      this.cache[this.head].next = null;
	    } else if (this.tail === key) {
	      this.tail = next;
	      this.cache[this.tail].prev = null;
	    } else {
	      this.cache[prev].next = next;
	      this.cache[next].prev = prev;
	    }
	  }
	};

	LRU.prototype.peek = function (key) {
	  if (!this.cache.hasOwnProperty(key)) return;

	  var element = this.cache[key];

	  if (!this._checkAge(key, element)) return;
	  return element.value;
	};

	LRU.prototype.set = function (key, value) {
	  if (typeof key !== 'string') key = '' + key;

	  var element;

	  if (this.cache.hasOwnProperty(key)) {
	    element = this.cache[key];
	    element.value = value;
	    if (this.maxAge) element.modified = Date.now();

	    // If it's already the head, there's nothing more to do:
	    if (key === this.head) return value;
	    this._unlink(key, element.prev, element.next);
	  } else {
	    element = { value: value, modified: 0, next: null, prev: null };
	    if (this.maxAge) element.modified = Date.now();
	    this.cache[key] = element;

	    // Eviction is only possible if the key didn't already exist:
	    if (this.length === this.max) this.evict();
	  }

	  this.length++;
	  element.next = null;
	  element.prev = this.head;

	  if (this.head) this.cache[this.head].next = key;
	  this.head = key;

	  if (!this.tail) this.tail = key;
	  return value;
	};

	LRU.prototype._checkAge = function (key, element) {
	  if (this.maxAge && Date.now() - element.modified > this.maxAge) {
	    this.remove(key);
	    this.emit('evict', { key: key, value: element.value });
	    return false;
	  }
	  return true;
	};

	LRU.prototype.get = function (key) {
	  if (typeof key !== 'string') key = '' + key;
	  if (!this.cache.hasOwnProperty(key)) return;

	  var element = this.cache[key];

	  if (!this._checkAge(key, element)) return;

	  if (this.head !== key) {
	    if (key === this.tail) {
	      this.tail = element.next;
	      this.cache[this.tail].prev = null;
	    } else {
	      // Set prev.next -> element.next:
	      this.cache[element.prev].next = element.next;
	    }

	    // Set element.next.prev -> element.prev:
	    this.cache[element.next].prev = element.prev;

	    // Element is the new head
	    this.cache[this.head].next = key;
	    element.prev = this.head;
	    element.next = null;
	    this.head = key;
	  }

	  return element.value;
	};

	LRU.prototype.evict = function () {
	  if (!this.tail) return;
	  var key = this.tail;
	  var value = this.remove(this.tail);
	  this.emit('evict', { key: key, value: value });
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function TempCtor() {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events) this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler)) return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) {
	      listeners[i].apply(this, args);
	    }
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events) this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type]) return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;

	  if (!this._events) return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length) {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    }
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function (type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },
/* 5 */
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
/* 6 */
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _StorageParent2 = __webpack_require__(1);

	var _StorageParent3 = _interopRequireDefault(_StorageParent2);

	var _lru = __webpack_require__(2);

	var _lru2 = _interopRequireDefault(_lru);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var cacheStorage = function (_StorageParent) {
	    _inherits(cacheStorage, _StorageParent);

	    function cacheStorage() {
	        _classCallCheck(this, cacheStorage);

	        var _this = _possibleConstructorReturn(this, (cacheStorage.__proto__ || Object.getPrototypeOf(cacheStorage)).call(this)); //构造函数


	        _this.Mode = new _lru2.default();
	        _this.regStorageKey = /^cachestorage\_\_\_(.*)$/;
	        _this.get = _this.getItem;
	        _this.put = _this.setItem;
	        _this.remove = _this.removeItem;
	        _this.initCheck();
	        return _this;
	    }

	    _createClass(cacheStorage, [{
	        key: 'namespace',
	        value: function namespace(key) {
	            return 'cachestorage___' + key;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            var _this2 = this;

	            this.Mode.keys.forEach(function (key) {
	                if (_this2.regStorageKey.test(key)) {
	                    _this2.Mode.remove(key);
	                }
	            });
	            return this;
	        }
	    }, {
	        key: 'removeItem',
	        value: function removeItem(key) {
	            this.Mode.remove(this.namespace(key));
	            return this;
	        }
	    }, {
	        key: 'getItem',
	        value: function getItem(key) {
	            var item = this.Mode.get(this.namespace(key));
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

	            this.Mode.set(localKey, this.stringify({
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
	            for (var i = 0; this.Mode.keys.length; i++) {
	                var key = this.Mode.keys[i];
	                if (this.regStorageKey.test(key)) {
	                    var item = this.Mode.get(key);
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

	    return cacheStorage;
	}(_StorageParent3.default);

	exports.default = cacheStorage;

/***/ }
/******/ ])
});
;