/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.SpriteSymbol = factory());
}(this, (function () { 'use strict';

var SpriteSymbol = function SpriteSymbol(ref) {
  var id = ref.id;
  var viewBox = ref.viewBox;
  var content = ref.content;

  this.id = id;
  this.viewBox = viewBox;
  this.content = content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.stringify = function stringify () {
  return this.content;
};

/**
 * @return {string}
 */
SpriteSymbol.prototype.toString = function toString () {
  return this.stringify();
};

SpriteSymbol.prototype.destroy = function destroy () {
    var this$1 = this;

  ['id', 'viewBox', 'content'].forEach(function (prop) { return delete this$1[prop]; });
};

return SpriteSymbol;

})));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Sprite = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$1 = createCommonjsModule(function (module, exports) {
(function (root, factory) {
    if (false) {
        undefined(factory);
    } else {
        module.exports = factory();
    }
}(commonjsGlobal, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object';

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

return deepmerge

}));
});

var namespaces_1 = createCommonjsModule(function (module, exports) {
var namespaces = {
  svg: {
    name: 'xmlns',
    uri: 'http://www.w3.org/2000/svg'
  },
  xlink: {
    name: 'xmlns:xlink',
    uri: 'http://www.w3.org/1999/xlink'
  }
};

exports.default = namespaces;
module.exports = exports.default;
});

/**
 * @param {Object} attrs
 * @return {string}
 */
var objectToAttrsString = function (attrs) {
  return Object.keys(attrs).map(function (attr) {
    var value = attrs[attr].toString().replace(/"/g, '&quot;');
    return (attr + "=\"" + value + "\"");
  }).join(' ');
};

var svg = namespaces_1.svg;
var xlink = namespaces_1.xlink;

var defaultAttrs = {};
defaultAttrs[svg.name] = svg.uri;
defaultAttrs[xlink.name] = xlink.uri;

/**
 * @param {string} [content]
 * @param {Object} [attributes]
 * @return {string}
 */
var wrapInSvgString = function (content, attributes) {
  if ( content === void 0 ) content = '';

  var attrs = index$1(defaultAttrs, attributes || {});
  var attrsRendered = objectToAttrsString(attrs);
  return ("<svg " + attrsRendered + ">" + content + "</svg>");
};

var svg$1 = namespaces_1.svg;
var xlink$1 = namespaces_1.xlink;

var defaultConfig = {
  attrs: ( obj = {
    style: ['position: absolute', 'width: 0', 'height: 0'].join('; ')
  }, obj[svg$1.name] = svg$1.uri, obj[xlink$1.name] = xlink$1.uri, obj )
};
var obj;

var Sprite = function Sprite(config) {
  this.config = index$1(defaultConfig, config || {});
  this.symbols = [];
};

/**
 * Add new symbol. If symbol with the same id exists it will be replaced.
 * @param {SpriteSymbol} symbol
 * @return {boolean} `true` - symbol was added, `false` - replaced
 */
Sprite.prototype.add = function add (symbol) {
  var ref = this;
    var symbols = ref.symbols;
  var existing = this.find(symbol.id);

  if (existing) {
    symbols[symbols.indexOf(existing)] = symbol;
    return false;
  }

  symbols.push(symbol);
  return true;
};

/**
 * Remove symbol & destroy it
 * @param {string} id
 * @return {boolean} `true` - symbol was found & successfully destroyed, `false` - otherwise
 */
Sprite.prototype.remove = function remove (id) {
  var ref = this;
    var symbols = ref.symbols;
  var symbol = this.find(id);

  if (symbol) {
    symbols.splice(symbols.indexOf(symbol), 1);
    symbol.destroy();
    return true;
  }

  return false;
};

/**
 * @param {string} id
 * @return {SpriteSymbol|null}
 */
Sprite.prototype.find = function find (id) {
  return this.symbols.filter(function (s) { return s.id === id; })[0] || null;
};

/**
 * @param {string} id
 * @return {boolean}
 */
Sprite.prototype.has = function has (id) {
  return this.find(id) !== null;
};

/**
 * @return {string}
 */
Sprite.prototype.stringify = function stringify () {
  var ref = this.config;
    var attrs = ref.attrs;
  var stringifiedSymbols = this.symbols.map(function (s) { return s.stringify(); }).join('');
  return wrapInSvgString(stringifiedSymbols, attrs);
};

/**
 * @return {string}
 */
Sprite.prototype.toString = function toString () {
  return this.stringify();
};

Sprite.prototype.destroy = function destroy () {
  this.symbols.forEach(function (s) { return s.destroy(); });
};

var sprite = new Sprite();

return sprite;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _a = __webpack_require__(6);

var _a2 = _interopRequireDefault(_a);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var b = __webpack_require__(5);

console.log(_a2.default);
console.log(b);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__);


