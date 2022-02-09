module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ({

/***/ "3PsY":
/***/ (function(module, exports) {

module.exports = require("antd/lib/message");

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("gMHI");


/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "Gss8":
/***/ (function(module, exports) {

module.exports = require("antd/lib/notification");

/***/ }),

/***/ "Uqqx":
/***/ (function(module, exports) {

module.exports = require("antd/lib/input");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "eGmO":
/***/ (function(module, exports) {

module.exports = require("antd/lib/button");

/***/ }),

/***/ "foLw":
/***/ (function(module, exports) {

module.exports = require("antd/lib/form");

/***/ }),

/***/ "gMHI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return getServerSideProps; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("eGmO");
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("foLw");
/* harmony import */ var antd_lib_form__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_form__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Uqqx");
/* harmony import */ var antd_lib_input__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_input__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var antd_lib_message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("3PsY");
/* harmony import */ var antd_lib_message__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd_lib_message__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var antd_lib_notification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Gss8");
/* harmony import */ var antd_lib_notification__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd_lib_notification__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("nZwT");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("vmXh");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("rlPI");
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_10__);









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






function Home({
  initProps
}) {
  // console.log("token di login abis dari logout: " + jscookie.get('token'))
  const rt = Object(next_router__WEBPACK_IMPORTED_MODULE_8__["useRouter"])();
  const {
    0: formdata,
    1: setFormdata
  } = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])({
    email: "",
    password: ""
  });
  const {
    0: alerterror,
    1: setAlerterror
  } = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(false);
  const {
    0: loadinglogin,
    1: setLoadinglogin
  } = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(false);

  const onChangeLogin = e => {
    setFormdata(_objectSpread(_objectSpread({}, formdata), {}, {
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = () => {
    setLoadinglogin(true);
    fetch(`${"https://service-staging.mig.id"}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // body: new URLSearchParams(formdata)
      body: JSON.stringify(formdata)
    }).then(res => res.json()).then(res2 => {
      setLoadinglogin(false);

      if (res2.data) {
        antd_lib_notification__WEBPACK_IMPORTED_MODULE_5___default.a["success"]({
          message: "Selamat datang di MIGSYS",
          duration: 3
        }); // console.log("token: " + res2.data.token)

        /** Token will be expired in 1 day */


        js_cookie__WEBPACK_IMPORTED_MODULE_7___default.a.set("token", JSON.stringify(res2.data.token), {
          expires: 1
        }); // console.log("token di session: " + JSON.parse(jscookie.get('token')))

        rt.push("/dashboard/home");
      } else if (!res2.success) {
        // console.log("masuk ke error login")
        antd_lib_message__WEBPACK_IMPORTED_MODULE_4___default.a.error({
          content: res2.message.errorInfo.status_detail,
          style: {
            marginTop: `1rem`
          }
        }, 5);

        setAlerterror(true);
      }
    });
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
    children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
      className: "container-xl bg-blue-600 h-screen"
      /*style={{background:`linear-gradient(#035ea3, #198e07)`}}*/
      ,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
        className: "pt-20 relative",
        id: "wrapper",
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
          className: "mx-auto bg-white rounded-lg w-10/12 md:w-5/12 max-h-80 md:max-h-80 text-black shadow-lg px-3 md:px-5 pt-10 pb-1 text-center",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("h1", {
            className: "mb-5 font-mont text-xl font-semibold",
            children: "LogIn MIGSYS v3"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_2___default.a, {
            name: "email",
            className: "loginForm",
            initialValues: {
              remember: true
            },
            onFinish: handleLogin,
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              name: "email",
              rules: [{
                required: true,
                message: "Please input your Email!"
              }],
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_3___default.a, {
                prefix: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__["UserOutlined"], {
                  className: "site-form-item-icon"
                }),
                name: "email",
                value: formdata,
                placeholder: "Email",
                onChange: onChangeLogin
              })
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              name: "password",
              rules: [{
                required: true,
                message: "Password!"
              }],
              style: {
                marginBottom: `3rem`
              },
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_input__WEBPACK_IMPORTED_MODULE_3___default.a.Password, {
                prefix: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__["LockOutlined"], {
                  className: "site-form-item-icon"
                }),
                name: "password",
                value: formdata,
                placeholder: "Password",
                type: "password",
                onChange: onChangeLogin
              })
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_form__WEBPACK_IMPORTED_MODULE_2___default.a.Item, {
              style: {
                justifyContent: `center`
              },
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_button__WEBPACK_IMPORTED_MODULE_1___default.a, {
                type: "primary",
                htmlType: "submit",
                loading: loadinglogin,
                className: "login-form-button",
                style: {
                  width: `100%`
                },
                children: "Log in"
              })
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
            className: " flex justify-center items-center",
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
              className: " mb-5 text-primary hover:text-secondary cursor-pointer",
              onClick: () => {
                rt.push(`/requestForgetPassword`);
              },
              children: "Lupa Password"
            })
          })]
        })
      })
    })
  });
}
async function getServerSideProps({
  req,
  res
}) {
  const initProps = {};

  if (req && req.headers) {
    if (req.headers.cookie) {
      const cookies = req.headers.cookie;
      const cookiesJSON1 = cookie__WEBPACK_IMPORTED_MODULE_10___default.a.parse(cookies);

      if (cookiesJSON1.token) {
        return {
          redirect: {
            permanent: false,
            destination: "/dashboard/home"
          }
        };
      }
    } // if (typeof cookies === 'string') {
    //   const cookiesJSON = httpcookie.parse(cookies);
    //   initProps.token = cookiesJSON.token;
    // }

  }

  return {
    props: {
      initProps
    }
  };
}

/***/ }),

/***/ "nZwT":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons");

/***/ }),

/***/ "rlPI":
/***/ (function(module, exports) {

module.exports = require("cookie");

/***/ }),

/***/ "vmXh":
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ })

/******/ });