module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 64);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/jkW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDynamicRoute = isDynamicRoute; // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

/***/ }),

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = __webpack_require__("nOHt");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) {}

  return WithRouterWrapper;
}

/***/ }),

/***/ "0G5g":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

var _default = requestIdleCallback;
exports.default = _default;

/***/ }),

/***/ "27qp":
/***/ (function(module, exports) {

module.exports = require("antd/lib/popover");

/***/ }),

/***/ "3WeD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.searchParamsToUrlQuery = searchParamsToUrlQuery;
exports.urlQueryToSearchParams = urlQueryToSearchParams;
exports.assign = assign;

function searchParamsToUrlQuery(searchParams) {
  const query = {};
  searchParams.forEach((value, key) => {
    if (typeof query[key] === 'undefined') {
      query[key] = value;
    } else if (Array.isArray(query[key])) {
      ;
      query[key].push(value);
    } else {
      query[key] = [query[key], value];
    }
  });
  return query;
}

function stringifyUrlQueryParam(param) {
  if (typeof param === 'string' || typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
    return String(param);
  } else {
    return '';
  }
}

function urlQueryToSearchParams(urlQuery) {
  const result = new URLSearchParams();
  Object.entries(urlQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => result.append(key, stringifyUrlQueryParam(item)));
    } else {
      result.set(key, stringifyUrlQueryParam(value));
    }
  });
  return result;
}

function assign(target, ...searchParamsList) {
  searchParamsList.forEach(searchParams => {
    Array.from(searchParams.keys()).forEach(key => target.delete(key));
    searchParams.forEach((value, key) => target.append(key, value));
  });
  return target;
}

/***/ }),

/***/ "3wub":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.normalizeLocalePath = normalizeLocalePath;

function normalizeLocalePath(pathname, locales) {
  let detectedLocale; // first item will be empty string from splitting at first char

  const pathnameParts = pathname.split('/');
  (locales || []).some(locale => {
    if (pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
      detectedLocale = locale;
      pathnameParts.splice(1, 1);
      pathname = pathnameParts.join('/') || '/';
      return true;
    }

    return false;
  });
  return {
    pathname,
    detectedLocale
  };
}

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "610+":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"modal": "layout-menu_modal__1lk81"
};


/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Wn2j");


/***/ }),

/***/ "6D7l":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.formatUrl = formatUrl;

var querystring = _interopRequireWildcard(__webpack_require__("3WeD"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
} // Format function modified from nodejs
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


const slashedProtocols = /https?|ftp|gopher|file/;

function formatUrl(urlObj) {
  let {
    auth,
    hostname
  } = urlObj;
  let protocol = urlObj.protocol || '';
  let pathname = urlObj.pathname || '';
  let hash = urlObj.hash || '';
  let query = urlObj.query || '';
  let host = false;
  auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';

  if (urlObj.host) {
    host = auth + urlObj.host;
  } else if (hostname) {
    host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);

    if (urlObj.port) {
      host += ':' + urlObj.port;
    }
  }

  if (query && typeof query === 'object') {
    query = String(querystring.urlQueryToSearchParams(query));
  }

  let search = urlObj.search || query && `?${query}` || '';
  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash[0] !== '#') hash = '#' + hash;
  if (search && search[0] !== '?') search = '?' + search;
  pathname = pathname.replace(/[?#]/g, encodeURIComponent);
  search = search.replace('#', '%23');
  return `${protocol}${host}${pathname}${search}${hash}`;
}

/***/ }),

/***/ "6mnf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.__esModule = true;
exports.compileNonPath = compileNonPath;
exports.default = prepareDestination;

var _querystring = __webpack_require__("3WeD");

var _parseRelativeUrl = __webpack_require__("hS4m");

var pathToRegexp = _interopRequireWildcard(__webpack_require__("zOyy"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function compileNonPath(value, params) {
  if (!value.includes(':')) {
    return value;
  }

  for (const key of Object.keys(params)) {
    if (value.includes(`:${key}`)) {
      value = value.replace(new RegExp(`:${key}\\*`, 'g'), `:${key}--ESCAPED_PARAM_ASTERISKS`).replace(new RegExp(`:${key}\\?`, 'g'), `:${key}--ESCAPED_PARAM_QUESTION`).replace(new RegExp(`:${key}\\+`, 'g'), `:${key}--ESCAPED_PARAM_PLUS`).replace(new RegExp(`:${key}(?!\\w)`, 'g'), `--ESCAPED_PARAM_COLON${key}`);
    }
  }

  value = value.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, '\\$1').replace(/--ESCAPED_PARAM_PLUS/g, '+').replace(/--ESCAPED_PARAM_COLON/g, ':').replace(/--ESCAPED_PARAM_QUESTION/g, '?').replace(/--ESCAPED_PARAM_ASTERISKS/g, '*'); // the value needs to start with a forward-slash to be compiled
  // correctly

  return pathToRegexp.compile(`/${value}`, {
    validate: false
  })(params).substr(1);
}

function prepareDestination(destination, params, query, appendParamsToQuery) {
  let parsedDestination = {}; // clone query so we don't modify the original

  query = Object.assign({}, query);
  const hadLocale = query.__nextLocale;
  delete query.__nextLocale;
  delete query.__nextDefaultLocale;

  if (destination.startsWith('/')) {
    parsedDestination = (0, _parseRelativeUrl.parseRelativeUrl)(destination);
  } else {
    const {
      pathname,
      searchParams,
      hash,
      hostname,
      port,
      protocol,
      search,
      href
    } = new URL(destination);
    parsedDestination = {
      pathname,
      query: (0, _querystring.searchParamsToUrlQuery)(searchParams),
      hash,
      protocol,
      hostname,
      port,
      search,
      href
    };
  }

  const destQuery = parsedDestination.query;
  const destPath = `${parsedDestination.pathname}${parsedDestination.hash || ''}`;
  const destPathParamKeys = [];
  pathToRegexp.pathToRegexp(destPath, destPathParamKeys);
  const destPathParams = destPathParamKeys.map(key => key.name);
  let destinationCompiler = pathToRegexp.compile(destPath, // we don't validate while compiling the destination since we should
  // have already validated before we got to this point and validating
  // breaks compiling destinations with named pattern params from the source
  // e.g. /something:hello(.*) -> /another/:hello is broken with validation
  // since compile validation is meant for reversing and not for inserting
  // params from a separate path-regex into another
  {
    validate: false
  });
  let newUrl; // update any params in query values

  for (const [key, strOrArray] of Object.entries(destQuery)) {
    let value = Array.isArray(strOrArray) ? strOrArray[0] : strOrArray;

    if (value) {
      // the value needs to start with a forward-slash to be compiled
      // correctly
      value = compileNonPath(value, params);
    }

    destQuery[key] = value;
  } // add path params to query if it's not a redirect and not
  // already defined in destination query or path


  let paramKeys = Object.keys(params); // remove internal param for i18n

  if (hadLocale) {
    paramKeys = paramKeys.filter(name => name !== 'nextInternalLocale');
  }

  if (appendParamsToQuery && !paramKeys.some(key => destPathParams.includes(key))) {
    for (const key of paramKeys) {
      if (!(key in destQuery)) {
        destQuery[key] = params[key];
      }
    }
  }

  try {
    newUrl = destinationCompiler(params);
    const [pathname, hash] = newUrl.split('#');
    parsedDestination.pathname = pathname;
    parsedDestination.hash = `${hash ? '#' : ''}${hash || ''}`;
    delete parsedDestination.search;
  } catch (err) {
    if (err.message.match(/Expected .*? to not repeat, but got an array/)) {
      throw new Error(`To use a multi-match in the destination you must add \`*\` at the end of the param name to signify it should repeat. https://err.sh/vercel/next.js/invalid-multi-match`);
    }

    throw err;
  } // Query merge order lowest priority to highest
  // 1. initial URL query values
  // 2. path segment values
  // 3. destination specified query values


  parsedDestination.query = _objectSpread(_objectSpread({}, query), parsedDestination.query);
  return {
    newUrl,
    parsedDestination
  };
}

/***/ }),

/***/ "7GvT":
/***/ (function(module, exports) {

module.exports = require("antd/lib/empty");

/***/ }),

/***/ "7KCV":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("C+bE");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "A4pX":
/***/ (function(module, exports) {

module.exports = require("antd/lib/select");

/***/ }),

/***/ "AroE":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "C+bE":
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "FK4W":
/***/ (function(module, exports) {

module.exports = require("wil-react-sticky");

/***/ }),

/***/ "Gss8":
/***/ (function(module, exports) {

module.exports = require("antd/lib/notification");

/***/ }),

/***/ "Gv1R":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("VzA1");
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("a5Fm");
/* harmony import */ var antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_layout_menu_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("610+");
/* harmony import */ var _components_layout_menu_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_layout_menu_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("nZwT");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("VXtC");
/* harmony import */ var _components_icon_admin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("c9em");













const LayoutMenu = ({
  dataProfile,
  sidemenu,
  coll,
  collsmall,
  st,
  handleCollSmall
}) => {
  const userFeat = [107, 108, 109, 110, 111, 112, 132, 119, 118, 117, 116, 115, 114, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143];
  const featureFeat = [173, 174, 175, 176, 177, 178, 179, 180, 181, 182];
  const serviceFeat = [183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206];
  const companyFeat = [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163];
  const depreFeat = [169, 170, 171, 172];
  const ticketFeat = [107, 108, 109, 110, 111, 112, 113]; // const isIncludesFeat = (curr) => dataProfile.data.registered_feature.includes(curr);

  const {
    SubMenu
  } = antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a;
  const {
    Sider
  } = antd_lib_layout__WEBPACK_IMPORTED_MODULE_1___default.a; // const [collsmall, setCollsmall] = useState(true)
  // const handleCollSmall = () => {
  //     setCollsmall(prev => !prev)
  // };

  const click = () => {
    undefined.props.parentMethod();
  };

  const ticketIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
    width: "1em",
    height: "1em",
    fill: "currentColor",
    viewBox: "0 0 32 32",
    children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M18 10l4 4-8 8-4-4zM31.298 9.297l-2.297-2.297-1 1c-0.512 0.512-1.219 0.828-2 0.828-1.562 0-2.829-1.266-2.829-2.828 0-0.781 0.317-1.489 0.829-2.001l1-1-2.297-2.297c-0.936-0.936-2.469-0.936-3.405 0l-18.595 18.595c-0.936 0.936-0.936 2.469 0 3.405l2.297 2.297 0.999-0.999c0.512-0.513 1.22-0.83 2.001-0.83 1.562 0 2.828 1.266 2.828 2.828 0 0.781-0.317 1.489-0.829 2.001l-1 1 2.297 2.297c0.936 0.936 2.469 0.936 3.405 0l18.595-18.595c0.936-0.937 0.936-2.469 0-3.406zM14 26l-8-8 12-12 8 8-12 12z"
    })
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
      className: `${_components_layout_menu_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.modal}`,
      hidden: collsmall,
      onClick: handleCollSmall
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(Sider, {
      collapsible: true,
      collapsed: coll,
      trigger: null,
      width: 230,
      theme: "light",
      className: `${st.siderLayout} sider`,
      style: {
        borderRight: `1px solid #f0f0f0`,
        height: '100%'
      },
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
        className: "logo flex items-center justify-center my-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
          src: "/image/Brand.png",
          alt: "brand",
          className: `object-contain w-12 h-12 ${!coll && "mr-0"}`
        }), !coll && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("h1", {
          className: "text-sm mb-0",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
            className: "font-bold text-2xl mb-0",
            children: "MIG"
          }), " sys"]
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a, {
        theme: "light",
        mode: "inline",
        defaultSelectedKeys: [sidemenu],
        triggerSubMenuAction: "hover",
        children: [!coll && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
          className: `mb-2 ${coll ? "text-xs" : "text-sm"} font-sans text-gray-400 md:pl-6`,
          children: "MENU SITUS"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* DashboardIconSvg */ "v"], {}),
          title: "Dashboard",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
            href: "/dashboard/home",
            children: "Dashboard"
          })
        }, "1"), dataProfile.data.role === 1 ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* TicketIconSvg */ "gb"], {
            size: 20,
            color: `#597e8d`
          }),
          title: "Tickets",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
            href: "/tickets",
            children: "Ticket"
          })
        }, "2") : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
          children: dataProfile.data.features.includes(107) && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* TicketIconSvg */ "gb"], {
              size: 20,
              color: `#597e8d`
            }),
            title: "Tickets",
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/tickets",
              children: "Ticket"
            })
          }, "2")
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
          title: "Task",
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* TaskIconSvg */ "fb"], {}),
          children: [
          /*#__PURE__*/
          // [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* TaskIconSvg */ "fb"], {}),
            title: "Admin Task",
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/tasks/admin",
              children: "Admin Task"
            })
          }, "201"),
          /*#__PURE__*/
          // [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* TaskIconSvg */ "fb"], {}),
            title: "My Task",
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/tasks/mytask",
              children: "My Task"
            })
          }, "202")]
        }, "20"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* ItemIconSvg */ "G"], {}),
          title: "Items",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
            href: "/items",
            children: "Items"
          })
        }, "3"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
          style: {
            marginBottom: `1.5rem`
          },
          title: "Perusahaan",
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* CompanyIconSvg */ "s"], {}),
          children: [
          /*#__PURE__*/
          // [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/company/myCompany",
              children: "Profil Perusahaan"
            })
          }, "51"),
          /*#__PURE__*/
          // [155, 156, 157, 158, 159, 160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/company/clients",
              children: "Klien"
            })
          }, "52")]
        }, "5"), !coll && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
          className: `mb-2 ${coll ? "text-xs" : "text-sm"} font-sans text-gray-400 md:pl-6`,
          children: "MANAJEMEN"
        }),
        /*#__PURE__*/
        // userFeat.every(isIncludesFeat) ?
        Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
          title: "Pengguna",
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* UserIconSvg */ "ib"], {}),
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/agents",
              children: "Agents"
            })
          }, "61"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/requesters",
              children: "Requesters"
            })
          }, "62"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/groups",
              children: "Groups"
            })
          }, "63")]
        }, "6") // :
        // null
        , /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
          title: "Fitur",
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* FiturIconSvg */ "C"], {}),
          children: [
          /*#__PURE__*/
          // [173, 174, 175, 176, 177, 178].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/roles",
              children: "Roles"
            })
          }, "71"),
          /*#__PURE__*/
          // [179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/modules?module=&featuredisplay=",
              children: "Modules"
            })
          }, "72")]
        }, "7"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
          title: "Aset",
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* AsetIconSvg */ "g"], {}),
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/assets",
              children: "Asset Types"
            })
          }, "81"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/models",
              children: "Models"
            })
          }, "82"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/vendors",
              children: "Vendors"
            })
          }, "83"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/manufacturers",
              children: "Manufacturers"
            })
          }, "84"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/relationships",
              children: "Relationship Type"
            })
          }, "85")]
        }, "8"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__["SettingOutlined"], {}),
          title: "Admin",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__["SettingOutlined"], {}),
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/dashboard/admin",
              children: "Admin"
            })
          }, "41"),
          /*#__PURE__*/
          // userFeat.every(isIncludesFeat) ?
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
            title: "Users Management",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconAgents */ "a"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/agents",
                children: "Agents"
              })
            }, "421"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconRequesters */ "l"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/requesters",
                children: "Requesters"
              })
            }, "422"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* Icongroups */ "o"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/groups",
                children: "Groups"
              })
            }, "423")]
          }, "42") // :
          // null
          , /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
            title: "Features Management",
            children: [
            /*#__PURE__*/
            // [173, 174, 175, 176, 177, 178].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconRoles */ "m"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/roles",
                children: "Roles"
              })
            }, "431"),
            /*#__PURE__*/
            // [179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconModules */ "k"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/modules?module=&featuredisplay=",
                children: "Modules"
              })
            }, "432")]
          }, "43"),
          /*#__PURE__*/
          // companyFeat.every(isIncludesFeat) ?
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
            title: "Company Management",
            children: [
            /*#__PURE__*/
            // [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconMIGCompany */ "i"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/myCompany",
                children: "My Company"
              })
            }, "441"),
            /*#__PURE__*/
            // [155, 156, 157, 158, 159, 160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconClientsCompany */ "e"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/clients",
                children: "Clients"
              })
            }, "442")]
          }, "44") // :
          // null
          , /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
            title: "Assets",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconAssets */ "b"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/assets",
                children: "Asset Types"
              })
            }, "451"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconAssets */ "b"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/models",
                children: "Models"
              })
            }, "452"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconVendors */ "n"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/vendors",
                children: "Vendors"
              })
            }, "453"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconVendors */ "n"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/manufacturers",
                children: "Manufacturers"
              })
            }, "454"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconAssets */ "b"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/relationships",
                children: "Relationship Type"
              })
            }, "455")]
          }, "45"),
          /*#__PURE__*/
          // serviceFeat.every(isIncludesFeat) ?
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
            title: "Service Management",
            children: [
            /*#__PURE__*/
            // [183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193].every(isIncludesFeat) &&
            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconCatalog */ "d"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/service",
                children: "Service Catalog"
              })
            }, "461"),
            /*#__PURE__*/
            // [194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206].every(isIncludesFeat) &&
            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconContract */ "f"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/contracts",
                children: "Contracts"
              })
            }, "462")]
          }, "46") // :
          // null
          ,
          /*#__PURE__*/
          // depreFeat.every(isIncludesFeat) ?
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(SubMenu, {
            title: "Financial Management",
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconDepreciation */ "g"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/financial",
                children: "Depreciation"
              })
            }, "471")
          }, "47") // :
          // null
          , /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
            title: "MIG CMS",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconCareer */ "c"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/careers",
                children: "Careers"
              })
            }, "481"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconMessages */ "j"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/messages",
                children: "Messages"
              })
            }, "482")]
          }, "48")]
        }, "4")]
      })]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(Sider, {
      collapsible: true,
      collapsed: collsmall,
      trigger: null,
      collapsedWidth: 0,
      width: 250,
      theme: "light",
      className: st.siderLayoutSmall,
      style: {
        borderRight: `1px solid #f0f0f0`,
        position: 'absolute',
        height: `100%`,
        backgroundColor: 'white',
        zIndex: '40'
      },
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
        className: "logo flex items-center justify-center my-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
          src: "/image/Brand.png",
          alt: "brand",
          className: `object-contain w-12 h-12 ${!collsmall && "mr-0"}`
        }), !coll && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("h1", {
          className: "text-sm mb-0",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
            className: "font-bold text-2xl mb-0",
            children: "MIG"
          }), " sys"]
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a, {
        theme: "light",
        mode: "inline",
        defaultSelectedKeys: [sidemenu],
        children: [!collsmall && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
          className: `mb-2 ${coll ? "text-xs" : "text-sm"} font-sans text-gray-400 md:pl-6`,
          children: "MENU SITUS"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__["DashboardTwoTone"], {}),
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
            href: "/dashboard/home",
            children: "Dashboard"
          })
        }, "1"), dataProfile.data.role === 1 ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* TicketIconSvg */ "gb"], {
            size: 20,
            color: `#597e8d`
          }),
          title: "Tickets",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
            href: "/tickets",
            children: "Ticket"
          })
        }, "2") : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
          children: dataProfile.data.features.includes(107) && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* TicketIconSvg */ "gb"], {
              size: 20,
              color: `#597e8d`
            }),
            title: "Tickets",
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/tickets",
              children: "Ticket"
            })
          }, "2")
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* TaskIconSvg */ "fb"], {}),
          title: "Task",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
            href: "/tasks",
            children: "Task"
          })
        }, "20"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* ItemIconSvg */ "G"], {}),
          title: "Items",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
            href: "/items",
            children: "Inventori"
          })
        }, "3"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
          style: {
            marginBottom: `1.5rem`
          },
          title: "Perusahaan",
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* CompanyIconSvg */ "s"], {}),
          children: [
          /*#__PURE__*/
          // [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/company/myCompany",
              children: "Profil Perusahaan"
            })
          }, "51"),
          /*#__PURE__*/
          // [155, 156, 157, 158, 159, 160, 161, 162, 163].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/company/clients",
              children: "Klien"
            })
          }, "52")]
        }, "5"), !collsmall && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
          className: `mb-2 ${collsmall ? "text-xs" : "text-sm"} font-sans text-gray-400 md:pl-6`,
          children: "MANAJEMEN"
        }),
        /*#__PURE__*/
        // userFeat.every(isIncludesFeat) ?
        Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
          title: "Pengguna",
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* UserIconSvg */ "ib"], {}),
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/agents",
              children: "Agents"
            })
          }, "61"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/requesters",
              children: "Requesters"
            })
          }, "62"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/groups",
              children: "Groups"
            })
          }, "63")]
        }, "6") // :
        // null
        , /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
          title: "Fitur",
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* FiturIconSvg */ "C"], {}),
          children: [
          /*#__PURE__*/
          // [173, 174, 175, 176, 177, 178].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/roles",
              children: "Roles"
            })
          }, "71"),
          /*#__PURE__*/
          // [179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/modules?module=&featuredisplay=",
              children: "Modules"
            })
          }, "72")]
        }, "7"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
          title: "Aset",
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* AsetIconSvg */ "g"], {}),
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/assets",
              children: "Asset Types"
            })
          }, "81"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/models",
              children: "Models"
            })
          }, "82"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/vendors",
              children: "Vendors"
            })
          }, "83"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/manufacturers",
              children: "Manufacturers"
            })
          }, "84"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/admin/relationships",
              children: "Relationship Type"
            })
          }, "85")]
        }, "8"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
          icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__["SettingOutlined"], {}),
          title: "Assets",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
            icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__["SettingOutlined"], {}),
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
              href: "/dashboard/admin",
              children: "Admin"
            })
          }, "41"),
          /*#__PURE__*/
          // userFeat.every(isIncludesFeat) ?
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
            title: "Users Management",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconAgents */ "a"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/agents",
                children: "Agents"
              })
            }, "421"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconRequesters */ "l"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/requesters",
                children: "Requesters"
              })
            }, "422"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* Icongroups */ "o"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/groups",
                children: "Groups"
              })
            }, "423")]
          }, "42") // :
          // null
          , /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
            title: "Features Management",
            children: [
            /*#__PURE__*/
            // [173, 174, 175, 176, 177, 178].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconRoles */ "m"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/roles",
                children: "Roles"
              })
            }, "431"),
            /*#__PURE__*/
            // [179, 180, 181, 182].every((curr) => dataProfile.data.registered_feature.includes(curr)) &&
            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconModules */ "k"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/modules?module=&featuredisplay=",
                children: "Modules"
              })
            }, "432")]
          }, "43"),
          /*#__PURE__*/
          // dataProfile.data.registered_feature.includes(144) && dataProfile.data.registered_feature.includes(155) && dataProfile.data.registered_feature.includes(150) ?
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
            title: "Company Management",
            children: [
            /*#__PURE__*/
            // dataProfile.data.registered_feature.includes(144) &&
            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconMIGCompany */ "i"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/myCompany",
                children: "My Company"
              })
            }, "4141"),
            /*#__PURE__*/
            // dataProfile.data.registered_feature.includes(155) &&
            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconClientsCompany */ "e"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/clients",
                children: "Clients"
              })
            }, "442")]
          }, "44") // :
          // null
          , /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
            title: "Assets",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconAssets */ "b"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/assets",
                children: "Asset Types"
              })
            }, "451"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconAssets */ "b"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/models",
                children: "Models"
              })
            }, "452"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconVendors */ "n"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/vendors",
                children: "Vendors"
              })
            }, "453"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconVendors */ "n"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/manufacturers",
                children: "Manufacturers"
              })
            }, "454"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconAssets */ "b"], {
                width: 25,
                height: 25
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/relationships",
                children: "Relationship Type"
              })
            }, "455")]
          }, "45"),
          /*#__PURE__*/
          // serviceFeat.every(isIncludesFeat) ?
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
            title: "Service Management",
            children: [
            /*#__PURE__*/
            // [183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193].every(isIncludesFeat) &&
            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconCatalog */ "d"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/service",
                children: "Service Catalog"
              })
            }, "461"),
            /*#__PURE__*/
            // [194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206].every(isIncludesFeat) &&
            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconContract */ "f"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/contracts",
                children: "Contracts"
              })
            }, "462")]
          }, "46") // :
          // null
          ,
          /*#__PURE__*/
          // depreFeat.every(isIncludesFeat) ?
          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(SubMenu, {
            title: "Financial Management",
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconDepreciation */ "g"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/financial",
                children: "Depreciation"
              })
            }, "471")
          }, "47") // :
          // null
          , /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(SubMenu, {
            title: "MIG CMS",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconCareer */ "c"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/careers",
                children: "Careers"
              })
            }, "481"), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_menu__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              icon: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_components_icon_admin__WEBPACK_IMPORTED_MODULE_8__[/* IconMessages */ "j"], {
                width: 20,
                height: 20
              }),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
                href: "/admin/messages",
                children: "Messages"
              })
            }, "482")]
          }, "48")]
        }, "4")]
      })]
    })]
  });
};

/* harmony default export */ __webpack_exports__["a"] = (LayoutMenu);

/***/ }),

/***/ "HJQg":
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ }),

/***/ "HgHO":
/***/ (function(module, exports) {

module.exports = require("antd/lib/dropdown");

/***/ }),

/***/ "N6Fi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.__esModule = true;
exports.pathToRegexp = exports.default = exports.customRouteMatcherOptions = exports.matcherOptions = void 0;

var pathToRegexp = _interopRequireWildcard(__webpack_require__("zOyy"));

exports.pathToRegexp = pathToRegexp;

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

const matcherOptions = {
  sensitive: false,
  delimiter: '/'
};
exports.matcherOptions = matcherOptions;

const customRouteMatcherOptions = _objectSpread(_objectSpread({}, matcherOptions), {}, {
  strict: true
});

exports.customRouteMatcherOptions = customRouteMatcherOptions;

var _default = (customRoute = false) => {
  return path => {
    const keys = [];
    const matcherRegex = pathToRegexp.pathToRegexp(path, keys, customRoute ? customRouteMatcherOptions : matcherOptions);
    const matcher = pathToRegexp.regexpToFunction(matcherRegex, keys);
    return (pathname, params) => {
      const res = pathname == null ? false : matcher(pathname);

      if (!res) {
        return false;
      }

      if (customRoute) {
        for (const key of keys) {
          // unnamed params should be removed as they
          // are not allowed to be used in the destination
          if (typeof key.name === 'number') {
            delete res.params[key.name];
          }
        }
      }

      return _objectSpread(_objectSpread({}, params), res.params);
    };
  };
};

exports.default = _default;

/***/ }),

/***/ "Nh2W":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.default = void 0;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__("UhrY"));

var _requestIdleCallback = _interopRequireDefault(__webpack_require__("0G5g")); // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.


const MS_MAX_IDLE_DELAY = 3800;

function withFuture(key, map, generator) {
  let entry = map.get(key);

  if (entry) {
    if ('future' in entry) {
      return entry.future;
    }

    return Promise.resolve(entry);
  }

  let resolver;
  const prom = new Promise(resolve => {
    resolver = resolve;
  });
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? // eslint-disable-next-line no-sequences
  generator().then(value => (resolver(value), value)) : prom;
}

function hasPrefetch(link) {
  try {
    link = document.createElement('link');
    return (// detect IE11 since it supports prefetch but isn't detected
      // with relList.support
      !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch')
    );
  } catch (_unused) {
    return false;
  }
}

const canPrefetch = hasPrefetch();

function prefetchViaDom(href, as, link) {
  return new Promise((res, rej) => {
    if (document.querySelector(`link[rel="prefetch"][href^="${href}"]`)) {
      return res();
    }

    link = document.createElement('link'); // The order of property assignment here is intentional:

    if (as) link.as = as;
    link.rel = `prefetch`;
    link.crossOrigin = undefined;
    link.onload = res;
    link.onerror = rej; // `href` should always be last:

    link.href = href;
    document.head.appendChild(link);
  });
}

const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR'); // TODO: unexport

function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}

function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}