var symbol = new __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default.a({
  "id": "friend",
  "use": "friend-usage",
  "viewBox": "0 0 49 39",
  "content": "\n<symbol viewBox=\"0 0 49 39\" id=\"friend\">\n    <!-- Generator: Sketch 40.3 (33839) - http://www.bohemiancoding.com/sketch -->\n    <title>朋友</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"friend_Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g id=\"friend_朋友\" transform=\"translate(1.000000, 0.000000)\">\n            <path d=\"M40.3142248,35.8020976 L44.6981672,35.7415415 C46.003264,35.7415415 47.0186479,35.145618 47.4659391,34.2386412 C47.7038458,33.7562354 47.8056411,33.1935703 47.7888064,32.7900835 C47.7871826,32.7568707 47.7888064,30.3879422 47.7888064,30.3879422 C47.7888064,27.6490137 44.4786286,25.678294 37.9478325,22.6677696 C34.852988,21.2408864 34.3724538,20.7502074 34.3724538,19.625219 C34.3724538,19.5744575 34.3762722,19.5208067 34.3840208,19.464348 C34.4350989,19.09218 34.6496239,18.6380549 34.980947,18.1656052 C35.1279046,17.9560514 35.2867971,17.7582109 35.4452676,17.5799997 C35.538224,17.4754638 35.6075401,17.4034817 35.6409309,17.370963 C36.4977696,16.5361043 37.076885,15.2959594 37.4555712,13.7549177 C37.6768732,12.8543421 37.816916,11.8989244 37.893246,10.9407406 C37.9407258,10.3447183 37.956008,9.85894146 37.9544312,9.53814751 C37.9543808,9.5295069 37.9543904,9.0535515 37.9543904,9.0535515 C37.9543904,5.16464079 36.2202296,2.5763557 33.3706441,1.14317978 C32.3883365,0.649136095 31.3447107,0.330804672 30.3024809,0.150415985 C29.674023,0.0416427544 29.1774691,0.0024978227 28.8746582,3.03950255e-05 L28.3556621,0 C28.2657389,0 28.1178456,0.00295209037 27.9302572,0.0116891267 C27.6171074,0.0262742532 27.3030432,0.0526041378 27.0040152,0.094386324 C26.2478599,0.200041371 25.7094594,0.368149032 25.3459026,0.74671311 L26.6762772,2.10093455 C26.6606783,2.1171774 26.9211681,2.03584327 27.2786011,1.98590035 C27.515504,1.9527987 27.7756515,1.93098898 28.0367133,1.91882988 C28.1936518,1.91152038 28.313724,1.90912363 28.3769239,1.90912363 L28.8884596,1.90912363 C28.9240886,1.90944434 29.0225937,1.91349632 29.1682931,1.92498226 C29.4208508,1.9448922 29.7047159,1.97961784 30.0115966,2.03273263 C30.8881819,2.18445165 31.7633713,2.45140586 32.5719578,2.85807786 C34.8392127,3.99837534 36.1538942,5.85348026 36.1538942,9.0535515 L36.1538942,9.53454051 C36.1539295,9.54223466 36.0456403,11.9547057 35.7054338,13.3391566 C35.3980384,14.5900843 34.9479964,15.5538253 34.3737282,16.1133622 C34.1454195,16.3357076 33.8226813,16.6986492 33.4986648,17.1606801 C33.0209554,17.8418691 32.6952562,18.5313371 32.5996971,19.2276058 C32.5813941,19.3609661 32.5719576,19.4935563 32.5719576,19.625219 C32.5719576,21.611071 33.5243616,22.5835818 37.1834703,24.2706199 C42.7884116,26.8543497 45.8446548,28.7520025 45.8446548,30.3879422 L45.8446548,32.7900843 C45.8464867,32.8464343 45.8228225,33.1880493 45.7355438,33.3650253 C45.5903333,33.65947 45.3158536,33.8272113 44.6981668,33.8272113 L40.3142244,33.8877674 L40.3142246,35.4097313 L40.3142248,35.8020976 Z\" id=\"friend_Shape\" fill=\"#888888\" />\n            <path d=\"M38.4342267,32.8473277 C38.4342267,30.0372803 32.5289879,27.3268557 28.6592071,25.5429889 C24.7888016,23.7585321 24.3502889,22.9571788 24.3502889,21.4966858 C24.3502889,20.0356028 25.9662894,18.461811 25.9662894,18.461811 C28.1732201,16.3114933 28.1207485,10.874919 28.1207485,10.874919 L28.1207485,10.3686148 C28.1207485,1.84051616 19.5029121,1.77029448 19.5029121,1.77029448 L18.9644535,1.77029448 C18.9644535,1.77029448 10.3472418,1.84051616 10.3472418,10.3686148 L10.3472418,10.874919 C10.3472418,10.874919 10.2941456,16.3114933 12.5010762,18.461811 C12.5010762,18.461811 14.1170767,20.0356028 14.1170767,21.4966858 C14.1170767,22.9571788 13.678564,23.7585321 9.80878321,25.5429889 C5.93837773,27.3268557 0.644041724,30.0372796 0.644041724,32.8473271 L0.644041724,35.3758977 C0.644041724,35.3758977 0.485377587,37.3993443 2.79850081,37.3993443 L36.2797676,37.3993449 C38.5928908,37.3993449 38.4342267,35.3758983 38.4342267,35.3758983 L38.4342267,32.8473277 Z\" id=\"friend_Imported-Layers-Copy-2\" stroke=\"#888888\" stroke-width=\"2\" />\n        </g>\n    </g>\n</symbol>"
});
var result = __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build__);


