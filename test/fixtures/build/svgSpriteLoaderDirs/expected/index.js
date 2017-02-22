/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Sprite = __webpack_require__(4);
	var globalSprite = new Sprite();

	if (document.body) {
	  globalSprite.elem = globalSprite.render(document.body);
	} else {
	  document.addEventListener('DOMContentLoaded', function () {
	    globalSprite.elem = globalSprite.render(document.body);
	  }, false);
	}

	module.exports = globalSprite;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	var sprite = __webpack_require__(1);
	var image = "<symbol viewBox=\"0 0 49 39\" id=\"friend\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"> <!-- Generator: Sketch 40.3 (33839) - http://www.bohemiancoding.com/sketch --> <title>&#x670B;&#x53CB;</title> <desc>Created with Sketch.</desc> <defs/> <g id=\"friend_Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"> <g id=\"friend_&#x670B;&#x53CB;\" transform=\"translate(1.000000, 0.000000)\"> <path d=\"M40.3142248,35.8020976 L44.6981672,35.7415415 C46.003264,35.7415415 47.0186479,35.145618 47.4659391,34.2386412 C47.7038458,33.7562354 47.8056411,33.1935703 47.7888064,32.7900835 C47.7871826,32.7568707 47.7888064,30.3879422 47.7888064,30.3879422 C47.7888064,27.6490137 44.4786286,25.678294 37.9478325,22.6677696 C34.852988,21.2408864 34.3724538,20.7502074 34.3724538,19.625219 C34.3724538,19.5744575 34.3762722,19.5208067 34.3840208,19.464348 C34.4350989,19.09218 34.6496239,18.6380549 34.980947,18.1656052 C35.1279046,17.9560514 35.2867971,17.7582109 35.4452676,17.5799997 C35.538224,17.4754638 35.6075401,17.4034817 35.6409309,17.370963 C36.4977696,16.5361043 37.076885,15.2959594 37.4555712,13.7549177 C37.6768732,12.8543421 37.816916,11.8989244 37.893246,10.9407406 C37.9407258,10.3447183 37.956008,9.85894146 37.9544312,9.53814751 C37.9543808,9.5295069 37.9543904,9.0535515 37.9543904,9.0535515 C37.9543904,5.16464079 36.2202296,2.5763557 33.3706441,1.14317978 C32.3883365,0.649136095 31.3447107,0.330804672 30.3024809,0.150415985 C29.674023,0.0416427544 29.1774691,0.0024978227 28.8746582,3.03950255e-05 L28.3556621,0 C28.2657389,0 28.1178456,0.00295209037 27.9302572,0.0116891267 C27.6171074,0.0262742532 27.3030432,0.0526041378 27.0040152,0.094386324 C26.2478599,0.200041371 25.7094594,0.368149032 25.3459026,0.74671311 L26.6762772,2.10093455 C26.6606783,2.1171774 26.9211681,2.03584327 27.2786011,1.98590035 C27.515504,1.9527987 27.7756515,1.93098898 28.0367133,1.91882988 C28.1936518,1.91152038 28.313724,1.90912363 28.3769239,1.90912363 L28.8884596,1.90912363 C28.9240886,1.90944434 29.0225937,1.91349632 29.1682931,1.92498226 C29.4208508,1.9448922 29.7047159,1.97961784 30.0115966,2.03273263 C30.8881819,2.18445165 31.7633713,2.45140586 32.5719578,2.85807786 C34.8392127,3.99837534 36.1538942,5.85348026 36.1538942,9.0535515 L36.1538942,9.53454051 C36.1539295,9.54223466 36.0456403,11.9547057 35.7054338,13.3391566 C35.3980384,14.5900843 34.9479964,15.5538253 34.3737282,16.1133622 C34.1454195,16.3357076 33.8226813,16.6986492 33.4986648,17.1606801 C33.0209554,17.8418691 32.6952562,18.5313371 32.5996971,19.2276058 C32.5813941,19.3609661 32.5719576,19.4935563 32.5719576,19.625219 C32.5719576,21.611071 33.5243616,22.5835818 37.1834703,24.2706199 C42.7884116,26.8543497 45.8446548,28.7520025 45.8446548,30.3879422 L45.8446548,32.7900843 C45.8464867,32.8464343 45.8228225,33.1880493 45.7355438,33.3650253 C45.5903333,33.65947 45.3158536,33.8272113 44.6981668,33.8272113 L40.3142244,33.8877674 L40.3142246,35.4097313 L40.3142248,35.8020976 Z\" id=\"friend_Shape\" fill=\"#888888\"/> <path d=\"M38.4342267,32.8473277 C38.4342267,30.0372803 32.5289879,27.3268557 28.6592071,25.5429889 C24.7888016,23.7585321 24.3502889,22.9571788 24.3502889,21.4966858 C24.3502889,20.0356028 25.9662894,18.461811 25.9662894,18.461811 C28.1732201,16.3114933 28.1207485,10.874919 28.1207485,10.874919 L28.1207485,10.3686148 C28.1207485,1.84051616 19.5029121,1.77029448 19.5029121,1.77029448 L18.9644535,1.77029448 C18.9644535,1.77029448 10.3472418,1.84051616 10.3472418,10.3686148 L10.3472418,10.874919 C10.3472418,10.874919 10.2941456,16.3114933 12.5010762,18.461811 C12.5010762,18.461811 14.1170767,20.0356028 14.1170767,21.4966858 C14.1170767,22.9571788 13.678564,23.7585321 9.80878321,25.5429889 C5.93837773,27.3268557 0.644041724,30.0372796 0.644041724,32.8473271 L0.644041724,35.3758977 C0.644041724,35.3758977 0.485377587,37.3993443 2.79850081,37.3993443 L36.2797676,37.3993449 C38.5928908,37.3993449 38.4342267,35.3758983 38.4342267,35.3758983 L38.4342267,32.8473277 Z\" id=\"friend_Imported-Layers-Copy-2\" stroke=\"#888888\" stroke-width=\"2\"/> </g> </g> </symbol>";
	module.exports = sprite.add(image, "friend");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	var sprite = __webpack_require__(1);
	var image = "<symbol viewBox=\"0 0 48 49\" id=\"money\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"> <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch --> <title>&#xFFE5;</title> <desc>Created with Sketch.</desc> <defs/> <g id=\"money_Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"> <g id=\"money_&#x7AD6;&#x5411;steps\" transform=\"translate(-597.000000, -310.000000)\"> <g id=\"money_&#x5E26;&#x5C0F;&#x56FE;&#x6807;/&#x5B9E;&#x5FC3;/&#x6D41;&#x7A0B;&#x72B6;&#x6001;01\" transform=\"translate(597.000000, 182.000000)\"> <g id=\"money_Group-2\" transform=\"translate(0.000000, 0.838831)\"> <g id=\"money_2\" transform=\"translate(0.000000, 128.050800)\"> <g id=\"money_&#xFFE5;\"> <path d=\"M24,48.01905 C37.254834,48.01905 48,37.2696195 48,24.009525 C48,10.7494305 37.254834,0 24,0 C10.745166,0 0,10.7494305 0,24.009525 C0,37.2696195 10.745166,48.01905 24,48.01905 Z\" id=\"money_Oval-61\" fill=\"#CCCCCC\"/> <rect id=\"money_Rectangle-2365\" fill=\"#FFFFFF\" transform=\"translate(28.656854, 16.663465) rotate(-315.000000) translate(-28.656854, -16.663465) \" x=\"27.1568542\" y=\"10.1608853\" width=\"3\" height=\"13.0051594\"/> <rect id=\"money_Rectangle-2365-Copy\" fill=\"#FFFFFF\" transform=\"translate(19.656854, 16.663465) scale(-1, 1) rotate(-315.000000) translate(-19.656854, -16.663465) \" x=\"18.1568542\" y=\"10.1608853\" width=\"3\" height=\"13.0051594\"/> <rect id=\"money_Rectangle-2367\" fill=\"#FFFFFF\" x=\"15\" y=\"20.0079375\" width=\"19\" height=\"3.00119063\"/> <rect id=\"money_Rectangle-2367-Copy\" fill=\"#FFFFFF\" x=\"15\" y=\"27.0107157\" width=\"19\" height=\"3.00119063\"/> <rect id=\"money_Rectangle-2367-Copy\" fill=\"#FFFFFF\" x=\"23\" y=\"20.0079375\" width=\"3\" height=\"18.0071438\"/> </g> </g> </g> </g> </g> </g> </symbol>";
	module.exports = sprite.add(image, "money");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Sniffr = __webpack_require__(5);

	/**
	 * List of SVG attributes to fix url target in them
	 * @type {string[]}
	 */
	var fixAttributes = [
	  'clipPath',
	  'colorProfile',
	  'src',
	  'cursor',
	  'fill',
	  'filter',
	  'marker',
	  'markerStart',
	  'markerMid',
	  'markerEnd',
	  'mask',
	  'stroke'
	];

	/**
	 * Query to find'em
	 * @type {string}
	 */
	var fixAttributesQuery = '[' + fixAttributes.join('],[') + ']';
	/**
	 * @type {RegExp}
	 */
	var URI_FUNC_REGEX = /^url\((.*)\)$/;

	/**
	 * Convert array-like to array
	 * @param {Object} arrayLike
	 * @returns {Array.<*>}
	 */
	function arrayFrom(arrayLike) {
	  return Array.prototype.slice.call(arrayLike, 0);
	}

	/**
	 * Handles forbidden symbols which cannot be directly used inside attributes with url(...) content.
	 * Adds leading slash for the brackets
	 * @param {string} url
	 * @return {string} encoded url
	 */
	function encodeUrlForEmbedding(url) {
	  return url.replace(/\(|\)/g, "\\$&");
	}

	/**
	 * Replaces prefix in `url()` functions
	 * @param {Element} svg
	 * @param {string} currentUrlPrefix
	 * @param {string} newUrlPrefix
	 */
	function baseUrlWorkAround(svg, currentUrlPrefix, newUrlPrefix) {
	  var nodes = svg.querySelectorAll(fixAttributesQuery);

	  if (!nodes) {
	    return;
	  }

	  arrayFrom(nodes).forEach(function (node) {
	    if (!node.attributes) {
	      return;
	    }

	    arrayFrom(node.attributes).forEach(function (attribute) {
	      var attributeName = attribute.localName.toLowerCase();

	      if (fixAttributes.indexOf(attributeName) !== -1) {
	        var match = URI_FUNC_REGEX.exec(node.getAttribute(attributeName));

	        // Do not touch urls with unexpected prefix
	        if (match && match[1].indexOf(currentUrlPrefix) === 0) {
	          var referenceUrl = encodeUrlForEmbedding(newUrlPrefix + match[1].split(currentUrlPrefix)[1]);
	          node.setAttribute(attributeName, 'url(' + referenceUrl + ')');
	        }
	      }
	    });
	  });
	}

	/**
	 * Because of Firefox bug #353575 gradients and patterns don't work if they are within a symbol.
	 * To workaround this we move the gradient definition outside the symbol element
	 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=353575
	 * @param {Element} svg
	 */
	var FirefoxSymbolBugWorkaround = function (svg) {
	  var defs = svg.querySelector('defs');

	  var moveToDefsElems = svg.querySelectorAll('symbol linearGradient, symbol radialGradient, symbol pattern');
	  for (var i = 0, len = moveToDefsElems.length; i < len; i++) {
	    defs.appendChild(moveToDefsElems[i]);
	  }
	};

	/**
	 * Fix for browser (IE, maybe other too) which are throwing 'WrongDocumentError'
	 * if you insert an element which is not part of the document
	 * @see http://stackoverflow.com/questions/7981100/how-do-i-dynamically-insert-an-svg-image-into-html#7986519
	 * @param {Element} svg
	 */
	function importSvg(svg) {
	  try {
	    if (document.importNode) {
	      return document.importNode(svg, true);
	    }
	  } catch(e) {}

	  return svg;
	}

	/**
	 * @type {string}
	 */
	var DEFAULT_URI_PREFIX = '#';

	/**
	 * @type {string}
	 */
	var xLinkHref = 'xlink:href';
	/**
	 * @type {string}
	 */
	var xLinkNS = 'http://www.w3.org/1999/xlink';
	/**
	 * @type {string}
	 */
	var svgOpening = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="' + xLinkNS + '"';
	/**
	 * @type {string}
	 */
	var svgClosing = '</svg>';
	/**
	 * @type {string}
	 */
	var contentPlaceHolder = '{content}';

	/**
	 * Representation of SVG sprite
	 * @constructor
	 */
	function Sprite() {
	  var baseElement = document.getElementsByTagName('base')[0];
	  var currentUrl = window.location.href.split('#')[0];
	  var baseUrl = baseElement && baseElement.href;
	  this.urlPrefix = baseUrl && baseUrl !== currentUrl ? currentUrl + DEFAULT_URI_PREFIX : DEFAULT_URI_PREFIX;

	  var sniffr = new Sniffr();
	  sniffr.sniff();
	  this.browser = sniffr.browser;
	  this.content = [];

	  if (this.browser.name !== 'ie' && baseUrl) {
	    window.addEventListener('spriteLoaderLocationUpdated', function (e) {
	      var currentPrefix = this.urlPrefix;
	      var newUrlPrefix = e.detail.newUrl.split(DEFAULT_URI_PREFIX)[0] + DEFAULT_URI_PREFIX;
	      baseUrlWorkAround(this.svg, currentPrefix, newUrlPrefix);
	      this.urlPrefix = newUrlPrefix;

	      if (this.browser.name === 'firefox' || this.browser.name === 'edge' || this.browser.name === 'chrome' && this.browser.version[0] >= 49) {
	        var nodes = arrayFrom(document.querySelectorAll('use[*|href]'));
	        nodes.forEach(function (node) {
	          var href = node.getAttribute(xLinkHref);
	          if (href && href.indexOf(currentPrefix) === 0) {
	            node.setAttributeNS(xLinkNS, xLinkHref, newUrlPrefix + href.split(DEFAULT_URI_PREFIX)[1]);
	          }
	        });
	      }
	    }.bind(this));
	  }
	}

	Sprite.styles = ['position:absolute', 'width:0', 'height:0'];

	Sprite.spriteTemplate = function(){ return svgOpening + ' style="'+ Sprite.styles.join(';') +'"><defs>' + contentPlaceHolder + '</defs>' + svgClosing; }
	Sprite.symbolTemplate = function() { return svgOpening + '>' + contentPlaceHolder + svgClosing; }

	/**
	 * @type {Array<String>}
	 */
	Sprite.prototype.content = null;

	/**
	 * @param {String} content
	 * @param {String} id
	 */
	Sprite.prototype.add = function (content, id) {
	  if (this.svg) {
	    this.appendSymbol(content);
	  }

	  this.content.push(content);

	  return DEFAULT_URI_PREFIX + id;
	};

	/**
	 *
	 * @param content
	 * @param template
	 * @returns {Element}
	 */
	Sprite.prototype.wrapSVG = function (content, template) {
	  var svgString = template.replace(contentPlaceHolder, content);

	  var svg = new DOMParser().parseFromString(svgString, 'image/svg+xml').documentElement;
	  var importedSvg = importSvg(svg);

	  if (this.browser.name !== 'ie' && this.urlPrefix) {
	    baseUrlWorkAround(importedSvg, DEFAULT_URI_PREFIX, this.urlPrefix);
	  }

	  return importedSvg;
	};

	Sprite.prototype.appendSymbol = function (content) {
	  var symbol = this.wrapSVG(content, Sprite.symbolTemplate()).childNodes[0];

	  this.svg.querySelector('defs').appendChild(symbol);
	  if (this.browser.name === 'firefox') {
	    FirefoxSymbolBugWorkaround(this.svg);
	  }
	};

	/**
	 * @returns {String}
	 */
	Sprite.prototype.toString = function () {
	  var wrapper = document.createElement('div');
	  wrapper.appendChild(this.render());
	  return wrapper.innerHTML;
	};

	/**
	 * @param {HTMLElement} [target]
	 * @param {Boolean} [prepend=true]
	 * @returns {HTMLElement} Rendered sprite node
	 */
	Sprite.prototype.render = function (target, prepend) {
	  target = target || null;
	  prepend = typeof prepend === 'boolean' ? prepend : true;

	  var svg = this.wrapSVG(this.content.join(''), Sprite.spriteTemplate());

	  if (this.browser.name === 'firefox') {
	    FirefoxSymbolBugWorkaround(svg);
	  }

	  if (target) {
	    if (prepend && target.childNodes[0]) {
	      target.insertBefore(svg, target.childNodes[0]);
	    } else {
	      target.appendChild(svg);
	    }
	  }

	  this.svg = svg;

	  return svg;
	};

	module.exports = Sprite;