function appendScript(src, script) {
  return new Promise((resolve, reject) => {
    script = document.createElement('script'); // The order of property assignment here is intentional.
    // 1. Setup success/failure hooks in case the browser synchronously
    //    executes when `src` is set.

    script.onload = resolve;

    script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`))); // 2. Configure the cross-origin attribute before setting `src` in case the
    //    browser begins to fetch.


    script.crossOrigin = undefined; // 3. Finally, set the source and inject into the DOM in case the child
    //    must be appended for fetching to start.

    script.src = src;
    document.body.appendChild(script);
  });
}

function idleTimeout(ms, err) {
  return new Promise((_resolve, reject) => (0, _requestIdleCallback.default)(() => setTimeout(() => reject(err), ms)));
} // TODO: stop exporting or cache the failure
// It'd be best to stop exporting this. It's an implementation detail. We're
// only exporting it for backwards compatibilty with the `page-loader`.
// Only cache this response as a last resort if we cannot eliminate all other
// code branches that use the Build Manifest Callback and push them through
// the Route Loader interface.


function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }

  const onBuildManifest = new Promise(resolve => {
    // Mandatory because this is not concurrent safe:
    const cb = self.__BUILD_MANIFEST_CB;

    self.__BUILD_MANIFEST_CB = () => {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return Promise.race([onBuildManifest, idleTimeout(MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')))]);
}

function getFilesForRoute(assetPrefix, route) {
  if (false) {}

  return getClientBuildManifest().then(manifest => {
    if (!(route in manifest)) {
      throw markAssetError(new Error(`Failed to lookup route: ${route}`));
    }

    const allFiles = manifest[route].map(entry => assetPrefix + '/_next/' + encodeURI(entry));
    return {
      scripts: allFiles.filter(v => v.endsWith('.js')),
      css: allFiles.filter(v => v.endsWith('.css'))
    };
  });
}

function createRouteLoader(assetPrefix) {
  const entrypoints = new Map();
  const loadedScripts = new Map();
  const styleSheets = new Map();
  const routes = new Map();

  function maybeExecuteScript(src) {
    let prom = loadedScripts.get(src);

    if (prom) {
      return prom;
    } // Skip executing script if it's already in the DOM:


    if (document.querySelector(`script[src^="${src}"]`)) {
      return Promise.resolve();
    }

    loadedScripts.set(src, prom = appendScript(src));
    return prom;
  }

  function fetchStyleSheet(href) {
    let prom = styleSheets.get(href);

    if (prom) {
      return prom;
    }

    styleSheets.set(href, prom = fetch(href).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load stylesheet: ${href}`);
      }

      return res.text().then(text => ({
        href: href,
        content: text
      }));
    }).catch(err => {
      throw markAssetError(err);
    }));
    return prom;
  }

  return {
    whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },

    onEntrypoint(route, execute) {
      Promise.resolve(execute).then(fn => fn()).then(exports => ({
        component: exports && exports.default || exports,
        exports: exports
      }), err => ({
        error: err
      })).then(input => {
        const old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && 'resolve' in old) old.resolve(input);
      });
    },

    loadRoute(route) {
      return withFuture(route, routes, async () => {
        try {
          const {
            scripts,
            css
          } = await getFilesForRoute(assetPrefix, route);
          const [, styles] = await Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);
          const entrypoint = await Promise.race([this.whenEntrypoint(route), idleTimeout(MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`)))]);
          const res = Object.assign({
            styles
          }, entrypoint);
          return 'error' in entrypoint ? entrypoint : res;
        } catch (err) {
          return {
            error: err
          };
        }
      });
    },

    prefetch(route) {
      // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
      // License: Apache 2.0
      let cn;

      if (cn = navigator.connection) {
        // Don't prefetch if using 2G or if Save-Data is enabled.
        if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
      }

      return getFilesForRoute(assetPrefix, route).then(output => Promise.all(canPrefetch ? output.scripts.map(script => prefetchViaDom(script, 'script')) : [])).then(() => {
        (0, _requestIdleCallback.default)(() => this.loadRoute(route));
      }).catch( // swallow prefetch errors
      () => {});
    }

  };
}

var _default = createRouteLoader;
exports.default = _default;

/***/ }),

/***/ "Nvpr":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons/PlusCircleTwoTone");

/***/ }),

/***/ "Osoz":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router-context.js");

/***/ }),

/***/ "P7gm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = resolveRewrites;

var _pathMatch = _interopRequireDefault(__webpack_require__("N6Fi"));

var _prepareDestination = _interopRequireDefault(__webpack_require__("6mnf"));

var _normalizeTrailingSlash = __webpack_require__("X24+");

var _normalizeLocalePath = __webpack_require__("3wub");

var _parseRelativeUrl = __webpack_require__("hS4m");

var _router = __webpack_require__("elyg");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const customRouteMatcher = (0, _pathMatch.default)(true);

function resolveRewrites(asPath, pages, rewrites, query, resolveHref, locales) {
  let matchedPage = false;
  let parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(asPath);
  let fsPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _normalizeLocalePath.normalizeLocalePath)((0, _router.delBasePath)(parsedAs.pathname), locales).pathname);
  let resolvedHref;

  if (!pages.includes(fsPathname)) {
    for (const rewrite of rewrites) {
      const matcher = customRouteMatcher(rewrite.source);
      const params = matcher(parsedAs.pathname);

      if (params) {
        if (!rewrite.destination) {
          // this is a proxied rewrite which isn't handled on the client
          break;
        }

        const destRes = (0, _prepareDestination.default)(rewrite.destination, params, query, true);
        parsedAs = destRes.parsedDestination;
        asPath = destRes.newUrl;
        Object.assign(query, destRes.parsedDestination.query);
        fsPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _normalizeLocalePath.normalizeLocalePath)((0, _router.delBasePath)(asPath), locales).pathname);

        if (pages.includes(fsPathname)) {
          // check if we now match a page as this means we are done
          // resolving the rewrites
          matchedPage = true;
          resolvedHref = fsPathname;
          break;
        } // check if we match a dynamic-route, if so we break the rewrites chain


        resolvedHref = resolveHref(fsPathname);

        if (resolvedHref !== asPath && pages.includes(resolvedHref)) {
          matchedPage = true;
          break;
        }
      }
    }
  }

  return {
    asPath,
    parsedAs,
    matchedPage,
    resolvedHref
  };
}

/***/ }),

/***/ "Puj+":
/***/ (function(module, exports) {

module.exports = require("antd/lib/table");

/***/ }),

/***/ "TMRn":
/***/ (function(module, exports) {

module.exports = require("antd/lib/breadcrumb");

/***/ }),

/***/ "UhrY":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ "Uqqx":
/***/ (function(module, exports) {

module.exports = require("antd/lib/input");

/***/ }),

/***/ "VXtC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return DashboardIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gb", function() { return TicketIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fb", function() { return TaskIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return ItemIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return CompanyIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ib", function() { return UserIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return FiturIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return AsetIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return SearchIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return NotifIconSvg; });
/* unused harmony export Aset2IconSvg */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return EditIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return EmailIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return PhoneIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lb", function() { return WebIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return LocationIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "db", function() { return SubLocationIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return ShareIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hb", function() { return TrashIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return CheckIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return BackIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bb", function() { return SortingIconSvg; });
/* unused harmony export DownIconSvg */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return ExternalLinkIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return CameraIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return RefreshIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cb", function() { return SquarePlusIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return ContractIconSvg; });
/* unused harmony export IconBroadcast */
/* unused harmony export Iconquestion */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return NotesIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return FaxIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return PkpIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return MoveIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AlertIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return ClockIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return ClipboardcheckIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return MappinIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return ListcheckIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return CalendartimeIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AlerttriangleIconSvg; });
/* unused harmony export UsercircleIconSvg */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return AlignJustifiedIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return CheckboxIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return BorderAllSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return ListNumbersSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return CopyIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return CircleXIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return RulerIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return AssetIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ArrowsSortIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jb", function() { return UserPlusIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return SortAscendingIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ab", function() { return SortDescendingIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return ForbidIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return PlayerPauseIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return PlayerPlayIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return CloudUploadIconSvg; });
/* unused harmony export PhotoIconSvg */
/* unused harmony export FileTextIconSvg */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return SendIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return LayoutGridAddSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return FilePlusIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eb", function() { return TableExportIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdjusmentsHorizontalIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return HistoryIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return FileExportIconSvg; });
/* unused harmony export DotsIconSvg */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kb", function() { return UserSearchIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return InfoCircleIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return PlusIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mb", function() { return XIconSvg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ArmChairlIconSvg; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("nZwT");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__);




const DashboardIconSvg = () => {
  const dashboardIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-home-2",
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#597e8d",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "5 12 3 12 12 3 21 12 19 12"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 10,
      y: 12,
      width: 4,
      height: 4
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: dashboardIconSvg
  });
};

const TicketIconSvg = ({
  size,
  color
}) => {
  const ticketIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-ticket",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 15,
      y1: 5,
      x2: 15,
      y2: 7
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 15,
      y1: 11,
      x2: 15,
      y2: 13
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 15,
      y1: 17,
      x2: 15,
      y2: 19
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: ticketIconSvg
  });
};

const TaskIconSvg = () => {
  const taskIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-clipboard-check",
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#597e8d",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 9,
      y: 3,
      width: 6,
      height: 4,
      rx: 2
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M9 14l2 2l4 -4"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: taskIconSvg
  });
};

const ItemIconSvg = () => {
  const itemIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-archive",
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#597e8d",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 3,
      y: 4,
      width: 18,
      height: 4,
      rx: 2
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 10,
      y1: 12,
      x2: 14,
      y2: 12
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: itemIconSvg
  });
};

const CompanyIconSvg = () => {
  const companyIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-building-skyscraper",
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#597e8d",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 3,
      y1: 21,
      x2: 21,
      y2: 21
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 21v-14l8 -4v18"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M19 21v-10l-6 -4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 9,
      x2: 9,
      y2: "9.01"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 12,
      x2: 9,
      y2: "12.01"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 15,
      x2: 9,
      y2: "15.01"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 18,
      x2: 9,
      y2: "18.01"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: companyIconSvg
  });
};

const UserIconSvg = () => {
  const userIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-users",
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#597e8d",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 9,
      cy: 7,
      r: 4
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M16 3.13a4 4 0 0 1 0 7.75"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M21 21v-2a4 4 0 0 0 -3 -3.85"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: userIconSvg
  });
};

const FiturIconSvg = () => {
  const fiturIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-stack",
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#597e8d",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "12 4 4 8 12 12 20 8 12 4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "4 12 12 16 20 12"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "4 16 12 20 20 16"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: fiturIconSvg
  });
};

const AsetIconSvg = () => {
  const asetIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-box",
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#597e8d",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 12,
      x2: 20,
      y2: "7.5"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 12,
      x2: 12,
      y2: 21
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 12,
      x2: 4,
      y2: "7.5"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: asetIconSvg
  });
};

const SearchIconSvg = ({
  size,
  color
}) => {
  const searchIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-search",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 10,
      cy: 10,
      r: 7
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 21,
      y1: 21,
      x2: 15,
      y2: 15
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: searchIconSvg
  });
};

const NotifIconSvg = () => {
  const notifIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-bell",
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#000000",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M9 17v1a3 3 0 0 0 6 0v-1"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: notifIconSvg
  });
};

const Aset2IconSvg = ({
  size,
  color
}) => {
  const aset2IconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-box",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 12,
      x2: 20,
      y2: "7.5"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 12,
      x2: 12,
      y2: 21
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 12,
      x2: 4,
      y2: "7.5"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: aset2IconSvg
  });
};

const EditIconSvg = ({
  size,
  color
}) => {
  const editIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-pencil",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: "13.5",
      y1: "6.5",
      x2: "17.5",
      y2: "10.5"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: editIconSvg
  });
};

const EmailIconSvg = ({
  size,
  color
}) => {
  const emailIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-mail",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 3,
      y: 5,
      width: 18,
      height: 14,
      rx: 2
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "3 7 12 13 21 7"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: emailIconSvg
  });
};

const PhoneIconSvg = ({
  size,
  color
}) => {
  const phoneIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-phone",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: phoneIconSvg
  });
};

const WebIconSvg = ({
  size,
  color
}) => {
  const webIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-world",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 12,
      cy: 12,
      r: 9
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: "3.6",
      y1: 9,
      x2: "20.4",
      y2: 9
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: "3.6",
      y1: 15,
      x2: "20.4",
      y2: 15
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M11.5 3a17 17 0 0 0 0 18"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M12.5 3a17 17 0 0 1 0 18"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: webIconSvg
  });
};

const LocationIconSvg = ({
  size,
  color,
  id
}) => {
  const locationIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-building-community",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 13,
      y1: 7,
      x2: 13,
      y2: "7.01"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 17,
      y1: 7,
      x2: 17,
      y2: "7.01"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 17,
      y1: 11,
      x2: 17,
      y2: "11.01"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 17,
      y1: 15,
      x2: 17,
      y2: "15.01"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    id: id,
    component: locationIconSvg
  });
};

const SubLocationIconSvg = ({
  size,
  color
}) => {
  const sublocationIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-building",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 3,
      y1: 21,
      x2: 21,
      y2: 21
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 8,
      x2: 10,
      y2: 8
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 12,
      x2: 10,
      y2: 12
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 16,
      x2: 10,
      y2: 16
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 14,
      y1: 8,
      x2: 15,
      y2: 8
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 14,
      y1: 12,
      x2: 15,
      y2: 12
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 14,
      y1: 16,
      x2: 15,
      y2: 16
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: sublocationIconSvg
  });
};

const ShareIconSvg = ({
  size,
  color
}) => {
  const shareIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-share",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 6,
      cy: 12,
      r: 3
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 18,
      cy: 6,
      r: 3
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 18,
      cy: 18,
      r: 3
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: "8.7",
      y1: "10.7",
      x2: "15.3",
      y2: "7.3"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: "8.7",
      y1: "13.3",
      x2: "15.3",
      y2: "16.7"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: shareIconSvg
  });
};

const TrashIconSvg = ({
  size,
  color
}) => {
  const trashIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-trash",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 4,
      y1: 7,
      x2: 20,
      y2: 7
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 10,
      y1: 11,
      x2: 10,
      y2: 17
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 14,
      y1: 11,
      x2: 14,
      y2: 17
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: trashIconSvg
  });
};

const CheckIconSvg = ({
  size,
  color
}) => {
  const checkIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-check",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 12l5 5l10 -10"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: checkIconSvg
  });
};

const BackIconSvg = ({
  size,
  color
}) => {
  const backIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-arrow-back-up",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: backIconSvg
  });
};

const SortingIconSvg = ({
  size,
  color
}) => {
  const sortingIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-sort-ascending-letters",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M15 10v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M19 21h-4l4 -7h-4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M4 15l3 3l3 -3"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M7 6v12"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: sortingIconSvg
  });
};

const DownIconSvg = ({
  size,
  color
}) => {
  const downIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-chevron-down",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "6 9 12 15 18 9"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: downIconSvg
  });
};

const ExternalLinkIconSvg = ({
  size,
  color
}) => {
  const externallinkIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-external-link",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 10,
      y1: 14,
      x2: 20,
      y2: 4
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "15 4 20 4 20 9"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: externallinkIconSvg
  });
};

const CameraIconSvg = ({
  size,
  color
}) => {
  const cameraIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-camera",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 12,
      cy: 13,
      r: 3
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: cameraIconSvg
  });
};

const RefreshIconSvg = ({
  size,
  color
}) => {
  const refreshIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-refresh",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: refreshIconSvg
  });
};

const SquarePlusIconSvg = ({
  size,
  color
}) => {
  const squareplusIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-square-plus",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 4,
      y: 4,
      width: 16,
      height: 16,
      rx: 2
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 12,
      x2: 15,
      y2: 12
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 9,
      x2: 12,
      y2: 15
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: squareplusIconSvg
  });
};

const NotesIconSvg = ({
  size,
  color
}) => {
  const notesIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-notes",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 5,
      y: 3,
      width: 14,
      height: 18,
      rx: 2
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 7,
      x2: 15,
      y2: 7
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 11,
      x2: 15,
      y2: 11
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 15,
      x2: 13,
      y2: 15
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: notesIconSvg
  });
};

const FaxIconSvg = ({
  size,
  color
}) => {
  const faxIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-printer",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 7,
      y: 13,
      width: 10,
      height: 8,
      rx: 2
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: faxIconSvg
  });
};

const PkpIconSvg = ({
  size,
  color
}) => {
  const pkpIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-receipt-tax",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 14,
      x2: 15,
      y2: 8
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: "9.5",
      cy: "8.5",
      r: ".5",
      fill: "currentColor"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: "14.5",
      cy: "13.5",
      r: ".5",
      fill: "currentColor"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: pkpIconSvg
  });
};

const AlertIconSvg = ({
  size,
  color
}) => {
  const alertIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-alert-circle",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 12,
      cy: 12,
      r: 9
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 8,
      x2: 12,
      y2: 12
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 16,
      x2: "12.01",
      y2: 16
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: alertIconSvg
  });
};

const AlerttriangleIconSvg = ({
  size,
  color
}) => {
  const alerttriangleIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-alert-triangle",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M12 9v2m0 4v.01"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: alerttriangleIconSvg
  });
};

const ClockIconSvg = ({
  size,
  color
}) => {
  const clockIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-clock",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 12,
      cy: 12,
      r: 9
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "12 7 12 12 15 15"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: clockIconSvg
  });
};

const ClipboardcheckIconSvg = ({
  size,
  color
}) => {
  const clipboardcheckIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-clipboard-check",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 9,
      y: 3,
      width: 6,
      height: 4,
      rx: 2
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M9 14l2 2l4 -4"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: clipboardcheckIconSvg
  });
};

const CalendartimeIconSvg = ({
  size,
  color
}) => {
  const calendartimeIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-calendar-time",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 18,
      cy: 18,
      r: 4
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M15 3v4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M7 3v4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M3 11h16"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M18 16.496v1.504l1 1"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: calendartimeIconSvg
  });
};

const MappinIconSvg = ({
  size,
  color
}) => {
  const mappinIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-map-pin",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 12,
      cy: 11,
      r: 3
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: mappinIconSvg
  });
};

const AlignJustifiedIconSvg = ({
  size,
  color
}) => {
  const alignjustifiedIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-align-justified",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 4,
      y1: 6,
      x2: 20,
      y2: 6
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 4,
      y1: 12,
      x2: 20,
      y2: 12
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 4,
      y1: 18,
      x2: 16,
      y2: 18
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: alignjustifiedIconSvg
  });
};

const CheckboxIconSvg = ({
  size,
  color
}) => {
  const checkboxIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-checkbox",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "9 11 12 14 20 6"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: checkboxIconSvg
  });
};

const BorderAllSvg = ({
  size,
  color
}) => {
  const borderallSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-border-all",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 4,
      y: 4,
      width: 16,
      height: 16,
      rx: 2
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 4,
      y1: 12,
      x2: 20,
      y2: 12
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 4,
      x2: 12,
      y2: 20
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: borderallSvg
  });
};

const ListNumbersSvg = ({
  size,
  color
}) => {
  const listnumbersSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-list-numbers",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M11 6h9"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M11 12h9"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M12 18h8"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M6 10v-6l-2 2"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: listnumbersSvg
  });
};

const ListcheckIconSvg = ({
  size,
  color
}) => {
  const listcheckIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-list-check",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M3.5 5.5l1.5 1.5l2.5 -2.5"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M3.5 11.5l1.5 1.5l2.5 -2.5"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M3.5 17.5l1.5 1.5l2.5 -2.5"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 11,
      y1: 6,
      x2: 20,
      y2: 6
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 11,
      y1: 12,
      x2: 20,
      y2: 12
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 11,
      y1: 18,
      x2: 20,
      y2: 18
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: listcheckIconSvg
  });
};

const CopyIconSvg = ({
  size,
  color
}) => {
  const copyIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-copy",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 8,
      y: 8,
      width: 12,
      height: 12,
      rx: 2
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: copyIconSvg
  });
};

const ArrowsSortIconSvg = ({
  size,
  color
}) => {
  const arrowsSortIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-arrows-sort",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M3 9l4 -4l4 4m-4 -4v14"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M21 15l-4 4l-4 -4m4 4v-14"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: arrowsSortIconSvg
  });
};

const UsercircleIconSvg = ({
  size,
  color
}) => {
  const usercircleIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-user-circle",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 12,
      cy: 12,
      r: 9
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 12,
      cy: 10,
      r: 3
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: usercircleIconSvg
  });
};

const CircleXIconSvg = ({
  size,
  color
}) => {
  const circlexIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-circle-x",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 12,
      cy: 12,
      r: 9
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M10 10l4 4m0 -4l-4 4"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: circlexIconSvg
  });
};

const RulerIconSvg = ({
  size,
  color
}) => {
  const rulerIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-ruler",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-7a1 1 0 0 0 -1 1v7a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 4,
      y1: 8,
      x2: 6,
      y2: 8
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 4,
      y1: 12,
      x2: 7,
      y2: 12
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 4,
      y1: 16,
      x2: 6,
      y2: 16
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 8,
      y1: 4,
      x2: 8,
      y2: 6
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "12 4 12 7 "
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "16 4 16 6 "
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: rulerIconSvg
  });
};

const UserPlusIconSvg = ({
  size,
  color
}) => {
  const userPlusIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-user-plus",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 9,
      cy: 7,
      r: 4
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M16 11h6m-3 -3v6"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: userPlusIconSvg
  });
};

const SortAscendingIconSvg = ({
  size,
  color
}) => {
  const sortAscendingIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-sort-ascending-letters",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M15 10v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M19 21h-4l4 -7h-4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M4 15l3 3l3 -3"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M7 6v12"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: sortAscendingIconSvg
  });
};

const SortDescendingIconSvg = ({
  size,
  color
}) => {
  const sortDescendingIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-sort-descending-letters",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M15 21v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M19 10h-4l4 -7h-4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M4 15l3 3l3 -3"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M7 6v12"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: sortDescendingIconSvg
  });
};

const ForbidIconSvg = ({
  size,
  color
}) => {
  const forbidIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-forbid",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 12,
      cy: 12,
      r: 9
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 9,
      x2: 15,
      y2: 15
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: forbidIconSvg
  });
};

const PlayerPauseIconSvg = ({
  size,
  color
}) => {
  const playerPauseIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-player-pause",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 6,
      y: 5,
      width: 4,
      height: 14,
      rx: 1
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 14,
      y: 5,
      width: 4,
      height: 14,
      rx: 1
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: playerPauseIconSvg
  });
};

const PlayerPlayIconSvg = ({
  size,
  color
}) => {
  const playerPlayIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-player-play",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M7 4v16l13 -8z"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: playerPlayIconSvg
  });
};

const CloudUploadIconSvg = ({
  size,
  color
}) => {
  const cloudUploadIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-cloud-upload",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "9 15 12 12 15 15"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 12,
      x2: 12,
      y2: 21
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: cloudUploadIconSvg
  });
};

const PhotoIconSvg = ({
  size,
  color
}) => {
  const photoIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-photo",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 15,
      y1: 8,
      x2: "15.01",
      y2: 8
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 4,
      y: 4,
      width: 16,
      height: 16,
      rx: 3
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M4 15l4 -4a3 5 0 0 1 3 0l5 5"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M14 14l1 -1a3 5 0 0 1 3 0l2 2"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: photoIconSvg
  });
};

const FileTextIconSvg = ({
  size,
  color
}) => {
  const fileTextIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-file-text",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M14 3v4a1 1 0 0 0 1 1h4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 9,
      x2: 10,
      y2: 9
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 13,
      x2: 15,
      y2: 13
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 17,
      x2: 15,
      y2: 17
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: fileTextIconSvg
  });
};

const SendIconSvg = ({
  size,
  color
}) => {
  const sendIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-send",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 10,
      y1: 14,
      x2: 21,
      y2: 3
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: sendIconSvg
  });
};

const LayoutGridAddSvg = ({
  size,
  color
}) => {
  const layoutGridAddSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-layout-grid-add",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 4,
      y: 4,
      width: 6,
      height: 6,
      rx: 1
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 14,
      y: 4,
      width: 6,
      height: 6,
      rx: 1
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
      x: 4,
      y: 14,
      width: 6,
      height: 6,
      rx: 1
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M14 17h6m-3 -3v6"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: layoutGridAddSvg
  });
};

const FilePlusIconSvg = ({
  size,
  color
}) => {
  const filePlusIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-file-plus",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M14 3v4a1 1 0 0 0 1 1h4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 11,
      x2: 12,
      y2: 17
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 9,
      y1: 14,
      x2: 15,
      y2: 14
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: filePlusIconSvg
  });
};

const TableExportIconSvg = ({
  size,
  color
}) => {
  const tableExportIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-table-export",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M11.5 20h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v7.5m-16 -3.5h16m-10 -6v16m4 -1h7m-3 -3l3 3l-3 3"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: tableExportIconSvg
  });
};

const FileExportIconSvg = ({
  size,
  color
}) => {
  const fileExportIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-file-export",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M14 3v4a1 1 0 0 0 1 1h4"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: fileExportIconSvg
  });
};

const DotsIconSvg = ({
  size,
  color
}) => {
  const dotsIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-dots",
    width: 44,
    height: 44,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 5,
      cy: 12,
      r: 1
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 12,
      cy: 12,
      r: 1
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 19,
      cy: 12,
      r: 1
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: dotsIconSvg
  });
};

const UserSearchIconSvg = ({
  size,
  color
}) => {
  const userSearchIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-user-search",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 12,
      cy: 7,
      r: 4
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M6 21v-2a4 4 0 0 1 4 -4h1"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: "16.5",
      cy: "17.5",
      r: "2.5"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M18.5 19.5l2.5 2.5"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: userSearchIconSvg
  });
};

const InfoCircleIconSvg = ({
  size,
  color
}) => {
  const infoCircleIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-info-circle",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 12,
      cy: 12,
      r: 9
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 8,
      x2: "12.01",
      y2: 8
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "11 12 12 12 12 16 13 16"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: infoCircleIconSvg
  });
};

const PlusIconSvg = ({
  size,
  color
}) => {
  const plusIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-plus",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 12,
      y1: 5,
      x2: 12,
      y2: 19
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 5,
      y1: 12,
      x2: 19,
      y2: 12
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: plusIconSvg
  });
};

const XIconSvg = ({
  size,
  color
}) => {
  const xIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-x",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 18,
      y1: 6,
      x2: 6,
      y2: 18
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 6,
      y1: 6,
      x2: 18,
      y2: 18
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: xIconSvg
  });
};

const HistoryIconSvg = ({
  size,
  color
}) => {
  const historyIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-history",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polyline", {
      points: "12 8 12 12 14 14"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: historyIconSvg
  });
};

const AdjusmentsHorizontalIconSvg = ({
  size,
  color
}) => {
  const adjusmentsHorizontalIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-adjustments-horizontal",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: color,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 14,
      cy: 6,
      r: 2
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 4,
      y1: 6,
      x2: 12,
      y2: 6
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 16,
      y1: 6,
      x2: 20,
      y2: 6
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 8,
      cy: 12,
      r: 2
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 4,
      y1: 12,
      x2: 6,
      y2: 12
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 10,
      y1: 12,
      x2: 20,
      y2: 12
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
      cx: 17,
      cy: 18,
      r: 2
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 4,
      y1: 18,
      x2: 15,
      y2: 18
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("line", {
      x1: 19,
      y1: 18,
      x2: 20,
      y2: 18
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: adjusmentsHorizontalIconSvg
  });
};

const ArmChairlIconSvg = ({
  size,
  color
}) => {
  const armChairlIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-armchair",
    width: 44,
    height: 44,
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#ff2825",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      stroke: "none",
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 11a2 2 0 0 1 2 2v2h10v-2a2 2 0 1 1 4 0v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M5 11v-5a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v5"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M6 19v2"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      d: "M18 19v2"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: armChairlIconSvg
  });
};

const AssetIconSvg = ({
  size,
  color
}) => {
  const assetIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    width: size,
    height: size,
    viewBox: "0 0 72 73",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
      filter: "url(#filter0_d_3173_31461)",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
        x: 4,
        y: "0.142822",
        width: 64,
        height: 64,
        rx: 5,
        fill: "#CCCCCC"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M51.7488 29.1553L49.3881 19.2999C48.9744 17.5806 47.232 16.5006 45.503 16.9249C43.9824 17.2964 43.2432 18.3495 42.9437 19.0906C42.5894 19.9652 41.0083 23.9281 40.6387 24.747C40.5091 25.0311 40.2355 25.1809 40.1798 25.2058C39.8659 25.345 36.7238 26.6708 36.7238 26.6708V26.6766C36.4112 26.8207 36.1463 27.0511 35.9602 27.3408C35.7741 27.6304 35.6747 27.9672 35.6736 28.3114C35.6736 29.3127 36.4934 30.1249 37.5043 30.1249C37.7222 30.1249 37.9296 30.0798 38.1245 30.0106V30.0174L42.2957 28.2836C42.8678 28.0167 43.1472 27.6788 43.4313 27.1863C43.5504 26.979 43.9123 26.1111 44.207 25.3988L46.7241 35.9252L46.7213 52.2356C46.7165 53.8561 47.8358 55.177 49.4717 55.1828C51.1094 55.1885 52.2931 53.8801 52.3037 52.2567L52.32 33.0058C52.3181 32.1006 51.9581 29.9492 51.7488 29.1553Z",
        fill: "white"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M42.6232 16.4372C44.6671 16.4372 46.324 14.7953 46.324 12.77C46.324 10.7446 44.6671 9.10278 42.6232 9.10278C40.5793 9.10278 38.9224 10.7446 38.9224 12.77C38.9224 14.7953 40.5793 16.4372 42.6232 16.4372Z",
        fill: "white"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M28.4457 43.7606V47.8694C28.9516 47.7864 29.4118 47.5269 29.7446 47.137C30.0767 46.7462 30.2428 46.2893 30.2428 45.7632C30.2428 45.2928 30.1036 44.8867 29.8252 44.545C29.543 44.207 29.0831 43.9459 28.4457 43.7606ZM25.9075 37.3795C25.6579 37.7155 25.5321 38.088 25.5321 38.495C25.5321 38.8694 25.6463 39.2131 25.8719 39.5318C26.1004 39.8525 26.4451 40.1117 26.903 40.3075V36.6624C26.5034 36.7896 26.1547 37.0408 25.9075 37.3795ZM35.6707 32.4989H35.6745L29.9385 20.9914L29.9375 21.0019C29.7232 20.5594 29.3883 20.1863 28.9714 19.9256C28.5545 19.6649 28.0724 19.5272 27.5807 19.5283H22.294C20.8511 19.5274 19.6799 20.687 19.6799 22.1174V55.1827H35.9673V33.7968C35.9659 33.3475 35.8645 32.9042 35.6707 32.4989ZM31.6847 48.5971C30.9071 49.4678 29.8281 50.0016 28.4486 50.1974V52.1683H26.9059V50.2502C25.679 50.1034 24.6854 49.6493 23.9174 48.8918C23.1532 48.1325 22.6646 47.0621 22.4524 45.6787L25.2268 45.3821C25.3239 45.9104 25.5424 46.409 25.8652 46.8384C26.1753 47.2454 26.5228 47.5402 26.9049 47.7226V43.3085C25.5167 42.9149 24.4963 42.3187 23.8502 41.5248C23.2003 40.728 22.8758 39.7613 22.8758 38.6227C22.8758 37.4707 23.2415 36.503 23.9779 35.7187C24.7113 34.9363 25.6867 34.4842 26.9059 34.3661V33.3226H28.4486V34.3661C29.5737 34.4986 30.4713 34.8797 31.1375 35.5075C31.8019 36.1344 32.2271 36.9782 32.4124 38.0314L29.7235 38.3789C29.5593 37.5514 29.135 36.9878 28.4486 36.6931V40.8115C30.1487 41.2694 31.3075 41.8608 31.9247 42.5866C32.5401 43.3142 32.8492 44.2464 32.8492 45.384C32.8492 46.655 32.4614 47.7254 31.6847 48.5971Z",
        fill: "white"
      })]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("defs", {
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("filter", {
        id: "filter0_d_3173_31461",
        x: 0,
        y: "0.142822",
        width: 72,
        height: 72,
        filterUnits: "userSpaceOnUse",
        colorInterpolationFilters: "sRGB",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feFlood", {
          floodOpacity: 0,
          result: "BackgroundImageFix"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feColorMatrix", {
          in: "SourceAlpha",
          type: "matrix",
          values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
          result: "hardAlpha"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feOffset", {
          dy: 4
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feGaussianBlur", {
          stdDeviation: 2
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feComposite", {
          in2: "hardAlpha",
          operator: "out"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feColorMatrix", {
          type: "matrix",
          values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feBlend", {
          mode: "normal",
          in2: "BackgroundImageFix",
          result: "effect1_dropShadow_3173_31461"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feBlend", {
          mode: "normal",
          in: "SourceGraphic",
          in2: "effect1_dropShadow_3173_31461",
          result: "shape"
        })]
      })
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: assetIconSvg
  });
};

const MoveIconSvg = ({
  size,
  color
}) => {
  const moveIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    width: size,
    height: size,
    viewBox: "0 0 16 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
      filter: "url(#filter0_d_2864_33813)",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M2 0.666748H3.29867C4.574 0.666748 5.76867 1.28875 6.5 2.33341C6.8603 2.84814 7.33941 3.26839 7.8967 3.55853C8.454 3.84866 9.07304 4.00013 9.70133 4.00008H14",
        stroke: "white",
        strokeWidth: "1.33333",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M2 7.33333H3.3C3.92792 7.33334 4.54656 7.18184 5.10342 6.89169C5.66028 6.60154 6.13891 6.1813 6.49867 5.66667C6.85843 5.15203 7.33705 4.7318 7.89391 4.44164C8.45077 4.15149 9.06942 3.99999 9.69733 4H13.3333",
        stroke: "white",
        strokeWidth: "1.33333",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M12 6L14 4L12 2",
        stroke: "white",
        strokeWidth: "1.33333",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("defs", {
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("filter", {
        id: "filter0_d_2864_33813",
        x: "-2.6665",
        y: 0,
        width: "21.333",
        height: 16,
        filterUnits: "userSpaceOnUse",
        colorInterpolationFilters: "sRGB",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feFlood", {
          floodOpacity: 0,
          result: "BackgroundImageFix"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feColorMatrix", {
          in: "SourceAlpha",
          type: "matrix",
          values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
          result: "hardAlpha"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feOffset", {
          dy: 4
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feGaussianBlur", {
          stdDeviation: 2
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feComposite", {
          in2: "hardAlpha",
          operator: "out"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feColorMatrix", {
          type: "matrix",
          values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feBlend", {
          mode: "normal",
          in2: "BackgroundImageFix",
          result: "effect1_dropShadow_2864_33813"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("feBlend", {
          mode: "normal",
          in: "SourceGraphic",
          in2: "effect1_dropShadow_2864_33813",
          result: "shape"
        })]
      })
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: moveIconSvg
  });
};

const ContractIconSvg = () => {
  const contractIconSvg = () => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
    width: "2em",
    height: "2em",
    id: "icon-contract",
    viewBox: "0 0 32 32",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#f4f8f8",
      style: {
        fill: 'var(--color1, #f4f8f8)'
      },
      d: "M4.195 0.469c-1.066 0-1.931 0.864-1.931 1.931v24.872c0 1.066 0.864 1.931 1.931 1.931h18.154c1.066 0 1.931-0.864 1.931-1.931v-20.848c0-0.388-0.154-0.76-0.428-1.034l-4.491-4.491c-0.274-0.274-0.646-0.428-1.034-0.428z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#e7ecf1",
      style: {
        fill: 'var(--color2, #e7ecf1)'
      },
      d: "M20.863 5.817c-0.145 0-0.287-0.017-0.423-0.047v21.501c0 1.066-0.864 1.931-1.931 1.931h3.84c1.066 0 1.931-0.864 1.931-1.931v-20.848c0-0.211-0.046-0.417-0.132-0.606z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#fc8086",
      style: {
        fill: 'var(--color3, #fc8086)'
      },
      d: "M23.851 5.388l-4.491-4.491c-0.125-0.125-0.27-0.225-0.428-0.297v3.285c0 1.066 0.864 1.931 1.931 1.931h3.285c-0.072-0.158-0.172-0.303-0.297-0.428z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#ffece3",
      style: {
        fill: 'var(--color4, #ffece3)'
      },
      d: "M25.822 25.582l-6.896-4.084c-0.354-0.21-0.47-0.666-0.261-1.020 0 0 0.17-0.288 0.353-0.596l-1.395-0.825c-0.92-0.528-1.351-0.626-2.181-0.305l-0.905 0.35c-0.551 0.213-1.169 0.162-1.677-0.139l-2.422-1.428-3.44 5.807 3.102 1.831c0.21 0.125 0.395 0.288 0.544 0.481l1.045 1.355c0.577 0.675 1.769 1.551 2.533 2.004l3.989 2.363c0.527 0.312 1.206 0.138 1.518-0.389s0.138-1.206-0.389-1.518l1.246 0.738c0.527 0.312 1.206 0.138 1.518-0.389s0.138-1.206-0.389-1.518l0.831 0.492c0.527 0.312 1.206 0.138 1.518-0.389s0.138-1.206-0.389-1.518l1.017 0.602c0.526 0.312 1.206 0.138 1.518-0.389s0.138-1.206-0.389-1.518z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#ffddce",
      style: {
        fill: 'var(--color5, #ffddce)'
      },
      d: "M25.822 25.582l-2.377-1.407c-0.052 0.203-0.153 0.4-0.318 0.571-0.422 0.438-1.098 0.509-1.621 0.199l-0.676-0.401c-0.024-0.014-0.055-0.010-0.074 0.010s-0.021 0.052-0.005 0.076c0.283 0.402 0.322 0.949 0.055 1.4-0.363 0.613-1.155 0.816-1.768 0.453l-0.531-0.317c-0.021-0.012-0.048-0.009-0.064 0.009s-0.018 0.046-0.003 0.066c0.312 0.411 0.36 0.989 0.071 1.457-0.372 0.604-1.175 0.776-1.785 0.415l-0.436-0.258c-0.087-0.051-0.195-0.047-0.277 0.011s-0.123 0.159-0.103 0.258c0.062 0.303 0.017 0.628-0.153 0.915-0.145 0.245-0.36 0.424-0.603 0.527l3.031 1.796c0.534 0.317 1.247 0.148 1.554-0.392 0.297-0.524 0.121-1.192-0.399-1.5l1.221 0.724c0.534 0.317 1.247 0.148 1.554-0.392 0.297-0.524 0.121-1.192-0.399-1.5l0.806 0.477c0.534 0.317 1.247 0.148 1.554-0.392 0.297-0.524 0.121-1.192-0.399-1.5l0.992 0.588c0.534 0.317 1.247 0.148 1.554-0.392 0.297-0.524 0.121-1.192-0.399-1.5z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#fcd0a3",
      style: {
        fill: 'var(--color6, #fcd0a3)'
      },
      d: "M25.224 17.881l-1.86 1.081c-0.508 0.301-1.126 0.352-1.677 0.139l-1.021-0.401c-0.319-0.125-0.67-0.148-1.002-0.063l-1.564 0.396c-0.728 0.184-1.238 0.839-1.238 1.59v2.087c0 0.295 0.239 0.535 0.534 0.535 0.89 0.001 1.612-0.721 1.612-1.611v-0.088l6.694 3.964c0.124-0.132 0.266-0.246 0.423-0.339l2.54-1.484z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#ffb983",
      style: {
        fill: 'var(--color7, #ffb983)'
      },
      d: "M26.217 19.557l-0.358 1.326-4.007 2.348 3.851 2.28c0.124-0.132 0.266-0.246 0.423-0.339l2.54-1.484z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#fcd0a3",
      style: {
        fill: 'var(--color6, #fcd0a3)'
      },
      d: "M11.457 26.402l-0.628 0.874c-0.357 0.497-1.049 0.611-1.546 0.254s-0.611-1.049-0.254-1.546l0.628-0.874c0.357-0.497 1.049-0.611 1.546-0.254s0.611 1.049 0.254 1.546z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#fcd0a3",
      style: {
        fill: 'var(--color6, #fcd0a3)'
      },
      d: "M13.95 26.73l-1.32 1.839c-0.357 0.497-1.049 0.611-1.546 0.254s-0.611-1.049-0.254-1.546l1.32-1.839c0.357-0.497 1.049-0.611 1.546-0.254s0.611 1.049 0.254 1.546z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#fcd0a3",
      style: {
        fill: 'var(--color6, #fcd0a3)'
      },
      d: "M15.75 28.022l-1.32 1.839c-0.357 0.497-1.049 0.611-1.546 0.254s-0.611-1.049-0.254-1.546l1.32-1.839c0.357-0.497 1.049-0.611 1.546-0.254s0.611 1.049 0.254 1.546z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#ffb983",
      style: {
        fill: 'var(--color7, #ffb983)'
      },
      d: "M16.963 30.131l-0.439 0.611c-0.357 0.497-1.049 0.611-1.546 0.254s-0.611-1.049-0.254-1.546l0.439-0.611c0.357-0.497 1.049-0.611 1.546-0.254s0.611 1.049 0.254 1.546z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#7c8b96",
      style: {
        fill: 'var(--color8, #7c8b96)'
      },
      d: "M11.733 16.931l-0.97-0.575c-0.267-0.158-0.611-0.070-0.77 0.197l-3.989 6.734c-0.158 0.267-0.070 0.611 0.197 0.77l0.97 0.575c0.651 0.386 1.491 0.171 1.877-0.48l3.166-5.343c0.386-0.651 0.171-1.491-0.48-1.877z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#7c8b96",
      style: {
        fill: 'var(--color8, #7c8b96)'
      },
      d: "M24.898 16.356l-0.97 0.575c-0.651 0.386-0.866 1.226-0.48 1.877l3.166 5.343c0.386 0.651 1.226 0.866 1.877 0.48l0.97-0.575c0.267-0.158 0.355-0.503 0.197-0.77l-3.989-6.734c-0.158-0.267-0.503-0.355-0.77-0.197z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#000",
      style: {
        fill: 'var(--color9, #000)'
      },
      d: "M20.935 8.613h-15.324c-0.26 0-0.471 0.211-0.471 0.471s0.211 0.471 0.471 0.471h15.324c0.26 0 0.471-0.211 0.471-0.471s-0.211-0.471-0.471-0.471z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#000",
      style: {
        fill: 'var(--color9, #000)'
      },
      d: "M5.61 6.289h7.662c0.26 0 0.471-0.211 0.471-0.471s-0.211-0.471-0.471-0.471h-7.662c-0.26 0-0.471 0.211-0.471 0.471s0.211 0.471 0.471 0.471z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#000",
      style: {
        fill: 'var(--color9, #000)'
      },
      d: "M20.935 11.506h-15.324c-0.26 0-0.471 0.211-0.471 0.471s0.211 0.471 0.471 0.471h15.324c0.26 0 0.471-0.211 0.471-0.471s-0.211-0.471-0.471-0.471z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#000",
      style: {
        fill: 'var(--color9, #000)'
      },
      d: "M9.101 28.729h-4.904c-0.805 0-1.46-0.655-1.46-1.46v-24.868c0-0.805 0.655-1.46 1.46-1.46h14.128c0.046 0 0.091 0.004 0.135 0.010v2.936c0 1.324 1.077 2.401 2.401 2.401h2.936c0.006 0.045 0.010 0.089 0.010 0.135v8.016c0 0.26 0.211 0.471 0.471 0.471s0.471-0.211 0.471-0.471v-8.016c0-0.516-0.201-1.002-0.566-1.367l-4.491-4.491c-0.365-0.365-0.851-0.566-1.367-0.566h-14.129c-1.324 0-2.401 1.077-2.401 2.401v24.868c0 1.324 1.077 2.401 2.401 2.401h4.904c0.26 0 0.471-0.211 0.471-0.471s-0.211-0.471-0.471-0.471zM23.142 5.347h-2.28c-0.805 0-1.46-0.655-1.46-1.46v-2.28z"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
      fill: "#000",
      style: {
        fill: 'var(--color9, #000)'
      },
      d: "M30.060 23.046l-3.989-6.732c-0.291-0.491-0.923-0.653-1.414-0.362l-0.97 0.575c-0.753 0.446-1.071 1.349-0.813 2.149-0.327 0.118-0.685 0.117-1.015-0.011-0.766-0.241-1.348-0.726-2.31-0.483-1.633 0.416-1.584 0.395-1.731 0.446-0.956-0.544-1.531-0.706-2.546-0.314l-0.905 0.35c-0.419 0.162-0.881 0.123-1.268-0.106l-0.247-0.146c0.12-0.722-0.2-1.484-0.878-1.886 0 0 0 0-0-0l-0.97-0.575c-0.49-0.29-1.124-0.128-1.414 0.362l-3.989 6.733c-0.291 0.491-0.129 1.124 0.362 1.414l0.97 0.575c0.294 0.174 0.616 0.257 0.935 0.257 0.355 0 0.706-0.103 1.006-0.297l0.202 0.119-0.427 0.595c-0.509 0.709-0.347 1.694 0.362 2.203 0.328 0.235 0.739 0.343 1.165 0.276 0.068 0.395 0.284 0.765 0.634 1.016 0.329 0.236 0.739 0.344 1.165 0.277 0.068 0.395 0.284 0.764 0.634 1.015 0.471 0.338 1.056 0.377 1.543 0.169 0.107 0.277 0.292 0.527 0.551 0.713 0.675 0.485 1.606 0.358 2.131-0.27l1.134 0.672c0.75 0.445 1.718 0.198 2.163-0.554 0.114-0.192 0.184-0.401 0.21-0.616l0.003 0.002c0.749 0.444 1.719 0.195 2.163-0.554 0.128-0.217 0.199-0.452 0.216-0.688 0.66 0.166 1.38-0.111 1.744-0.726 0.12-0.202 0.189-0.42 0.212-0.639 0.708 0.278 1.535 0.009 1.934-0.665 0.215-0.363 0.276-0.788 0.171-1.196-0.060-0.234-0.17-0.446-0.321-0.625l0.625-0.365c0.529 0.217 1.133 0.182 1.638-0.117l0.97-0.575c0.491-0.291 0.653-0.923 0.362-1.414zM7.412 24.225l-0.97-0.575c-0.043-0.026-0.057-0.081-0.032-0.125l3.989-6.733c0.026-0.043 0.082-0.057 0.125-0.032l0.97 0.575c0.431 0.255 0.566 0.808 0.315 1.232l-3.165 5.343c-0.253 0.427-0.805 0.568-1.232 0.315zM9.559 27.146c-0.286-0.205-0.351-0.603-0.146-0.889l0.627-0.874c0.2-0.278 0.598-0.355 0.889-0.146 0.285 0.205 0.351 0.604 0.146 0.889l-0.627 0.874c-0.205 0.285-0.604 0.351-0.889 0.146zM11.359 28.438c-0.285-0.205-0.351-0.604-0.146-0.889l0.627-0.874s0 0 0-0c0 0 0-0 0-0l0.692-0.965c0.099-0.138 0.246-0.23 0.414-0.257 0.035-0.006 0.070-0.009 0.104-0.009 0.132 0 0.261 0.041 0.37 0.12 0.138 0.099 0.229 0.246 0.257 0.414s-0.012 0.337-0.111 0.475l-1.32 1.839c-0.205 0.286-0.603 0.351-0.889 0.146zM13.158 29.73c-0.285-0.205-0.351-0.603-0.146-0.889 0-0 0-0 0-0l1.32-1.839c0.205-0.285 0.604-0.351 0.889-0.146s0.351 0.604 0.146 0.889l-0.586 0.817s0 0-0 0l-0.733 1.022c-0.205 0.285-0.603 0.351-0.889 0.146zM15.253 30.612c-0.285-0.205-0.351-0.603-0.146-0.888l0.439-0.612c0.205-0.285 0.604-0.351 0.889-0.146s0.351 0.604 0.146 0.889l-0.439 0.611c-0.205 0.285-0.604 0.351-0.889 0.146zM25.804 26.859c-0.179 0.302-0.571 0.403-0.873 0.224-0.512-0.303-3.815-2.26-4.167-2.469-0.224-0.133-0.512-0.059-0.645 0.165s-0.059 0.512 0.165 0.645l3.15 1.866c0.302 0.179 0.403 0.569 0.224 0.873-0.179 0.302-0.571 0.402-0.873 0.224-1.165-0.69-2.111-1.251-3.152-1.867-0.224-0.133-0.512-0.059-0.645 0.165s-0.059 0.512 0.165 0.645l2.322 1.375c0.303 0.18 0.402 0.57 0.223 0.873s-0.571 0.403-0.873 0.224l-1.246-0.738c-0-0-0-0-0-0s-0-0-0-0l-0.909-0.539c-0.224-0.133-0.512-0.059-0.645 0.165s-0.059 0.512 0.165 0.645l0.909 0.539c0 0 0 0 0 0 0.302 0.179 0.403 0.569 0.224 0.873-0.179 0.302-0.571 0.403-0.873 0.224l-1.061-0.628c0.455-0.702 0.282-1.647-0.405-2.14-0.202-0.145-0.426-0.235-0.656-0.273 0.244-0.651 0.034-1.411-0.558-1.836-0.35-0.251-0.769-0.338-1.165-0.276-0.070-0.412-0.295-0.772-0.635-1.016-0.639-0.458-1.507-0.37-2.043 0.172-0.109-0.191-0.259-0.363-0.45-0.5-0.531-0.381-1.22-0.384-1.745-0.064l-0.216-0.127 2.961-4.997 0.141 0.083c0.623 0.369 1.382 0.446 2.086 0.173l0.905-0.35c0.518-0.2 0.803-0.213 1.316 0.029-0.335 0.377-0.534 0.871-0.534 1.404v2.087c0 0.554 0.451 1.006 1.005 1.006h0.001c0.556 0 1.078-0.216 1.471-0.609 0.229-0.229 0.398-0.502 0.5-0.8 0.608 0.36 5.63 3.334 6.212 3.679 0.146 0.087 0.25 0.225 0.293 0.39s0.018 0.336-0.069 0.483zM29.218 23.65l-0.97 0.575c-0.427 0.253-0.979 0.111-1.231-0.315l-1.483-2.504c-0.133-0.224-0.421-0.297-0.645-0.165s-0.298 0.421-0.165 0.645l1.483 2.504c0.028 0.047 0.058 0.092 0.090 0.136l-0.412 0.241c-0.083 0.049-0.164 0.104-0.24 0.163l-6.395-3.787c-0.313-0.185-0.711 0.041-0.711 0.405-0.005 0.028 0.049 0.512-0.334 0.895-0.215 0.215-0.501 0.334-0.806 0.334-0 0-0 0-0.001 0-0.035 0-0.064-0.029-0.064-0.065v-2.087c0-0.545 0.375-1.005 0.882-1.134l1.564-0.396c0.567-0.143 0.888 0.16 1.737 0.447 0.59 0.228 1.231 0.214 1.8-0.029l0.284 0.48c0.133 0.224 0.421 0.298 0.645 0.165s0.298-0.421 0.165-0.645l-0.56-0.945c-0.253-0.427-0.112-0.978 0.315-1.231l0.97-0.575c0.042-0.025 0.098-0.012 0.125 0.032l3.989 6.733c0.026 0.043 0.012 0.099-0.032 0.125z"
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: contractIconSvg
  });
};

const IconBroadcast = props => {
  const svgbroadcast = () => {
    var _props$height, _props$width;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
      id: "color",
      enableBackground: "new 0 0 24 24",
      height: (_props$height = props.height) !== null && _props$height !== void 0 ? _props$height : 40,
      viewBox: "0 0 24 24",
      width: (_props$width = props.width) !== null && _props$width !== void 0 ? _props$width : 40,
      xmlns: "http://www.w3.org/2000/svg",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m8.25 21.25c-2.481 0-4.5-2.019-4.5-4.5 0-.48.071-.937.212-1.357.175-.524.742-.805 1.265-.631.524.175.807.742.631 1.265-.071.216-.108.459-.108.723 0 1.378 1.122 2.5 2.5 2.5 1.146 0 2.167-.807 2.426-1.917.125-.538.666-.874 1.201-.746.538.125.872.664.746 1.201-.476 2.038-2.274 3.462-4.373 3.462z",
        fill: "#0f93ff"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m23.25 21.5c-.07 0-.14-.01-.208-.029l-22.5-6.5c-.321-.093-.542-.387-.542-.721v-4.5c0-.334.221-.628.542-.721l22.5-6.5c.227-.063.471-.021.659.121s.299.364.299.6v17.5c0 .236-.111.458-.299.6-.132.098-.29.15-.451.15z",
        fill: "#0f93ff"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        fill: "#0f93ff",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m23 22.25c-.552 0-1-.448-1-1v-18.5c0-.552.448-1 1-1s1 .448 1 1v18.5c0 .552-.448 1-1 1z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m1 16.25c-.552 0-1-.448-1-1v-6.5c0-.552.448-1 1-1s1 .448 1 1v6.5c0 .552-.448 1-1 1z"
        })]
      })]
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: svgbroadcast,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const Iconquestion = props => {
  const svgquestion = () => {
    var _props$width2, _props$height2;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
      version: "1.1",
      id: "Capa_1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      width: (_props$width2 = props.width) !== null && _props$width2 !== void 0 ? _props$width2 : 40,
      height: (_props$height2 = props.height) !== null && _props$height2 !== void 0 ? _props$height2 : 40,
      viewBox: "0 0 356.62 356.62",
      style: {
        enableBackground: 'new 0 0 356.62 356.62'
      },
      xmlSpace: "preserve",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M178.31,0C79.99,0,0,79.99,0,178.311S79.99,356.62,178.31,356.62s178.31-79.989,178.31-178.31S276.63,0,178.31,0z M178.31,326.62C96.532,326.62,30,260.089,30,178.311S96.532,30,178.31,30s148.31,66.532,148.31,148.311 S260.088,326.62,178.31,326.62z",
          fill: "#0f93ff"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M178.31,66.949c-35.58,0-64.527,28.947-64.527,64.527c0,8.284,6.716,15,15,15s15-6.716,15-15 c0-19.038,15.489-34.527,34.527-34.527s34.527,15.489,34.527,34.527s-15.489,34.527-34.527,34.527c-8.284,0-15,6.716-15,15v33.915 c0,8.284,6.716,15,15,15s15-6.716,15-15v-20.675c28.371-6.779,49.527-32.35,49.527-62.768 C242.837,95.896,213.89,66.949,178.31,66.949z",
          fill: "#0f93ff"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
          cx: "178.31",
          cy: "265.899",
          r: "20.999",
          fill: "#0f93ff"
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {})]
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: svgquestion,
    style: {
      marginRight: `0.5rem`
    }
  });
};



/***/ }),

/***/ "VzA1":
/***/ (function(module, exports) {

module.exports = require("antd/lib/layout");

/***/ }),

/***/ "Wn2j":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return getServerSideProps; });
/* harmony import */ var antd_lib_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zkM6");
/* harmony import */ var antd_lib_tabs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_tabs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_timeline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("aawa");
/* harmony import */ var antd_lib_timeline__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_timeline__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_empty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7GvT");
/* harmony import */ var antd_lib_empty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_empty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("xKsY");
/* harmony import */ var antd_lib_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var antd_lib_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Puj+");
/* harmony import */ var antd_lib_table__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd_lib_table__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var antd_lib_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("A4pX");
/* harmony import */ var antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd_lib_select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var antd_lib_tree_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("vXfU");
/* harmony import */ var antd_lib_tree_select__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd_lib_tree_select__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("Uqqx");
/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(antd_lib_input__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var antd_lib_notification__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("Gss8");
/* harmony import */ var antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(antd_lib_notification__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var antd_lib_popover__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("27qp");
/* harmony import */ var antd_lib_popover__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(antd_lib_popover__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("z6+L");
/* harmony import */ var antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var antd_lib_spin__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("vEvA");
/* harmony import */ var antd_lib_spin__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(antd_lib_spin__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("eGmO");
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("HJQg");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("rlPI");
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("nZwT");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _components_layout_dashboard2__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("ZV7/");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("wy2R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _components_layout_dashboard_module_css__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("g6Xq");
/* harmony import */ var _components_layout_dashboard_module_css__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_components_layout_dashboard_module_css__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var wil_react_sticky__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("FK4W");
/* harmony import */ var wil_react_sticky__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(wil_react_sticky__WEBPACK_IMPORTED_MODULE_23__);


















function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const Overview = ({
  itemid,
  initProps,
  maindata,
  manuf,
  vendor,
  praloading
}) => {
  const rt = Object(next_router__WEBPACK_IMPORTED_MODULE_15__["useRouter"])(); //useState

  const {
    0: invrelations2,
    1: setinvrelations2
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])({}); //helper

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
    className: "flex flex-col",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
      className: "border-b flex justify-between p-5 mb-8",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
        className: "font-bold text-xl my-auto",
        children: "Overview"
      }), praloading ? null : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
        type: "primary",
        size: "large",
        onClick: () => {
          rt.push(`/items/update/${itemid}`);
        },
        children: "Ubah"
      })]
    }), praloading ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_spin__WEBPACK_IMPORTED_MODULE_12___default.a, {}) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
      className: "mb-8 mx-5 p-5 w-9/12 border shadow-md rounded-md flex flex-col",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
          className: " text-sm font-semibold mb-0",
          children: "Model:"
        }), maindata.model_inventory.deleted_at !== null ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex items-center",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-0 mr-1",
            children: maindata.model_inventory.name
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_11___default.a, {
            placement: "right",
            title: "Model telah dihapus, segera lakukan pengubahan Model!",
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__["ExclamationCircleOutlined"], {
              style: {
                color: `brown`
              }
            })
          })]
        }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
          className: "mb-0 text-sm",
          children: maindata.model_inventory.name
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
          className: " text-sm font-semibold mb-0",
          children: "Asset Type:"
        }), maindata.model_inventory.asset.deleted_at !== null ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex items-center",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-0 mr-1",
            children: maindata.model_inventory.asset.name
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_11___default.a, {
            placement: "right",
            title: "Asset Type telah dihapus, segera lakukan pengubahan Asset Type!",
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__["ExclamationCircleOutlined"], {
              style: {
                color: `brown`
              }
            })
          })]
        }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
          className: "mb-0 text-sm",
          children: maindata.model_inventory.asset.name
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
          className: " text-sm font-semibold mb-0",
          children: "MIG ID:"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
          className: "mb-0 text-sm",
          children: maindata.mig_id
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
          className: " text-sm font-semibold mb-0",
          children: "Serial Number:"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
          className: "mb-0 text-sm",
          children: maindata.serial_number === "" || maindata.serial_number === null ? "-" : maindata.serial_number
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
          className: " text-sm font-semibold mb-0",
          children: "Manufacturer:"
        }), // invrelations.manufacturers.filter(docfil => docfil.id === maindata.manufacturer_id)[0].deleted_at !== null
        manuf.isnull === false ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex items-center",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-0 mr-1",
            children: manuf.name
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_11___default.a, {
            placement: "right",
            title: "Manufacturer telah dihapus, segera lakukan pengubahan Manufacturer!",
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__["ExclamationCircleOutlined"], {
              style: {
                color: `brown`
              }
            })
          })]
        }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
          className: "mb-0 text-sm",
          children: manuf.name
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
          className: " text-sm font-semibold mb-0",
          children: "Vendor:"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
          className: "mb-0 text-sm",
          children: maindata.vendor_id === null ? "-" : vendor
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
          className: " text-sm font-semibold mb-0",
          children: "Location:"
        }), maindata.is_consumable === true ? maindata.quantities.map((doc, idx) => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
          className: "mb-0 text-sm",
          children: [idx + 1, ". ", doc.name, " - ", doc.quantity]
        })) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
          className: "mb-0 text-sm",
          children: maindata.location === null ? "-" : maindata.location_inventory.name
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
          className: " text-sm font-semibold mb-0",
          children: "Deskripsi:"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
          className: "mb-0 text-sm",
          children: maindata.deskripsi === "" || maindata.deskripsi === null ? "-" : maindata.deskripsi
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("hr", {}), maindata.additional_attributes.map((doccolumns, idxcolumns) => {
        return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: `flex flex-col mb-5 ${idxcolumns === 0 ? `mt-5` : ``}`,
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("h1", {
            className: " text-sm font-semibold mb-0",
            children: [doccolumns.name, ":"]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-0 text-sm",
            children: doccolumns.data_type === 'dropdown' || doccolumns.data_type === 'checkbox' || doccolumns.data_type === 'date' ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
              children: [doccolumns.data_type === 'dropdown' && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
                children: doccolumns.value.opsi[doccolumns.value.default]
              }), doccolumns.data_type === 'checkbox' && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
                children: doccolumns.value.opsi.filter((_, idxfil) => {
                  return doccolumns.value.default.includes(idxfil);
                }).join(", ")
              }), doccolumns.data_type === 'date' && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
                children: moment__WEBPACK_IMPORTED_MODULE_21___default()(doccolumns.value).locale('id').format('LL')
              })]
            }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
              children: doccolumns.value
            })
          })]
        }, idxcolumns);
      })]
    })]
  });
};

const KonfigurasiPart = ({
  initProps,
  itemid,
  invrelations,
  maindata,
  praloading2,
  models,
  setmodels
}) => {
  const rt = Object(next_router__WEBPACK_IMPORTED_MODULE_15__["useRouter"])(); //usestate

  const {
    0: mainpartdata,
    1: setmainpartdata
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: assetdata,
    1: setassetdata
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: praloadingpart,
    1: setpraloadingpart
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(true);
  const {
    0: events,
    1: setevents
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])("");
  const {
    0: datatable,
    1: setdatatable
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: datatable2,
    1: setdatatable2
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: datatable3,
    1: setdatatable3
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: namasearchact,
    1: setnamasearchact
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: namavalue,
    1: setnamavalue
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])("");
  const {
    0: assettypefilteract,
    1: setassettypefilteract
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: assettypevalue,
    1: setassettypevalue
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])("");
  const {
    0: modelfilteract,
    1: setmodelfilteract
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: modelvalue,
    1: setmodelvalue
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])("");
  const {
    0: datatrigger,
    1: setdatatrigger
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(0); //changed dan removed

  const {
    0: datareplacements,
    1: setdatareplacements
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: popover,
    1: setpopover
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false); //changed

  const {
    0: datachanged,
    1: setdatachanged
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])({
    id: null,
    model_id: null,
    inventory_name: "",
    mig_id: "",
    status_condition: {
      id: null,
      name: ""
    },
    status_usage: {
      id: null,
      name: ""
    },
    deleted_at: null,
    model_inventory: {
      id: null,
      name: "",
      asset_id: null,
      deleted_at: null,
      asset: {
        id: null,
        name: "",
        deleted_at: ""
      }
    }
  });
  const {
    0: dataApichanged,
    1: setdataApichanged
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])({
    id: 0,
    replacement_id: 0,
    notes: ""
  });
  const {
    0: modalchanged,
    1: setmodalchanged
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: disabledchanged,
    1: setdisabledchanged
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(true);
  const {
    0: loadingchanged,
    1: setloadingchanged
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: triggerchanged,
    1: settriggerchanged
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(-1); //removed

  const {
    0: dataremoved,
    1: setdataremoved
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(-1);
  const {
    0: dataApiremoved,
    1: setdataApiremoved
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])({
    id: 0,
    inventory_part_id: 0,
    notes: ""
  });
  const {
    0: modalremoved,
    1: setmodalremoved
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: disabledremoved,
    1: setdisabledremoved
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(true);
  const {
    0: loadingremoved,
    1: setloadingremoved
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: fetchingmodel,
    1: setfetchingmodel
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: backupmodels,
    1: setbackupmodels
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(models);
  const columns = [// {
  //     title: 'Nama Item',
  //     dataIndex: 'inventory_name',
  //     key: 'inventory_name',
  // },
  {
    title: 'MIG ID',
    dataIndex: 'mig_id',
    key: 'mig_id'
  }, {
    title: 'Serial Number',
    dataIndex: 'serial_number',
    key: 'serial_number',
    render: (text, record, index) => {
      return {
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
          children: record.serial_number === null ? "-" : record.serial_number
        })
      };
    }
  }, {
    title: 'Model',
    dataIndex: 'model_name',
    key: 'model_name',
    render: (text, record, index) => {
      return {
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
          children: record.model_inventory.name
        })
      };
    }
  }, {
    title: 'Asset Type',
    dataIndex: 'asset_name',
    key: 'asset_name',
    render: (text, record, index) => {
      return {
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
          children: record.model_inventory.asset.asset_name
        })
      };
    }
  }, {
    title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    dataIndex: 'actionss',
    render: (text, record, index) => {
      return {
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
          children: events === record.id ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_popover__WEBPACK_IMPORTED_MODULE_9___default.a, {
            visible: popover,
            onVisibleChange: () => {
              setpopover(true);
            },
            style: {
              padding: `0px`,
              margin: `0px`
            },
            placement: "bottomLeft",
            trigger: "click",
            content: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
              className: "flex flex-col",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
                className: "flex justify-center cursor-pointer",
                onClick: () => setpopover(false),
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__["CloseCircleOutlined"], {
                  style: {
                    color: `red`,
                    fontSize: `1.1rem`
                  }
                })
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
                type: "text",
                style: {
                  width: `100%`
                },
                onClick: () => {
                  setdataremoved(record);
                  setdataApiremoved(_objectSpread(_objectSpread({}, dataApiremoved), {}, {
                    id: mainpartdata.id,
                    inventory_part_id: record.id
                  }));
                  setmodalremoved(true);
                  setpopover(false);
                },
                children: "Keluarkan Part"
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
                type: "text",
                style: {
                  width: `100%`
                },
                onClick: () => {
                  setdatachanged(record);
                  setmodalchanged(true);
                  setpopover(false);
                  settriggerchanged(prev => prev + 1);
                },
                children: "Gantikan Part"
              })]
            }),
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
              className: "cursor-pointer",
              onClick: () => setpopover(false),
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__["CloseCircleOutlined"], {
                style: {
                  color: `red`,
                  fontSize: `1.5rem`
                }
              })
            })
          }) : null
        })
      };
    }
  }]; //helper
  //1 nya lagi ada di useEffect

  const recursiveFlattenArr = dataassets => {
    const result = [];
    dataassets.forEach((item, idx) => {
      result.push(item.id);

      if (item.children) {
        result.push(...recursiveFlattenArr(item.children));
      }
    });
    return result;
  };

  function recursiveModifData(dataa) {
    for (var i = 0; i < dataa.length; i++) {
      var _dataa$i$model_invent;

      dataa[i]['key'] = dataa[i].id;
      dataa[i]['value'] = dataa[i].id;
      dataa[i]['title'] = `${dataa[i].mig_id} - ${(_dataa$i$model_invent = dataa[i].model_inventory) === null || _dataa$i$model_invent === void 0 ? void 0 : _dataa$i$model_invent.name}`;
      dataa[i]['children'] = dataa[i].inventory_replacement_parts;
      delete dataa[i].inventory_replacement_parts;

      if (dataa[i].children.length > 0) {
        recursiveModifData(dataa[i].children);
      }
    }

    return dataa;
  } //handler


  const assetPart = [];

  const recursiveSearchPartFromAsset = (doc, assetid) => {
    var arr = [];

    for (var i = 0; i < doc.length; i++) {
      if (doc[i].model_inventory.asset.id === Number(assetid)) {
        // continue
        assetPart.push(doc[i]);
      } else {
        if (doc[i].children) {
          arr.push(_objectSpread(_objectSpread({}, doc[i]), {}, {
            children: recursiveSearchPartFromAsset(doc[i].children, assetid)
          }));
        } else {
          arr.push(_objectSpread({}, doc[i]));
        }
      }
    }

    return arr;
  };

  const modelPart = [];

  const recursiveSearchPartFromModel = (doc, modelid) => {
    var arr = [];

    for (var i = 0; i < doc.length; i++) {
      if (doc[i].model_id === modelid) {
        // continue
        modelPart.push(doc[i]);
      } else {
        if (doc[i].children) {
          arr.push(_objectSpread(_objectSpread({}, doc[i]), {}, {
            children: recursiveSearchPartFromModel(doc[i].children, modelid)
          }));
        } else {
          arr.push(_objectSpread({}, doc[i]));
        }
      }
    }

    return arr;
  };

  const namePart = [];

  const recursiveSearchPartFromName = (doc, name) => {
    var arr = [];

    for (var i = 0; i < doc.length; i++) {
      if (doc[i].inventory_name.toLowerCase().includes(name.toLowerCase())) {
        // continue
        namePart.push(doc[i]);
      } else {
        if (doc[i].children) {
          arr.push(_objectSpread(_objectSpread({}, doc[i]), {}, {
            children: recursiveSearchPartFromName(doc[i].children, name)
          }));
        } else {
          arr.push(_objectSpread({}, doc[i]));
        }
      }
    }

    return arr;
  }; //deliver API


  const handleReplacementItemPart = () => {
    setloadingchanged(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/replaceInventoryPart`, {
      method: 'PUT',
      headers: {
        'Authorization': JSON.parse(initProps),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataApichanged)
    }).then(res => res.json()).then(res2 => {
      setloadingchanged(false);

      if (res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['success']({
          message: "Item Part berhasil diganti",
          duration: 3
        });

        setmodalchanged(false);
        setdatatrigger(prev => prev + 1);
      } else if (!res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['error']({
          message: res2.message,
          duration: 3
        });
      }
    });
  };

  const handleRemoveItemPart = () => {
    setloadingremoved(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/removeInventoryPart`, {
      method: 'DELETE',
      headers: {
        'Authorization': JSON.parse(initProps),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataApiremoved)
    }).then(res => res.json()).then(res2 => {
      setloadingremoved(false);

      if (res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['success']({
          message: "Item Part berhasil dikeluarkan",
          duration: 3
        });

        setmodalremoved(false);
        setdatatrigger(prev => prev + 1);
      } else if (!res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['error']({
          message: res2.message,
          duration: 3
        });
      }
    });
  }; //search nama


  const onChangeSearch = e => {
    if (e.target.value === "") {
      setdatatable(datatable3);
      setnamasearchact(false);
    } else {
      setnamasearchact(true);
      setnamavalue(e.target.value);
    }
  }; //search asset type


  const onChangeAssetType = id => {
    if (typeof id === 'undefined') {
      setdatatable(datatable3);
      setassettypefilteract(false);
      setmodels(backupmodels);
    } else {
      fetch(`https://boiling-thicket-46501.herokuapp.com/getModels?rows=100&asset_id=${id}`, {
        method: `GET`,
        headers: {
          'Authorization': JSON.parse(initProps)
        }
      }).then(res => res.json()).then(res2 => {
        res2.data.length === 0 ? setmodels([]) : setmodels(res2.data.data);
      });
      setassettypefilteract(true);
      setassettypevalue(id);
    }
  }; //search model


  const onChangeModel = idmodel => {
    if (typeof idmodel === 'undefined') {
      setdatatable(datatable3);
      setmodelfilteract(false);
    } else {
      setmodelfilteract(true);
      setmodelvalue(idmodel);
    }
  }; //finalClick


  const onFinalClick = () => {
    var datatemp = datatable2;

    if (assettypefilteract) {
      // const t = recursiveSearchPartFromAsset(datatemp, assettypevalue)
      recursiveSearchPartFromAsset(datatemp, assettypevalue);
      datatemp = assetPart;
    }

    if (modelfilteract) {
      // const t = recursiveSearchPartFromModel(datatemp, modelvalue)
      recursiveSearchPartFromModel(datatemp, modelvalue);
      datatemp = modelPart;
    }

    if (namasearchact) {
      // const t = recursiveSearchPartFromName(datatemp, namavalue)
      recursiveSearchPartFromName(datatemp, namavalue);
      datatemp = namePart;
    }

    setdatatable(datatemp);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_16__["useEffect"])(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getInventory?id=${itemid}`, {
      method: `GET`,
      headers: {
        'Authorization': JSON.parse(initProps)
      }
    }).then(res => res.json()).then(res2 => {
      return res2.data;
    }).then(res3 => {
      const recursiveChangetoChildren = rsc => {
        var res = [];

        for (var i = 0; i < rsc.length; i++) {
          var _rsc$i$model_inventor;

          rsc[i].key = rsc[i].id;
          rsc[i].value = rsc[i].id;
          rsc[i].title = `${rsc[i].mig_id} - ${(_rsc$i$model_inventor = rsc[i].model_inventory) === null || _rsc$i$model_inventor === void 0 ? void 0 : _rsc$i$model_inventor.name}`;
          rsc[i].children = rsc[i].inventory_parts;
          delete rsc[i].inventory_parts;

          if (rsc[i].children.length !== 0) {
            res.push(_objectSpread(_objectSpread({}, rsc[i]), {}, {
              children: recursiveChangetoChildren(rsc[i].children)
            }));
          } else {
            delete rsc[i].children;
            res.push(_objectSpread({}, rsc[i]));
          }
        }

        return res;
      };

      const t = recursiveChangetoChildren(res3.inventory_parts);
      setmainpartdata(_objectSpread(_objectSpread({}, res3), {}, {
        inventory_parts: t
      }));
      setdatatable(t);
      setdatatable2(t);
      setdatatable3(t);
      setpraloadingpart(false);
    });
  }, [datatrigger]);
  Object(react__WEBPACK_IMPORTED_MODULE_16__["useEffect"])(() => {
    if (triggerchanged !== -1) {
      fetch(`https://boiling-thicket-46501.herokuapp.com/getInventoryReplacements?id=${datachanged.model_inventory.asset_id}`, {
        method: `GET`,
        headers: {
          'Authorization': JSON.parse(initProps)
        }
      }).then(res => res.json()).then(res2 => {
        const mapdata = recursiveModifData(res2.data);
        setdatareplacements(mapdata);

        if (mapdata.length === 0) {
          setdisabledchanged(false);
        }
      });
    }
  }, [triggerchanged]);
  Object(react__WEBPACK_IMPORTED_MODULE_16__["useEffect"])(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getAssets`, {
      method: `GET`,
      headers: {
        'Authorization': JSON.parse(initProps)
      }
    }).then(res => res.json()).then(res2 => {
      setassetdata(res2.data);
    });
  }, []);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
    className: "flex flex-col",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
      className: "border-b flex justify-between p-5 mb-8",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
        className: "font-bold text-xl my-auto",
        children: "Konfigurasi Part"
      }), praloading2 ? null : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
        type: "primary",
        size: "large",
        onClick: () => {
          /*console.log(mainpartdata); console.log(dataremoved)*/
          rt.push(`/items/createpart/${itemid}?nama=${mainpartdata.mig_id}`);
        },
        children: "Tambah"
      })]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
      className: "flex mb-5",
      children: praloading2 ? null : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: " w-full mr-1 grid grid-cols-12",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: "col-span-5 mr-1",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_7___default.a, {
            style: {
              width: `100%`,
              marginRight: `0.5rem`
            },
            placeholder: "Cari Nama Item",
            onChange: e => onChangeSearch(e),
            allowClear: true
          })
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: "col-span-3 mr-1",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_tree_select__WEBPACK_IMPORTED_MODULE_6___default.a, {
            allowClear: true,
            dropdownStyle: {
              maxHeight: 400,
              overflow: 'auto'
            },
            treeData: assetdata,
            placeholder: "Cari Asset Type",
            treeDefaultExpandAll: true,
            style: {
              width: `100%`
            },
            onChange: (value, label, extra) => {
              if (typeof value === 'undefined') {
                onChangeAssetType();
              } else {
                onChangeAssetType(extra.allCheckedNodes[0].node.props.id);
              }
            }
          })
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: "col-span-3 mr-1",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a, {
            showSearch: true,
            optionFilterProp: "children",
            notFoundContent: fetchingmodel ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_spin__WEBPACK_IMPORTED_MODULE_12___default.a, {
              size: "small"
            }) : null,
            onSearch: value => {
              setfetchingmodel(true);
              fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterModels?name=${value !== "" ? value : ""}`, {
                method: `GET`,
                headers: {
                  'Authorization': JSON.parse(initProps)
                }
              }).then(res => res.json()).then(res2 => {
                setmodels(res2.data);
                setfetchingmodel(false);
              });
            },
            filterOption: (input, opt) => opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            placeholder: "Cari Model",
            style: {
              width: `100%`
            },
            allowClear: true,
            onChange: value => {
              if (typeof value === 'undefined') {
                onChangeModel();
              } else {
                onChangeModel(value);
              }
            },
            children: models.map((docmodels, idxmodels) => {
              return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                value: docmodels.id,
                children: docmodels.name
              });
            })
          })
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: " col-span-1",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
            type: "primary",
            style: {
              width: `100%`
            },
            onClick: onFinalClick,
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__["SearchOutlined"], {})
          })
        })]
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_table__WEBPACK_IMPORTED_MODULE_4___default.a, {
      loading: praloadingpart,
      pagination: {
        pageSize: 9
      },
      scroll: {
        x: 200
      },
      dataSource: datatable,
      columns: columns,
      onRow: (record, rowIndex) => {
        return {
          onMouseOver: event => {
            setevents(record.id);
          },
          onMouseLeave: event => {
            setevents(0);
          }
        };
      }
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_modal__WEBPACK_IMPORTED_MODULE_3___default.a, {
      title: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex justify-between p-5 mt-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("h1", {
          className: "font-bold text-xl",
          children: ["Form Pergantian Part \"", datachanged.inventory_name, "\""]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: "flex",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
              type: "default",
              onClick: () => {
                setmodalchanged(false);
                setdataApichanged(_objectSpread(_objectSpread({}, dataApichanged), {}, {
                  replacement_id: null,
                  notes: ""
                }));
              },
              style: {
                marginRight: `1rem`
              },
              children: "Batal"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
              type: "primary",
              disabled: disabledchanged,
              onClick: handleReplacementItemPart,
              loading: loadingchanged,
              children: "Simpan"
            })]
          })
        })]
      }),
      visible: modalchanged,
      onCancel: () => {
        setmodalchanged(false);
      },
      footer: null,
      width: 760,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-3",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "jsx-656990793" + " " + "flex flex-col mb-3",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
            className: "jsx-656990793" + " " + "mb-0",
            children: ["Nama Item Part yang Ingin Diganti ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("span", {
              className: "jsx-656990793" + " " + "namapart"
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_tree_select__WEBPACK_IMPORTED_MODULE_6___default.a, {
            treeData: datatable3,
            defaultValue: datachanged.key
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(styled_jsx_style__WEBPACK_IMPORTED_MODULE_14___default.a, {
            id: "656990793",
            children: [".namapart.jsx-656990793::before{content:'*';color:red;}"]
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "jsx-656990793" + " " + "flex flex-col mb-3",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
            className: "jsx-656990793" + " " + "mb-0",
            children: ["Asset Type dari Item Part yang ingin diganti ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("span", {
              className: "jsx-656990793" + " " + "namapart"
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
            className: "jsx-656990793" + " " + "w-full rounded-sm flex items-center bg-gray-100 border p-2 h-8",
            children: datachanged.model_inventory.asset.name
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(styled_jsx_style__WEBPACK_IMPORTED_MODULE_14___default.a, {
            id: "656990793",
            children: [".namapart.jsx-656990793::before{content:'*';color:red;}"]
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "jsx-656990793" + " " + "flex flex-col mb-3",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
            className: "jsx-656990793" + " " + "mb-0",
            children: ["Nama Item Part Pengganti ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("span", {
              className: "jsx-656990793" + " " + "namapart"
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_tree_select__WEBPACK_IMPORTED_MODULE_6___default.a, {
            onChange: value => {
              setdisabledchanged(false);
              setdataApichanged(_objectSpread(_objectSpread({}, dataApichanged), {}, {
                id: datachanged.id,
                replacement_id: value
              }));
            },
            treeData: datareplacements
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(styled_jsx_style__WEBPACK_IMPORTED_MODULE_14___default.a, {
            id: "656990793",
            children: [".namapart.jsx-656990793::before{content:'*';color:red;}"]
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex flex-col mb-3",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-0",
            children: "Notes"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_7___default.a.TextArea, {
            rows: 3,
            placeholder: "Masukkan Notes",
            value: dataApichanged.notes,
            onChange: e => {
              setdataApichanged(_objectSpread(_objectSpread({}, dataApichanged), {}, {
                notes: e.target.value
              }));
            }
          })]
        })]
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_modal__WEBPACK_IMPORTED_MODULE_3___default.a, {
      title: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("h1", {
        className: "font-semibold",
        children: ["Apakah anda yakin ingin mengeluarkan item \"", dataremoved.inventory_name, "\" dari \"", mainpartdata.inventory_name, "\"?"]
      }),
      visible: modalremoved,
      onCancel: () => {
        setmodalremoved(false);
      },
      okText: "Ya",
      cancelText: "Tidak",
      onOk: handleRemoveItemPart,
      okButtonProps: {
        loading: loadingremoved
      },
      width: 760,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
        className: "flex flex-col",
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex flex-col",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-0",
            children: "Notes"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_7___default.a, {
            placeholder: "Masukkan Notes",
            onChange: e => {
              setdataApiremoved(_objectSpread(_objectSpread({}, dataApiremoved), {}, {
                notes: e.target.value
              }));
            }
          })]
        })
      })
    })]
  });
};