var symbol = new __WEBPACK_IMPORTED_MODULE_0_svg_baker_runtime_symbol___default.a({
  "id": "money",
  "use": "money-usage",
  "viewBox": "0 0 48 49",
  "content": "\n<symbol viewBox=\"0 0 48 49\" id=\"money\">\n    <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch -->\n    <title>￥</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"money_Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g id=\"money_竖向steps\" transform=\"translate(-597.000000, -310.000000)\">\n            <g id=\"money_带小图标/实心/流程状态01\" transform=\"translate(597.000000, 182.000000)\">\n                <g id=\"money_Group-2\" transform=\"translate(0.000000, 0.838831)\">\n                    <g id=\"money_2\" transform=\"translate(0.000000, 128.050800)\">\n                        <g id=\"money_￥\">\n                            <path d=\"M24,48.01905 C37.254834,48.01905 48,37.2696195 48,24.009525 C48,10.7494305 37.254834,0 24,0 C10.745166,0 0,10.7494305 0,24.009525 C0,37.2696195 10.745166,48.01905 24,48.01905 Z\" id=\"money_Oval-61\" fill=\"#CCCCCC\" />\n                            <rect id=\"money_Rectangle-2365\" fill=\"#FFFFFF\" transform=\"translate(28.656854, 16.663465) rotate(-315.000000) translate(-28.656854, -16.663465) \" x=\"27.1568542\" y=\"10.1608853\" width=\"3\" height=\"13.0051594\" />\n                            <rect id=\"money_Rectangle-2365-Copy\" fill=\"#FFFFFF\" transform=\"translate(19.656854, 16.663465) scale(-1, 1) rotate(-315.000000) translate(-19.656854, -16.663465) \" x=\"18.1568542\" y=\"10.1608853\" width=\"3\" height=\"13.0051594\" />\n                            <rect id=\"money_Rectangle-2367\" fill=\"#FFFFFF\" x=\"15\" y=\"20.0079375\" width=\"19\" height=\"3.00119063\" />\n                            <rect id=\"money_Rectangle-2367-Copy\" fill=\"#FFFFFF\" x=\"15\" y=\"27.0107157\" width=\"19\" height=\"3.00119063\" />\n                            <rect id=\"money_Rectangle-2367-Copy\" fill=\"#FFFFFF\" x=\"23\" y=\"20.0079375\" width=\"3\" height=\"18.0071438\" />\n                        </g>\n                    </g>\n                </g>\n            </g>\n        </g>\n    </g>\n</symbol>"
});
var result = __WEBPACK_IMPORTED_MODULE_1_svg_sprite_loader_runtime_sprite_build___default.a.add(symbol);
/* harmony default export */ __webpack_exports__["default"] = (symbol);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var a = __webpack_require__(4);
/* harmony default export */ __webpack_exports__["default"] = (a);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);