/***/ },
/* 5 */
/***/ function(module, exports) {

	(function(host) {

	  var properties = {
	    browser: [
	      [/msie ([\.\_\d]+)/, "ie"],
	      [/trident\/.*?rv:([\.\_\d]+)/, "ie"],
	      [/firefox\/([\.\_\d]+)/, "firefox"],
	      [/chrome\/([\.\_\d]+)/, "chrome"],
	      [/version\/([\.\_\d]+).*?safari/, "safari"],
	      [/mobile safari ([\.\_\d]+)/, "safari"],
	      [/android.*?version\/([\.\_\d]+).*?safari/, "com.android.browser"],
	      [/crios\/([\.\_\d]+).*?safari/, "chrome"],
	      [/opera/, "opera"],
	      [/opera\/([\.\_\d]+)/, "opera"],
	      [/opera ([\.\_\d]+)/, "opera"],
	      [/opera mini.*?version\/([\.\_\d]+)/, "opera.mini"],
	      [/opios\/([a-z\.\_\d]+)/, "opera"],
	      [/blackberry/, "blackberry"],
	      [/blackberry.*?version\/([\.\_\d]+)/, "blackberry"],
	      [/bb\d+.*?version\/([\.\_\d]+)/, "blackberry"],
	      [/rim.*?version\/([\.\_\d]+)/, "blackberry"],
	      [/iceweasel\/([\.\_\d]+)/, "iceweasel"],
	      [/edge\/([\.\d]+)/, "edge"]
	    ],
	    os: [
	      [/linux ()([a-z\.\_\d]+)/, "linux"],
	      [/mac os x/, "macos"],
	      [/mac os x.*?([\.\_\d]+)/, "macos"],
	      [/os ([\.\_\d]+) like mac os/, "ios"],
	      [/openbsd ()([a-z\.\_\d]+)/, "openbsd"],
	      [/android/, "android"],
	      [/android ([a-z\.\_\d]+);/, "android"],
	      [/mozilla\/[a-z\.\_\d]+ \((?:mobile)|(?:tablet)/, "firefoxos"],
	      [/windows\s*(?:nt)?\s*([\.\_\d]+)/, "windows"],
	      [/windows phone.*?([\.\_\d]+)/, "windows.phone"],
	      [/windows mobile/, "windows.mobile"],
	      [/blackberry/, "blackberryos"],
	      [/bb\d+/, "blackberryos"],
	      [/rim.*?os\s*([\.\_\d]+)/, "blackberryos"]
	    ],
	    device: [
	      [/ipad/, "ipad"],
	      [/iphone/, "iphone"],
	      [/lumia/, "lumia"],
	      [/htc/, "htc"],
	      [/nexus/, "nexus"],
	      [/galaxy nexus/, "galaxy.nexus"],
	      [/nokia/, "nokia"],
	      [/ gt\-/, "galaxy"],
	      [/ sm\-/, "galaxy"],
	      [/xbox/, "xbox"],
	      [/(?:bb\d+)|(?:blackberry)|(?: rim )/, "blackberry"]
	    ]
	  };

	  var UNKNOWN = "Unknown";

	  var propertyNames = Object.keys(properties);

	  function Sniffr() {
	    var self = this;

	    propertyNames.forEach(function(propertyName) {
	      self[propertyName] = {
	        name: UNKNOWN,
	        version: [],
	        versionString: UNKNOWN
	      };
	    });
	  }

	  function determineProperty(self, propertyName, userAgent) {
	    properties[propertyName].forEach(function(propertyMatcher) {
	      var propertyRegex = propertyMatcher[0];
	      var propertyValue = propertyMatcher[1];

	      var match = userAgent.match(propertyRegex);

	      if (match) {
	        self[propertyName].name = propertyValue;

	        if (match[2]) {
	          self[propertyName].versionString = match[2];
	          self[propertyName].version = [];
	        } else if (match[1]) {
	          self[propertyName].versionString = match[1].replace(/_/g, ".");
	          self[propertyName].version = parseVersion(match[1]);
	        } else {
	          self[propertyName].versionString = UNKNOWN;
	          self[propertyName].version = [];
	        }
	      }
	    });
	  }

	  function parseVersion(versionString) {
	    return versionString.split(/[\._]/).map(function(versionPart) {
	      return parseInt(versionPart);
	    });
	  }

	  Sniffr.prototype.sniff = function(userAgentString) {
	    var self = this;
	    var userAgent = (userAgentString || navigator.userAgent || "").toLowerCase();

	    propertyNames.forEach(function(propertyName) {
	      determineProperty(self, propertyName, userAgent);
	    });
	  };


	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = Sniffr;
	  } else {
	    host.Sniffr = new Sniffr();
	    host.Sniffr.sniff(navigator.userAgent);
	  }
	})(this);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _a = __webpack_require__(7);

	var _a2 = _interopRequireDefault(_a);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var b = __webpack_require__(3);

	console.log(_a2.default);
	console.log(b);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var a = __webpack_require__(2);
	export default a;

/***/ }
/******/ ]);