const Relationship = ({
  initProps,
  maindata,
  itemid
}) => {
  //init
  const rt = Object(next_router__WEBPACK_IMPORTED_MODULE_15__["useRouter"])(); //usestate

  const {
    0: events,
    1: setevents
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])("");
  const {
    0: datatable,
    1: setdatatable
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: datatable2,
    1: setdatatable2
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: datatable3,
    1: setdatatable3
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: namasearchact,
    1: setnamasearchact
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: namavalue,
    1: setnamavalue
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])("");
  const {
    0: datatrigger,
    1: setdatatrigger
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(0);
  const {
    0: loadingrel,
    1: setloadingrel
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: praloadingrel,
    1: setpraloadingrel
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false); //delete

  const {
    0: dataApidelete,
    1: setdataApidelete
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])({
    id: ""
  });
  const {
    0: modaldelete,
    1: setmodaldelete
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: loadingdelete,
    1: setloadingdelete
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: relationdatadelete,
    1: setrelationdatadelete
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])({
    name: "",
    tipe: "",
    koneksi: ""
  }); //add

  const {
    0: dataApiadd,
    1: setdataApiadd
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])({
    subject_id: Number(itemid),
    relationship_id: null,
    is_inverse: null,
    type_id: null,
    connected_ids: null,
    backup_connected_ids: null
  });
  const {
    0: displaydatarelations,
    1: setdisplaydatarelations
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: relationnameadd,
    1: setrelationnameadd
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])("");
  const {
    0: relationnameddadd,
    1: setrelationnameddadd
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: relationselectedidxadd,
    1: setrelationselectedidxadd
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(-1);
  const {
    0: relationselectedisinverseadd,
    1: setrelationselectedisinverseadd
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(-1);
  const {
    0: detailtipeadd,
    1: setdetailtipeadd
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(-10);
  const {
    0: detailtipedataadd,
    1: setdetailtipedataadd
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: modaladd,
    1: setmodaladd
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: disabledadd,
    1: setdisabledadd
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(true);
  const {
    0: loadingadd,
    1: setloadingadd
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: fetchingmodel,
    1: setfetchingmodel
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: sublocdata,
    1: setsublocdata
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(null);
  const {
    0: subloctrig,
    1: setsubloctrig
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(-1); //declaration

  const columns = [{
    title: 'Relationship Type',
    dataIndex: 'relationship_name',
    key: 'relationship_name'
  }, {
    title: 'Nama',
    dataIndex: 'connected_detail_name',
    key: 'connected_detail_name'
  }, {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  }, {
    title: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
    dataIndex: 'actionss',
    render: (text, record, index) => {
      return {
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
          children: events === record.id ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__["DeleteOutlined"], {
              onClick: () => {
                setdataApidelete({
                  id: record.id
                });
                setrelationdatadelete({
                  name: record.relationship_name,
                  tipe: record.type,
                  koneksi: record.connected_detail_name
                });
                setmodaldelete(true);
              },
              style: {
                fontSize: `1.2rem`,
                color: `red`,
                cursor: `pointer`
              }
            })
          }) : null
        })
      };
    }
  }]; //handler
  //search nama

  const onChangeSearch = e => {
    if (e.target.value === "") {
      setdatatable(datatable3);
      setnamasearchact(false);
    } else {
      setnamasearchact(true);
      setnamavalue(e.target.value);
    }
  }; //finalClick


  const onFinalClick = () => {
    var datatemp = datatable2;

    if (namasearchact) {
      datatemp = datatemp.filter(flt => {
        return flt.connected_detail_name.toLowerCase().includes(namavalue.toLowerCase());
      });
    }

    setdatatable(datatemp);
  }; //handler


  const handleDeleteRelationshipItem = () => {
    setloadingdelete(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/deleteRelationshipInventory`, {
      method: 'DELETE',
      headers: {
        'Authorization': JSON.parse(initProps),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataApidelete)
    }).then(res => res.json()).then(res2 => {
      setloadingdelete(false);
      setmodaldelete(false);

      if (res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['success']({
          message: "Relationship berhasil dihapus",
          duration: 3
        });

        setdatatrigger(prev => prev + 1);
      } else if (!res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['error']({
          message: res2.message,
          duration: 3
        });
      }
    });
  };

  const handleAddRelationshipItem = () => {
    setloadingadd(true);
    delete dataApiadd.backup_connected_id; // console.log(dataApiadd)

    fetch(`https://boiling-thicket-46501.herokuapp.com/addRelationshipInventories`, {
      method: 'POST',
      headers: {
        'Authorization': JSON.parse(initProps),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataApiadd)
    }).then(res => res.json()).then(res2 => {
      setloadingadd(false);
      setmodaladd(false);

      if (res2.success) {
        setdataApiadd({
          subject_id: Number(itemid),
          relationship_id: null,
          is_inverse: null,
          type_id: null,
          connected_ids: null,
          backup_connected_ids: null
        });
        setrelationnameadd("");
        setsublocdata(null);
        setrelationselectedidxadd(-1);
        setrelationselectedisinverseadd(-1);
        setsubloctrig(-1);

        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['success']({
          message: "Relationship Item berhasil ditambahkan",
          duration: 3
        });

        setdatatrigger(prev => prev + 1);
      } else if (!res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['error']({
          message: res2.message,
          duration: 3
        });
      }
    });
  }; //useEffect


  Object(react__WEBPACK_IMPORTED_MODULE_16__["useEffect"])(() => {
    if (datatrigger !== -1) {
      setpraloadingrel(true);
      fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventory?id=${itemid}&type_id=-4`, {
        method: `GET`,
        headers: {
          'Authorization': JSON.parse(initProps)
        }
      }).then(res => res.json()).then(res2 => {
        setdatatable(res2.data.from_inverse.concat(res2.data.not_from_inverse));
        setdatatable2(res2.data.from_inverse.concat(res2.data.not_from_inverse));
        setdatatable3(res2.data.from_inverse.concat(res2.data.not_from_inverse));
        setpraloadingrel(false);
      });
    }
  }, [datatrigger]);
  Object(react__WEBPACK_IMPORTED_MODULE_16__["useEffect"])(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationships`, {
      method: `GET`,
      headers: {
        'Authorization': JSON.parse(initProps)
      }
    }).then(res => res.json()).then(res2 => {
      setdisplaydatarelations(res2.data);
    });
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_16__["useEffect"])(() => {
    if (subloctrig !== -1) {
      fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${subloctrig}`, {
        method: `GET`,
        headers: {
          'Authorization': JSON.parse(initProps)
        }
      }).then(res => res.json()).then(res2 => {
        setsublocdata(res2.data.children);
      });
    } else if (detailtipeadd !== -10) {
      fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${dataApiadd.type_id}`, {
        method: `GET`,
        headers: {
          'Authorization': JSON.parse(initProps)
        }
      }).then(res => res.json()).then(res2 => {
        dataApiadd.type_id === -3 && setdetailtipedataadd([res2.data]);
        dataApiadd.type_id === -1 && setdetailtipedataadd(res2.data);
        dataApiadd.type_id === -2 && setdetailtipedataadd(res2.data);
        dataApiadd.type_id === -4 && setdetailtipedataadd(res2.data.data);
        console.log();
      });
    }
  }, [detailtipeadd, subloctrig]);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
    className: "flex flex-col",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
      className: "border-b flex justify-between p-5 mb-8",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex items-center",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
          className: "font-bold text-xl my-auto mr-1",
          children: "Relationship"
        }), maindata.model_inventory.asset.deleted_at !== null ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_tooltip__WEBPACK_IMPORTED_MODULE_11___default.a, {
          placement: "right",
          title: "Asset Type telah dihapus, segera lakukan pengubahan Asset Type!",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__["ExclamationCircleOutlined"], {
            style: {
              color: `brown`
            }
          })
        }) : null]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
        type: "primary",
        size: "large",
        onClick: () => {
          setmodaladd(true);
          /*rt.push(`/items/createrelationship/${itemid}?nama=${maindata.inventory_name}&asset_id=${maindata.model_inventory.asset.id}`)*/
        },
        children: "Tambah"
      })]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
      className: "flex mb-5",
      children: praloadingrel ? null : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: " w-full mr-1 grid grid-cols-12",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: "col-span-11 mr-1",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_7___default.a, {
            style: {
              width: `100%`,
              marginRight: `0.5rem`
            },
            placeholder: "Cari Nama Item",
            onChange: e => onChangeSearch(e),
            allowClear: true
          })
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: " col-span-1",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
            type: "primary",
            style: {
              width: `100%`
            },
            onClick: onFinalClick,
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__["SearchOutlined"], {})
          })
        })]
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_table__WEBPACK_IMPORTED_MODULE_4___default.a, {
      loading: praloadingrel,
      pagination: {
        pageSize: 9
      },
      scroll: {
        x: 200
      },
      dataSource: datatable,
      columns: columns,
      onRow: (record, rowIndex) => {
        return {
          onMouseOver: event => {
            setevents(record.id);
          },
          onMouseLeave: event => {
            setevents(0);
          }
        };
      }
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_modal__WEBPACK_IMPORTED_MODULE_3___default.a, {
      title: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
        children: ["Apakah Anda yakin ingin menghapus Relationship berikut ini dari \"", maindata.inventory_name, "\"?"]
      }),
      visible: modaldelete,
      onCancel: () => {
        setmodaldelete(false);
      },
      okText: "Ya",
      cancelText: "Tidak",
      onOk: handleDeleteRelationshipItem,
      okButtonProps: {
        loading: loadingdelete
      },
      width: 700,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex flex-col border-b mb-5",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: "flex flex-col mb-3",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
              className: "font-semibold mb-0",
              children: "Relationship Type:"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
              className: "mb-0",
              children: relationdatadelete.name
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: "flex flex-col mb-3",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
              className: "font-semibold mb-0",
              children: "Tipe:"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
              className: "mb-0",
              children: relationdatadelete.tipe
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: "flex flex-col mb-3",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
              className: "font-semibold mb-0",
              children: "Item:"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
              className: "mb-0",
              children: relationdatadelete.koneksi
            })]
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex flex-col",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-0",
            children: "Notes"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_7___default.a, {
            placeholder: "Masukkan Notes",
            onChange: e => {}
          })]
        })]
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_modal__WEBPACK_IMPORTED_MODULE_3___default.a, {
      title: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex justify-between p-5 mt-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("h1", {
          className: "font-bold text-xl",
          children: ["Form Tambah Relationship \"", maindata.name, "\""]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: "flex",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
              type: "default",
              onClick: () => {
                setmodaladd(false);
                /*setdataApiadd({ ...dataApiadd, relationship_id: null, type_id: null, connected_id: null })*/

                /*console.log(dataApiadd)*/
              },
              style: {
                marginRight: `1rem`
              },
              children: "Batal"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
              type: "primary",
              disabled: disabledadd,
              onClick: handleAddRelationshipItem,
              loading: loadingadd,
              children: "Simpan"
            })]
          })
        })]
      }),
      visible: modaladd,
      onCancel: () => {
        setmodaladd(false);
      },
      footer: null,
      width: 760,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-3",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "jsx-656990793" + " " + "flex flex-col mb-3",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
            className: "jsx-656990793" + " " + "mb-0",
            children: ["Relationship Type ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("span", {
              className: "jsx-656990793" + " " + "namapart"
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            onClick: () => {
              setrelationnameddadd(prev => !prev);
            },
            className: "jsx-656990793" + " " + "w-full border p-2 hover:border-primary rounded-sm flex items-center justify-between cursor-pointer",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
              className: "jsx-656990793" + " " + "mb-0",
              children: relationnameadd
            }), relationnameddadd ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__["UpOutlined"], {
              style: {
                color: `rgb(229,231,235)`
              }
            }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_19__["DownOutlined"], {
              style: {
                color: `rgb(229,231,235)`
              }
            })]
          }), relationnameddadd ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: "jsx-656990793" + " " + "flex flex-col",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
              className: "jsx-656990793" + " " + "flex",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
                className: "jsx-656990793" + " " + "bg-gray-200 font-semibold p-3 w-6/12",
                children: "Relationship Type"
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
                className: "jsx-656990793" + " " + "bg-gray-200 font-semibold p-3 w-6/12",
                children: "Inverse Relationship Type"
              })]
            }), displaydatarelations.map((doc, idx) => {
              return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
                className: "jsx-656990793" + " " + "flex",
                children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
                  onClick: e => {
                    setrelationnameddadd(false);
                    setrelationnameadd(doc.relationship_type);
                    setdataApiadd(_objectSpread(_objectSpread({}, dataApiadd), {}, {
                      relationship_id: doc.id,
                      is_inverse: false
                    }));
                    doc.id === null || dataApiadd.type_id === null ? setdisabledadd(true) : setdisabledadd(false);
                    setrelationselectedidxadd(idx);
                    setrelationselectedisinverseadd(false);
                  },
                  className: "jsx-656990793" + " " + `hover:bg-ternary cursor-pointer hover:text-black p-3 w-6/12 ${relationselectedidxadd === idx && relationselectedisinverseadd === false ? " bg-secondary" : "bg-white"}`,
                  children: doc.relationship_type
                }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
                  onClick: e => {
                    setrelationnameddadd(false);
                    setrelationnameadd(doc.inverse_relationship_type);
                    setdataApiadd(_objectSpread(_objectSpread({}, dataApiadd), {}, {
                      relationship_id: doc.id,
                      is_inverse: true
                    }));
                    doc.id === null || dataApiadd.type_id === null ? setdisabledadd(true) : setdisabledadd(false);
                    setrelationselectedidxadd(idx);
                    setrelationselectedisinverseadd(true);
                  },
                  className: "jsx-656990793" + " " + `hover:bg-ternary cursor-pointer hover:text-black p-3 w-6/12 ${relationselectedidxadd === idx && relationselectedisinverseadd === true ? " bg-secondary" : "bg-white"}`,
                  children: doc.inverse_relationship_type
                })]
              });
            })]
          }) : null, /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(styled_jsx_style__WEBPACK_IMPORTED_MODULE_14___default.a, {
            id: "656990793",
            children: [".namapart.jsx-656990793::before{content:'*';color:red;}"]
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "jsx-2343758608" + " " + "flex flex-col mb-3",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
            className: "jsx-2343758608" + " " + "mb-0",
            children: ["Tipe ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("span", {
              className: "jsx-2343758608" + " " + "tipepart"
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a, {
            value: dataApiadd.type_id,
            onChange: value => {
              setdataApiadd(_objectSpread(_objectSpread({}, dataApiadd), {}, {
                type_id: value
              }));
              dataApiadd.relationship_id === null || value === null ? setdisabledadd(true) : setdisabledadd(false);
              setdetailtipeadd(value);
              dataApiadd.type_id === -3 ? (setsubloctrig(-1), setsublocdata(null)) : null;
            },
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
              value: -1,
              children: "Agent"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
              value: -2,
              children: "Requester"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
              value: -3,
              children: "Company"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
              value: -4,
              children: "Asset Type"
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(styled_jsx_style__WEBPACK_IMPORTED_MODULE_14___default.a, {
            id: "2343758608",
            children: [".tipepart.jsx-2343758608::before{content:'*';color:red;}"]
          })]
        }), dataApiadd.type_id !== null ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
          children: [dataApiadd.type_id === -1 && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: "flex flex-col mb-3",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
              className: "mb-0",
              children: "Detail Tipe"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a, {
              mode: "multiple",
              showSearch: true,
              optionFilterProp: "children",
              notFoundContent: fetchingmodel ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_spin__WEBPACK_IMPORTED_MODULE_12___default.a, {
                size: "small"
              }) : null,
              onSearch: value => {
                setfetchingmodel(true);
                fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${detailtipeadd}&name=${value !== "" ? value : ""}`, {
                  method: `GET`,
                  headers: {
                    'Authorization': JSON.parse(initProps)
                  }
                }).then(res => res.json()).then(res2 => {
                  setdetailtipedataadd(res2.data);
                  setfetchingmodel(false);
                });
              },
              filterOption: (input, opt) => opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
              onChange: value => {
                setdataApiadd(_objectSpread(_objectSpread({}, dataApiadd), {}, {
                  connected_ids: value,
                  backup_connected_ids: value
                }));
              },
              children: detailtipedataadd.map((doc, idx) => {
                return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                  value: doc.id,
                  children: doc.name
                });
              })
            })]
          }), dataApiadd.type_id === -2 && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: "flex flex-col mb-3",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
              className: "mb-0",
              children: "Detail Tipe"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a, {
              mode: "multiple",
              showSearch: true,
              optionFilterProp: "children",
              notFoundContent: fetchingmodel ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_spin__WEBPACK_IMPORTED_MODULE_12___default.a, {
                size: "small"
              }) : null,
              onSearch: value => {
                setfetchingmodel(true);
                fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${detailtipeadd}&name=${value !== "" ? value : ""}`, {
                  method: `GET`,
                  headers: {
                    'Authorization': JSON.parse(initProps)
                  }
                }).then(res => res.json()).then(res2 => {
                  setdetailtipedataadd(res2.data);
                  setfetchingmodel(false);
                });
              },
              filterOption: (input, opt) => opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
              onChange: value => {
                setdataApiadd(_objectSpread(_objectSpread({}, dataApiadd), {}, {
                  connected_ids: value,
                  backup_connected_ids: value
                }));
              },
              children: detailtipedataadd.map((doc, idx) => {
                return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                  value: doc.id,
                  children: doc.name
                });
              })
            })]
          }), dataApiadd.type_id === -3 && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: "flex flex-col mb-3",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
              className: "mb-0",
              children: "Detail Tipe"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_tree_select__WEBPACK_IMPORTED_MODULE_6___default.a, {
              defaultValue: dataApiadd.backup_connected_ids === null ? null : dataApiadd.backup_connected_ids[0],
              treeDefaultExpandedKeys: [1],
              treeData: detailtipedataadd,
              onChange: (value, label, extra) => {
                setdataApiadd(_objectSpread(_objectSpread({}, dataApiadd), {}, {
                  connected_ids: [value],
                  backup_connected_ids: [value]
                }));
                setsubloctrig(value);
              }
            })]
          }), dataApiadd.type_id === -4 && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: "flex flex-col mb-3",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
              className: "mb-0",
              children: "Detail Tipe"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a, {
              placeholder: "Cari dengan Model ID",
              mode: "multiple",
              showSearch: true,
              optionFilterProp: "children",
              notFoundContent: fetchingmodel ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_spin__WEBPACK_IMPORTED_MODULE_12___default.a, {
                size: "small"
              }) : null,
              onSearch: value => {
                setfetchingmodel(true);
                fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${detailtipeadd}&model_id=${value !== "" ? value : ""}`, {
                  method: `GET`,
                  headers: {
                    'Authorization': JSON.parse(initProps)
                  }
                }).then(res => res.json()).then(res2 => {
                  setdetailtipedataadd(res2.data);
                  setfetchingmodel(false);
                });
              },
              filterOption: (input, opt) => opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
              onChange: value => {
                setdataApiadd(_objectSpread(_objectSpread({}, dataApiadd), {}, {
                  connected_ids: value,
                  backup_connected_ids: value
                }));
              },
              children: detailtipedataadd.map((doc, idx) => {
                return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                  value: doc.id,
                  children: doc.mig_id
                });
              })
            })]
          })]
        }) : null, sublocdata !== null && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex flex-col mb-3",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-0",
            children: "Detail Tipe (Sublokasi)"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_tree_select__WEBPACK_IMPORTED_MODULE_6___default.a, {
            multiple: true,
            allowClear: true,
            treeData: sublocdata,
            onChange: (value, label, extra) => {
              if (value.length === 0) {
                setdataApiadd(_objectSpread(_objectSpread({}, dataApiadd), {}, {
                  connected_ids: dataApiadd.backup_connected_ids
                }));
              } else {
                setdataApiadd(_objectSpread(_objectSpread({}, dataApiadd), {}, {
                  connected_ids: value
                }));
              }
            }
          })]
        })]
      })
    })]
  });
};

const Association = ({
  initProps,
  itemid,
  maindata,
  praloading
}) => {
  const rt = Object(next_router__WEBPACK_IMPORTED_MODULE_15__["useRouter"])();
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
    className: "flex flex-col",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
      className: "border-b flex justify-between p-5 mb-8",
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
        className: "font-bold text-xl my-auto",
        children: "Association"
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
      className: "flex flex-col px-5",
      children: praloading ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_spin__WEBPACK_IMPORTED_MODULE_12___default.a, {})
      }) : maindata.associations.length === 0 ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_empty__WEBPACK_IMPORTED_MODULE_2___default.a, {
          image: antd_lib_empty__WEBPACK_IMPORTED_MODULE_2___default.a.PRESENTED_IMAGE_SIMPLE
        })
      }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
        children: maindata.associations.map((doc, idx) => {
          return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: "rounded-md shadow-md py-4 px-5 border mb-4 flex justify-between w-10/12 cursor-pointer",
            onClick: () => {
              rt.push(`/tickets/detail/${doc.id}?active=detailItem`);
            },
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
              className: "flex flex-col",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
                className: "mb-0 font-semibold",
                children: "Ticket Number"
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
                className: "mb-0",
                children: doc.ticket_name
              })]
            }), doc.status === 1 && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
              className: "rounded-md flex items-center px-2 text-center bg-red-100 border border-red-200 text-red-600",
              children: ["Status: ", doc.status_name]
            }), doc.status === 2 && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
              className: "rounded-md flex items-center px-2 text-center bg-blue-100 border border-blue-200 text-blue-600",
              children: ["Status: ", doc.status_name]
            }), doc.status === 3 && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
              className: "rounded-md flex items-center px-2 text-center bg-blue-100 border border-blue-200 text-blue-600",
              children: ["Status: ", doc.status_name]
            }), doc.status === 4 && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
              className: "rounded-md flex items-center px-2 text-center bg-blue-100 border border-blue-200 text-blue-600",
              children: ["Status: ", doc.status_name]
            }), doc.status === 5 && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
              className: "rounded-md flex items-center px-2 text-center bg-blue-100 border border-blue-200 text-blue-600",
              children: ["Status: ", doc.status_name]
            })]
          });
        })
      })
    })]
  });
};

const Acitivty = ({
  itemid,
  initProps,
  maindata,
  invrelations,
  praloading,
  activitytrigger
}) => {
  const {
    0: daylogs,
    1: setdaylogs
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: weeklogs,
    1: setweeklogs
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: morelogs,
    1: setmorelogs
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: praloadinglogs,
    1: setpraloadinglogs
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(true);
  const {
    0: inventories,
    1: setinventories
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  Object(react__WEBPACK_IMPORTED_MODULE_16__["useEffect"])(() => {
    setpraloadinglogs(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/getActivityInventoryLogs?id=${itemid}`, {
      method: `GET`,
      headers: {
        'Authorization': JSON.parse(initProps)
      }
    }).then(res => res.json()).then(res2 => {
      var daylogsmap = res2.data.day_logs.map((doclogs, idxlogs) => {
        const datenew = moment__WEBPACK_IMPORTED_MODULE_21___default()(doclogs.date).locale("id").format('LLL');
        var descnew = '';
        const desckondisiOld = doclogs.properties ? doclogs.properties.old ? doclogs.properties.old.status_condition === 1 ? 'Good' : doclogs.properties.old.status_condition === 2 ? 'Grey' : doclogs.properties.old.status_condition === 3 ? 'Bad' : null : null : null;
        const desckondisiBaru = doclogs.properties ? doclogs.properties.attributes ? doclogs.properties.attributes.status_condition === 1 ? 'Good' : doclogs.properties.attributes.status_condition === 2 ? 'Grey' : doclogs.properties.attributes.status_condition === 3 ? 'Bad' : null : null : null;
        const descusageOld = doclogs.properties ? doclogs.properties.old ? doclogs.properties.old.status_usage === 1 ? 'In Used' : doclogs.properties.old.status_usage === 2 ? 'In Stock' : doclogs.properties.old.status_usage === 3 ? 'Replacement' : null : null : null;
        const descusageBaru = doclogs.properties ? doclogs.properties.attributes ? doclogs.properties.attributes.status_usage === 1 ? 'In Used' : doclogs.properties.attributes.status_usage === 2 ? 'In Stock' : doclogs.properties.attributes.status_usage === 3 ? 'Replacement' : null : null : null;
        const desc1 = doclogs.description.split(" ");

        if (desc1[0] === 'Created') {
          var _doclogs$properties$a;

          if (desc1[2] === "Relationship") {
            desc1[0] === 'Created' ? descnew = descnew + `Penambahan Relationship "${doclogs.properties.attributes.relationship}"` : null;
            desc1[0] === 'Deleted' ? descnew = descnew + `Penghapusan Relationship "${doclogs.properties.old.relationship}"` : null;
          } else if (desc1[1] === 'Association') {
            descnew = descnew + `Association Baru: ${doclogs.properties}`;
          } else if ((_doclogs$properties$a = doclogs.properties.attributes) !== null && _doclogs$properties$a !== void 0 && _doclogs$properties$a.list_parts) {
            descnew = descnew + `Inisialisasi Pembuatan Item Part "${maindata.inventory_parts.filter(docfil => {
              var _doclogs$properties$a2;

              return (_doclogs$properties$a2 = doclogs.properties.attributes) === null || _doclogs$properties$a2 === void 0 ? void 0 : _doclogs$properties$a2.list_parts.includes(docfil.id);
            }).map(docmap => docmap.inventory_name).join(", ")}"`;
          } else {
            var _doclogs$properties$a3;

            descnew = descnew + `Pembuatan Item Baru bernama "${(_doclogs$properties$a3 = doclogs.properties.attributes) === null || _doclogs$properties$a3 === void 0 ? void 0 : _doclogs$properties$a3.inventory_name}"`;
          }
        }

        desc1[0] === 'Notes' ? descnew = descnew + `Penambahan Notes` : null;

        if (desc1[0] === 'Updated') {
          var _doclogs$properties$a4, _doclogs$properties$o, _doclogs$properties$a6, _doclogs$properties$o3, _doclogs$properties$a8, _doclogs$properties$o5;

          if (doclogs.properties.attributes.status_condition) {
            descnew = descnew + `Pengubahan status kondisi dari ${desckondisiOld} ke ${desckondisiBaru}`;
          } else if (doclogs.properties.attributes.status_usage) {
            descnew = descnew + `Pengubahan status pemakaian dari ${descusageOld} ke ${descusageBaru}`;
          } else if (doclogs.properties.attributes.inventory_name) {
            descnew = descnew + `Pengubahan Nama Item dari "${doclogs.properties.old.inventory_name}" ke "${doclogs.properties.attributes.inventory_name}"`;
          } else if (doclogs.properties.attributes.serial_number) {
            descnew = descnew + `Pengubahan Serial Number Item dari "${doclogs.properties.old.serial_number}" ke "${doclogs.properties.attributes.serial_number}"`;
          } else if (doclogs.properties.attributes.location) {
            descnew = descnew + `Pengubahan Location Item dari "${invrelations.companies.filter(doc => doc.id === doclogs.properties.old.location)[0].name}" ke "${invrelations.companies.filter(doc => doc.id === doclogs.properties.attributes.location)[0].name}"`;
          } else if (doclogs.properties.attributes.vendor_id) {
            descnew = descnew + `Pengubahan Vendor Item dari "${invrelations.vendors.filter(doc => doc.id === doclogs.properties.old.vendor_id)[0].name}" ke "${invrelations.vendors.filter(doc => doc.id === doclogs.properties.attributes.vendor_id)[0].name}"`;
          } else if (doclogs.properties.attributes.manufacturer_id) {
            descnew = descnew + `Pengubahan Manufacturer Item dari "${invrelations.manufacturers.filter(doc => doc.id === doclogs.properties.old.manufacturer_id)[0].name}" ke "${invrelations.manufacturers.filter(doc => doc.id === doclogs.properties.attributes.manufacturer_id)[0].name}"`;
          } else if (doclogs.properties.attributes.deskripsi) {
            descnew = descnew + `Pengubahan Deskripsi Item`;
          } else if (((_doclogs$properties$a4 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a4 === void 0 ? void 0 : _doclogs$properties$a4.length) > ((_doclogs$properties$o = doclogs.properties.old.list_parts) === null || _doclogs$properties$o === void 0 ? void 0 : _doclogs$properties$o.length)) {
            var _doclogs$properties$a5;

            const listpartsnew = (_doclogs$properties$a5 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a5 === void 0 ? void 0 : _doclogs$properties$a5.filter(docfil => {
              var _doclogs$properties$o2;

              return ((_doclogs$properties$o2 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o2 === void 0 ? void 0 : _doclogs$properties$o2.map(part => part.id).includes(docfil.id)) === false;
            });
            descnew = descnew + `Penambahan Item "${listpartsnew === null || listpartsnew === void 0 ? void 0 : listpartsnew.map(part => part.mig_id).join(", ")}" menjadi Item Part`;
          } else if (((_doclogs$properties$a6 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a6 === void 0 ? void 0 : _doclogs$properties$a6.length) < ((_doclogs$properties$o3 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o3 === void 0 ? void 0 : _doclogs$properties$o3.length)) {
            var _doclogs$properties$o4;

            const listpartsold = (_doclogs$properties$o4 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o4 === void 0 ? void 0 : _doclogs$properties$o4.filter(docfil => {
              var _doclogs$properties$a7;

              return ((_doclogs$properties$a7 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a7 === void 0 ? void 0 : _doclogs$properties$a7.map(part => part.id).includes(docfil.id)) === false;
            });
            descnew = descnew + `Pengeluaran Item Part "${listpartsold === null || listpartsold === void 0 ? void 0 : listpartsold.map(part => part.mig_id).join(", ")}"`;
          } else if (((_doclogs$properties$a8 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a8 === void 0 ? void 0 : _doclogs$properties$a8.length) === ((_doclogs$properties$o5 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o5 === void 0 ? void 0 : _doclogs$properties$o5.length)) {
            var _doclogs$properties$a9, _doclogs$properties$o7;

            const listpartsnew = (_doclogs$properties$a9 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a9 === void 0 ? void 0 : _doclogs$properties$a9.filter(docfil => {
              var _doclogs$properties$o6;

              return ((_doclogs$properties$o6 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o6 === void 0 ? void 0 : _doclogs$properties$o6.map(part => part.id).includes(docfil.id)) === false;
            });
            const listpartsold = (_doclogs$properties$o7 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o7 === void 0 ? void 0 : _doclogs$properties$o7.filter(docfil => {
              var _doclogs$properties$a10;

              return ((_doclogs$properties$a10 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a10 === void 0 ? void 0 : _doclogs$properties$a10.map(part => part.id).includes(docfil.id)) === false;
            });
            descnew = descnew + `Pergantian Item Part "${listpartsold === null || listpartsold === void 0 ? void 0 : listpartsold.map(part => part.mig_id).join(", ")}" menjadi "${listpartsnew === null || listpartsnew === void 0 ? void 0 : listpartsnew.map(part => part.mig_id).join(", ")}"`;
          } else {
            var prpts = [];

            for (var prop in doclogs.properties.old) {
              prpts.push(prop);
            }

            descnew = descnew + `Pengubahan "${prpts.join(", ")}" Item`;
          }
        }

        if (desc1[0] === "Deleted") {
          if (desc1[2] === "Relationship") {
            desc1[0] === 'Created' ? descnew = descnew + `Penambahan Relationship "${doclogs.properties.attributes.relationship}"` : null;
            desc1[0] === 'Deleted' ? descnew = descnew + `Penghapusan Relationship "${doclogs.properties.old.relationship}"` : null;
          } else if (desc1[1] === 'Association') {
            descnew = descnew + `Association Dihapus: ${doclogs.properties}`;
          }
        }

        return _objectSpread(_objectSpread({}, doclogs), {}, {
          date: datenew,
          description: descnew
        });
      });
      var weeklogsmap = res2.data.week_logs.map((doclogs, idxlogs) => {
        const datenew = moment__WEBPACK_IMPORTED_MODULE_21___default()(doclogs.date).locale("id").format('LLL');
        var descnew = '';
        const desckondisiOld = doclogs.properties ? doclogs.properties.old ? doclogs.properties.old.status_condition === 1 ? 'Good' : doclogs.properties.old.status_condition === 2 ? 'Grey' : doclogs.properties.old.status_condition === 3 ? 'Bad' : null : null : null;
        const desckondisiBaru = doclogs.properties ? doclogs.properties.attributes ? doclogs.properties.attributes.status_condition === 1 ? 'Good' : doclogs.properties.attributes.status_condition === 2 ? 'Grey' : doclogs.properties.attributes.status_condition === 3 ? 'Bad' : null : null : null;
        const descusageOld = doclogs.properties ? doclogs.properties.old ? doclogs.properties.old.status_usage === 1 ? 'In Used' : doclogs.properties.old.status_usage === 2 ? 'In Stock' : doclogs.properties.old.status_usage === 3 ? 'Replacement' : null : null : null;
        const descusageBaru = doclogs.properties ? doclogs.properties.attributes ? doclogs.properties.attributes.status_usage === 1 ? 'In Used' : doclogs.properties.attributes.status_usage === 2 ? 'In Stock' : doclogs.properties.attributes.status_usage === 3 ? 'Replacement' : null : null : null;
        const desc1 = doclogs.description.split(" ");

        if (desc1[0] === 'Created') {
          var _doclogs$properties$a11;

          if (desc1[2] === "Relationship") {
            desc1[0] === 'Created' ? descnew = descnew + `Penambahan Relationship "${doclogs.properties.attributes.relationship}"` : null;
            desc1[0] === 'Deleted' ? descnew = descnew + `Penghapusan Relationship "${doclogs.properties.old.relationship}"` : null;
          } else if (desc1[1] === 'Association') {
            descnew = descnew + `Association Baru: ${doclogs.properties}`;
          } else if ((_doclogs$properties$a11 = doclogs.properties.attributes) !== null && _doclogs$properties$a11 !== void 0 && _doclogs$properties$a11.list_parts) {
            descnew = descnew + `Inisialisasi Pembuatan Item Part "${maindata.inventory_parts.filter(docfil => {
              var _doclogs$properties$a12;

              return (_doclogs$properties$a12 = doclogs.properties.attributes) === null || _doclogs$properties$a12 === void 0 ? void 0 : _doclogs$properties$a12.list_parts.includes(docfil.id);
            }).map(docmap => docmap.inventory_name).join(", ")}"`;
          } else {
            var _doclogs$properties$a13;

            descnew = descnew + `Pembuatan Item Baru bernama "${(_doclogs$properties$a13 = doclogs.properties.attributes) === null || _doclogs$properties$a13 === void 0 ? void 0 : _doclogs$properties$a13.inventory_name}"`;
          }
        }

        desc1[0] === 'Notes' ? descnew = descnew + `Penambahan Notes` : null;

        if (desc1[0] === 'Updated') {
          var _doclogs$properties$a14, _doclogs$properties$o8, _doclogs$properties$a16, _doclogs$properties$o10, _doclogs$properties$a18, _doclogs$properties$o12;

          if (doclogs.properties.attributes.status_condition) {
            descnew = descnew + `Pengubahan status kondisi dari ${desckondisiOld} ke ${desckondisiBaru}`;
          } else if (doclogs.properties.attributes.status_usage) {
            descnew = descnew + `Pengubahan status pemakaian dari ${descusageOld} ke ${descusageBaru}`;
          } else if (doclogs.properties.attributes.inventory_name) {
            descnew = descnew + `Pengubahan Nama Item dari "${doclogs.properties.old.inventory_name}" ke "${doclogs.properties.attributes.inventory_name}"`;
          } else if (doclogs.properties.attributes.serial_number) {
            descnew = descnew + `Pengubahan Serial Number Item dari "${doclogs.properties.old.serial_number}" ke "${doclogs.properties.attributes.serial_number}"`;
          } else if (doclogs.properties.attributes.location) {
            descnew = descnew + `Pengubahan Location Item dari "${invrelations.companies.filter(doc => doc.id === doclogs.properties.old.location)[0].name}" ke "${invrelations.companies.filter(doc => doc.id === doclogs.properties.attributes.location)[0].name}"`;
          } else if (doclogs.properties.attributes.vendor_id) {
            descnew = descnew + `Pengubahan Vendor Item dari "${invrelations.vendors.filter(doc => doc.id === doclogs.properties.old.vendor_id)[0].name}" ke "${invrelations.vendors.filter(doc => doc.id === doclogs.properties.attributes.vendor_id)[0].name}"`;
          } else if (doclogs.properties.attributes.manufacturer_id) {
            descnew = descnew + `Pengubahan Manufacturer Item dari "${invrelations.manufacturers.filter(doc => doc.id === doclogs.properties.old.manufacturer_id)[0].name}" ke "${invrelations.manufacturers.filter(doc => doc.id === doclogs.properties.attributes.manufacturer_id)[0].name}"`;
          } else if (doclogs.properties.attributes.deskripsi) {
            descnew = descnew + `Pengubahan Deskripsi Item`;
          } else if (((_doclogs$properties$a14 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a14 === void 0 ? void 0 : _doclogs$properties$a14.length) > ((_doclogs$properties$o8 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o8 === void 0 ? void 0 : _doclogs$properties$o8.length)) {
            var _doclogs$properties$a15;

            const listpartsnew = (_doclogs$properties$a15 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a15 === void 0 ? void 0 : _doclogs$properties$a15.filter(docfil => {
              var _doclogs$properties$o9;

              return ((_doclogs$properties$o9 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o9 === void 0 ? void 0 : _doclogs$properties$o9.map(part => part.id).includes(docfil.id)) === false;
            });
            descnew = descnew + `Penambahan Item "${listpartsnew === null || listpartsnew === void 0 ? void 0 : listpartsnew.map(part => part.mig_id).join(", ")}" menjadi Item Part`;
          } else if (((_doclogs$properties$a16 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a16 === void 0 ? void 0 : _doclogs$properties$a16.length) < ((_doclogs$properties$o10 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o10 === void 0 ? void 0 : _doclogs$properties$o10.length)) {
            var _doclogs$properties$o11;

            const listpartsold = (_doclogs$properties$o11 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o11 === void 0 ? void 0 : _doclogs$properties$o11.filter(docfil => {
              var _doclogs$properties$a17;

              return ((_doclogs$properties$a17 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a17 === void 0 ? void 0 : _doclogs$properties$a17.map(part => part.id).includes(docfil.id)) === false;
            });
            descnew = descnew + `Pengeluaran Item Part "${listpartsold === null || listpartsold === void 0 ? void 0 : listpartsold.map(part => part.mig_id).join(", ")}"`;
          } else if (((_doclogs$properties$a18 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a18 === void 0 ? void 0 : _doclogs$properties$a18.length) === ((_doclogs$properties$o12 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o12 === void 0 ? void 0 : _doclogs$properties$o12.length)) {
            var _doclogs$properties$a19, _doclogs$properties$o14;

            const listpartsnew = (_doclogs$properties$a19 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a19 === void 0 ? void 0 : _doclogs$properties$a19.filter(docfil => {
              var _doclogs$properties$o13;

              return ((_doclogs$properties$o13 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o13 === void 0 ? void 0 : _doclogs$properties$o13.map(part => part.id).includes(docfil.id)) === false;
            });
            const listpartsold = (_doclogs$properties$o14 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o14 === void 0 ? void 0 : _doclogs$properties$o14.filter(docfil => {
              var _doclogs$properties$a20;

              return ((_doclogs$properties$a20 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a20 === void 0 ? void 0 : _doclogs$properties$a20.map(part => part.id).includes(docfil.id)) === false;
            });
            descnew = descnew + `Pergantian Item Part "${listpartsold === null || listpartsold === void 0 ? void 0 : listpartsold.map(part => part.mig_id).join(", ")}" menjadi "${listpartsnew === null || listpartsnew === void 0 ? void 0 : listpartsnew.map(part => part.mig_id).join(", ")}"`;
          } else {
            var prpts = [];

            for (var prop in doclogs.properties.old) {
              prpts.push(prop);
            }

            descnew = descnew + `Pengubahan "${prpts.join(", ")}" Item`;
          }
        }

        if (desc1[0] === "Deleted") {
          if (desc1[2] === "Relationship") {
            desc1[0] === 'Created' ? descnew = descnew + `Penambahan Relationship "${doclogs.properties.attributes.relationship}"` : null;
            desc1[0] === 'Deleted' ? descnew = descnew + `Penghapusan Relationship "${doclogs.properties.old.relationship}"` : null;
          }
        }

        return _objectSpread(_objectSpread({}, doclogs), {}, {
          date: datenew,
          description: descnew
        });
      });
      var morelogsmap = res2.data.else_logs.map((doclogs, idxlogs) => {
        const datenew = moment__WEBPACK_IMPORTED_MODULE_21___default()(doclogs.date).locale("id").format('LLL');
        var descnew = '';
        const desckondisiOld = doclogs.properties ? doclogs.properties.old ? doclogs.properties.old.status_condition === 1 ? 'Good' : doclogs.properties.old.status_condition === 2 ? 'Grey' : doclogs.properties.old.status_condition === 3 ? 'Bad' : null : null : null;
        const desckondisiBaru = doclogs.properties ? doclogs.properties.attributes ? doclogs.properties.attributes.status_condition === 1 ? 'Good' : doclogs.properties.attributes.status_condition === 2 ? 'Grey' : doclogs.properties.attributes.status_condition === 3 ? 'Bad' : null : null : null;
        const descusageOld = doclogs.properties ? doclogs.properties.old ? doclogs.properties.old.status_usage === 1 ? 'In Used' : doclogs.properties.old.status_usage === 2 ? 'In Stock' : doclogs.properties.old.status_usage === 3 ? 'Replacement' : null : null : null;
        const descusageBaru = doclogs.properties ? doclogs.properties.attributes ? doclogs.properties.attributes.status_usage === 1 ? 'In Used' : doclogs.properties.attributes.status_usage === 2 ? 'In Stock' : doclogs.properties.attributes.status_usage === 3 ? 'Replacement' : null : null : null;
        const desc1 = doclogs.description.split(" ");

        if (desc1[0] === 'Created') {
          var _doclogs$properties$a21;

          if (desc1[2] === "Relationship") {
            desc1[0] === 'Created' ? descnew = descnew + `Penambahan Relationship "${doclogs.properties.attributes.relationship}"` : null;
            desc1[0] === 'Deleted' ? descnew = descnew + `Penghapusan Relationship "${doclogs.properties.old.relationship}"` : null;
          } else if (desc1[1] === 'Association') {
            descnew = descnew + `Association Baru: ${doclogs.properties}`;
          } else if ((_doclogs$properties$a21 = doclogs.properties.attributes) !== null && _doclogs$properties$a21 !== void 0 && _doclogs$properties$a21.list_parts) {
            descnew = descnew + `Inisialisasi Pembuatan Item Part "${maindata.inventory_parts.filter(docfil => {
              var _doclogs$properties$a22;

              return (_doclogs$properties$a22 = doclogs.properties.attributes) === null || _doclogs$properties$a22 === void 0 ? void 0 : _doclogs$properties$a22.list_parts.includes(docfil.id);
            }).map(docmap => docmap.inventory_name).join(", ")}"`;
          } else {
            var _doclogs$properties$a23;

            descnew = descnew + `Pembuatan Item Baru bernama "${(_doclogs$properties$a23 = doclogs.properties.attributes) === null || _doclogs$properties$a23 === void 0 ? void 0 : _doclogs$properties$a23.inventory_name}"`;
          }
        }

        desc1[0] === 'Notes' ? descnew = descnew + `Penambahan Notes` : null;

        if (desc1[0] === 'Updated') {
          var _doclogs$properties$a24, _doclogs$properties$o15, _doclogs$properties$a26, _doclogs$properties$o17, _doclogs$properties$a28, _doclogs$properties$o19;

          if (doclogs.properties.attributes.status_condition) {
            descnew = descnew + `Pengubahan status kondisi dari ${desckondisiOld} ke ${desckondisiBaru}`;
          } else if (doclogs.properties.attributes.status_usage) {
            descnew = descnew + `Pengubahan status pemakaian dari ${descusageOld} ke ${descusageBaru}`;
          } else if (doclogs.properties.attributes.inventory_name) {
            descnew = descnew + `Pengubahan Nama Item dari "${doclogs.properties.old.inventory_name}" ke "${doclogs.properties.attributes.inventory_name}"`;
          } else if (doclogs.properties.attributes.serial_number) {
            descnew = descnew + `Pengubahan Serial Number Item dari "${doclogs.properties.old.serial_number}" ke "${doclogs.properties.attributes.serial_number}"`;
          } else if (doclogs.properties.attributes.location) {
            descnew = descnew + `Pengubahan Location Item dari "${invrelations.companies.filter(doc => doc.id === doclogs.properties.old.location)[0].name}" ke "${invrelations.companies.filter(doc => doc.id === doclogs.properties.attributes.location)[0].name}"`;
          } else if (doclogs.properties.attributes.vendor_id) {
            descnew = descnew + `Pengubahan Vendor Item dari "${invrelations.vendors.filter(doc => doc.id === doclogs.properties.old.vendor_id)[0].name}" ke "${invrelations.vendors.filter(doc => doc.id === doclogs.properties.attributes.vendor_id)[0].name}"`;
          } else if (doclogs.properties.attributes.manufacturer_id) {
            descnew = descnew + `Pengubahan Manufacturer Item dari "${invrelations.manufacturers.filter(doc => doc.id === doclogs.properties.old.manufacturer_id)[0].name}" ke "${invrelations.manufacturers.filter(doc => doc.id === doclogs.properties.attributes.manufacturer_id)[0].name}"`;
          } else if (doclogs.properties.attributes.deskripsi) {
            descnew = descnew + `Pengubahan Deskripsi Item`;
          } else if (((_doclogs$properties$a24 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a24 === void 0 ? void 0 : _doclogs$properties$a24.length) > ((_doclogs$properties$o15 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o15 === void 0 ? void 0 : _doclogs$properties$o15.length)) {
            var _doclogs$properties$a25;

            const listpartsnew = (_doclogs$properties$a25 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a25 === void 0 ? void 0 : _doclogs$properties$a25.filter(docfil => {
              var _doclogs$properties$o16;

              return ((_doclogs$properties$o16 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o16 === void 0 ? void 0 : _doclogs$properties$o16.map(part => part.id).includes(docfil.id)) === false;
            });
            descnew = descnew + `Penambahan Item "${listpartsnew === null || listpartsnew === void 0 ? void 0 : listpartsnew.map(part => part.mig_id).join(", ")}" menjadi Item Part`;
          } else if (((_doclogs$properties$a26 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a26 === void 0 ? void 0 : _doclogs$properties$a26.length) < ((_doclogs$properties$o17 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o17 === void 0 ? void 0 : _doclogs$properties$o17.length)) {
            var _doclogs$properties$o18;

            const listpartsold = (_doclogs$properties$o18 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o18 === void 0 ? void 0 : _doclogs$properties$o18.filter(docfil => {
              var _doclogs$properties$a27;

              return ((_doclogs$properties$a27 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a27 === void 0 ? void 0 : _doclogs$properties$a27.map(part => part.id).includes(docfil.id)) === false;
            });
            descnew = descnew + `Pengeluaran Item Part "${listpartsold === null || listpartsold === void 0 ? void 0 : listpartsold.map(part => part.mig_id).join(", ")}"`;
          } else if (((_doclogs$properties$a28 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a28 === void 0 ? void 0 : _doclogs$properties$a28.length) === ((_doclogs$properties$o19 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o19 === void 0 ? void 0 : _doclogs$properties$o19.length)) {
            var _doclogs$properties$a29, _doclogs$properties$o21;

            const listpartsnew = (_doclogs$properties$a29 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a29 === void 0 ? void 0 : _doclogs$properties$a29.filter(docfil => {
              var _doclogs$properties$o20;

              return ((_doclogs$properties$o20 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o20 === void 0 ? void 0 : _doclogs$properties$o20.map(part => part.id).includes(docfil.id)) === false;
            });
            const listpartsold = (_doclogs$properties$o21 = doclogs.properties.old.list_parts) === null || _doclogs$properties$o21 === void 0 ? void 0 : _doclogs$properties$o21.filter(docfil => {
              var _doclogs$properties$a30;

              return ((_doclogs$properties$a30 = doclogs.properties.attributes.list_parts) === null || _doclogs$properties$a30 === void 0 ? void 0 : _doclogs$properties$a30.map(part => part.id).includes(docfil.id)) === false;
            });
            descnew = descnew + `Pergantian Item Part "${listpartsold === null || listpartsold === void 0 ? void 0 : listpartsold.map(part => part.mig_id).join(", ")}" menjadi "${listpartsnew === null || listpartsnew === void 0 ? void 0 : listpartsnew.map(part => part.mig_id).join(", ")}"`;
          } else {
            var prpts = [];

            for (var prop in doclogs.properties.old) {
              prpts.push(prop);
            }

            descnew = descnew + `Pengubahan "${prpts.join(", ")}" Item`;
          }
        }

        if (desc1[0] === 'Deleted') {
          if (desc1[2] === "Relationship") {
            desc1[0] === 'Created' ? descnew = descnew + `Penambahan Relationship "${doclogs.properties.attributes.relationship}"` : null;
            desc1[0] === 'Deleted' ? descnew = descnew + `Penghapusan Relationship "${doclogs.properties.old.relationship}"` : null;
          }
        }

        return _objectSpread(_objectSpread({}, doclogs), {}, {
          date: datenew,
          description: descnew
        });
      });
      setdaylogs(daylogsmap);
      setweeklogs(weeklogsmap);
      setmorelogs(morelogsmap);
      setpraloadinglogs(false);
    }); // .then(res3 => {
    //     fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventory?id=${itemid}&type_id=-4`, {
    //         method: `GET`,
    //         headers: {
    //             'Authorization': JSON.parse(initProps),
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(res4 => {
    //             var concatarr = res4.data.from_inverse.concat(res4.data.not_from_inverse)
    //             var logs2map = res3.data.relationship.map((docrel, idxrel) => {
    //                 const datenew2 = moment(docrel.date).locale("id").format('LLL')
    //                 var descnew2 = ''
    //                 var idlognew = -1
    //                 const desc2 = docrel.description.split(" ")
    //                 desc2[0] === 'Created' ? idlognew = concatarr.filter(docfil => docfil.id === docrel.properties.attributes.id)[0] : null
    //                 desc2[0] === 'Created' ? descnew2 = descnew2 + `Penambahan Relationship "${typeof (idlognew) === 'undefined' ? "(Sudah Dihapus lagi)" : `${idlognew.relationship}`}"` : null
    //                 desc2[0] === 'Deleted' ? descnew2 = descnew2 + `Penghapusan Relationship` : null
    //                 return {
    //                     ...docrel,
    //                     date: datenew2,
    //                     description: descnew2
    //                 }
    //             })
    //             setlogs2(logs2map)
    //             setpraloadinglogs2(false)
    //         })
    // })
  }, [activitytrigger]);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
    className: "flex flex-col",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
      className: "border-b flex justify-between p-5 mb-8",
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
        className: "font-bold text-xl my-auto",
        children: "Activity"
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
      className: "flex",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col w-6/12",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex flex-col mb-5",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
            className: "font-semibold mx-auto text-xl mb-3",
            children: "Hari Ini"
          }), praloadinglogs ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_spin__WEBPACK_IMPORTED_MODULE_12___default.a, {}) : daylogs.length < 1 ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_empty__WEBPACK_IMPORTED_MODULE_2___default.a, {
              image: antd_lib_empty__WEBPACK_IMPORTED_MODULE_2___default.a.PRESENTED_IMAGE_SIMPLE
            })
          }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_timeline__WEBPACK_IMPORTED_MODULE_1___default.a, {
            mode: "left",
            children: daylogs.map((doclog, idxlog) => {
              return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_timeline__WEBPACK_IMPORTED_MODULE_1___default.a.Item, {
                label: doclog.date,
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
                  className: "flex flex-col",
                  children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
                    className: "font-semibold text-base mb-1",
                    children: doclog.description
                  }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
                    className: "mb-1 text-xs text-gray-500",
                    children: ["Oleh ", doclog.causer_name]
                  }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
                    className: "mb-1 text-sm",
                    children: ["Notes: ", doclog.notes]
                  })]
                })
              });
            })
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex flex-col mb-5",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
            className: "font-semibold mx-auto text-xl mb-3",
            children: "Minggu Ini"
          }), praloadinglogs ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_spin__WEBPACK_IMPORTED_MODULE_12___default.a, {}) : weeklogs.length < 1 ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_empty__WEBPACK_IMPORTED_MODULE_2___default.a, {
              image: antd_lib_empty__WEBPACK_IMPORTED_MODULE_2___default.a.PRESENTED_IMAGE_SIMPLE
            })
          }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_timeline__WEBPACK_IMPORTED_MODULE_1___default.a, {
            mode: "left",
            children: weeklogs.map((doclog, idxlog) => {
              return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_timeline__WEBPACK_IMPORTED_MODULE_1___default.a.Item, {
                label: doclog.date,
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
                  className: "flex flex-col",
                  children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
                    className: "font-semibold text-base mb-1",
                    children: doclog.description
                  }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
                    className: "mb-1 text-xs text-gray-500",
                    children: ["Oleh ", doclog.causer_name]
                  }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
                    className: "mb-1 text-sm",
                    children: ["Notes: ", doclog.notes]
                  })]
                })
              });
            })
          })]
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col w-6/12",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
          className: "font-semibold mx-auto text-xl mb-3",
          children: "Minggu Lalu"
        }), praloadinglogs ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_spin__WEBPACK_IMPORTED_MODULE_12___default.a, {}) : morelogs.length < 1 ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_empty__WEBPACK_IMPORTED_MODULE_2___default.a, {
            image: antd_lib_empty__WEBPACK_IMPORTED_MODULE_2___default.a.PRESENTED_IMAGE_SIMPLE
          })
        }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_timeline__WEBPACK_IMPORTED_MODULE_1___default.a, {
          mode: "left",
          children: morelogs.map((doclog, idxlog) => {
            return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_timeline__WEBPACK_IMPORTED_MODULE_1___default.a.Item, {
              label: doclog.date,
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("h1", {
                  className: "font-semibold text-base mb-1",
                  children: doclog.description
                }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
                  className: "mb-1 text-xs text-gray-500",
                  children: ["Oleh ", doclog.causer_name]
                }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
                  className: "mb-1 text-sm",
                  children: ["Notes: ", doclog.notes]
                })]
              })
            });
          })
        })]
      })]
    })]
  });
};

const ItemDetail = ({
  initProps,
  dataProfile,
  sidemenu,
  itemid
}) => {
  //1. Init
  const rt = Object(next_router__WEBPACK_IMPORTED_MODULE_15__["useRouter"])();
  var activeTab = "overview";
  const {
    active
  } = rt.query;

  if (active) {
    activeTab = active;
  }

  var pathArr = rt.pathname.split("/").slice(1);
  pathArr.splice(2, 2);
  pathArr[pathArr.length - 1] = "Detail Item";
  const {
    TabPane
  } = antd_lib_tabs__WEBPACK_IMPORTED_MODULE_0___default.a; //useState

  const {
    0: maindata,
    1: setmaindata
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])({
    id: "",
    model_id: "",
    vendor_id: "",
    inventory_name: "",
    status_condition: "",
    status_usage: "",
    location: "",
    is_exist: "",
    deskripsi: "",
    manufacturer_id: "",
    mig_id: "",
    serial_number: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    asset_name: "",
    model_name: "",
    location_name: "",
    model_inventory: {
      id: null,
      name: "",
      asset_id: null,
      deleted_at: null,
      asset: {
        id: null,
        name: "",
        deleted_at: null
      }
    },
    location_inventory: {
      company_id: null,
      company_name: ""
    },
    additional_attributes: [],
    inventory_parts: [],
    associations: [],
    quantities: []
  });
  const {
    0: invrelations,
    1: setinvrelations
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])({
    models: [{
      id: "",
      name: "",
      deleted_at: null
    }],
    assets: [{
      id: "",
      name: "",
      deleted_at: null
    }],
    manufacturers: [{
      id: "",
      name: "",
      deleted_at: null
    }],
    status_condition: [],
    status_usage: [],
    vendors: [],
    companies: [],
    tree_companies: {
      children: []
    }
  });
  const {
    0: relship,
    1: setrelship
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: manuf,
    1: setmanuf
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])("");
  const {
    0: vendor,
    1: setvendor
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])("");
  const {
    0: praloading,
    1: setpraloading
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(true);
  const {
    0: praloading2,
    1: setpraloading2
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(true); //delete

  const {
    0: modaldelete,
    1: setmodaldelete
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: loadingdelete,
    1: setloadingdelete
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false); //notes

  const {
    0: notes,
    1: setnotes
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])("");
  const {
    0: modalnotes,
    1: setmodalnotes
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: loadingnotes,
    1: setloadingnotes
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false); //kondisi

  const {
    0: kondisi,
    1: setkondisi
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])("");
  const {
    0: notekondisi,
    1: setnotekondisi
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])("");
  const {
    0: modalkondisi,
    1: setmodalkondisi
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: displaykondisi,
    1: setdisplaykondisi
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(true);
  const {
    0: loadingkondisi,
    1: setloadingkondisi
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false); //status pemakaian

  const {
    0: changeusage,
    1: setchangeusage
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])({
    id: Number(itemid),
    status_usage: "",
    notes: "",
    relationship_type_id: "",
    connected_id: "",
    detail_connected_id: null
  });
  const {
    0: disabledusage,
    1: setdisabledusage
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(true);
  const {
    0: modalusage,
    1: setmodalusage
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: displayusage,
    1: setdisplayusage
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(true);
  const {
    0: loadingchangecompanyusage,
    1: setloadingchangecompanyusage
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: loadingusage,
    1: setloadingusage
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false); // const [agents, setagents] = useState([])
  // const [requesters, setrequesters] = useState([])

  const {
    0: detaillist,
    1: setdetaillist
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: models,
    1: setmodels
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: sublocations,
    1: setsublocations
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])([]);
  const {
    0: locationsdisplay,
    1: setlocationsdisplay
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(false);
  const {
    0: sublocationtrigger,
    1: setsublocationtrigger
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(-1);
  const {
    0: activitytrigger,
    1: setactivitytrigger
  } = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(0); //helper
  //handler

  const handleDeleteItem = () => {
    setloadingdelete(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/deleteInventory`, {
      method: 'DELETE',
      headers: {
        'Authorization': JSON.parse(initProps),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: Number(itemid),
        notes: ""
      })
    }).then(res => res.json()).then(res2 => {
      setloadingdelete(false);

      if (res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['success']({
          message: "Item berhasil dihapus",
          duration: 3
        });

        setmodaldelete(false);
        rt.push(`/items`);
      } else if (!res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['error']({
          message: res2.message,
          duration: 3
        });
      }
    });
  };

  const handleNotesItem = () => {
    setloadingnotes(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/addInventoryNotes`, {
      method: 'POST',
      headers: {
        'Authorization': JSON.parse(initProps),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: Number(itemid),
        notes: notes
      })
    }).then(res => res.json()).then(res2 => {
      setloadingnotes(false);

      if (res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['success']({
          message: "Notes berhasil ditambahkan",
          duration: 3
        });

        setmodalnotes(false);
        window.location.href = `/items/detail/${itemid}?active=activity`;
      } else if (!res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['error']({
          message: res2.message,
          duration: 3
        });
      }
    });
  };

  const handleKondisiItem = () => {
    setloadingkondisi(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/changeStatusCondition`, {
      method: 'PUT',
      headers: {
        'Authorization': JSON.parse(initProps),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: Number(itemid),
        notes: notekondisi,
        status_condition: kondisi
      })
    }).then(res => res.json()).then(res2 => {
      setloadingkondisi(false);
      setmodalkondisi(false);

      if (res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['success']({
          message: "Status Kondisi berhasil diubah",
          duration: 2
        });

        window.location.href = `/items/detail/${itemid}`;
      } else if (!res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['error']({
          message: res2.message,
          duration: 3
        });
      }
    });
  };

  const handleUsageItem = () => {
    setloadingusage(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/changeStatusUsage`, {
      method: 'PUT',
      headers: {
        'Authorization': JSON.parse(initProps),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changeusage)
    }).then(res => res.json()).then(res2 => {
      setloadingusage(false);
      setmodalusage(false);

      if (res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['success']({
          message: "Status Pemakaian berhasil diubah",
          duration: 2
        });

        window.location.href = `/items/detail/${itemid}`;
      } else if (!res2.success) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_8___default.a['error']({
          message: res2.message,
          duration: 3
        });
      }
    });
  }; //useEffect


  Object(react__WEBPACK_IMPORTED_MODULE_16__["useEffect"])(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getInventory?id=${itemid}`, {
      method: `GET`,
      headers: {
        'Authorization': JSON.parse(initProps)
      }
    }).then(res => res.json()).then(res2 => {
      var t = {};

      for (var prop in res2.data) {
        if (prop === "additional_attributes") {
          t[prop] = res2.data[prop].map((doc, idx) => {
            if (doc.data_type === 'dropdown' || doc.data_type === 'checkbox') {
              return _objectSpread(_objectSpread({}, doc), {}, {
                value: JSON.parse(doc.value)
              });
            } else {
              return _objectSpread({}, doc);
            }
          });
        } else {
          t[prop] = res2.data[prop];
        }
      }

      setmaindata(t);
      setpraloading(false);
      return t;
    }).then(res3 => {
      fetch(`https://boiling-thicket-46501.herokuapp.com/getInventoryRelations`, {
        method: `GET`,
        headers: {
          'Authorization': JSON.parse(initProps)
        }
      }).then(res => res.json()).then(res2 => {
        var _res2$data$vendors$fi;

        setinvrelations(res2.data);
        var del_manuf = null;
        res3.manufacturer_id === 0 || res3.manufacturer_id === null ? del_manuf = null : del_manuf = res2.data.manufacturers.filter(docfil => docfil.id === res3.manufacturer_id)[0].deleted_at;
        setmanuf({
          name: res3.manufacturer_id === null || res3.manufacturer_id === 0 ? "-" : res2.data.manufacturers.filter(docfil => docfil.id === res3.manufacturer_id)[0].name,
          isnull: del_manuf !== null ? false : true
        });
        res3.vendor_id === null || res3.vendor_id === 0 ? setvendor("-") : setvendor((_res2$data$vendors$fi = res2.data.vendors.filter(docfil => docfil.id === res3.vendor_id)[0]) === null || _res2$data$vendors$fi === void 0 ? void 0 : _res2$data$vendors$fi.name);
        setpraloading2(false);
      });
    });
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_16__["useEffect"])(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getFilterModels`, {
      method: `GET`,
      headers: {
        'Authorization': JSON.parse(initProps),
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res2 => {
      setmodels(res2.data);
    });
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_16__["useEffect"])(() => {
    if (changeusage.relationship_type_id !== "") {
      fetch(`https://boiling-thicket-46501.herokuapp.com/getChangeStatusUsageDetailList?id=${changeusage.relationship_type_id}`, {
        method: `GET`,
        headers: {
          'Authorization': JSON.parse(initProps)
        }
      }).then(res => res.json()).then(res2 => {
        changeusage.relationship_type_id === -3 ? setdetaillist([res2.data]) : setdetaillist(res2.data.data);
      });
    }
  }, [changeusage]);
  Object(react__WEBPACK_IMPORTED_MODULE_16__["useEffect"])(() => {
    if (sublocationtrigger !== -1) {
      setloadingchangecompanyusage(true);
      fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventoryDetailList?type_id=${changeusage.connected_id}`, {
        method: `GET`,
        headers: {
          'Authorization': JSON.parse(initProps)
        }
      }).then(res => res.json()).then(res2 => {
        setloadingchangecompanyusage(false);
        setsublocations(res2.data.children);
      });
    }
  }, [sublocationtrigger]);
  Object(react__WEBPACK_IMPORTED_MODULE_16__["useEffect"])(() => {
    fetch(`https://boiling-thicket-46501.herokuapp.com/getRelationshipInventory?id=${itemid}&type_id=-4`, {
      method: `GET`,
      headers: {
        'Authorization': JSON.parse(initProps)
      }
    }).then(res => res.json()).then(res2 => {
      setrelship(res2.data.from_inverse.concat(res2.data.not_from_inverse));
    });
  }, []);
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(_components_layout_dashboard2__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"], {
    st: _components_layout_dashboard_module_css__WEBPACK_IMPORTED_MODULE_22___default.a,
    sidemenu: sidemenu,
    tok: initProps,
    pathArr: pathArr,
    dataProfile: dataProfile,
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
      className: "w-full h-auto grid grid-cols-1 md:grid-cols-4",
      id: "createAssetsWrapper",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
        className: " col-span-1 md:col-span-4 mb-8",
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(wil_react_sticky__WEBPACK_IMPORTED_MODULE_23___default.a, {
          containerSelectorFocus: "#createAgentsWrapper",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: " col-span-4 flex justify-between py-5 px-4 border-t border-b bg-white",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
              className: "flex items-center",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
                  className: " text-gray-400 mb-0",
                  children: "Item:"
                }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("h1", {
                  className: "font-semibold py-2 text-2xl mb-0 mr-20",
                  children: [maindata.mig_id, " - ", maindata.model_inventory.name]
                })]
              }), praloading ? null : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
                children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
                  className: "flex flex-col mr-7 p-2",
                  children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
                    className: "mb-1",
                    children: "Status Pemakaian:"
                  }), displayusage ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a, {
                    style: {
                      width: `10rem`
                    },
                    placeholder: "Masukkan Status Pemakaian",
                    defaultValue: maindata.status_usage === 0 || maindata.status_usage === null ? null : maindata.status_usage,
                    onChange: value => {
                      setdisabledusage(prev => {
                        if (value !== 1) {
                          return false;
                        } else {
                          return true;
                        }
                      });
                      setchangeusage(_objectSpread(_objectSpread({}, changeusage), {}, {
                        status_usage: value
                      }));
                      setmodalusage(true);
                      setdisplayusage(false);
                    },
                    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                      value: 1,
                      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("strong", {
                        children: "In Used"
                      })
                    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                      value: 2,
                      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("strong", {
                        children: "In Stock"
                      })
                    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                      value: 3,
                      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("strong", {
                        children: "Replacement"
                      })
                    })]
                  }) : null]
                }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
                  className: "flex flex-col p-2",
                  children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
                    className: "mb-1",
                    children: "Kondisi:"
                  }), displaykondisi ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a, {
                    style: {
                      width: `10rem`
                    },
                    placeholder: "Masukkan Status Kondisi",
                    defaultValue: maindata.status_condition === 0 || maindata.status_condition === null ? null : maindata.status_condition,
                    onChange: value => {
                      setkondisi(value);
                      setmodalkondisi(true);
                      setdisplaykondisi(false);
                    },
                    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                      value: 1,
                      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
                        className: "p-1 flex w-full items-center",
                        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
                          className: "w-3 h-3 rounded-full bg-green-500 mr-1"
                        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
                          className: "mb-0 font-semibold",
                          children: "Good"
                        })]
                      })
                    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                      value: 2,
                      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
                        className: "p-1 flex w-full items-center",
                        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
                          className: "w-3 h-3 rounded-full bg-gray-500 mr-1"
                        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
                          className: "mb-0 font-semibold",
                          children: "Grey"
                        })]
                      })
                    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                      value: 3,
                      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
                        className: "p-1 flex w-full items-center",
                        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
                          className: "w-3 h-3 rounded-full bg-red-500 mr-1"
                        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
                          className: "mb-0 font-semibold",
                          children: "Bad"
                        })]
                      })
                    })]
                  }) : null]
                })]
              })]
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
              className: "flex space-x-2 items-center",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
                style: {
                  marginRight: `1rem`
                },
                onClick: () => {
                  setmodalnotes(true);
                },
                size: "large",
                children: "Tambah Notes"
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
                type: "danger",
                size: "large",
                onClick: () => {
                  setmodaldelete(true);
                },
                children: "Hapus"
              })]
            })]
          })
        })
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "col-span-1 md:col-span-4 mb-8",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: " hidden md:block",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(antd_lib_tabs__WEBPACK_IMPORTED_MODULE_0___default.a, {
            tabPosition: `left`,
            defaultActiveKey: activeTab,
            onTabClick: (key, e) => {
              if (key === "activity") {
                setactivitytrigger(prev => prev + 1);
              }
            },
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(TabPane, {
              tab: "Overview",
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(Overview, {
                itemid: itemid,
                initProps: initProps,
                maindata: maindata,
                manuf: manuf,
                vendor: vendor,
                praloading: praloading
              })
            }, `overview`), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(TabPane, {
              tab: "Konfigurasi Part",
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(KonfigurasiPart, {
                itemid: itemid,
                initProps: initProps,
                maindata: maindata,
                invrelations: invrelations,
                praloading2: praloading2,
                models: models,
                setmodels: setmodels
              })
            }, `konfigurasiPart`), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(TabPane, {
              tab: "Relationship",
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(Relationship, {
                itemid: itemid,
                initProps: initProps,
                maindata: maindata
              })
            }, `relationship`), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(TabPane, {
              tab: "Association",
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(Association, {
                itemid: itemid,
                initProps: initProps,
                maindata: maindata,
                praloading: praloading
              })
            }, `association`), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(TabPane, {
              tab: "Activity",
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(Acitivty, {
                itemid: itemid,
                initProps: initProps,
                maindata: maindata,
                invrelations: invrelations,
                activitytrigger: activitytrigger
              })
            }, `activity`)]
          })
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: " block md:hidden",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(antd_lib_tabs__WEBPACK_IMPORTED_MODULE_0___default.a, {
            tabPosition: `top`,
            defaultActiveKey: activeTab,
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(TabPane, {
              tab: "Overview",
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(Overview, {
                itemid: itemid,
                initProps: initProps,
                maindata: maindata,
                manuf: manuf,
                vendor: vendor,
                praloading: praloading
              })
            }, `overview`), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(TabPane, {
              tab: "Konfigurasi Part",
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(KonfigurasiPart, {
                itemid: itemid,
                initProps: initProps,
                maindata: maindata,
                invrelations: invrelations,
                praloading2: praloading2,
                models: models,
                setmodels: setmodels
              })
            }, `konfigurasiPart`), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(TabPane, {
              tab: "Relationship",
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(Relationship, {
                itemid: itemid,
                initProps: initProps,
                maindata: maindata
              })
            }, `relationship`), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(TabPane, {
              tab: "Association",
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(Association, {
                itemid: itemid,
                initProps: initProps,
                maindata: maindata,
                praloading: praloading
              })
            }, `association`), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(TabPane, {
              tab: "Activity",
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(Acitivty, {
                itemid: itemid,
                initProps: initProps,
                maindata: maindata,
                invrelations: invrelations,
                activitytrigger: activitytrigger
              })
            }, `activity`)]
          })
        })]
      })]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_modal__WEBPACK_IMPORTED_MODULE_3___default.a, {
      title: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex justify-between p-5 mt-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("h1", {
          className: "font-bold text-xl",
          children: ["Form Ubah Status Pemakaian ", maindata.inventory_name]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: "flex",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
              type: "default",
              onClick: () => {
                setmodalusage(false);
                setdisplayusage(true);
              },
              style: {
                marginRight: `1rem`
              },
              children: "Batal"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
              type: "primary",
              disabled: disabledusage,
              onClick: handleUsageItem,
              loading: loadingusage,
              children: "Simpan"
            })]
          })
        })]
      }),
      visible: modalusage,
      onCancel: () => {
        setmodalusage(false);
        setdisplayusage(true);
      },
      footer: null,
      width: 760,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-3",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "jsx-2325313997" + " " + "flex flex-col mb-3",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
            className: "jsx-2325313997" + " " + "mb-0",
            children: ["Status Pemakaian ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("span", {
              className: "jsx-2325313997" + " " + "usagemodal"
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a, {
            disabled: true,
            defaultValue: changeusage.status_usage,
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
              value: 1,
              children: "In Used"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
              value: 2,
              children: "In Stock"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
              value: 3,
              children: "Replacement"
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(styled_jsx_style__WEBPACK_IMPORTED_MODULE_14___default.a, {
            id: "2325313997",
            children: [".usagemodal.jsx-2325313997::before{content:'*';color:red;}"]
          })]
        }), changeusage.status_usage === 1 ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex flex-col mb-3",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: "jsx-1635122929" + " " + "flex flex-col mb-3",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
              className: "jsx-1635122929" + " " + "mb-0",
              children: ["Digunakan Oleh ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("span", {
                className: "jsx-1635122929" + " " + "bymodal"
              })]
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a, {
              onChange: value => {
                setchangeusage(_objectSpread(_objectSpread({}, changeusage), {}, {
                  relationship_type_id: value,
                  detail_connected_id: null,
                  connected_id: null
                }));
                setdisabledusage(true);

                if (value !== 3) {
                  setlocationsdisplay(false);
                }
              },
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                value: -1,
                children: "Agent"
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                value: -2,
                children: "Requester"
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                value: -3,
                children: "Company"
              })]
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(styled_jsx_style__WEBPACK_IMPORTED_MODULE_14___default.a, {
              id: "1635122929",
              children: [".bymodal.jsx-1635122929::before{content:'*';color:red;}"]
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: "jsx-1874088803" + " " + "flex flex-col mb-3 ml-5",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
              className: "jsx-1874088803" + " " + "mb-0",
              children: ["Nama ", changeusage.relationship_type_id === -1 && "Agent", " ", changeusage.relationship_type_id === -2 && "Requester", " ", changeusage.relationship_type_id === -3 && "Company", " ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("span", {
                className: "jsx-1874088803" + " " + "namabymodal"
              })]
            }), changeusage.relationship_type_id === -3 ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_tree_select__WEBPACK_IMPORTED_MODULE_6___default.a, {
              treeData: [invrelations.tree_companies],
              treeDefaultExpandedKeys: [1],
              onChange: value => {
                setchangeusage(_objectSpread(_objectSpread({}, changeusage), {}, {
                  connected_id: value
                }));
                changeusage.relationship_type_id === -3 ? setsublocationtrigger(prev => prev + 1) : null;
                changeusage.relationship_type_id === -3 ? setlocationsdisplay(true) : null;
                setdisabledusage(false);
              }
            }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a, {
              value: changeusage.connected_id,
              onChange: value => {
                setchangeusage(_objectSpread(_objectSpread({}, changeusage), {}, {
                  connected_id: value
                }));
                setdisabledusage(false);
              },
              children: [changeusage.relationship_type_id === -1 && detaillist.map((doc, idx) => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                value: doc.id,
                children: doc.name
              })), changeusage.relationship_type_id === -2 && detaillist.map((doc, idx) => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
                value: doc.id,
                children: doc.name
              }))]
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(styled_jsx_style__WEBPACK_IMPORTED_MODULE_14___default.a, {
              id: "1874088803",
              children: [".namabymodal.jsx-1874088803::before{content:'*';color:red;}"]
            })]
          }), changeusage.connected_id === -3 || locationsdisplay === true ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
            className: "flex flex-col ml-5",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
              className: "mb-0",
              children: "Nama Lokasi"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_tree_select__WEBPACK_IMPORTED_MODULE_6___default.a, {
              loading: loadingchangecompanyusage,
              treeData: sublocations,
              onChange: value => {
                setchangeusage(_objectSpread(_objectSpread({}, changeusage), {}, {
                  detail_connected_id: value
                }));
              }
            })]
          }) : null]
        }) : null, /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex flex-col mb-3",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-0",
            children: "Notes"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_7___default.a.TextArea, {
            rows: 3,
            placeholder: "Masukkan Notes",
            onChange: e => {
              setchangeusage(_objectSpread(_objectSpread({}, changeusage), {}, {
                notes: e.target.value
              }));
            }
          })]
        })]
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_modal__WEBPACK_IMPORTED_MODULE_3___default.a, {
      title: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex justify-between p-5 mt-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("h1", {
          className: "font-bold text-xl",
          children: ["Form Ubah Status Kondisi ", maindata.inventory_name]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: "flex",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
              type: "default",
              onClick: () => {
                setmodalkondisi(false);
                setdisplaykondisi(true);
              },
              style: {
                marginRight: `1rem`
              },
              children: "Batal"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
              type: "primary",
              onClick: handleKondisiItem,
              loading: loadingkondisi,
              children: "Simpan"
            })]
          })
        })]
      }),
      visible: modalkondisi,
      onCancel: () => {
        setmodalkondisi(false);
        setdisplaykondisi(true);
      },
      footer: null,
      width: 600,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-3",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "jsx-2167531264" + " " + "flex flex-col mb-3",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
            className: "jsx-2167531264" + " " + "mb-0",
            children: ["Status Kondisi ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("span", {
              className: "jsx-2167531264" + " " + "kondisimodal"
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a, {
            disabled: true,
            defaultValue: kondisi,
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
              value: 1,
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
                className: "jsx-2167531264" + " " + "mb-0",
                children: "Good"
              })
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
              value: 2,
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
                className: "jsx-2167531264" + " " + "mb-0",
                children: "Grey"
              })
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_select__WEBPACK_IMPORTED_MODULE_5___default.a.Option, {
              value: 3,
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
                className: "jsx-2167531264" + " " + "mb-0",
                children: "Bad"
              })
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(styled_jsx_style__WEBPACK_IMPORTED_MODULE_14___default.a, {
            id: "2167531264",
            children: [".kondisimodal.jsx-2167531264::before{content:'*';color:red;}"]
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex flex-col mb-3",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-0",
            children: "Notes"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_7___default.a.TextArea, {
            rows: 3,
            placeholder: "Masukkan Notes",
            onChange: e => {
              setnotekondisi(e.target.value);
            }
          })]
        })]
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_modal__WEBPACK_IMPORTED_MODULE_3___default.a, {
      title: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex justify-between p-5 mt-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("h1", {
          className: "font-bold text-xl",
          children: ["Form Tambah Notes ", maindata.inventory_name]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
          className: "flex",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
              type: "default",
              onClick: () => {
                setmodalnotes(false);
              },
              style: {
                marginRight: `1rem`
              },
              children: "Batal"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_13___default.a, {
              type: "primary",
              disabled: notes === "",
              onClick: handleNotesItem,
              loading: loadingnotes,
              children: "Simpan"
            })]
          })
        })]
      }),
      visible: modalnotes,
      onCancel: () => {
        setmodalnotes(false);
      },
      footer: null,
      width: 600,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
          className: "mb-0",
          children: "Notes"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_7___default.a.TextArea, {
          rows: 3,
          placeholder: "Masukkan Notes",
          onChange: e => {
            setnotes(e.target.value);
          }
        })]
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(antd_lib_modal__WEBPACK_IMPORTED_MODULE_3___default.a, {
      title: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("h1", {
        className: "font-semibold",
        children: ["Apakah anda yakin ingin menghapus item \"", maindata.inventory_name, " - ", maindata.mig_id, "\"?"]
      }),
      visible: modaldelete,
      onCancel: () => {
        setmodaldelete(false);
      },
      okText: "Ya",
      cancelText: "Tidak",
      onOk: handleDeleteItem,
      okButtonProps: {
        loading: loadingdelete
      },
      width: 720,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
        className: "flex flex-col mb-5",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("div", {
          className: "flex flex-col mb-4",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-2 text-xs font-semibold",
            children: "Item ini memiliki Item Part sebagai berikut :"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("div", {
            className: "mb-2 text-xs flex flex-col",
            children: maindata.inventory_parts.length === 0 ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
              className: "font-semibold",
              children: "-"
            }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["Fragment"], {
              children: maindata.inventory_parts.map((docempty, idxempty) => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("p", {
                children: ["- ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("strong", {
                  children: docempty.inventory_name
                })]
              }, idxempty))
            })
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-2 text-xs font-semibold",
            children: "Item ini sedang memiliki hubungan dengan item berikut:"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("ul", {
            className: "mb-2 text-xs",
            children: relship.length === 0 ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
              className: "font-semibold",
              children: "-"
            }) : relship.map((docrel, idxrel) => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("li", {
              children: ["- ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxs"])("strong", {
                children: [docrel.type, " - ", docrel.connected_detail_name]
              })]
            }, idxrel))
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("p", {
            className: "mb-2 text-xs font-semibold text-red-500",
            children: "Dengan menghapus item ini akan menghilangkan seluruh hubungan dengan item diatas!"
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__["jsx"])("hr", {})]
      })
    })]
  });
};

async function getServerSideProps({
  req,
  res,
  params
}) {
  var initProps = {};
  const itemid = params.itemId;

  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    };
  }

  const cookiesJSON1 = cookie__WEBPACK_IMPORTED_MODULE_17___default.a.parse(req.headers.cookie);

  if (!cookiesJSON1.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    };
  }

  initProps = cookiesJSON1.token;
  const resourcesGP = await fetch(`https://boiling-thicket-46501.herokuapp.com/detailProfile`, {
    method: `GET`,
    headers: {
      'Authorization': JSON.parse(initProps)
    }
  });
  const resjsonGP = await resourcesGP.json();
  const dataProfile = resjsonGP; // if (![107, 108, 109, 110, 111, 112, 132].every((curr) => dataProfile.data.registered_feature.includes(curr))) {
  //     res.writeHead(302, { Location: '/dashboard/admin' })
  //     res.end()
  // }

  return {
    props: {
      initProps,
      dataProfile,
      sidemenu: "3",
      itemid
    }
  };
}
/* harmony default export */ __webpack_exports__["default"] = (ItemDetail);

/***/ }),

/***/ "X24+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.removePathTrailingSlash = removePathTrailingSlash;
exports.normalizePathTrailingSlash = void 0;
/**
* Removes the trailing slash of a path if there is one. Preserves the root path `/`.
*/

function removePathTrailingSlash(path) {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}
/**
* Normalizes the trailing slash of a path according to the `trailingSlash` option
* in `next.config.js`.
*/


const normalizePathTrailingSlash =  false ? undefined : removePathTrailingSlash;
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "YTqd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteRegex = getRouteRegex; // this isn't importing the escape-string-regex module
// to reduce bytes

function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function parseParameter(param) {
  const optional = param.startsWith('[') && param.endsWith(']');

  if (optional) {
    param = param.slice(1, -1);
  }

  const repeat = param.startsWith('...');

  if (repeat) {
    param = param.slice(3);
  }

  return {
    key: param,
    repeat,
    optional
  };
}

function getRouteRegex(normalizedRoute) {
  const segments = (normalizedRoute.replace(/\/$/, '') || '/').slice(1).split('/');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = segments.map(segment => {
    if (segment.startsWith('[') && segment.endsWith(']')) {
      const {
        key,
        optional,
        repeat
      } = parseParameter(segment.slice(1, -1));
      groups[key] = {
        pos: groupIndex++,
        repeat,
        optional
      };
      return repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
    } else {
      return `/${escapeRegex(segment)}`;
    }
  }).join(''); // dead code eliminate for browser since it's only needed
  // while generating routes-manifest

  if (true) {
    let routeKeyCharCode = 97;
    let routeKeyCharLength = 1; // builds a minimal routeKey using only a-z and minimal number of characters

    const getSafeRouteKey = () => {
      let routeKey = '';

      for (let i = 0; i < routeKeyCharLength; i++) {
        routeKey += String.fromCharCode(routeKeyCharCode);
        routeKeyCharCode++;

        if (routeKeyCharCode > 122) {
          routeKeyCharLength++;
          routeKeyCharCode = 97;
        }
      }

      return routeKey;
    };

    const routeKeys = {};
    let namedParameterizedRoute = segments.map(segment => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        const {
          key,
          optional,
          repeat
        } = parseParameter(segment.slice(1, -1)); // replace any non-word characters since they can break
        // the named regex

        let cleanedKey = key.replace(/\W/g, '');
        let invalidKey = false; // check if the key is still invalid and fallback to using a known
        // safe key

        if (cleanedKey.length === 0 || cleanedKey.length > 30) {
          invalidKey = true;
        }

        if (!isNaN(parseInt(cleanedKey.substr(0, 1)))) {
          invalidKey = true;
        }

        if (invalidKey) {
          cleanedKey = getSafeRouteKey();
        }

        routeKeys[cleanedKey] = key;
        return repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
      } else {
        return `/${escapeRegex(segment)}`;
      }
    }).join('');
    return {
      re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
      groups,
      routeKeys,
      namedRegex: `^${namedParameterizedRoute}(?:/)?$`
    };
  }

  return {
    re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
    groups
  };
}

/***/ }),

/***/ "ZV7/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var antd_lib_spin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("vEvA");
/* harmony import */ var antd_lib_spin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_spin__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("TMRn");
/* harmony import */ var antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("VzA1");
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("vmXh");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ant_design_icons_MenuUnfoldOutlined__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("rQZo");
/* harmony import */ var _ant_design_icons_MenuUnfoldOutlined__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons_MenuUnfoldOutlined__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ant_design_icons_MenuFoldOutlined__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("gtlx");
/* harmony import */ var _ant_design_icons_MenuFoldOutlined__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons_MenuFoldOutlined__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_layout_menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("Gv1R");
/* harmony import */ var _layout_menu_header__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("cPPd");














function LayoutDashboard2({
  children,
  tok,
  dataProfile,
  pathArr,
  sidemenu,
  st
}) {
  const rt = Object(next_router__WEBPACK_IMPORTED_MODULE_5__["useRouter"])();
  var childBreacrumb = [];

  if (pathArr) {
    for (var i = 0; i < pathArr.length; i++) {
      childBreacrumb.push(pathArr[i]);
    }
  }

  const childBreacrumbCC = childBreacrumb.map((doc, idx) => {
    return doc[0].toUpperCase() + doc.slice(1);
  });
  const childBreacrumbDD = childBreacrumbCC;
  const {
    Sider,
    Content,
    Header
  } = antd_lib_layout__WEBPACK_IMPORTED_MODULE_3___default.a;
  const {
    0: coll,
    1: setColl
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(true);
  const {
    0: collsmall,
    1: setCollsmall
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(true);
  const {
    0: tinggi,
    1: setTinggi
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(90);
  const {
    0: loadingspin,
    1: setloadingspin
  } = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false);

  const handleColl = () => {
    setColl(prev => !prev);
  };

  const handleCollSmall = () => {
    setCollsmall(prev => !prev);
  };

  const handleLogout = () => {
    setloadingspin(true);
    fetch(`https://boiling-thicket-46501.herokuapp.com/logout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(tok)
      }
    }).then(res => res.json()).then(res2 => {
      setloadingspin(false);

      if (res2.success) {
        js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.remove('token');
        console.log("token abis logout: " + js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.get('token'));
        rt.push('/login');
      }
    }).catch(err => {
      setloadingspin(false);
      console.log(err.message);
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(() => {
    var h = window.innerHeight;
    setTinggi(h);
  }, []);
  var pathBuilder = "";
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(antd_lib_spin__WEBPACK_IMPORTED_MODULE_0___default.a, {
    spinning: loadingspin,
    children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxs"])("div", {
      className: " min-h-screen flex",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(_components_layout_menu__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
        dataProfile: dataProfile,
        handleCollSmall: handleCollSmall,
        sidemenu: sidemenu,
        coll: coll,
        collsmall: collsmall,
        st: st
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxs"])("div", {
        className: "h-auto w-full",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxs"])(Header, {
          className: "site-layout-background",
          style: {
            padding: 0,
            backgroundColor: `white`,
            display: `flex`,
            alignItems: `center`,
            flexDirection: `row`,
            flexWrap: `wrap`,
            width: `100%`,
            justifyContent: `space-between`,
            height: `auto`
          },
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxs"])("div", {
            className: "flex z-50",
            children: [coll ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(_ant_design_icons_MenuUnfoldOutlined__WEBPACK_IMPORTED_MODULE_8___default.a, {
              onClick: handleColl,
              style: {
                padding: `24px`,
                float: `left`,
                marginTop: `0.3rem`
              },
              className: st.trigger
            }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(_ant_design_icons_MenuFoldOutlined__WEBPACK_IMPORTED_MODULE_9___default.a, {
              onClick: handleColl,
              style: {
                padding: `24px`,
                float: `left`
              },
              className: st.trigger
            }), collsmall ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(_ant_design_icons_MenuUnfoldOutlined__WEBPACK_IMPORTED_MODULE_8___default.a, {
              onClick: handleCollSmall,
              style: {
                padding: `24px`,
                float: `left`,
                marginTop: `0.3rem`
              },
              className: st.triggerSmall
            }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(_ant_design_icons_MenuFoldOutlined__WEBPACK_IMPORTED_MODULE_9___default.a, {
              onClick: handleCollSmall,
              style: {
                padding: `24px`,
                float: `left`
              },
              className: st.triggerSmall
            }), pathArr ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_1___default.a, {
              separator: ">",
              style: {
                float: `left`,
                padding: `24px 10px`,
                backgroundColor: `white`
              },
              className: st.breadcrumbClients,
              children: childBreacrumbDD.length !== 0 ? childBreacrumbDD.map((doc, idx) => {
                pathBuilder = pathBuilder + `/${pathArr[idx]}`;

                if (idx === 0) {
                  if (pathArr[idx] === 'incidents') {
                    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxs"])(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_1___default.a.Item, {
                      children: [" ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("strong", {
                        children: doc
                      }), " "]
                    }, idx);
                  } else {
                    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxs"])(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_1___default.a.Item, {
                      href: `/${pathArr[idx]}`,
                      children: [" ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("strong", {
                        children: doc
                      }), " "]
                    }, idx);
                  }
                } else if (idx === childBreacrumbDD.length - 1 && idx > 0) {
                  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxs"])(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_1___default.a.Item, {
                    children: [" ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("strong", {
                      children: doc
                    }), " "]
                  }, idx);
                } else {
                  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_1___default.a.Item, {
                    href: pathBuilder,
                    children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("strong", {
                      children: doc
                    })
                  }, idx);
                }
              }) : null
            }) : null]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("label", {
            htmlFor: `menutoggle`,
            className: "pointer-cursor md:hidden block cursor-pointer mr-4",
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxs"])("svg", {
              className: "fill-current text-gray-900",
              xmlns: "http://www.w3.org/2000/svg",
              width: 20,
              height: 20,
              viewBox: "0 0 20 20",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("title", {
                children: "menu"
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("path", {
                d: "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
              })]
            })
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("input", {
            className: `hidden ${st.menuToggle}`,
            type: "checkbox",
            id: `menutoggle`
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(_layout_menu_header__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
            dataProfile: dataProfile,
            Linkheader: next_link__WEBPACK_IMPORTED_MODULE_6___default.a,
            handleLogout: handleLogout,
            st: st
          }), pathArr ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_1___default.a, {
            separator: ">",
            style: {
              float: `left`,
              padding: `24px 24px`,
              fontSize: `0.825rem`,
              width: `100%`
            },
            className: st.breadcrumbClientsSmall,
            children: childBreacrumbDD.length !== 0 ? childBreacrumbDD.map((doc, idx) => {
              pathBuilder = pathBuilder + `/${pathArr[idx]}`;

              if (idx === 0) {
                return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxs"])(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_1___default.a.Item, {
                  href: `/${pathArr[idx]}`,
                  children: [" ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("strong", {
                    children: doc
                  }), " "]
                }, idx);
              } else if (idx === childBreacrumbDD.length - 1 && idx > 0) {
                return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsxs"])(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_1___default.a.Item, {
                  children: [" ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("strong", {
                    children: doc
                  }), " "]
                }, idx);
              } else {
                return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])(antd_lib_breadcrumb__WEBPACK_IMPORTED_MODULE_1___default.a.Item, {
                  href: pathBuilder,
                  children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("strong", {
                    children: doc
                  })
                }, idx);
              }
            }) : null
          }) : null]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__["jsx"])("main", {
          className: "slb bg-white",
          style: {
            padding: 24,
            height: `auto`
          },
          children: children
        })]
      })]
    })
  });
}

/* harmony default export */ __webpack_exports__["a"] = (LayoutDashboard2);

/***/ }),

/***/ "a5Fm":
/***/ (function(module, exports) {

module.exports = require("antd/lib/menu");

/***/ }),

/***/ "aawa":
/***/ (function(module, exports) {

module.exports = require("antd/lib/timeline");

/***/ }),

/***/ "c9em":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IconAgents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return IconRequesters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return Icongroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return IconRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return IconModules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return IconFeatures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return IconMIGCompany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return IconClientsCompany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return IconAssets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return IconVendors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return IconCatalog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return IconContract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return IconDepreciation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return IconCareer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return IconMessages; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("nZwT");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__);





const IconAgents = props => {
  const svgagents = () => {
    var _props$width, _props$height;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 64 64",
      width: (_props$width = props.width) !== null && _props$width !== void 0 ? _props$width : 40,
      height: (_props$height = props.height) !== null && _props$height !== void 0 ? _props$height : 40,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        id: "Engineer-2",
        "data-name": "Engineer",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M42,23H39v6h3a3,3,0,0,0,0-6Z",
          style: {
            fill: '#f1cfa2'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M15,23H14a3,3,0,0,0,0,6h3V23Z",
          style: {
            fill: '#f1cfa2'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M39.362,53c-.13-.223-.256-.45-.362-.68V53H17V44.32l-4,1.05-1.05.28A11.983,11.983,0,0,0,3,57.25V59H48V53Z",
          style: {
            fill: '#5aaae7'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M57.68,50.47a9.8,9.8,0,0,1-1.09,2.62l2.02,2.69-2.83,2.83-2.69-2.02a9.8,9.8,0,0,1-2.62,1.09L50,61H46l-.47-3.32a9.8,9.8,0,0,1-2.62-1.09l-2.69,2.02-2.83-2.83,2.02-2.69a8.141,8.141,0,0,1-.41-.77,9.492,9.492,0,0,1-.68-1.85L35,50V46l3.32-.47a8.021,8.021,0,0,1,.43-1.28,8.777,8.777,0,0,1,.66-1.34l-2.02-2.69,2.83-2.83,2.69,2.02a9.8,9.8,0,0,1,2.62-1.09L46,35h4l.47,3.32a9.8,9.8,0,0,1,2.62,1.09l2.69-2.02,2.83,2.83-2.02,2.69a9.8,9.8,0,0,1,1.09,2.62L61,46v4Z",
          style: {
            fill: '#ffa733'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M41,21v6a13,13,0,0,1-26,0V21Z",
          style: {
            fill: '#ffdaaa'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
          cx: 48,
          cy: 48,
          r: 5,
          style: {
            fill: '#ff6243'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M34.78,43.21l3.97,1.04a8.021,8.021,0,0,0-.43,1.28L35,46v4l3.32.47A9.492,9.492,0,0,0,39,52.32V53H17V44.32l4.22-1.11C21.97,45.39,24.71,47,28,47S34.03,45.39,34.78,43.21Z",
          style: {
            fill: '#e6e7e8'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M34,31v2H22V31a4,4,0,0,1,4-4,2.015,2.015,0,0,0,2,2,2.006,2.006,0,0,0,2-2A4,4,0,0,1,34,31Z",
          style: {
            fill: '#e6e7e8'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M34.78,43.21C34.03,45.39,31.29,47,28,47s-6.03-1.61-6.78-3.79L22,43V38.53a12.98,12.98,0,0,0,12,0V43Z",
          style: {
            fill: '#ffdaaa'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M26,5V17H14A12,12,0,0,1,26,5Z",
          style: {
            fill: '#ffa733'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M42,17H30V5A11.984,11.984,0,0,1,42,17Z",
          style: {
            fill: '#ffa733'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M30,5V17H26V5a2.006,2.006,0,0,1,2-2,2.015,2.015,0,0,1,2,2Z",
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M42,17a2.015,2.015,0,0,1,2,2,2.006,2.006,0,0,1-2,2H14a2.015,2.015,0,0,1-2-2,2.006,2.006,0,0,1,2-2H42Z",
          style: {
            fill: '#ff9811'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 15,
          y: 21,
          width: 26,
          height: 2,
          style: {
            fill: '#f1cfa2'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M34,38.53v2a12.98,12.98,0,0,1-12,0v-2a12.98,12.98,0,0,0,12,0Z",
          style: {
            fill: '#f1cfa2'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M27.4,29.942a3.081,3.081,0,0,1-2.4-3.06V24a1,1,0,0,1,1-1h0a1,1,0,0,1,1,1v3a1,1,0,0,0,2,0V24a1,1,0,0,1,1-1h0a1,1,0,0,1,1,1v3A3.005,3.005,0,0,1,27.4,29.942Z",
          style: {
            fill: '#ffc477'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M34,24a.99.99,0,1,1,.71-.29A1.052,1.052,0,0,1,34,24Z",
          style: {
            fill: '#603913'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M22,24a.99.99,0,1,1,.71-.29A1.052,1.052,0,0,1,22,24Z",
          style: {
            fill: '#603913'
          }
        })]
      })
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgagents,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconRequesters = props => {
  const svgrequesters = () => {
    var _props$width2, _props$height2;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      id: "Computer-Engineer",
      viewBox: "0 0 64 64",
      width: (_props$width2 = props.width) !== null && _props$width2 !== void 0 ? _props$width2 : 40,
      height: (_props$height2 = props.height) !== null && _props$height2 !== void 0 ? _props$height2 : 40,
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M61,12V41H3V12A4,4,0,0,1,7,8H57a3.995,3.995,0,0,1,4,4Z",
        style: {
          fill: '#78b9eb'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M61,12V41H28L59.83,9.17A4.025,4.025,0,0,1,61,12Z",
        style: {
          fill: '#5aaae7'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M43,58v3H21V58a1,1,0,0,1,1-1H42A1,1,0,0,1,43,58Z",
        style: {
          fill: '#787680'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
        points: "40 57 24 57 25 49 39 49 40 57",
        style: {
          fill: '#898890'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M61,41v4a4,4,0,0,1-4,4H7a4,4,0,0,1-4-4V41H61Z",
        style: {
          fill: '#acabb1'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
        points: "37 27 38 34 32 33 37 27",
        style: {
          fill: '#009986'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
        points: "27 27 32 33 26 34 27 27",
        style: {
          fill: '#009986'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M38,34l-1-7a8,8,0,0,1,8,8v6H32V33Z",
        style: {
          fill: '#00ccb3'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M26,34l6-1v8H19V35a8,8,0,0,1,8-8Z",
        style: {
          fill: '#00b39d'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
        points: "37 27 32 33 27 27 32 27 37 27",
        style: {
          fill: '#ffdaaa'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M38,15v4a6,6,0,0,1-12,0V15Z",
        style: {
          fill: '#ffdaaa'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M30,8v3H25a5.911,5.911,0,0,1,.81-3Z",
        style: {
          fill: '#ffb655'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M30,5.09V8H25.81A5.967,5.967,0,0,1,30,5.09Z",
        style: {
          fill: '#ffb655'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M39,11H34V8h4.19A5.857,5.857,0,0,1,39,11Z",
        style: {
          fill: '#ffb655'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M38.19,8H34V5.09a5.832,5.832,0,0,1,3.24,1.67A5.752,5.752,0,0,1,38.19,8Z",
        style: {
          fill: '#ffb655'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M39,11a2.015,2.015,0,0,1,2,2,2.006,2.006,0,0,1-2,2H25a2.015,2.015,0,0,1-2-2,2.006,2.006,0,0,1,2-2H39Z",
        style: {
          fill: '#ff9811'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
        x: 30,
        y: 8,
        width: 4,
        height: 3,
        style: {
          fill: '#ffa733'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "M34,5.09V8H30V4a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Z",
        style: {
          fill: '#ffa733'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
        points: "39.25 51 24.75 51 25 49 39 49 39.25 51",
        style: {
          fill: '#787680'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
        x: 18,
        y: 60,
        width: 28,
        height: 2,
        style: {
          fill: '#57565c'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
        x: 55,
        y: 44,
        width: 2,
        height: 2,
        style: {
          fill: '#898890'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
        x: 39,
        y: 35,
        width: 2,
        height: 6,
        style: {
          fill: '#00b39d'
        }
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
        x: 23,
        y: 35,
        width: 2,
        height: 6,
        style: {
          fill: '#009986'
        }
      })]
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgrequesters,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const Icongroups = props => {
  const svggroups = () => {
    var _props$width3, _props$height3;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 64 64",
      width: (_props$width3 = props.width) !== null && _props$width3 !== void 0 ? _props$width3 : 40,
      height: (_props$height3 = props.height) !== null && _props$height3 !== void 0 ? _props$height3 : 40,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        id: "Engineer",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M27,26H5a2.006,2.006,0,0,0-2,2V42a2.006,2.006,0,0,0,2,2H27a2.006,2.006,0,0,0,2-2V28A2.006,2.006,0,0,0,27,26Z",
          style: {
            fill: '#78b9eb'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 6,
          y: 55,
          width: 52,
          height: 6,
          style: {
            fill: '#acabb1'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
          points: "61 51 61 55 58 55 6 55 3 55 3 51 9 51 23 51 33 51 38 51 46 51 54 51 59 51 61 51",
          style: {
            fill: '#787680'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
          points: "23 48 23 51 9 51 9 48 13 48 19 48 23 48",
          style: {
            fill: '#898890'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
          points: "19 44 19 48 13 48 13 44 13 36 19 36 19 44",
          style: {
            fill: '#acabb1'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
          points: "51 35 52 42 46 41 51 35",
          style: {
            fill: '#1e81ce'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
          points: "41 35 46 41 40 42 41 35",
          style: {
            fill: '#1e81ce'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M52,42l-1-7a8,8,0,0,1,8,8v8H46V41Z",
          style: {
            fill: '#5aaae7'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M40,42l6-1V51H33V43a8,8,0,0,1,8-8Z",
          style: {
            fill: '#3d9ae2'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
          points: "51 35 46 41 41 35 51 35",
          style: {
            fill: '#ffdaaa'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M52,23v4a6,6,0,0,1-12,0V23Z",
          style: {
            fill: '#ffdaaa'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M44,13.09V19H39A5.99,5.99,0,0,1,44,13.09Z",
          style: {
            fill: '#ffb655'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M53,19H48V13.09a5.832,5.832,0,0,1,3.24,1.67A5.944,5.944,0,0,1,53,19Z",
          style: {
            fill: '#ffb655'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M53,19a2.015,2.015,0,0,1,2,2,2.006,2.006,0,0,1-2,2H39a2.015,2.015,0,0,1-2-2,2.006,2.006,0,0,1,2-2H53Z",
          style: {
            fill: '#ff9811'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M48,13.09V19H44V12a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Z",
          style: {
            fill: '#ffa733'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 6,
          y: 55,
          width: 52,
          height: 2,
          style: {
            fill: '#898890'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 53,
          y: 43,
          width: 2,
          height: 8,
          style: {
            fill: '#3d9ae2'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 37,
          y: 43,
          width: 2,
          height: 8,
          style: {
            fill: '#1e81ce'
          }
        })]
      })
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svggroups,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconRoles = props => {
  const svgroles = () => {
    var _props$width4, _props$height4;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 64 64",
      width: (_props$width4 = props.width) !== null && _props$width4 !== void 0 ? _props$width4 : 40,
      height: (_props$height4 = props.height) !== null && _props$height4 !== void 0 ? _props$height4 : 40,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        id: "Browser",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M53,11V53H7a4,4,0,0,1-4-4V11Z",
          style: {
            fill: '#78b9eb'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
          points: "53 11 53 53 7 53 49 11 53 11",
          style: {
            fill: '#5aaae7'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M46,17H10a1,1,0,0,0-1,1V36a1,1,0,0,0,1,1H47V18A1,1,0,0,0,46,17Z",
          style: {
            fill: '#ffde55'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M56.67,48.62A11.122,11.122,0,0,1,55.4,51.7l2.62,3.49-2.83,2.83L51.7,55.4a11.122,11.122,0,0,1-3.08,1.27L48,61H44l-.62-4.33A11.122,11.122,0,0,1,40.3,55.4l-3.49,2.62-2.83-2.83L35.62,53l.98-1.3a11.122,11.122,0,0,1-1.27-3.08L31,48V44l4.33-.62A11.122,11.122,0,0,1,36.6,40.3L34.12,37l-.14-.19,2.83-2.83L40.3,36.6a11.122,11.122,0,0,1,3.08-1.27L44,31h4l.62,4.33A11.122,11.122,0,0,1,51.7,36.6l1.3-.98,2.19-1.64,2.83,2.83L55.4,40.3a11.122,11.122,0,0,1,1.27,3.08L61,44v4Z",
          style: {
            fill: '#ffa733'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M53,7v4H3V7A4,4,0,0,1,7,3H49A4,4,0,0,1,53,7Z",
          style: {
            fill: '#ff7956'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
          cx: 46,
          cy: 46,
          r: 6,
          style: {
            fill: '#ff6243'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 8,
          y: 6,
          width: 2,
          height: 2,
          style: {
            fill: '#ffd422'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 12,
          y: 6,
          width: 2,
          height: 2,
          style: {
            fill: '#00ccb3'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 16,
          y: 6,
          width: 2,
          height: 2,
          style: {
            fill: '#ff5023'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 22,
          y: 6,
          width: 22,
          height: 2,
          style: {
            fill: '#e6e7e8'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 9,
          y: 42,
          width: 16,
          height: 2,
          style: {
            fill: '#3d9ae2'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 9,
          y: 46,
          width: 16,
          height: 2,
          style: {
            fill: '#3d9ae2'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 27,
          y: 26,
          width: 2,
          height: 2,
          style: {
            fill: '#ffcd00'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 31,
          y: 26,
          width: 4,
          height: 2,
          style: {
            fill: '#ffcd00'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 21,
          y: 26,
          width: 4,
          height: 2,
          style: {
            fill: '#ffcd00'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 45,
          y: 35,
          width: 2,
          height: 2,
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "37.929",
          y: "37.929",
          width: 2,
          height: 2,
          transform: "translate(-16.125 38.929) rotate(-45)",
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 35,
          y: 45,
          width: 2,
          height: 2,
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "37.929",
          y: "52.071",
          width: 2,
          height: 2,
          transform: "translate(-26.125 43.071) rotate(-45)",
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 45,
          y: 55,
          width: 2,
          height: 2,
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "52.071",
          y: "52.071",
          width: 2,
          height: 2,
          transform: "translate(-21.983 53.071) rotate(-45)",
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 55,
          y: 45,
          width: 2,
          height: 2,
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "52.071",
          y: "37.929",
          width: 2,
          height: 2,
          transform: "translate(-11.983 48.929) rotate(-45)",
          style: {
            fill: '#ee8700'
          }
        })]
      })
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgroles,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconModules = props => {
  const svgmodules = () => {
    var _props$width5, _props$height5;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 64 64",
      width: (_props$width5 = props.width) !== null && _props$width5 !== void 0 ? _props$width5 : 40,
      height: (_props$height5 = props.height) !== null && _props$height5 !== void 0 ? _props$height5 : 40,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        id: "Setting",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M44.47,35.65a12.589,12.589,0,0,1-1.07,2.6l2.74,3.65L41.9,46.14,38.25,43.4a12.589,12.589,0,0,1-2.6,1.07L35,49H29l-.65-4.53a12.589,12.589,0,0,1-2.6-1.07L22.1,46.14,17.86,41.9l2.74-3.65a12.589,12.589,0,0,1-1.07-2.6L15,35V29l4.53-.65a12.589,12.589,0,0,1,1.07-2.6L17.86,22.1l4.24-4.24,3.65,2.74a12.589,12.589,0,0,1,2.6-1.07L29,15h6l.65,4.53a12.589,12.589,0,0,1,2.6,1.07l3.65-2.74,4.24,4.24L43.4,25.75a12.589,12.589,0,0,1,1.07,2.6L49,29v6Z",
          style: {
            fill: '#ffa733'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M9.83,54.17A4,4,0,1,1,7,53,4.025,4.025,0,0,1,9.83,54.17Z",
          style: {
            fill: '#5aaae7'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M57,53a3.995,3.995,0,1,1-2.83,1.17A4,4,0,0,1,57,53Z",
          style: {
            fill: '#5aaae7'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M57,3a4,4,0,1,1-4,4A4,4,0,0,1,57,3Z",
          style: {
            fill: '#5aaae7'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M7,3A4,4,0,1,1,3,7,4,4,0,0,1,7,3Z",
          style: {
            fill: '#5aaae7'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
          cx: 32,
          cy: 32,
          r: 7,
          style: {
            fill: '#ff6243'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 31,
          y: 18,
          width: 2,
          height: 2,
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "21.808",
          y: "21.808",
          width: 2,
          height: 2,
          transform: "translate(-9.447 22.808) rotate(-45)",
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "21.808",
          y: "40.192",
          width: 2,
          height: 2,
          transform: "translate(-22.447 28.192) rotate(-45)",
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 31,
          y: 44,
          width: 2,
          height: 2,
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "40.192",
          y: "40.192",
          width: 2,
          height: 2,
          transform: "translate(-17.062 41.192) rotate(-45)",
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "40.192",
          y: "21.808",
          width: 2,
          height: 2,
          transform: "translate(-4.062 35.808) rotate(-45)",
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 18,
          y: 31,
          width: 2,
          height: 2,
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 44,
          y: 31,
          width: 2,
          height: 2,
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M32,58A26,26,0,1,1,58,32,26.029,26.029,0,0,1,32,58ZM32,8A24,24,0,1,0,56,32,24.028,24.028,0,0,0,32,8Z",
          style: {
            fill: '#78b9eb'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M57,2a4.992,4.992,0,0,0-4.167,7.753l-6.54,6.54,1.414,1.414,6.54-6.54A5,5,0,1,0,57,2Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,57,10Z",
          style: {
            fill: '#1a6fb0'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M57,52a4.969,4.969,0,0,0-2.753.833l-6.54-6.54-1.414,1.414,6.54,6.54A5,5,0,1,0,57,52Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,57,60Z",
          style: {
            fill: '#1a6fb0'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M17.707,16.293l-6.54-6.54a5.015,5.015,0,1,0-1.414,1.414l6.54,6.54ZM7,10a3,3,0,1,1,3-3A3,3,0,0,1,7,10Z",
          style: {
            fill: '#1a6fb0'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M17.707,47.707l-1.414-1.414-6.54,6.54a5.015,5.015,0,1,0,1.414,1.414ZM7,60a3,3,0,1,1,3-3A3,3,0,0,1,7,60Z",
          style: {
            fill: '#1a6fb0'
          }
        })]
      })
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgmodules,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconFeatures = props => {
  const svgfeatures = () => {
    var _props$width6, _props$height6;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 64 64",
      width: (_props$width6 = props.width) !== null && _props$width6 !== void 0 ? _props$width6 : 40,
      height: (_props$height6 = props.height) !== null && _props$height6 !== void 0 ? _props$height6 : 40,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        id: "Setting-3",
        "data-name": "Setting",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M48.47,23.65a12.589,12.589,0,0,1-1.07,2.6l2.74,3.65L45.9,34.14,42.25,31.4a12.589,12.589,0,0,1-2.6,1.07L39,37H33l-.65-4.53a12.589,12.589,0,0,1-2.6-1.07L26.1,34.14,21.86,29.9l2.74-3.65a12.589,12.589,0,0,1-1.07-2.6L19,23V17l4.53-.65a12.589,12.589,0,0,1,1.07-2.6L21.86,10.1,26.1,5.86,29.75,8.6a12.589,12.589,0,0,1,2.6-1.07L33,3h6l.65,4.53a12.589,12.589,0,0,1,2.6,1.07L45.9,5.86l4.24,4.24L47.4,13.75a12.589,12.589,0,0,1,1.07,2.6L53,17v6Z",
          style: {
            fill: '#ffa733'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "6.153",
          y: "46.208",
          width: "8.004",
          height: "14.005",
          transform: "translate(-17.587 6.682) rotate(-20.001)",
          style: {
            fill: '#5aaae7'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
          points: "23.48 54.74 24.17 56.62 16.65 59.36 16.31 58.42 11.52 45.26 11.18 44.32 18.69 41.59 19.38 43.47 23.48 54.74",
          style: {
            fill: '#3d9ae2'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M42.86,45.56l7.19-2.61a2.925,2.925,0,0,1,2.29.1,3,3,0,0,1-.24,5.53l-17.85,6.5-2.82,1.03-6.07-2.05-1.88.68-4.1-11.27,7.47-2.72,2.33.41,11.26,1.99a3,3,0,0,1,2.3,1.93A2.594,2.594,0,0,1,42.86,45.56Z",
          style: {
            fill: '#ffdaaa'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
          cx: 36,
          cy: 20,
          r: 7,
          style: {
            fill: '#ff6243'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M43.86,46.78a4.01,4.01,0,0,1-4.64,3.26L28.947,48.234a1,1,0,0,1-.812-1.161h0a1,1,0,0,1,1.159-.81L39.57,48.07a2.012,2.012,0,0,0,2.32-1.62,1.72,1.72,0,0,0-.01-.68.375.375,0,0,1-.01-.1,1.637,1.637,0,0,0-.07-.25,2,2,0,0,0-1.54-1.29L26.94,41.78l-2.989,1.088a1,1,0,0,1-1.282-.6h0a1,1,0,0,1,.6-1.279L26.51,39.81a1.021,1.021,0,0,1,.531-.046l13.569,2.4a4.029,4.029,0,0,1,3.07,2.57,4.286,4.286,0,0,1,.17.67A3.992,3.992,0,0,1,43.86,46.78Z",
          style: {
            fill: '#ffc477'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 35,
          y: 6,
          width: 2,
          height: 2,
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "25.808",
          y: "9.808",
          width: 2,
          height: 2,
          transform: "translate(0.21 22.121) rotate(-45)",
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "25.808",
          y: "28.192",
          width: 2,
          height: 2,
          transform: "translate(-12.79 27.506) rotate(-45)",
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 35,
          y: 32,
          width: 2,
          height: 2,
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "44.192",
          y: "28.192",
          width: 2,
          height: 2,
          transform: "translate(-7.406 40.506) rotate(-45)",
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: "44.192",
          y: "9.808",
          width: 2,
          height: 2,
          transform: "translate(5.594 35.121) rotate(-45)",
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 22,
          y: 19,
          width: 2,
          height: 2,
          style: {
            fill: '#ee8700'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 48,
          y: 19,
          width: 2,
          height: 2,
          style: {
            fill: '#ee8700'
          }
        })]
      })
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgfeatures,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconMIGCompany = props => {
  const svgmigcompany = () => {
    var _props$width7, _props$height7;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
      version: "1.1",
      id: "Capa_1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      width: (_props$width7 = props.width) !== null && _props$width7 !== void 0 ? _props$width7 : 40,
      height: (_props$height7 = props.height) !== null && _props$height7 !== void 0 ? _props$height7 : 40,
      viewBox: "0 0 480 480",
      style: {
        enableBackground: 'new 0 0 480 480'
      },
      xmlSpace: "preserve",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        style: {
          fill: '#ABD3F3'
        },
        d: "M32,128h96v288H32V128z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        style: {
          fill: '#78B9EB'
        },
        d: "M128,32v72v32v280h8h56h96h40h24V136v-32V32H128z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        style: {
          fill: '#ABD3F3'
        },
        d: "M352,128h96v288h-96V128z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        style: {
          fill: '#A7A9AC'
        },
        d: "M480,448h-16H16H0v32h480V448z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        style: {
          fill: '#D1D3D4'
        },
        d: "M464,416h-16h-96h-64h-96h-64H32H16v32h448V416z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#00D7DF'
          },
          d: "M376,24V8c0-4.418-3.582-8-8-8H112c-4.418,0-8,3.582-8,8v16c0,4.418,3.582,8,8,8h256 C372.418,32,376,28.418,376,24z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#00D7DF'
          },
          d: "M448,128h8c4.418,0,8-3.582,8-8v-16c0-4.418-3.582-8-8-8H352v32H448z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#00D7DF'
          },
          d: "M128,96H24c-4.418,0-8,3.582-8,8v16c0,4.418,3.582,8,8,8h104V96z"
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        style: {
          fill: '#FFDA44'
        },
        d: "M240,296c-26.51,0-48,21.49-48,48v72h96v-72C288,317.49,266.51,296,240,296z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M160,88h32v32h-32V88z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M224,88h32v32h-32V88z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M160,152h32v32h-32V152z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M224,152h32v32h-32V152z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M160,216h32v32h-32V216z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M224,216h32v32h-32V216z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M288,88h32v32h-32V88z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M288,152h32v32h-32V152z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M288,216h32v32h-32V216z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M384,168h32v32h-32V168z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M384,232h32v32h-32V232z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M384,296h32v32h-32V296z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M64,168h32v32H64V168z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M64,232h32v32H64V232z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#FF9811'
          },
          d: "M64,296h32v32H64V296z"
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {})]
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgmigcompany,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconClientsCompany = props => {
  const svgclientscompany = () => {
    var _props$width8, _props$height8;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
      version: "1.1",
      id: "Capa_1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      width: (_props$width8 = props.width) !== null && _props$width8 !== void 0 ? _props$width8 : 40,
      height: (_props$height8 = props.height) !== null && _props$height8 !== void 0 ? _props$height8 : 40,
      viewBox: "0 0 480 480",
      style: {
        enableBackground: 'new 0 0 480 480'
      },
      xmlSpace: "preserve",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M40,32h32v32H40V32z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M104,32h32v32h-32V32z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M168,32h32v32h-32V32z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M168,96h32v32h-32V96z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M40,96h32v32H40V96z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M104,96h32v32h-32V96z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M40,160h32v32H40V160z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M104,160h32v32h-32V160z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M40,224h32v32H40V224z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M104,224h32v32h-32V224z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M40,288h32v32H40V288z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M104,288h32v32h-32V288z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M40,352h32v32H40V352z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M104,352h32v32h-32V352z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M192,160h32v32h-32V160z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M256,160h32v32h-32V160z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M320,160h32v32h-32V160z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M192,224h32v32h-32V224z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M256,224h32v32h-32V224z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M320,224h32v32h-32V224z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M192,288h32v32h-32V288z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M256,288h32v32h-32V288z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M192,352h32v32h-32V352z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#ABD3F3'
          },
          d: "M256,352h32v32h-32V352z"
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#E6E7E8'
          },
          d: "M344,288h32v32h-32V288z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#E6E7E8'
          },
          d: "M408,288h32v32h-32V288z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#E6E7E8'
          },
          d: "M344,352h32v32h-32V352z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#E6E7E8'
          },
          d: "M408,352h32v32h-32V352z"
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        style: {
          fill: '#FBB040'
        },
        d: "M224,0H16c-4.418,0-8,3.582-8,8v472h152V152h72V8C232,3.582,228.418,0,224,0z M72,384H40v-32h32V384z M72,320H40v-32h32V320z M72,256H40v-32h32V256z M72,192H40v-32h32V192z M72,128H40V96h32V128z M72,64H40V32h32V64z M136,384h-32 v-32h32V384z M136,320h-32v-32h32V320z M136,256h-32v-32h32V256z M136,192h-32v-32h32V192z M136,128h-32V96h32V128z M136,64h-32V32 h32V64z M200,120h-32V96h32V120z M200,64h-32V32h32V64z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        style: {
          fill: '#FF9811'
        },
        d: "M376,128H168c-4.418,0-8,3.582-8,8v344h152V288h72V136C384,131.582,380.418,128,376,128z M224,384 h-32v-32h32V384z M224,320h-32v-32h32V320z M224,256h-32v-32h32V256z M224,192h-32v-32h32V192z M288,384h-32v-32h32V384z M288,320 h-32v-32h32V320z M288,256h-32v-32h32V256z M288,192h-32v-32h32V192z M352,248h-32v-24h32V248z M352,192h-32v-32h32V192z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        style: {
          fill: '#FF5023'
        },
        d: "M464,256H320c-4.418,0-8,3.582-8,8v216h160V264C472,259.582,468.418,256,464,256z M376,384h-32v-32 h32V384z M376,320h-32v-32h32V320z M440,384h-32v-32h32V384z M440,320h-32v-32h32V320z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {})]
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgclientscompany,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconAssets = props => {
  const svgAssets = () => {
    var _props$height9, _props$width9;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
      height: (_props$height9 = props.height) !== null && _props$height9 !== void 0 ? _props$height9 : 40,
      viewBox: "-1 0 483 483.8",
      width: (_props$width9 = props.width) !== null && _props$width9 !== void 0 ? _props$width9 : 40,
      xmlns: "http://www.w3.org/2000/svg",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m349.316406 168.539062v145.28125l-106.429687 34.320313-1-.320313v-145.269531l1 .320313zm0 0",
        fill: "#00acea"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m241.886719 202.550781-105.433594-34.011719 106.433594-34.320312 106.429687 34.320312-106.429687 34.332032zm0 0",
        fill: "#00efd1"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m241.886719 202.550781v145.269531l-105.433594-34v-145.28125zm0 0",
        fill: "#2ed3ff"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        fill: "#f4b844",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m46.457031 130.96875 85.214844-84.816406 11.289063 11.339844-85.214844 84.816406zm0 0"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m24.886719 180.839844h16v120h-16zm0 0"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m46.128906 351.414062 11.316406-11.3125 86.128907 86.140626-11.316407 11.3125zm0 0"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m181.886719 441.839844h120v16h-120zm0 0"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m340.152344 425.898438 11.347656 11.28125 85.226562-85.738282.109376-.109375-11.363282-11.265625zm0 0"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m440.886719 300.839844h16v-120l-16 .019531zm0 0"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m340.441406 57.628906 11.3125-11.3125 84.839844 84.828125-11.3125 11.316407zm0 0"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m181.886719 25.839844h120v16h-120zm0 0"
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m156.042969 0c-18.597657.00390625-33.671875 15.089844-33.667969 33.691406.003906 18.597656 15.089844 33.675782 33.691406 33.667969 18.464844 0 33.820313-15.019531 33.820313-33.53125v-.148437c-.097657-18.621094-15.21875-33.6718755-33.84375-33.679688zm0 0",
        fill: "#fedb41"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m327.726562 0c-18.625.0078125-33.746093 15.058594-33.839843 33.679688v.199218c0 18.460938 15.371093 33.480469 33.839843 33.480469 18.597657 0 33.679688-15.078125 33.679688-33.679687 0-18.601563-15.082031-33.679688-33.679688-33.679688zm0 0",
        fill: "#fedb41"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m156.042969 416.320312c-18.578125.089844-33.578125 15.207032-33.519531 33.785157.058593 18.582031 15.15625 33.601562 33.734374 33.574219 18.582032-.03125 33.625-15.101563 33.628907-33.679688v-.199219c0-18.460937-15.375-33.480469-33.84375-33.480469zm0 0",
        fill: "#fedb41"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m351.359375 425.851562c-6.335937-6.128906-14.816406-9.550781-23.632813-9.53125-18.46875 0-33.839843 15.019532-33.839843 33.53125v.148438c0 18.667969 15.132812 33.800781 33.796875 33.800781 18.667968 0 33.800781-15.132812 33.800781-33.800781.042969-9.097656-3.625-17.816406-10.160156-24.144531zm0 0",
        fill: "#fedb41"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m448.863281 293.839844h-.160156c-18.539063.042968-33.539063 15.097656-33.519531 33.640625.023437 18.539062 15.058594 33.558593 33.601562 33.558593 18.539063 0 33.578125-15.019531 33.601563-33.558593.019531-18.542969-14.980469-33.597657-33.523438-33.640625zm0 0",
        fill: "#fedb41"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m448.703125 188.839844h.238281c15.140625-.105469 28.351563-10.304688 32.28125-24.925782 3.933594-14.625-2.378906-30.070312-15.421875-37.757812-13.046875-7.6875-29.617187-5.71875-40.503906 4.804688-9.871094 9.539062-12.964844 24.109374-7.816406 36.835937 5.144531 12.722656 17.5 21.050781 31.222656 21.042969zm0 0",
        fill: "#fedb41"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m34.066406 293.5c-.242187 0-.484375 0-.722656.011719-.316406 0-.636719.019531-.953125.042969-18.25 1.070312-32.25 16.617187-31.410156 34.878906.839843 18.265625 16.210937 32.457031 34.480469 31.847656 18.273437-.613281 32.660156-15.800781 32.277343-34.082031-.382812-18.277344-15.390625-32.851563-33.671875-32.699219zm0 0",
        fill: "#fedb41"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        d: "m34.066406 121.5c-18.292968.007812-33.234375 14.613281-33.65625 32.898438-.425781 18.285156 13.820313 33.566406 32.089844 34.421874.519531.027344 1.035156.039063 1.566406.039063 18.597656 0 33.679688-15.078125 33.679688-33.679687 0-18.601563-15.082032-33.679688-33.679688-33.679688zm0 0",
        fill: "#fedb41"
      })]
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgAssets,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconVendors = props => {
  const svgvendors = () => {
    var _props$width10, _props$height10;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 64 64",
      width: (_props$width10 = props.width) !== null && _props$width10 !== void 0 ? _props$width10 : 40,
      height: (_props$height10 = props.height) !== null && _props$height10 !== void 0 ? _props$height10 : 40,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        id: "Truck",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
          points: "61 42 61 52 37 52 37 28 55 28 55 42 61 42",
          style: {
            fill: '#ff6243'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M56,53a6,6,0,0,1-12,0,5.47,5.47,0,0,1,.09-1,5.993,5.993,0,0,1,11.82,0A5.47,5.47,0,0,1,56,53Z",
          style: {
            fill: '#787680'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("polygon", {
          points: "3 42 3 52 7 52 10.09 52 21.91 52 26 52 37 52 37 42 3 42",
          style: {
            fill: '#ff6243'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M22,53a6,6,0,0,1-12,0,5.47,5.47,0,0,1,.09-1,5.993,5.993,0,0,1,11.82,0A5.47,5.47,0,0,1,22,53Z",
          style: {
            fill: '#787680'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 3,
          y: 15,
          width: 30,
          height: 24,
          style: {
            fill: '#78b9eb'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M25.244,29a1,1,0,0,0-.707,1.707l.533.533-2.83,2.83-.533-.533A1,1,0,0,0,20,34.244V35H16v-.756a1,1,0,0,0-1.707-.707l-.533.533-2.83-2.83.533-.533A1,1,0,0,0,10.756,29H10V25h.756a1,1,0,0,0,.707-1.707l-.533-.533,2.83-2.83.533.533A1,1,0,0,0,16,19.756V19h4v.756a1,1,0,0,0,1.707.707l.533-.533,2.83,2.83-.533.533A1,1,0,0,0,25.244,25H26v4Z",
          style: {
            fill: '#ffa733'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 42,
          y: 31,
          width: 10,
          height: 10,
          style: {
            fill: '#e6e7e8'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
          cx: 18,
          cy: 27,
          r: 3,
          style: {
            fill: '#ff6243'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("rect", {
          x: 58,
          y: 44,
          width: 3,
          height: 2,
          style: {
            fill: '#e6e7e8'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M50,55a2,2,0,1,1,2-2A2,2,0,0,1,50,55Zm0-2h0Z",
          style: {
            fill: '#c6c5ca'
          }
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "M16,55a2,2,0,1,1,2-2A2,2,0,0,1,16,55Zm0-2h0Z",
          style: {
            fill: '#c6c5ca'
          }
        })]
      })
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgvendors,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconCatalog = props => {
  const svgcatalog = () => {
    var _props$height11, _props$width11;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
      id: "Capa_1",
      enableBackground: "new 0 0 508 508",
      height: (_props$height11 = props.height) !== null && _props$height11 !== void 0 ? _props$height11 : 40,
      viewBox: "0 0 508 508",
      width: (_props$width11 = props.width) !== null && _props$width11 !== void 0 ? _props$width11 : 40,
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m478 64h-448c-11.046 0-20 8.954-20 20v360h488v-360c0-11.046-8.954-20-20-20z",
          fill: "#fff"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m10 444v-180c0 16.568 13.431 30 30 30h82v150zm30-225h82v-75h-112v105c0-16.569 13.431-30 30-30z",
          fill: "#c5d3de"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m386 314h72v90h-72z",
          fill: "#ffee80"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m274 314h72v90h-72z",
          fill: "#d5ea79"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m162 314h72v90h-72z",
          fill: "#e6e6f9"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m386 184h72v90h-72z",
          fill: "#eaf5bc"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m274 184h72v90h-72z",
          fill: "#8481e2"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m162 184h72v90h-72z",
          fill: "#fff2a0"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m10 144v-60c0-11.046 8.954-20 20-20h448c11.046 0 20 8.954 20 20v60z",
          fill: "#80b6ff"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m264 444c0 5.51-4.49 10-10 10s-10-4.49-10-10 4.49-10 10-10 10 4.49 10 10zm112-170v-90c0-5.522 4.478-10 10-10h72c5.522 0 10 4.478 10 10v90c0 5.522-4.478 10-10 10h-72c-5.522 0-10-4.478-10-10zm20-10h52v-70h-52zm-20 50c0-5.522 4.478-10 10-10h72c5.522 0 10 4.478 10 10v90c0 5.522-4.478 10-10 10h-72c-5.522 0-10-4.478-10-10zm20 80h52v-70h-52zm-132-120v-90c0-5.522 4.478-10 10-10h72c5.522 0 10 4.478 10 10v90c0 5.522-4.478 10-10 10h-72c-5.522 0-10-4.478-10-10zm20-10h52v-70h-52zm62 150h-72c-5.522 0-10-4.478-10-10v-90c0-5.522 4.478-10 10-10h72c5.522 0 10 4.478 10 10v90c0 5.522-4.478 10-10 10zm-10-90h-52v70h52zm-184-50v-90c0-5.522 4.478-10 10-10h72c5.522 0 10 4.478 10 10v90c0 5.522-4.478 10-10 10h-72c-5.522 0-10-4.478-10-10zm20-10h52v-70h-52zm72 140c0 5.522-4.478 10-10 10h-72c-5.522 0-10-4.478-10-10v-90c0-5.522 4.478-10 10-10h72c5.522 0 10 4.478 10 10zm-20-80h-52v70h52zm-164-220c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10zm45 0c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10zm45 0c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10zm-129.985 160.771c.408 10.823 9.645 19.229 20.476 19.229h81.509c5.523 0 10 4.477 10 10v140h76.642c5.318 0 9.973 4 10.335 9.306.396 5.822-4.238 10.694-9.977 10.694h-199c-5.523 0-10-4.477-10-10v-360c0-16.569 13.431-30 30-30h448c16.569 0 30 13.431 30 30v360c0 5.523-4.477 10-10 10h-199c-5.739 0-10.373-4.872-9.976-10.694.361-5.306 5.016-9.306 10.334-9.306h188.642v-280h-356v65c0 5.523-4.477 10-10 10h-82c-11.284 0-20.415 9.393-19.985 20.771zm-.015-130.771h468v-50c0-5.514-4.486-10-10-10h-448c-5.514 0-10 4.486-10 10zm92 300v-55h-92v55zm0-130h-72c-7.283 0-14.112-1.966-20-5.382v60.382h92zm0-150h-92v60.382c5.888-3.416 12.717-5.382 20-5.382h72z"
        })]
      })
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgcatalog,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconContract = props => {
  const svgcontract = () => {
    var _props$width12, _props$height12;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
      width: (_props$width12 = props.width) !== null && _props$width12 !== void 0 ? _props$width12 : 40,
      height: (_props$height12 = props.height) !== null && _props$height12 !== void 0 ? _props$height12 : 40,
      id: "icon-contract",
      viewBox: "0 0 32 32",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#f4f8f8",
        style: {
          fill: 'var(--color1, #f4f8f8)'
        },
        d: "M4.195 0.469c-1.066 0-1.931 0.864-1.931 1.931v24.872c0 1.066 0.864 1.931 1.931 1.931h18.154c1.066 0 1.931-0.864 1.931-1.931v-20.848c0-0.388-0.154-0.76-0.428-1.034l-4.491-4.491c-0.274-0.274-0.646-0.428-1.034-0.428z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#e7ecf1",
        style: {
          fill: 'var(--color2, #e7ecf1)'
        },
        d: "M20.863 5.817c-0.145 0-0.287-0.017-0.423-0.047v21.501c0 1.066-0.864 1.931-1.931 1.931h3.84c1.066 0 1.931-0.864 1.931-1.931v-20.848c0-0.211-0.046-0.417-0.132-0.606z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#fc8086",
        style: {
          fill: 'var(--color3, #fc8086)'
        },
        d: "M23.851 5.388l-4.491-4.491c-0.125-0.125-0.27-0.225-0.428-0.297v3.285c0 1.066 0.864 1.931 1.931 1.931h3.285c-0.072-0.158-0.172-0.303-0.297-0.428z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#ffece3",
        style: {
          fill: 'var(--color4, #ffece3)'
        },
        d: "M25.822 25.582l-6.896-4.084c-0.354-0.21-0.47-0.666-0.261-1.020 0 0 0.17-0.288 0.353-0.596l-1.395-0.825c-0.92-0.528-1.351-0.626-2.181-0.305l-0.905 0.35c-0.551 0.213-1.169 0.162-1.677-0.139l-2.422-1.428-3.44 5.807 3.102 1.831c0.21 0.125 0.395 0.288 0.544 0.481l1.045 1.355c0.577 0.675 1.769 1.551 2.533 2.004l3.989 2.363c0.527 0.312 1.206 0.138 1.518-0.389s0.138-1.206-0.389-1.518l1.246 0.738c0.527 0.312 1.206 0.138 1.518-0.389s0.138-1.206-0.389-1.518l0.831 0.492c0.527 0.312 1.206 0.138 1.518-0.389s0.138-1.206-0.389-1.518l1.017 0.602c0.526 0.312 1.206 0.138 1.518-0.389s0.138-1.206-0.389-1.518z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#ffddce",
        style: {
          fill: 'var(--color5, #ffddce)'
        },
        d: "M25.822 25.582l-2.377-1.407c-0.052 0.203-0.153 0.4-0.318 0.571-0.422 0.438-1.098 0.509-1.621 0.199l-0.676-0.401c-0.024-0.014-0.055-0.010-0.074 0.010s-0.021 0.052-0.005 0.076c0.283 0.402 0.322 0.949 0.055 1.4-0.363 0.613-1.155 0.816-1.768 0.453l-0.531-0.317c-0.021-0.012-0.048-0.009-0.064 0.009s-0.018 0.046-0.003 0.066c0.312 0.411 0.36 0.989 0.071 1.457-0.372 0.604-1.175 0.776-1.785 0.415l-0.436-0.258c-0.087-0.051-0.195-0.047-0.277 0.011s-0.123 0.159-0.103 0.258c0.062 0.303 0.017 0.628-0.153 0.915-0.145 0.245-0.36 0.424-0.603 0.527l3.031 1.796c0.534 0.317 1.247 0.148 1.554-0.392 0.297-0.524 0.121-1.192-0.399-1.5l1.221 0.724c0.534 0.317 1.247 0.148 1.554-0.392 0.297-0.524 0.121-1.192-0.399-1.5l0.806 0.477c0.534 0.317 1.247 0.148 1.554-0.392 0.297-0.524 0.121-1.192-0.399-1.5l0.992 0.588c0.534 0.317 1.247 0.148 1.554-0.392 0.297-0.524 0.121-1.192-0.399-1.5z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#fcd0a3",
        style: {
          fill: 'var(--color6, #fcd0a3)'
        },
        d: "M25.224 17.881l-1.86 1.081c-0.508 0.301-1.126 0.352-1.677 0.139l-1.021-0.401c-0.319-0.125-0.67-0.148-1.002-0.063l-1.564 0.396c-0.728 0.184-1.238 0.839-1.238 1.59v2.087c0 0.295 0.239 0.535 0.534 0.535 0.89 0.001 1.612-0.721 1.612-1.611v-0.088l6.694 3.964c0.124-0.132 0.266-0.246 0.423-0.339l2.54-1.484z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#ffb983",
        style: {
          fill: 'var(--color7, #ffb983)'
        },
        d: "M26.217 19.557l-0.358 1.326-4.007 2.348 3.851 2.28c0.124-0.132 0.266-0.246 0.423-0.339l2.54-1.484z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#fcd0a3",
        style: {
          fill: 'var(--color6, #fcd0a3)'
        },
        d: "M11.457 26.402l-0.628 0.874c-0.357 0.497-1.049 0.611-1.546 0.254s-0.611-1.049-0.254-1.546l0.628-0.874c0.357-0.497 1.049-0.611 1.546-0.254s0.611 1.049 0.254 1.546z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#fcd0a3",
        style: {
          fill: 'var(--color6, #fcd0a3)'
        },
        d: "M13.95 26.73l-1.32 1.839c-0.357 0.497-1.049 0.611-1.546 0.254s-0.611-1.049-0.254-1.546l1.32-1.839c0.357-0.497 1.049-0.611 1.546-0.254s0.611 1.049 0.254 1.546z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#fcd0a3",
        style: {
          fill: 'var(--color6, #fcd0a3)'
        },
        d: "M15.75 28.022l-1.32 1.839c-0.357 0.497-1.049 0.611-1.546 0.254s-0.611-1.049-0.254-1.546l1.32-1.839c0.357-0.497 1.049-0.611 1.546-0.254s0.611 1.049 0.254 1.546z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#ffb983",
        style: {
          fill: 'var(--color7, #ffb983)'
        },
        d: "M16.963 30.131l-0.439 0.611c-0.357 0.497-1.049 0.611-1.546 0.254s-0.611-1.049-0.254-1.546l0.439-0.611c0.357-0.497 1.049-0.611 1.546-0.254s0.611 1.049 0.254 1.546z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#7c8b96",
        style: {
          fill: 'var(--color8, #7c8b96)'
        },
        d: "M11.733 16.931l-0.97-0.575c-0.267-0.158-0.611-0.070-0.77 0.197l-3.989 6.734c-0.158 0.267-0.070 0.611 0.197 0.77l0.97 0.575c0.651 0.386 1.491 0.171 1.877-0.48l3.166-5.343c0.386-0.651 0.171-1.491-0.48-1.877z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#7c8b96",
        style: {
          fill: 'var(--color8, #7c8b96)'
        },
        d: "M24.898 16.356l-0.97 0.575c-0.651 0.386-0.866 1.226-0.48 1.877l3.166 5.343c0.386 0.651 1.226 0.866 1.877 0.48l0.97-0.575c0.267-0.158 0.355-0.503 0.197-0.77l-3.989-6.734c-0.158-0.267-0.503-0.355-0.77-0.197z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#000",
        style: {
          fill: 'var(--color9, #000)'
        },
        d: "M20.935 8.613h-15.324c-0.26 0-0.471 0.211-0.471 0.471s0.211 0.471 0.471 0.471h15.324c0.26 0 0.471-0.211 0.471-0.471s-0.211-0.471-0.471-0.471z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#000",
        style: {
          fill: 'var(--color9, #000)'
        },
        d: "M5.61 6.289h7.662c0.26 0 0.471-0.211 0.471-0.471s-0.211-0.471-0.471-0.471h-7.662c-0.26 0-0.471 0.211-0.471 0.471s0.211 0.471 0.471 0.471z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#000",
        style: {
          fill: 'var(--color9, #000)'
        },
        d: "M20.935 11.506h-15.324c-0.26 0-0.471 0.211-0.471 0.471s0.211 0.471 0.471 0.471h15.324c0.26 0 0.471-0.211 0.471-0.471s-0.211-0.471-0.471-0.471z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#000",
        style: {
          fill: 'var(--color9, #000)'
        },
        d: "M9.101 28.729h-4.904c-0.805 0-1.46-0.655-1.46-1.46v-24.868c0-0.805 0.655-1.46 1.46-1.46h14.128c0.046 0 0.091 0.004 0.135 0.010v2.936c0 1.324 1.077 2.401 2.401 2.401h2.936c0.006 0.045 0.010 0.089 0.010 0.135v8.016c0 0.26 0.211 0.471 0.471 0.471s0.471-0.211 0.471-0.471v-8.016c0-0.516-0.201-1.002-0.566-1.367l-4.491-4.491c-0.365-0.365-0.851-0.566-1.367-0.566h-14.129c-1.324 0-2.401 1.077-2.401 2.401v24.868c0 1.324 1.077 2.401 2.401 2.401h4.904c0.26 0 0.471-0.211 0.471-0.471s-0.211-0.471-0.471-0.471zM23.142 5.347h-2.28c-0.805 0-1.46-0.655-1.46-1.46v-2.28z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        fill: "#000",
        style: {
          fill: 'var(--color9, #000)'
        },
        d: "M30.060 23.046l-3.989-6.732c-0.291-0.491-0.923-0.653-1.414-0.362l-0.97 0.575c-0.753 0.446-1.071 1.349-0.813 2.149-0.327 0.118-0.685 0.117-1.015-0.011-0.766-0.241-1.348-0.726-2.31-0.483-1.633 0.416-1.584 0.395-1.731 0.446-0.956-0.544-1.531-0.706-2.546-0.314l-0.905 0.35c-0.419 0.162-0.881 0.123-1.268-0.106l-0.247-0.146c0.12-0.722-0.2-1.484-0.878-1.886 0 0 0 0-0-0l-0.97-0.575c-0.49-0.29-1.124-0.128-1.414 0.362l-3.989 6.733c-0.291 0.491-0.129 1.124 0.362 1.414l0.97 0.575c0.294 0.174 0.616 0.257 0.935 0.257 0.355 0 0.706-0.103 1.006-0.297l0.202 0.119-0.427 0.595c-0.509 0.709-0.347 1.694 0.362 2.203 0.328 0.235 0.739 0.343 1.165 0.276 0.068 0.395 0.284 0.765 0.634 1.016 0.329 0.236 0.739 0.344 1.165 0.277 0.068 0.395 0.284 0.764 0.634 1.015 0.471 0.338 1.056 0.377 1.543 0.169 0.107 0.277 0.292 0.527 0.551 0.713 0.675 0.485 1.606 0.358 2.131-0.27l1.134 0.672c0.75 0.445 1.718 0.198 2.163-0.554 0.114-0.192 0.184-0.401 0.21-0.616l0.003 0.002c0.749 0.444 1.719 0.195 2.163-0.554 0.128-0.217 0.199-0.452 0.216-0.688 0.66 0.166 1.38-0.111 1.744-0.726 0.12-0.202 0.189-0.42 0.212-0.639 0.708 0.278 1.535 0.009 1.934-0.665 0.215-0.363 0.276-0.788 0.171-1.196-0.060-0.234-0.17-0.446-0.321-0.625l0.625-0.365c0.529 0.217 1.133 0.182 1.638-0.117l0.97-0.575c0.491-0.291 0.653-0.923 0.362-1.414zM7.412 24.225l-0.97-0.575c-0.043-0.026-0.057-0.081-0.032-0.125l3.989-6.733c0.026-0.043 0.082-0.057 0.125-0.032l0.97 0.575c0.431 0.255 0.566 0.808 0.315 1.232l-3.165 5.343c-0.253 0.427-0.805 0.568-1.232 0.315zM9.559 27.146c-0.286-0.205-0.351-0.603-0.146-0.889l0.627-0.874c0.2-0.278 0.598-0.355 0.889-0.146 0.285 0.205 0.351 0.604 0.146 0.889l-0.627 0.874c-0.205 0.285-0.604 0.351-0.889 0.146zM11.359 28.438c-0.285-0.205-0.351-0.604-0.146-0.889l0.627-0.874s0 0 0-0c0 0 0-0 0-0l0.692-0.965c0.099-0.138 0.246-0.23 0.414-0.257 0.035-0.006 0.070-0.009 0.104-0.009 0.132 0 0.261 0.041 0.37 0.12 0.138 0.099 0.229 0.246 0.257 0.414s-0.012 0.337-0.111 0.475l-1.32 1.839c-0.205 0.286-0.603 0.351-0.889 0.146zM13.158 29.73c-0.285-0.205-0.351-0.603-0.146-0.889 0-0 0-0 0-0l1.32-1.839c0.205-0.285 0.604-0.351 0.889-0.146s0.351 0.604 0.146 0.889l-0.586 0.817s0 0-0 0l-0.733 1.022c-0.205 0.285-0.603 0.351-0.889 0.146zM15.253 30.612c-0.285-0.205-0.351-0.603-0.146-0.888l0.439-0.612c0.205-0.285 0.604-0.351 0.889-0.146s0.351 0.604 0.146 0.889l-0.439 0.611c-0.205 0.285-0.604 0.351-0.889 0.146zM25.804 26.859c-0.179 0.302-0.571 0.403-0.873 0.224-0.512-0.303-3.815-2.26-4.167-2.469-0.224-0.133-0.512-0.059-0.645 0.165s-0.059 0.512 0.165 0.645l3.15 1.866c0.302 0.179 0.403 0.569 0.224 0.873-0.179 0.302-0.571 0.402-0.873 0.224-1.165-0.69-2.111-1.251-3.152-1.867-0.224-0.133-0.512-0.059-0.645 0.165s-0.059 0.512 0.165 0.645l2.322 1.375c0.303 0.18 0.402 0.57 0.223 0.873s-0.571 0.403-0.873 0.224l-1.246-0.738c-0-0-0-0-0-0s-0-0-0-0l-0.909-0.539c-0.224-0.133-0.512-0.059-0.645 0.165s-0.059 0.512 0.165 0.645l0.909 0.539c0 0 0 0 0 0 0.302 0.179 0.403 0.569 0.224 0.873-0.179 0.302-0.571 0.403-0.873 0.224l-1.061-0.628c0.455-0.702 0.282-1.647-0.405-2.14-0.202-0.145-0.426-0.235-0.656-0.273 0.244-0.651 0.034-1.411-0.558-1.836-0.35-0.251-0.769-0.338-1.165-0.276-0.070-0.412-0.295-0.772-0.635-1.016-0.639-0.458-1.507-0.37-2.043 0.172-0.109-0.191-0.259-0.363-0.45-0.5-0.531-0.381-1.22-0.384-1.745-0.064l-0.216-0.127 2.961-4.997 0.141 0.083c0.623 0.369 1.382 0.446 2.086 0.173l0.905-0.35c0.518-0.2 0.803-0.213 1.316 0.029-0.335 0.377-0.534 0.871-0.534 1.404v2.087c0 0.554 0.451 1.006 1.005 1.006h0.001c0.556 0 1.078-0.216 1.471-0.609 0.229-0.229 0.398-0.502 0.5-0.8 0.608 0.36 5.63 3.334 6.212 3.679 0.146 0.087 0.25 0.225 0.293 0.39s0.018 0.336-0.069 0.483zM29.218 23.65l-0.97 0.575c-0.427 0.253-0.979 0.111-1.231-0.315l-1.483-2.504c-0.133-0.224-0.421-0.297-0.645-0.165s-0.298 0.421-0.165 0.645l1.483 2.504c0.028 0.047 0.058 0.092 0.090 0.136l-0.412 0.241c-0.083 0.049-0.164 0.104-0.24 0.163l-6.395-3.787c-0.313-0.185-0.711 0.041-0.711 0.405-0.005 0.028 0.049 0.512-0.334 0.895-0.215 0.215-0.501 0.334-0.806 0.334-0 0-0 0-0.001 0-0.035 0-0.064-0.029-0.064-0.065v-2.087c0-0.545 0.375-1.005 0.882-1.134l1.564-0.396c0.567-0.143 0.888 0.16 1.737 0.447 0.59 0.228 1.231 0.214 1.8-0.029l0.284 0.48c0.133 0.224 0.421 0.298 0.645 0.165s0.298-0.421 0.165-0.645l-0.56-0.945c-0.253-0.427-0.112-0.978 0.315-1.231l0.97-0.575c0.042-0.025 0.098-0.012 0.125 0.032l3.989 6.733c0.026 0.043 0.012 0.099-0.032 0.125z"
      })]
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgcontract,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconDepreciation = props => {
  const svgdepreciation = () => {
    var _props$height13, _props$width13;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
      height: (_props$height13 = props.height) !== null && _props$height13 !== void 0 ? _props$height13 : 40,
      viewBox: "0 0 64 64",
      width: (_props$width13 = props.width) !== null && _props$width13 !== void 0 ? _props$width13 : 40,
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        id: "arroe_down-lose-money-business-down",
        "data-name": "arroe down-lose-money-business-down",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
          cx: "32",
          cy: "22",
          fill: "#ffe477",
          r: "19"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m51 22a18.96 18.96 0 0 1 -21 18.89 19 19 0 0 0 0-37.78 18.96 18.96 0 0 1 21 18.89z",
          fill: "#ffd422"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m39 17h-4a3 3 0 1 0 -3 3 7 7 0 0 1 2 13.71v3.29h-4v-3.29a7.005 7.005 0 0 1 -5-6.71h4a3 3 0 1 0 3-3 7 7 0 0 1 -2-13.71v-3.29h4v3.29a7.005 7.005 0 0 1 5 6.71z",
          fill: "#ffcd00"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
          fill: "#ddb200",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m31 29.82a2.772 2.772 0 0 1 -1 .18 3 3 0 0 1 -3-3h2a2.968 2.968 0 0 0 2 2.82z"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m39 27a7.005 7.005 0 0 1 -5 6.71v3.29h-2v-3.29a7 7 0 0 0 -2-13.71 3 3 0 0 1 0-6 2.772 2.772 0 0 1 1 .18 3 3 0 0 0 1 5.82 7 7 0 0 1 7 7z"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m32 10.29v-3.29h2v3.29a7.005 7.005 0 0 1 5 6.71h-2a7.005 7.005 0 0 0 -5-6.71z"
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m61 49-5 8-5-8h3v-46h4v46z",
          fill: "#ff3051"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m61 49-5 8v-54h2v46z",
          fill: "#cd2a00"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m37 53-5 8-5-8h3v-8h4v8z",
          fill: "#ff3051"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m37 53-5 8v-16h2v8z",
          fill: "#cd2a00"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m13 49-5 8-5-8h3v-46h4v46z",
          fill: "#ff3051"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m13 49-5 8v-54h2v46z",
          fill: "#cd2a00"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m32 15a2 2 0 0 1 2 2 1 1 0 0 0 1 1h4a1 1 0 0 0 1-1 8.054 8.054 0 0 0 -5-7.414v-2.586a1 1 0 0 0 -1-1h-4a1 1 0 0 0 -1 1v2.586a8 8 0 0 0 3 15.414 2 2 0 1 1 -2 2 1 1 0 0 0 -1-1h-4a1 1 0 0 0 -1 1 8.054 8.054 0 0 0 5 7.414v2.586a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2.586a8 8 0 0 0 -3-15.414 2 2 0 0 1 0-4zm0 6a6 6 0 0 1 1.715 11.748 1 1 0 0 0 -.715.958v2.294h-2v-2.294a1 1 0 0 0 -.715-.958 6.043 6.043 0 0 1 -4.2-4.748h2.041a4 4 0 1 0 3.874-5 6 6 0 0 1 -1.715-11.748 1 1 0 0 0 .715-.958v-2.294h2v2.294a1 1 0 0 0 .715.958 6.043 6.043 0 0 1 4.2 4.748h-2.041a4 4 0 1 0 -3.874 5z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m32 2a20 20 0 1 0 20 20 20.023 20.023 0 0 0 -20-20zm0 38a18 18 0 1 1 18-18 18.021 18.021 0 0 1 -18 18z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m37 52h-2v-7a1 1 0 0 0 -1-1h-4a1 1 0 0 0 -1 1v7h-2a1 1 0 0 0 -.848 1.53l5 8a1 1 0 0 0 1.7 0l5-8a1 1 0 0 0 -.852-1.53zm-5 7.113-3.2-5.113h1.2a1 1 0 0 0 1-1v-7h2v7a1 1 0 0 0 1 1h1.2z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m13 48h-2v-45a1 1 0 0 0 -1-1h-4a1 1 0 0 0 -1 1v45h-2a1 1 0 0 0 -.848 1.53l5 8a1 1 0 0 0 1.7 0l5-8a1 1 0 0 0 -.852-1.53zm-5 7.113-3.2-5.113h1.2a1 1 0 0 0 1-1v-45h2v45a1 1 0 0 0 1 1h1.2z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          d: "m61.875 48.516a1 1 0 0 0 -.875-.516h-2v-45a1 1 0 0 0 -1-1h-4a1 1 0 0 0 -1 1v45h-2a1 1 0 0 0 -.848 1.53l5 8a1 1 0 0 0 1.7 0l5-8a1 1 0 0 0 .023-1.014zm-5.875 6.597-3.2-5.113h1.2a1 1 0 0 0 1-1v-45h2v45a1 1 0 0 0 1 1h1.2z"
        })]
      })
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgdepreciation,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconCareer = props => {
  const svgcareer = () => {
    var _props$height14, _props$width14;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("svg", {
      id: "Capa_1",
      enableBackground: "new 0 0 512 512",
      height: (_props$height14 = props.height) !== null && _props$height14 !== void 0 ? _props$height14 : 40,
      viewBox: "0 0 512 512",
      width: (_props$width14 = props.width) !== null && _props$width14 !== void 0 ? _props$width14 : 40,
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m416.323 351.048h-384.775c-13.281 0-24.048-10.766-24.048-24.048v-247.355c0-13.282 10.767-24.048 24.048-24.048h384.774c13.282 0 24.048 10.767 24.048 24.048v247.355c.001 13.282-10.766 24.048-24.047 24.048z",
            fill: "#966a5b"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m438.898 336.161h-367.269c-22.1 0-40.081-17.98-40.081-40.081v-239.011-1.473c-13.281.001-24.048 10.768-24.048 24.049v256.516c0 13.282 10.767 24.048 24.048 24.048h384.774c13.282 0 24.048-10.767 24.048-24.048z",
            fill: "#785353"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m39.565 55.597v104.21c0 39.844 32.3 72.145 72.145 72.145h224.452c39.845 0 72.145-32.301 72.145-72.145v-104.21z",
            fill: "#d19a6e"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m336.161 207.903h-224.451c-26.563 0-48.097-21.534-48.097-48.097v-104.209h320.645v104.21c0 26.563-21.534 48.096-48.097 48.096z",
            fill: "#e2a975"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m256 183.855h-64.129c-4.427 0-8.016-3.589-8.016-8.016v-16.032c0-4.427 3.589-8.016 8.016-8.016h64.129c4.427 0 8.016 3.589 8.016 8.016v16.032c0 4.427-3.589 8.016-8.016 8.016z",
            fill: "#eceaec"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m499.804 499.804c-6.261 6.261-16.412 6.261-22.673 0l-76.035-76.035c-6.261-6.261-6.261-16.412 0-22.673 6.261-6.261 16.412-6.261 22.673 0l76.035 76.035c6.261 6.261 6.261 16.412 0 22.673z",
            fill: "#dad8db"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m413.002 435.675 64.129 64.129c6.261 6.261 16.412 6.261 22.673 0s6.261-16.412 0-22.673l-64.129-64.129z",
            fill: "#966a5b"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
            cx: "304.097",
            cy: "304.097",
            fill: "#dad8db",
            r: "96.194"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m348.185 356.202c-53.126 0-96.194-43.068-96.194-96.194 0-15.175 3.611-29.472 9.868-42.236-31.923 15.652-53.957 48.373-53.957 86.325 0 53.126 43.067 96.194 96.194 96.194 37.951 0 70.673-22.035 86.326-53.958-12.763 6.258-27.061 9.869-42.237 9.869z",
            fill: "#c8c5c9"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("circle", {
            cx: "304.097",
            cy: "304.097",
            fill: "#fff",
            r: "64.129"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m307.114 323.424c-9.787-4.565-17.817-12.604-22.37-22.397-2.206-4.746-3.534-9.397-4.166-13.922-.831-5.948-8.616-7.614-11.541-2.368-4.196 7.525-6.029 16.538-4.471 26.08 2.708 16.581 16.23 30.102 32.811 32.81 9.542 1.558 18.556-.275 26.08-4.471 5.245-2.924 3.581-10.71-2.366-11.54-4.542-.634-9.212-1.969-13.977-4.192z",
            fill: "#f5ebcd"
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m505.107 471.828-76.035-76.035c-4.445-4.445-10.354-6.893-16.64-6.893-3.696 0-7.259.852-10.473 2.453l-19.462-19.462c15.752-18.191 25.293-41.899 25.293-67.794 0-57.177-46.517-103.693-103.694-103.693s-103.693 46.516-103.693 103.693 46.517 103.694 103.693 103.694c25.895 0 49.603-9.542 67.794-25.293l19.462 19.462c-1.601 3.214-2.453 6.777-2.453 10.473 0 6.286 2.448 12.195 6.893 16.64l76.035 76.035c4.445 4.445 10.354 6.893 16.64 6.893s12.195-2.448 16.64-6.892c4.445-4.445 6.893-10.354 6.893-16.64s-2.448-12.197-6.893-16.641zm-289.704-167.731c0-48.906 39.788-88.693 88.693-88.693s88.694 39.788 88.694 88.693-39.788 88.694-88.694 88.694-88.693-39.789-88.693-88.694zm188.497 108.336c0-2.279.887-4.421 2.5-6.033 1.611-1.612 3.753-2.499 6.033-2.499 2.279 0 4.421.887 6.033 2.499l6.603 6.603-12.066 12.066-6.603-6.603c-1.612-1.612-2.5-3.755-2.5-6.033zm90.601 82.067c0 .001 0 .001 0 0-1.612 1.612-3.754 2.5-6.033 2.5s-4.421-.887-6.033-2.499l-58.826-58.826 12.066-12.066 58.826 58.826c1.612 1.611 2.499 3.754 2.499 6.033s-.887 4.421-2.499 6.032z"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m304.097 232.468c-12.728 0-25.294 3.448-36.34 9.972-3.566 2.106-4.75 6.706-2.644 10.272 2.107 3.567 6.706 4.751 10.272 2.644 8.737-5.16 18.666-7.888 28.712-7.888 31.225 0 56.629 25.404 56.629 56.629 0 10.047-2.727 19.976-7.887 28.712-2.106 3.566-.922 8.166 2.644 10.272 1.197.707 2.51 1.043 3.807 1.043 2.565 0 5.065-1.318 6.465-3.687 6.523-11.045 9.971-23.611 9.971-36.34 0-39.496-32.133-71.629-71.629-71.629z"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m332.809 352.838c-8.736 5.16-18.665 7.887-28.712 7.887-31.225 0-56.629-25.404-56.629-56.629 0-10.047 2.728-19.976 7.888-28.712 2.106-3.566.922-8.166-2.644-10.272-3.566-2.105-8.166-.922-10.272 2.644-6.523 11.046-9.972 23.612-9.972 36.34 0 39.496 32.133 71.629 71.629 71.629 12.729 0 25.295-3.448 36.34-9.971 3.566-2.106 4.75-6.706 2.644-10.272-2.106-3.565-6.703-4.751-10.272-2.644z"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m111.709 239.452h83.668c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-83.668c-35.646 0-64.645-29-64.645-64.645v-96.71h353.742v96.71c0 14.968-4.965 29.018-14.36 40.628-2.605 3.22-2.107 7.942 1.113 10.548 1.388 1.124 3.056 1.67 4.713 1.67 2.186 0 4.353-.951 5.835-2.783 11.413-14.106 17.699-31.885 17.699-50.063v-96.71h.516c9.125 0 16.548 7.423 16.548 16.548v256.516c0 7.003-4.433 13.276-11.031 15.608-3.905 1.381-5.952 5.666-4.571 9.571s5.667 5.952 9.571 4.571c12.579-4.447 21.031-16.403 21.031-29.751v-256.515c0-17.396-14.152-31.548-31.548-31.548h-114.836l-10.668-32.006c-3.208-9.625-12.18-16.091-22.325-16.091h-89.115c-10.145 0-19.117 6.466-22.325 16.091l-10.668 32.006h-114.837c-17.396 0-31.548 14.152-31.548 31.548v256.516c0 17.396 14.152 31.548 31.548 31.548h152.306c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-152.306c-9.125 0-16.548-7.423-16.548-16.548v-256.516c0-9.125 7.423-16.548 16.548-16.548h.516v96.71c0 43.916 35.729 79.645 79.645 79.645zm59.575-218.618c1.163-3.489 4.416-5.834 8.094-5.834h89.115c3.678 0 6.931 2.345 8.094 5.834l9.087 27.263h-123.478z"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
            d: "m191.871 144.291c-8.556 0-15.516 6.96-15.516 15.516v16.032c0 8.556 6.96 15.516 15.516 15.516h64.129c8.556 0 15.516-6.96 15.516-15.516v-16.032c0-8.556-6.96-15.516-15.516-15.516zm64.645 15.516v16.032c0 .285-.231.516-.516.516h-64.129c-.285 0-.516-.231-.516-.516v-16.032c0-.285.231-.516.516-.516h64.129c.285 0 .516.231.516.516z"
          })]
        })]
      })
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgcareer,
    style: {
      marginRight: `0.5rem`
    }
  });
};

const IconMessages = props => {
  const svgmessages = () => {
    var _props$width15, _props$height15;

    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("svg", {
      version: "1.1",
      id: "Capa_1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      width: (_props$width15 = props.width) !== null && _props$width15 !== void 0 ? _props$width15 : 40,
      height: (_props$height15 = props.height) !== null && _props$height15 !== void 0 ? _props$height15 : 40,
      viewBox: "0 0 512.001 512.001",
      style: {
        enableBackground: 'new 0 0 512.001 512.001'
      },
      xmlSpace: "preserve",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        style: {
          fill: '#1E88E5'
        },
        d: "M499.628,407.468c-10.128,12.16-25.134,19.194-40.96,19.2H53.334 c-15.826-0.006-30.832-7.04-40.96-19.2l195.627-162.987l20.267,13.867c16.695,11.52,38.772,11.52,55.467,0l20.267-13.867 L499.628,407.468z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
        style: {
          fill: '#64B5F6'
        },
        d: "M502.614,108.588L304.001,244.481l-20.267,13.867c-16.695,11.52-38.772,11.52-55.467,0 l-20.267-13.867L9.388,108.374c9.994-14.411,26.409-23.017,43.947-23.04h405.333C476.285,85.241,492.781,93.969,502.614,108.588z"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("g", {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#2196F3'
          },
          d: "M208.001,244.481L12.374,407.468c-8.007-9.57-12.388-21.655-12.373-34.133V138.668 c-0.065-10.823,3.214-21.403,9.387-30.293L208.001,244.481z"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("path", {
          style: {
            fill: '#2196F3'
          },
          d: "M512.001,138.668v234.667c0.014,12.478-4.366,24.563-12.373,34.133L304.001,244.481l198.613-135.893 C508.756,117.414,512.033,127.915,512.001,138.668z"
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("g", {})]
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: svgmessages,
    style: {
      marginRight: `0.5rem`
    }
  });
};



/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cPPd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var antd_lib_dropdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HgHO");
/* harmony import */ var antd_lib_dropdown__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_dropdown__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ant_design_icons_ExportOutlined__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("jti4");
/* harmony import */ var _ant_design_icons_ExportOutlined__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons_ExportOutlined__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ant_design_icons_UserOutlined__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("wzkg");
/* harmony import */ var _ant_design_icons_UserOutlined__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons_UserOutlined__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ant_design_icons_PlusCircleTwoTone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Nvpr");
/* harmony import */ var _ant_design_icons_PlusCircleTwoTone__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons_PlusCircleTwoTone__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ant_design_icons_SelectOutlined__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("vr/X");
/* harmony import */ var _ant_design_icons_SelectOutlined__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons_SelectOutlined__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("VXtC");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);











function LayoutMenuHeader({
  dataProfile,
  Linkheader,
  handleLogout,
  st
}) {
  const rt = Object(next_router__WEBPACK_IMPORTED_MODULE_8__["useRouter"])();

  const menuProfile2 = () => {
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxs"])("div", {
      className: "w-auto h-auto flex flex-col shadow-md rounded bg-white space-y-4 px-10 py-5",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxs"])("div", {
        className: "flex justify-center space-x-3",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", {
          className: "w-10 h-10 rounded-full bg-blue-500 flex text-white text-center justify-center items-center",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("img", {
            src: dataProfile.data.profile_image === "-" ? "/default-users.jpeg" : dataProfile.data.profile_image,
            alt: "imageProfile",
            className: " object-cover w-full h-full"
          })
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxs"])("div", {
          className: "flex flex-col",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("h2", {
            className: "text-lg font-semibold mb-1",
            children: dataProfile.data.name
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("h2", {
            className: "text-sm font-normal mb-1",
            children: dataProfile.data.email
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Linkheader, {
            href: `/profile`,
            ref: "noreferrer",
            children: "Profile Settings"
          })]
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", {
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxs"])("a", {
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: handleLogout,
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(_ant_design_icons_ExportOutlined__WEBPACK_IMPORTED_MODULE_2___default.a, {}), " Logout"]
        })
      })]
    });
  };

  const addMenu = () => {
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", {
      style: {
        fontSize: '14px'
      },
      className: "w-48 h-auto grid grid-cols-1 md:grid-cols-1 shadow-md rounded bg-white",
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxs"])("div", {
        className: " col-span-1 md:col-span-1 text-xs md:text-sm m-3 md:m-2 h-auto",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
          href: `/incidents/create?originPath=Tickets`,
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxs"])("div", {
            className: "flex justify-start pt-2 cursor-pointer hover:bg-gray-200",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* TicketIconSvg */ "gb"], {
              className: "pt-1"
            }), " \xA0 \xA0 ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("p", {
              className: "p-1",
              children: "Incident"
            })]
          })
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
          href: `/admin/contracts/create`,
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxs"])("div", {
            className: "flex justify-start pt-2 cursor-pointer hover:bg-gray-200",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* ContractIconSvg */ "t"], {
              className: "pt-1"
            }), " \xA0 \xA0 ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("p", {
              className: "p-1",
              children: "Contract"
            })]
          })
        })]
      })
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxs"])("div", {
    className: `hidden md:flex md:w-auto w-full ${st.menu} md:justify-end`,
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", {
      className: "md:mr-8 mr-4 cursor-pointer",
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* SearchIconSvg */ "W"], {
        size: 28,
        color: `#000000`
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("div", {
      className: "md:mr-8 mr-4 cursor-pointer",
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(_icon__WEBPACK_IMPORTED_MODULE_7__[/* NotifIconSvg */ "O"], {})
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxs"])("div", {
      className: " md:mr-12 mr-4 mt-2 flex items-center",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(antd_lib_dropdown__WEBPACK_IMPORTED_MODULE_0___default.a, {
        overlay: menuProfile2,
        trigger: ['click'],
        children: dataProfile.data.profile_image !== "-" ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("img", {
          src: dataProfile.data.profile_image,
          alt: "ava",
          className: "w-8 h-8 rounded-full object-cover cursor-pointer"
        }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("img", {
          src: "/default-users.jpeg",
          alt: "ava",
          className: "w-8 h-8 rounded-full object-cover cursor-pointer"
        })
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxs"])("div", {
        className: "flex flex-col ml-1",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("h1", {
          className: "font-semibold text-sm mb-0",
          children: dataProfile.data.name
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])("p", {
          className: "mb-0 text-xs",
          children: dataProfile.data.role === 1 ? "Super Admin" : dataProfile.data.company.name
        })]
      })]
    })]
  });
}

/* harmony default export */ __webpack_exports__["a"] = (LayoutMenuHeader);

/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("7KCV");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__("cDcd"));

var _router = __webpack_require__("elyg");

var _router2 = __webpack_require__("nOHt");

var _useIntersection = __webpack_require__("vNVm");

const prefetched = {};

function prefetch(router, href, as, options) {
  if (true) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options).catch(err => {
    if (false) {}
  });
  const curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  const {
    target
  } = event.currentTarget;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
  event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  const {
    nodeName
  } = e.currentTarget;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null) {
    scroll = as.indexOf('#') < 0;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow,
    locale,
    scroll
  }).then(success => {
    if (!success) return;

    if (scroll) {
      // FIXME: proper route announcing at Router level, not Link:
      document.body.focus();
    }
  });
}

function Link(props) {
  if (false) {}

  const p = props.prefetch !== false;
  const router = (0, _router2.useRouter)();
  const pathname = router && router.pathname || '/';

  const {
    href,
    as
  } = _react.default.useMemo(() => {
    const [resolvedHref, resolvedAs] = (0, _router.resolveHref)(pathname, props.href, true);
    return {
      href: resolvedHref,
      as: props.as ? (0, _router.resolveHref)(pathname, props.as) : resolvedAs || resolvedHref
    };
  }, [pathname, props.href, props.as]);

  let {
    children,
    replace,
    shallow,
    scroll,
    locale
  } = props; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react.default.createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  const child = _react.Children.only(children);

  const childRef = child && typeof child === 'object' && child.ref;
  const [setIntersectionRef, isVisible] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px'
  });

  const setRef = _react.default.useCallback(el => {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  (0, _react.useEffect)(() => {
    const shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    const isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);
  const childProps = {
    ref: setRef,
    onClick: e => {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = e => {
    if (!(0, _router.isLocalURL)(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    const localeDomain = (0, _router.getDomainLocale)(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router.addBasePath)((0, _router.addLocale)(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react.default.cloneElement(child, childProps);
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "dZ6Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = mitt;
/*
MIT License
Copyright (c) Jason Miller (https://jasonformat.com/)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// This file is based on https://github.com/developit/mitt/blob/v1.1.3/src/index.js
// It's been edited for the needs of this script
// See the LICENSE at the top of the file

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

/***/ }),

/***/ "eGmO":
/***/ (function(module, exports) {

module.exports = require("antd/lib/button");

/***/ }),

/***/ "elyg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getDomainLocale = getDomainLocale;
exports.addLocale = addLocale;
exports.delLocale = delLocale;
exports.hasBasePath = hasBasePath;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports.default = void 0;

var _normalizeTrailingSlash = __webpack_require__("X24+");

var _routeLoader = __webpack_require__("Nh2W");

var _denormalizePagePath = __webpack_require__("wkBG");

var _normalizeLocalePath = __webpack_require__("3wub");

var _mitt = _interopRequireDefault(__webpack_require__("dZ6Y"));

var _utils = __webpack_require__("g/15");

var _isDynamic = __webpack_require__("/jkW");

var _parseRelativeUrl = __webpack_require__("hS4m");

var _querystring = __webpack_require__("3WeD");

var _resolveRewrites = _interopRequireDefault(__webpack_require__("P7gm"));

var _routeMatcher = __webpack_require__("gguc");

var _routeRegex = __webpack_require__("YTqd");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/* global __NEXT_DATA__ */
// tslint:disable:no-console


let detectDomainLocale;

if (false) {}

const basePath =  false || '';

function buildCancellationError() {
  return Object.assign(new Error('Route Cancelled'), {
    cancelled: true
  });
}

function addPathPrefix(path, prefix) {
  return prefix && path.startsWith('/') ? path === '/' ? (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(prefix) : `${prefix}${pathNoQueryHash(path) === '/' ? path.substring(1) : path}` : path;
}

function getDomainLocale(path, locale, locales, domainLocales) {
  if (false) {}

  return false;
}

function addLocale(path, locale, defaultLocale) {
  if (false) {}

  return path;
}

function delLocale(path, locale) {
  if (false) {}

  return path;
}

function pathNoQueryHash(path) {
  const queryIndex = path.indexOf('?');
  const hashIndex = path.indexOf('#');

  if (queryIndex > -1 || hashIndex > -1) {
    path = path.substring(0, queryIndex > -1 ? queryIndex : hashIndex);
  }

  return path;
}

function hasBasePath(path) {
  path = pathNoQueryHash(path);
  return path === basePath || path.startsWith(basePath + '/');
}

function addBasePath(path) {
  // we only add the basepath on relative urls
  return addPathPrefix(path, basePath);
}

function delBasePath(path) {
  path = path.slice(basePath.length);
  if (!path.startsWith('/')) path = `/${path}`;
  return path;
}
/**
* Detects whether a given url is routable by the Next.js router (browser only).
*/


function isLocalURL(url) {
  // prevent a hydration mismatch on href for url with anchor refs
  if (url.startsWith('/') || url.startsWith('#')) return true;

  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = (0, _utils.getLocationOrigin)();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_) {
    return false;
  }
}

function interpolateAs(route, asPathname, query) {
  let interpolatedRoute = '';
  const dynamicRegex = (0, _routeRegex.getRouteRegex)(route);
  const dynamicGroups = dynamicRegex.groups;
  const dynamicMatches = // Try to match the dynamic route against the asPath
  (asPathname !== route ? (0, _routeMatcher.getRouteMatcher)(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
  // TODO: should this take priority; also need to change in the router.
  query;
  interpolatedRoute = route;
  const params = Object.keys(dynamicGroups);

  if (!params.every(param => {
    let value = dynamicMatches[param] || '';
    const {
      repeat,
      optional
    } = dynamicGroups[param]; // support single-level catch-all
    // TODO: more robust handling for user-error (passing `/`)

    let replaced = `[${repeat ? '...' : ''}${param}]`;

    if (optional) {
      replaced = `${!value ? '/' : ''}[${replaced}]`;
    }

    if (repeat && !Array.isArray(value)) value = [value];
    return (optional || param in dynamicMatches) && ( // Interpolate group into data URL if present
    interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map( // these values should be fully encoded instead of just
    // path delimiter escaped since they are being inserted
    // into the URL and we expect URL encoded segments
    // when parsing dynamic route params
    segment => encodeURIComponent(segment)).join('/') : encodeURIComponent(value)) || '/');
  })) {
    interpolatedRoute = ''; // did not satisfy all requirements
    // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
  }

  return {
    params,
    result: interpolatedRoute
  };
}

function omitParmsFromQuery(query, params) {
  const filteredQuery = {};
  Object.keys(query).forEach(key => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}
/**
* Resolves a given hyperlink with a certain router state (basePath not included).
* Preserves absolute urls.
*/


function resolveHref(currentPath, href, resolveAs) {
  // we use a dummy base url for relative urls
  const base = new URL(currentPath, 'http://n');
  const urlAsString = typeof href === 'string' ? href : (0, _utils.formatWithValidation)(href); // Return because it cannot be routed by the Next.js router

  if (!isLocalURL(urlAsString)) {
    return resolveAs ? [urlAsString] : urlAsString;
  }

  try {
    const finalUrl = new URL(urlAsString, base);
    finalUrl.pathname = (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(finalUrl.pathname);
    let interpolatedAs = '';

    if ((0, _isDynamic.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
      const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
      const {
        result,
        params
      } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);

      if (result) {
        interpolatedAs = (0, _utils.formatWithValidation)({
          pathname: result,
          hash: finalUrl.hash,
          query: omitParmsFromQuery(query, params)
        });
      }
    } // if the origin didn't change, it means we received a relative href


    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
    return resolveAs ? [resolvedHref, interpolatedAs || resolvedHref] : resolvedHref;
  } catch (_) {
    return resolveAs ? [urlAsString] : urlAsString;
  }
}

function stripOrigin(url) {
  const origin = (0, _utils.getLocationOrigin)();
  return url.startsWith(origin) ? url.substring(origin.length) : url;
}

function prepareUrlAs(router, url, as) {
  // If url and as provided as an object representation,
  // we'll format them into the string version here.
  let [resolvedHref, resolvedAs] = resolveHref(router.pathname, url, true);
  const origin = (0, _utils.getLocationOrigin)();
  const hrefHadOrigin = resolvedHref.startsWith(origin);
  const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
  resolvedHref = stripOrigin(resolvedHref);
  resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
  const preparedUrl = hrefHadOrigin ? resolvedHref : addBasePath(resolvedHref);
  const preparedAs = as ? stripOrigin(resolveHref(router.pathname, as)) : resolvedAs || resolvedHref;
  return {
    url: preparedUrl,
    as: asHadOrigin ? preparedAs : addBasePath(preparedAs)
  };
}

const manualScrollRestoration =  false && false;
const SSG_DATA_NOT_FOUND = Symbol('SSG_DATA_NOT_FOUND');

function fetchRetry(url, attempts) {
  return fetch(url, {
    // Cookies are required to be present for Next.js' SSG "Preview Mode".
    // Cookies may also be required for `getServerSideProps`.
    //
    // > `fetch` won’t send cookies, unless you set the credentials init
    // > option.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //
    // > For maximum browser compatibility when it comes to sending &
    // > receiving cookies, always supply the `credentials: 'same-origin'`
    // > option instead of relying on the default.
    // https://github.com/github/fetch#caveats
    credentials: 'same-origin'
  }).then(res => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url, attempts - 1);
      }

      if (res.status === 404) {
        return res.json().then(data => {
          if (data.notFound) {
            return {
              notFound: SSG_DATA_NOT_FOUND
            };
          }

          throw new Error(`Failed to load static props`);
        });
      }

      throw new Error(`Failed to load static props`);
    }

    return res.json();
  });
}

function fetchNextData(dataHref, isServerRender) {
  return fetchRetry(dataHref, isServerRender ? 3 : 1).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      (0, _routeLoader.markAssetError)(err);
    }

    throw err;
  });
}

class Router {
  /**
  * Map of all components loaded in `Router`
  */
  // Static Data Cache
  constructor(_pathname, _query, _as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback,
    locale,
    locales,
    defaultLocale,
    domainLocales
  }) {
    this.route = void 0;
    this.pathname = void 0;
    this.query = void 0;
    this.asPath = void 0;
    this.basePath = void 0;
    this.components = void 0;
    this.sdc = {};
    this.sub = void 0;
    this.clc = void 0;
    this.pageLoader = void 0;
    this._bps = void 0;
    this.events = void 0;
    this._wrapApp = void 0;
    this.isSsr = void 0;
    this.isFallback = void 0;
    this._inFlightRoute = void 0;
    this._shallow = void 0;
    this.locale = void 0;
    this.locales = void 0;
    this.defaultLocale = void 0;
    this.domainLocales = void 0;
    this.isReady = void 0;
    this._idx = 0;

    this.onPopState = e => {
      const state = e.state;

      if (!state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', (0, _utils.formatWithValidation)({
          pathname: addBasePath(pathname),
          query
        }), (0, _utils.getURL)());
        return;
      }

      if (!state.__N) {
        return;
      }

      let forcedScroll;
      const {
        url,
        as,
        options,
        idx
      } = state;

      if (false) {}

      this._idx = idx;
      const {
        pathname
      } = (0, _parseRelativeUrl.parseRelativeUrl)(url); // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site

      if (this.isSsr && as === this.asPath && pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(state)) {
        return;
      }

      this.change('replaceState', url, as, Object.assign({}, options, {
        shallow: options.shallow && this._shallow,
        locale: options.locale || this.defaultLocale
      }), forcedScroll);
    }; // represents the current component key


    this.route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(_pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (_pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        initial: true,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App,
      styleSheets: [
        /* /_app does not need its stylesheets managed */
      ]
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = _pathname;
    this.query = _query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    const autoExportDynamic = (0, _isDynamic.isDynamicRoute)(_pathname) && self.__NEXT_DATA__.autoExport;

    this.asPath = autoExportDynamic ? _pathname : _as;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;
    this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || !autoExportDynamic && !self.location.search);

    if (false) {}

    if (false) {}
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as, options = {}) {
    if (false) {}

    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as, options = {}) {
    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('replaceState', url, as, options);
  }

  async change(method, url, as, options, forcedScroll) {
    var _options$scroll;

    if (!isLocalURL(url)) {
      window.location.href = url;
      return false;
    } // for static pages with query params in the URL we delay
    // marking the router ready until after the query is updated


    if (options._h) {
      this.isReady = true;
    } // Default to scroll reset behavior unless explicitly specified to be
    // `false`! This makes the behavior between using `Router#push` and a
    // `<Link />` consistent.


    options.scroll = !!((_options$scroll = options.scroll) != null ? _options$scroll : true);
    let localeChange = options.locale !== this.locale;

    if (false) { var _this$locales; }

    if (!options._h) {
      this.isSsr = false;
    } // marking route changes as a navigation start entry


    if (_utils.ST) {
      performance.mark('routeChange');
    }

    const {
      shallow = false
    } = options;
    const routeProps = {
      shallow
    };

    if (this._inFlightRoute) {
      this.abortComponentLoad(this._inFlightRoute, routeProps);
    }

    as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
    const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, this.locale);
    this._inFlightRoute = as; // If the url change is only related to a hash change
    // We should not proceed. We should only change the state.
    // WARNING: `_h` is an internal option for handing Next.js client-side
    // hydration. Your app should _never_ use this property. It may change at
    // any time without notice.

    if (!options._h && this.onlyAHashChange(cleanedAs)) {
      this.asPath = cleanedAs;
      Router.events.emit('hashChangeStart', as, routeProps); // TODO: do we need the resolved href when only a hash change?

      this.changeState(method, url, as, options);
      this.scrollToHash(cleanedAs);
      this.notify(this.components[this.route], null);
      Router.events.emit('hashChangeComplete', as, routeProps);
      return true;
    }

    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname,
      query
    } = parsed; // The build manifest needs to be loaded before auto-static dynamic pages
    // get their query parameters to allow ensuring they can be parsed properly
    // when rewritten to

    let pages, rewrites;

    try {
      pages = await this.pageLoader.getPageList();
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader.getClientBuildManifest)());
    } catch (err) {
      // If we fail to resolve the page list or client-build manifest, we must
      // do a server-side transition:
      window.location.href = as;
      return false;
    }

    parsed = this._resolveHref(parsed, pages);

    if (parsed.pathname !== pathname) {
      pathname = parsed.pathname;
      url = (0, _utils.formatWithValidation)(parsed);
    } // url and as should always be prefixed with basePath by this
    // point by either next/link or router.push/replace so strip the
    // basePath from the pathname to match the pages dir 1-to-1


    pathname = pathname ? (0, _normalizeTrailingSlash.removePathTrailingSlash)(delBasePath(pathname)) : pathname; // If asked to change the current URL we should reload the current page
    // (not location.reload() but reload getInitialProps and other Next.js stuffs)
    // We also need to set the method = replaceState always
    // as this should not go into the history (That's how browsers work)
    // We should compare the new asPath to the current asPath, not the url

    if (!this.urlIsNew(cleanedAs) && !localeChange) {
      method = 'replaceState';
    }

    let route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname); // we need to resolve the as value using rewrites for dynamic SSG
    // pages to allow building the data URL correctly

    let resolvedAs = as;

    if ( true && as.startsWith('/')) {
      const rewritesResult = (0, _resolveRewrites.default)(addBasePath(addLocale(delBasePath(as), this.locale)), pages, rewrites, query, p => this._resolveHref({
        pathname: p
      }, pages).pathname, this.locales);
      resolvedAs = rewritesResult.asPath;

      if (rewritesResult.matchedPage && rewritesResult.resolvedHref) {
        // if this directly matches a page we need to update the href to
        // allow the correct page chunk to be loaded
        route = rewritesResult.resolvedHref;
        pathname = rewritesResult.resolvedHref;
        parsed.pathname = pathname;
        url = (0, _utils.formatWithValidation)(parsed);
      }
    }

    if (!isLocalURL(as)) {
      if (false) {}

      window.location.href = as;
      return false;
    }

    resolvedAs = delLocale(delBasePath(resolvedAs), this.locale);

    if ((0, _isDynamic.isDynamicRoute)(route)) {
      const parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(resolvedAs);
      const asPathname = parsedAs.pathname;
      const routeRegex = (0, _routeRegex.getRouteRegex)(route);
      const routeMatch = (0, _routeMatcher.getRouteMatcher)(routeRegex)(asPathname);
      const shouldInterpolate = route === asPathname;
      const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};

      if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
        const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

        if (missingParams.length > 0) {
          if (false) {}

          throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://err.sh/vercel/next.js/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`);
        }
      } else if (shouldInterpolate) {
        as = (0, _utils.formatWithValidation)(Object.assign({}, parsedAs, {
          pathname: interpolatedAs.result,
          query: omitParmsFromQuery(query, interpolatedAs.params)
        }));
      } else {
        // Merge params into `query`, overwriting any specified in search
        Object.assign(query, routeMatch);
      }
    }

    Router.events.emit('routeChangeStart', as, routeProps);

    try {
      let routeInfo = await this.getRouteInfo(route, pathname, query, as, resolvedAs, routeProps);
      let {
        error,
        props,
        __N_SSG,
        __N_SSP
      } = routeInfo; // handle redirect on client-transition

      if ((__N_SSG || __N_SSP) && props) {
        if (props.pageProps && props.pageProps.__N_REDIRECT) {
          const destination = props.pageProps.__N_REDIRECT; // check if destination is internal (resolves to a page) and attempt
          // client-navigation if it is falling back to hard navigation if
          // it's not

          if (destination.startsWith('/')) {
            const parsedHref = (0, _parseRelativeUrl.parseRelativeUrl)(destination);

            this._resolveHref(parsedHref, pages, false);

            if (pages.includes(parsedHref.pathname)) {
              const {
                url: newUrl,
                as: newAs
              } = prepareUrlAs(this, destination, destination);
              return this.change(method, newUrl, newAs, options);
            }
          }

          window.location.href = destination;
          return new Promise(() => {});
        } // handle SSG data 404


        if (props.notFound === SSG_DATA_NOT_FOUND) {
          let notFoundRoute;

          try {
            await this.fetchComponent('/404');
            notFoundRoute = '/404';
          } catch (_) {
            notFoundRoute = '/_error';
          }

          routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query, as, resolvedAs, {
            shallow: false
          });
        }
      }

      Router.events.emit('beforeHistoryChange', as, routeProps);
      this.changeState(method, url, as, options);

      if (false) {} // shallow routing is only allowed for same page URL changes.


      const isValidShallowRoute = options.shallow && this.route === route;
      await this.set(route, pathname, query, cleanedAs, routeInfo, forcedScroll || (isValidShallowRoute || !options.scroll ? null : {
        x: 0,
        y: 0
      })).catch(e => {
        if (e.cancelled) error = error || e;else throw e;
      });

      if (error) {
        Router.events.emit('routeChangeError', error, cleanedAs, routeProps);
        throw error;
      }

      if (false) {}

      Router.events.emit('routeChangeComplete', as, routeProps);
      return true;
    } catch (err) {
      if (err.cancelled) {
        return false;
      }

      throw err;
    }
  }

  changeState(method, url, as, options = {}) {
    if (false) {}

    if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url,
        as,
        options,
        __N: true,
        idx: this._idx = method !== 'pushState' ? this._idx : this._idx + 1
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
    if (err.cancelled) {
      // bubble up cancellation errors
      throw err;
    }

    if ((0, _routeLoader.isAssetError)(err) || loadErrorFail) {
      Router.events.emit('routeChangeError', err, as, routeProps); // If we can't load the page it could be one of following reasons
      //  1. Page doesn't exists
      //  2. Page does exist in a different zone
      //  3. Internal error while loading the page
      // So, doing a hard reload is the proper way to deal with this.

      window.location.href = as; // Changing the URL doesn't block executing the current code path.
      // So let's throw a cancellation error stop the routing logic.

      throw buildCancellationError();
    }

    try {
      let Component;
      let styleSheets;
      let props;

      if (typeof Component === 'undefined' || typeof styleSheets === 'undefined') {
        ;
        ({
          page: Component,
          styleSheets
        } = await this.fetchComponent('/_error'));
      }

      const routeInfo = {
        props,
        Component,
        styleSheets,
        err,
        error: err
      };

      if (!routeInfo.props) {
        try {
          routeInfo.props = await this.getInitialProps(Component, {
            err,
            pathname,
            query
          });
        } catch (gipErr) {
          console.error('Error in error page `getInitialProps`: ', gipErr);
          routeInfo.props = {};
        }
      }

      return routeInfo;
    } catch (routeInfoErr) {
      return this.handleRouteInfoError(routeInfoErr, pathname, query, as, routeProps, true);
    }
  }

  async getRouteInfo(route, pathname, query, as, resolvedAs, routeProps) {
    try {
      const existingRouteInfo = this.components[route];

      if (routeProps.shallow && existingRouteInfo && this.route === route) {
        return existingRouteInfo;
      }

      const cachedRouteInfo = existingRouteInfo && 'initial' in existingRouteInfo ? undefined : existingRouteInfo;
      const routeInfo = cachedRouteInfo ? cachedRouteInfo : await this.fetchComponent(route).then(res => ({
        Component: res.page,
        styleSheets: res.styleSheets,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }));
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (false) {}

      let dataHref;

      if (__N_SSG || __N_SSP) {
        dataHref = this.pageLoader.getDataHref((0, _utils.formatWithValidation)({
          pathname,
          query
        }), resolvedAs, __N_SSG, this.locale);
      }

      const props = await this._getData(() => __N_SSG ? this._getStaticData(dataHref) : __N_SSP ? this._getServerData(dataHref) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      }));
      routeInfo.props = props;
      this.components[route] = routeInfo;
      return routeInfo;
    } catch (err) {
      return this.handleRouteInfoError(err, pathname, query, as, routeProps);
    }
  }

  set(route, pathname, query, as, data, resetScroll) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data, resetScroll);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }

  _resolveHref(parsedHref, pages, applyBasePath = true) {
    const {
      pathname
    } = parsedHref;
    const cleanPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _denormalizePagePath.denormalizePagePath)(applyBasePath ? delBasePath(pathname) : pathname));

    if (cleanPathname === '/404' || cleanPathname === '/_error') {
      return parsedHref;
    } // handle resolving href for dynamic routes


    if (!pages.includes(cleanPathname)) {
      // eslint-disable-next-line array-callback-return
      pages.some(page => {
        if ((0, _isDynamic.isDynamicRoute)(page) && (0, _routeRegex.getRouteRegex)(page).re.test(cleanPathname)) {
          parsedHref.pathname = applyBasePath ? addBasePath(page) : page;
          return true;
        }
      });
    }

    parsedHref.pathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)(parsedHref.pathname);
    return parsedHref;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  async prefetch(url, asPath = url, options = {}) {
    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname
    } = parsed;

    if (false) {}

    const pages = await this.pageLoader.getPageList();
    parsed = this._resolveHref(parsed, pages, false);

    if (parsed.pathname !== pathname) {
      pathname = parsed.pathname;
      url = (0, _utils.formatWithValidation)(parsed);
    } // Prefetch is not supported in development mode because it would trigger on-demand-entries


    if (false) {}

    const route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);
    await Promise.all([this.pageLoader._isSsg(url).then(isSsg => {
      return isSsg ? this._getStaticData(this.pageLoader.getDataHref(url, asPath, true, typeof options.locale !== 'undefined' ? options.locale : this.locale)) : false;
    }), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]);
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  _getStaticData(dataHref) {
    const {
      href: cacheKey
    } = new URL(dataHref, window.location.href);

    if ( true && this.sdc[cacheKey]) {
      return Promise.resolve(this.sdc[cacheKey]);
    }

    return fetchNextData(dataHref, this.isSsr).then(data => {
      this.sdc[cacheKey] = data;
      return data;
    });
  }

  _getServerData(dataHref) {
    return fetchNextData(dataHref, this.isSsr);
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return (0, _utils.loadGetInitialProps)(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as, routeProps) {
    if (this.clc) {
      Router.events.emit('routeChangeError', buildCancellationError(), as, routeProps);
      this.clc();
      this.clc = null;
    }
  }

  notify(data, resetScroll) {
    return this.sub(data, this.components['/_app'].Component, resetScroll);
  }

}

exports.default = Router;
Router.events = (0, _mitt.default)();

/***/ }),

/***/ "g/15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.execOnce = execOnce;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;
exports.getDisplayName = getDisplayName;
exports.isResSent = isResSent;
exports.loadGetInitialProps = loadGetInitialProps;
exports.formatWithValidation = formatWithValidation;
exports.ST = exports.SP = exports.urlObjectKeys = void 0;

var _formatUrl = __webpack_require__("6D7l");
/**
* Utils
*/


function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }

    return result;
  };
}

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

function isResSent(res) {
  return res.finished || res.headersSent;
}

async function loadGetInitialProps(App, ctx) {
  if (false) { var _App$prototype; } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (false) {}

  return props;
}

const urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];
exports.urlObjectKeys = urlObjectKeys;

function formatWithValidation(url) {
  if (false) {}

  return (0, _formatUrl.formatUrl)(url);
}

const SP = typeof performance !== 'undefined';
exports.SP = SP;
const ST = SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';
exports.ST = ST;

/***/ }),

/***/ "g6Xq":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"headerLayout": "layout-dashboard_headerLayout__3UVqs",
	"menuToggle": "layout-dashboard_menuToggle__l1iSJ",
	"menu": "layout-dashboard_menu__2deK0",
	"siderLayout": "layout-dashboard_siderLayout__2zEuQ",
	"trigger": "layout-dashboard_trigger__23ZCe",
	"breadcrumbClients": "layout-dashboard_breadcrumbClients__B0IDk",
	"siderLayoutSmall": "layout-dashboard_siderLayoutSmall__lCcd3",
	"triggerSmall": "layout-dashboard_triggerSmall__2Lucp",
	"breadcrumbClientsSmall": "layout-dashboard_breadcrumbClientsSmall__jisGr"
};


/***/ }),

/***/ "gguc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteMatcher = getRouteMatcher;

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = param => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        const err = new Error('failed to decode param');
        err.code = 'DECODE_FAILED';
        throw err;
      }
    };

    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

/***/ }),

/***/ "gtlx":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons/MenuFoldOutlined");

/***/ }),

/***/ "hS4m":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parseRelativeUrl = parseRelativeUrl;

var _utils = __webpack_require__("g/15");

var _querystring = __webpack_require__("3WeD");
/**
* Parses path-relative urls (e.g. `/hello/world?foo=bar`). If url isn't path-relative
* (e.g. `./hello`) then at least base must be.
* Absolute urls are rejected with one exception, in the browser, absolute urls that are on
* the current origin will be parsed as relative
*/


function parseRelativeUrl(url, base) {
  const globalBase = new URL(true ? 'http://n' : undefined);
  const resolvedBase = base ? new URL(base, globalBase) : globalBase;
  const {
    pathname,
    searchParams,
    search,
    hash,
    href,
    origin
  } = new URL(url, resolvedBase);

  if (origin !== globalBase.origin) {
    throw new Error(`invariant: invalid relative URL, router received ${url}`);
  }

  return {
    pathname,
    query: (0, _querystring.searchParamsToUrlQuery)(searchParams),
    search,
    hash,
    href: href.slice(globalBase.origin.length)
  };
}

/***/ }),

/***/ "jti4":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons/ExportOutlined");

/***/ }),

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("7KCV");

var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router2 = _interopRequireWildcard(__webpack_require__("elyg"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__("Osoz");

var _withRouter = _interopRequireDefault(__webpack_require__("0Bsm"));

exports.withRouter = _withRouter.default;
/* global window */

const singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath', 'locale', 'locales', 'defaultLocale', 'isReady'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          console.error(`Error when running the Router event: ${eventField}`);
          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


const createRouter = (...args) => {
  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  const _router = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign(Array.isArray(_router[property]) ? [] : {}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ "nZwT":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons");

/***/ }),

/***/ "rQZo":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons/MenuUnfoldOutlined");

/***/ }),

/***/ "rlPI":
/***/ (function(module, exports) {

module.exports = require("cookie");

/***/ }),

/***/ "vEvA":
/***/ (function(module, exports) {

module.exports = require("antd/lib/spin");

/***/ }),

/***/ "vNVm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__("cDcd");

var _requestIdleCallback = _interopRequireDefault(__webpack_require__("0G5g"));

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const setRef = (0, _react.useCallback)(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(() => {
    if (!hasIntersectionObserver) {
      if (!visible) (0, _requestIdleCallback.default)(() => setVisible(true));
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "vXfU":
/***/ (function(module, exports) {

module.exports = require("antd/lib/tree-select");

/***/ }),

/***/ "vmXh":
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ }),

/***/ "vr/X":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons/SelectOutlined");

/***/ }),

/***/ "wkBG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.normalizePathSep=normalizePathSep;exports.denormalizePagePath=denormalizePagePath;function normalizePathSep(path){return path.replace(/\\/g,'/');}function denormalizePagePath(page){page=normalizePathSep(page);if(page.startsWith('/index/')){page=page.slice(6);}else if(page==='/index'){page='/';}return page;}
//# sourceMappingURL=denormalize-page-path.js.map

/***/ }),

/***/ "wy2R":
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "wzkg":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons/UserOutlined");

/***/ }),

/***/ "xKsY":
/***/ (function(module, exports) {

module.exports = require("antd/lib/modal");

/***/ }),

/***/ "z6+L":
/***/ (function(module, exports) {

module.exports = require("antd/lib/tooltip");

/***/ }),

/***/ "zOyy":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at " + i);
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at " + j);
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at " + j);
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at " + i);
            if (!pattern)
                throw new TypeError("Missing pattern at " + i);
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
    };
    var consumeText = function () {
        var result = "";
        var value;
        // tslint:disable-next-line
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
exports.parse = parse;
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
exports.compile = compile;
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"" + token.name + "\" to not be empty");
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
        }
        return path;
    };
}
exports.tokensToFunction = tokensToFunction;
/**
 * Create path match function from `path-to-regexp` spec.
 */
function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys, options);
}
exports.match = match;
/**
 * Create a path match function from `path-to-regexp` output.
 */
function regexpToFunction(re, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.decode, decode = _a === void 0 ? function (x) { return x; } : _a;
    return function (pathname) {
        var m = re.exec(pathname);
        if (!m)
            return false;
        var path = m[0], index = m.index;
        var params = Object.create(null);
        var _loop_1 = function (i) {
            // tslint:disable-next-line
            if (m[i] === undefined)
                return "continue";
            var key = keys[i - 1];
            if (key.modifier === "*" || key.modifier === "+") {
                params[key.name] = m[i].split(key.prefix + key.suffix).map(function (value) {
                    return decode(value, key);
                });
            }
            else {
                params[key.name] = decode(m[i], key);
            }
        };
        for (var i = 1; i < m.length; i++) {
            _loop_1(i);
        }
        return { path: path, index: index, params: params };
    };
}
exports.regexpToFunction = regexpToFunction;
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}
/**
 * Pull out keys from a regexp.
 */
function regexpToRegexp(path, keys) {
    if (!keys)
        return path;
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
        for (var i = 0; i < groups.length; i++) {
            keys.push({
                name: i,
                prefix: "",
                suffix: "",
                modifier: "",
                pattern: ""
            });
        }
    }
    return path;
}
/**
 * Transform an array into a regexp.
 */
function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function (path) { return pathToRegexp(path, keys, options).source; });
    return new RegExp("(?:" + parts.join("|") + ")", flags(options));
}
/**
 * Create a path regexp from string input.
 */
function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */
function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) { options = {}; }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function (x) { return x; } : _d;
    var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
    var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
    var route = start ? "^" : "";
    // Iterate over the tokens and create our regexp string.
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === "string") {
            route += escapeString(encode(token));
        }
        else {
            var prefix = escapeString(encode(token.prefix));
            var suffix = escapeString(encode(token.suffix));
            if (token.pattern) {
                if (keys)
                    keys.push(token);
                if (prefix || suffix) {
                    if (token.modifier === "+" || token.modifier === "*") {
                        var mod = token.modifier === "*" ? "?" : "";
                        route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
                    }
                    else {
                        route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
                    }
                }
                else {
                    route += "(" + token.pattern + ")" + token.modifier;
                }
            }
            else {
                route += "(?:" + prefix + suffix + ")" + token.modifier;
            }
        }
    }
    if (end) {
        if (!strict)
            route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
    }
    else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string"
            ? delimiter.indexOf(endToken[endToken.length - 1]) > -1
            : // tslint:disable-next-line
                endToken === undefined;
        if (!strict) {
            route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }
        if (!isEndDelimited) {
            route += "(?=" + delimiter + "|" + endsWith + ")";
        }
    }
    return new RegExp(route, flags(options));
}
exports.tokensToRegexp = tokensToRegexp;
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */
function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp)
        return regexpToRegexp(path, keys);
    if (Array.isArray(path))
        return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
}
exports.pathToRegexp = pathToRegexp;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "zkM6":
/***/ (function(module, exports) {

module.exports = require("antd/lib/tabs");

/***/ })

/******/ });