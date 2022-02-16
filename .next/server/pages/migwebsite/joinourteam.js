module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 70);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/2qU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "antd/lib/dropdown"
var dropdown_ = __webpack_require__("HgHO");
var dropdown_default = /*#__PURE__*/__webpack_require__.n(dropdown_);

// EXTERNAL MODULE: external "antd/lib/button"
var button_ = __webpack_require__("eGmO");
var button_default = /*#__PURE__*/__webpack_require__.n(button_);

// EXTERNAL MODULE: external "antd/lib/menu"
var menu_ = __webpack_require__("a5Fm");
var menu_default = /*#__PURE__*/__webpack_require__.n(menu_);

// EXTERNAL MODULE: external "antd/lib/layout"
var layout_ = __webpack_require__("VzA1");
var layout_default = /*#__PURE__*/__webpack_require__.n(layout_);

// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__("nZwT");

// EXTERNAL MODULE: external "@ant-design/icons/ArrowRightOutlined"
var ArrowRightOutlined_ = __webpack_require__("uTU4");
var ArrowRightOutlined_default = /*#__PURE__*/__webpack_require__.n(ArrowRightOutlined_);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: external "react-reveal/Bounce"
var Bounce_ = __webpack_require__("K3Dl");

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__("xnum");
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// CONCATENATED MODULE: ./src/components/migwebsite/head.js




const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "";

const Head = props => /*#__PURE__*/Object(jsx_runtime_["jsxs"])(head_default.a, {
  children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
    charSet: "UTF-8"
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("title", {
    children: props.title || ""
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
    name: "description",
    content: props.description || defaultDescription
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
    property: "og:url",
    content: props.url || defaultOGURL
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
    property: "og:title",
    content: props.title || ""
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
    property: "og:description",
    content: props.description || defaultDescription
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
    name: "twitter:site",
    content: props.url || defaultOGURL
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
    name: "twitter:card",
    content: "summary_large_image"
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
    name: "twitter:image",
    content: props.ogImage || defaultOGImage
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
    property: "og:image",
    content: props.ogImage || defaultOGImage
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
    property: "og:image:width",
    content: "1200"
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
    property: "og:image:height",
    content: "630"
  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("link", {
    href: "http://fonts.cdnfonts.com/css/gilroy-bold",
    rel: "stylesheet"
  })]
});

/* harmony default export */ var head = (Head);
// EXTERNAL MODULE: external "styled-jsx/style"
var style_ = __webpack_require__("HJQg");
var style_default = /*#__PURE__*/__webpack_require__.n(style_);

// CONCATENATED MODULE: ./src/components/migwebsite/styles.js


// File components/style.js
 // font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
//             Helvetica, sans-serif;

const Styles = props => /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
  className: "jsx-4074223056",
  children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(style_default.a, {
    id: "4074223056",
    children: [".shadow{box-shadow:0 5px 20px rgba(0,0,0,.15);}", ".animateBounce:hover{-webkit-animation:bounce 1s infinite;animation:bounce 1s infinite;}", "@-webkit-keyframes bounce{0%,100%{-webkit-transform:translateY(-15%);-ms-transform:translateY(-15%);transform:translateY(-15%);-webkit-animation-timing-function:cubic-bezier(0.8,0,1,1);animation-timing-function:cubic-bezier(0.8,0,1,1);}50%{-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);-webkit-animation-timing-function:cubic-bezier(0,0,0.2,1);animation-timing-function:cubic-bezier(0,0,0.2,1);}}", "@keyframes bounce{0%,100%{-webkit-transform:translateY(-15%);-ms-transform:translateY(-15%);transform:translateY(-15%);-webkit-animation-timing-function:cubic-bezier(0.8,0,1,1);animation-timing-function:cubic-bezier(0.8,0,1,1);}50%{-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);-webkit-animation-timing-function:cubic-bezier(0,0,0.2,1);animation-timing-function:cubic-bezier(0,0,0.2,1);}}", ".slick-current .parent .child{border-bottom:2px solid green;color:green !important;}", ".menu-underlined:hover{border-bottom:2px solid #10B981;color:green !important;}", ".jot-underlined:focus{font-family:'Gilroy-Bold',sans-serif;display:inline-block;border-bottom:2px solid #10B981;}", ".flex-important{display:-webkit-box !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;}", ".section2careers{position:-webkit-sticky;position:-webkit-sticky;position:sticky;top:80px;}", ".section3careers .flickity-page-dots .dot{background:#93D9B5;}", ".section4careersflickity .flickity-viewport{height:320px;}", "@media (max-width:768px){.section4careersflickity .flickity-viewport{height:490px !important;}}", ".section5careers .flickity-page-dots .dot{background:white;}", ".section4advantages .flickity-page-dots{display:none;}", "@media (max-width:768px){.section4advantages .flickity-page-dots{display:block;bottom:-25px;}.section4advantages .flickity-page-dots .dot{background:#93D9B5;}}", ".left-column-section7careers{max-width:50%;}", "@media (max-width:768px){.left-column-section7careers{max-width:100%;}}", ".coverage-list{height:auto;-webkit-column-count:3;-moz-column-count:3;-webkit-column-count:3;column-count:3;}", "@media (max-width:768px){.coverage-list{height:auto;-webkit-column-count:2;-moz-column-count:2;-webkit-column-count:2;column-count:2;}}", ".button-hover:hover{background:#1cad5d!important;}", ".item-hardware{background:#E8E6EE;-webkit-flex:0 1 calc(33.3333333333334% - 18vw);-ms-flex:0 1 calc(33.3333333333334% - 18vw);flex:0 1 calc(33.3333333333334% - 18vw);margin:0 9vw 9vw 9vw;width:12vw;height:11vw;}", "@media (max-width:768px){.item-hardware{-webkit-flex:0 1 calc(50% - 4vw);-ms-flex:0 1 calc(50% - 4vw);flex:0 1 calc(50% - 4vw);margin:0 2vw 2vw 2vw;width:10vw;height:30vw;}}", ".section5landingpage{height:170px;background:white;}", ".section4landingpage .flickity-page-dots{display:none;}", ".section4landingpage .flickity-prev-next-button{background:#188E4D;border-radius:0%;display:block;margin:0 30px;}", ".section4landingpage .flickity-button{color:white;}", "@media (max-width:768px){.section4landingpage .flickity-page-dots{display:block;bottom:-20px;}.section4landingpage .flickity-page-dots .dot{background:#93D9B5;}.section4landingpage .flickity-prev-next-button{display:none;}}", "p{margin:0rem;}", ".header{padding:0 3rem;z-index:50;height:80px !important;}", "@media (max-width:1280px){.header{padding:0 3rem;}}", "@media (max-width:1024px){.header{padding:0 3rem;}}", "@media (max-width:768px){.header{padding:0 1rem;}}", ".center{margin:auto;width:90%;padding:10px;}", ".menu2{z-index:30;position:fixed;background:white;border:1px;width:inherit;place-items:flex-start;height:0;-webkit-transition:height 1s;transition:height 1s;overflow:hidden;}", ".menuToggle:checked~section .menu2{height:95%;}", ".menu-navbar:hover{color:green !important;}", "body{margin:0;font-family:'Gilroy-Regular',sans-serif;}", ".gilroy-bold{font-family:'Gilroy-Bold',sans-serif;}", ".gilroy-heavy{font-family:'Gilroy-Heavy',sans-serif;}", ".gilroy-light{font-family:'Gilroy-Light',sans-serif;}", ".gilroy-medium{font-family:'Gilroy-Medium',sans-serif;}", ".gilroy-regular{font-family:'Gilroy-Regular',sans-serif;}", ".hero{width:100%;color:#333;}", ".title{margin:0;width:100%;padding-top:80px;line-height:1.15;font-size:48px;text-align:center;}", ".row{max-width:880px;margin:80px auto 40px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:space-around;-webkit-justify-content:space-around;-ms-flex-pack:space-around;justify-content:space-around;}", ".back{padding:18px 18px 24px;width:100px;display:block;margin:0 auto;text-align:center;-webkit-text-decoration:none;text-decoration:none;color:#434343;}", ".card{padding:18px 18px 24px;width:220px;text-align:center;-webkit-text-decoration:none;text-decoration:none;color:#434343;border:1px solid #9b9b9b;}", ".card h3{margin:0;color:#067df7;font-size:18px;}", "#components-layout-demo-fixed .logo{float:left;width:120px;height:31px;margin:16px 24px 16px 0;background:rgba(255,255,255,0.2);}", ".site-layout .site-layout-background{background:#fff;}", ".footer-custom{padding:24px 20px;}"]
  })
});

/* harmony default export */ var styles = (Styles);
// CONCATENATED MODULE: ./src/components/migwebsite/layout.js
















function layout({
  children
}) {
  const {
    Header,
    Content,
    Footer
  } = layout_default.a;

  const menu = /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
    className: "bg-white w-96 h-auto p-2 top-6 relative",
    style: {
      boxShadow: "0px 0px 3px rgba(50, 50, 50, 0.75)"
    },
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
      href: "/hardware",
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        className: "group flex py-2 cursor-pointer hover:bg-gray-100",
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
          className: "px-4 my-auto w-1/6",
          children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("svg", {
            className: "relative -top-5 fill-current text-black group-hover:text-green-500",
            width: "30",
            height: "30",
            viewBox: "0 0 72 72",
            xmlns: "http://www.w3.org/2000/svg",
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("path", {
              opacity: "0.2",
              d: "M9 42.75V18C9 16.8065 9.47411 15.6619 10.318 14.818C11.1619 13.9741 12.3065 13.5 13.5 13.5H58.5C59.6935 13.5 60.8381 13.9741 61.682 14.818C62.5259 15.6619 63 16.8065 63 18V42.75H9Z"
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("path", {
              d: "M58.5 11.25H13.5C11.7121 11.2574 9.99948 11.9709 8.73521 13.2352C7.47094 14.4995 6.7574 16.2121 6.75 18V49.5C6.7574 51.2879 7.47094 53.0005 8.73521 54.2648C9.99948 55.5291 11.7121 56.2426 13.5 56.25H33.75V60.75H27C26.4033 60.75 25.831 60.9871 25.409 61.409C24.9871 61.831 24.75 62.4033 24.75 63C24.75 63.5967 24.9871 64.169 25.409 64.591C25.831 65.0129 26.4033 65.25 27 65.25H45C45.5967 65.25 46.169 65.0129 46.591 64.591C47.0129 64.169 47.25 63.5967 47.25 63C47.25 62.4033 47.0129 61.831 46.591 61.409C46.169 60.9871 45.5967 60.75 45 60.75H38.25V56.25H58.5C60.2879 56.2426 62.0005 55.5291 63.2648 54.2648C64.5291 53.0005 65.2426 51.2879 65.25 49.5V18C65.2426 16.2121 64.5291 14.4995 63.2648 13.2352C62.0005 11.9709 60.2879 11.2574 58.5 11.25ZM13.5 15.75H58.5C59.0967 15.75 59.669 15.9871 60.091 16.409C60.5129 16.831 60.75 17.4033 60.75 18V40.5H11.25V18C11.25 17.4033 11.4871 16.831 11.909 16.409C12.331 15.9871 12.9033 15.75 13.5 15.75ZM58.5 51.75H13.5C12.9033 51.75 12.331 51.5129 11.909 51.091C11.4871 50.669 11.25 50.0967 11.25 49.5V45H60.75V49.5C60.75 50.0967 60.5129 50.669 60.091 51.091C59.669 51.5129 59.0967 51.75 58.5 51.75Z"
            })]
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
          className: "w-5/6",
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
            className: "text-lg gilroy-medium group-hover:text-green-500",
            children: "Hardware"
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
            className: "text-sm gilroy-regular group-hover:text-green-500",
            children: "Optimize your cost by leasing and maintenances IT hardwares"
          })]
        })]
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
      href: "/software",
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        className: "group flex py-2 cursor-pointer hover:bg-gray-100",
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
          className: "px-4 my-auto w-1/6",
          children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("svg", {
            className: "relative -top-5 fill-current text-black group-hover:text-green-500",
            width: "30",
            height: "30",
            viewBox: "0 0 72 72",
            xmlns: "http://www.w3.org/2000/svg",
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("path", {
              opacity: "0.2",
              d: "M63 15.75V56.25C63 56.8467 62.7629 57.419 62.341 57.841C61.919 58.2629 61.3467 58.5 60.75 58.5H11.25C10.6533 58.5 10.081 58.2629 9.65901 57.841C9.23705 57.419 9 56.8467 9 56.25V15.75C9 15.1533 9.23705 14.581 9.65901 14.159C10.081 13.7371 10.6533 13.5 11.25 13.5H60.75C61.3467 13.5 61.919 13.7371 62.341 14.159C62.7629 14.581 63 15.1533 63 15.75Z"
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("path", {
              d: "M60.75 11.25H11.25C10.0565 11.25 8.91193 11.7241 8.06802 12.568C7.22411 13.4119 6.75 14.5565 6.75 15.75V56.25C6.75 57.4435 7.22411 58.5881 8.06802 59.432C8.91193 60.2759 10.0565 60.75 11.25 60.75H60.75C61.9435 60.75 63.0881 60.2759 63.932 59.432C64.7759 58.5881 65.25 57.4435 65.25 56.25V15.75C65.25 14.5565 64.7759 13.4119 63.932 12.568C63.0881 11.7241 61.9435 11.25 60.75 11.25ZM60.75 56.25H11.25V15.75H60.75V56.25ZM22.5 23.625C22.5 24.2925 22.3021 24.945 21.9312 25.5C21.5604 26.0551 21.0333 26.4876 20.4166 26.7431C19.7999 26.9985 19.1213 27.0654 18.4666 26.9352C17.8119 26.8049 17.2105 26.4835 16.7385 26.0115C16.2665 25.5395 15.9451 24.9381 15.8148 24.2834C15.6846 23.6287 15.7515 22.9501 16.0069 22.3334C16.2624 21.7167 16.6949 21.1896 17.25 20.8188C17.805 20.4479 18.4575 20.25 19.125 20.25C20.0201 20.25 20.8786 20.6056 21.5115 21.2385C22.1444 21.8714 22.5 22.7299 22.5 23.625ZM33.75 23.625C33.75 24.2925 33.5521 24.945 33.1812 25.5C32.8104 26.0551 32.2833 26.4876 31.6666 26.7431C31.0499 26.9985 30.3713 27.0654 29.7166 26.9352C29.0619 26.8049 28.4605 26.4835 27.9885 26.0115C27.5165 25.5395 27.1951 24.9381 27.0648 24.2834C26.9346 23.6287 27.0015 22.9501 27.2569 22.3334C27.5124 21.7167 27.9449 21.1896 28.5 20.8188C29.055 20.4479 29.7075 20.25 30.375 20.25C31.2701 20.25 32.1286 20.6056 32.7615 21.2385C33.3944 21.8714 33.75 22.7299 33.75 23.625Z"
            })]
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
          className: "w-5/6",
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
            className: "text-lg gilroy-medium group-hover:text-green-500",
            children: "Software"
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
            className: "text-sm gilroy-regular group-hover:text-green-500",
            children: "Simplify and automate the process through digitalization"
          })]
        })]
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
      href: "/talents",
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        className: "group flex py-2 cursor-pointer hover:bg-gray-100",
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
          className: "px-4 my-auto w-1/6",
          children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("svg", {
            className: "relative -top-5 fill-current text-black group-hover:text-green-500",
            width: "30",
            height: "30",
            viewBox: "0 0 72 72",
            xmlns: "http://www.w3.org/2000/svg",
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("path", {
              opacity: "0.2",
              d: "M31.5 47.25C31.5 49.03 30.9722 50.7701 29.9832 52.2501C28.9943 53.7302 27.5887 54.8837 25.9442 55.5649C24.2996 56.2461 22.49 56.4243 20.7442 56.0771C18.9984 55.7298 17.3947 54.8726 16.136 53.614C14.8774 52.3553 14.0202 50.7516 13.6729 49.0058C13.3257 47.26 13.5039 45.4504 14.1851 43.8059C14.8663 42.1613 16.0198 40.7557 17.4999 39.7668C18.9799 38.7778 20.72 38.25 22.5 38.25C24.887 38.25 27.1761 39.1982 28.864 40.886C30.5518 42.5739 31.5 44.8631 31.5 47.25ZM22.5 9C20.72 9 18.9799 9.52784 17.4999 10.5168C16.0198 11.5057 14.8663 12.9113 14.1851 14.5559C13.5039 16.2004 13.3257 18.01 13.6729 19.7558C14.0202 21.5016 14.8774 23.1053 16.136 24.364C17.3947 25.6226 18.9984 26.4798 20.7442 26.8271C22.49 27.1743 24.2996 26.9961 25.9442 26.3149C27.5887 25.6337 28.9943 24.4802 29.9832 23.0001C30.9722 21.5201 31.5 19.78 31.5 18C31.5 15.6131 30.5518 13.3239 28.864 11.636C27.1761 9.94821 24.887 9 22.5 9ZM49.5 38.25C47.72 38.25 45.9799 38.7778 44.4999 39.7668C43.0198 40.7557 41.8663 42.1613 41.1851 43.8059C40.5039 45.4504 40.3257 47.26 40.6729 49.0058C41.0202 50.7516 41.8774 52.3553 43.136 53.614C44.3947 54.8726 45.9984 55.7298 47.7442 56.0771C49.49 56.4243 51.2996 56.2461 52.9442 55.5649C54.5887 54.8837 55.9943 53.7302 56.9832 52.2501C57.9722 50.7701 58.5 49.03 58.5 47.25C58.5 44.8631 57.5518 42.5739 55.864 40.886C54.1761 39.1982 51.887 38.25 49.5 38.25ZM49.5 27C51.28 27 53.0201 26.4722 54.5001 25.4832C55.9802 24.4943 57.1337 23.0887 57.8149 21.4442C58.4961 19.7996 58.6743 17.99 58.3271 16.2442C57.9798 14.4984 57.1226 12.8947 55.864 11.636C54.6053 10.3774 53.0016 9.5202 51.2558 9.17294C49.51 8.82567 47.7004 9.0039 46.0559 9.68509C44.4113 10.3663 43.0057 11.5198 42.0168 12.9999C41.0278 14.4799 40.5 16.22 40.5 18C40.5 20.387 41.4482 22.6761 43.136 24.364C44.8239 26.0518 47.1131 27 49.5 27Z"
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("path", {
              d: "M7.65001 35.55C8.03647 35.8478 8.51217 36.0063 9.00001 36C9.34931 36 9.69382 35.9186 10.0062 35.7624C10.3187 35.6062 10.5904 35.3794 10.8 35.1C12.1606 33.2873 13.9239 31.8157 15.9508 30.8013C17.9776 29.7868 20.2124 29.2574 22.4789 29.2546C24.7454 29.2519 26.9816 29.776 29.0108 30.7855C31.0401 31.7951 32.8069 33.2625 34.1719 35.0718L34.3406 35.2687H34.3688C34.3969 35.325 34.4531 35.3531 34.5094 35.4093H34.5656L34.65 35.4937H34.6781C34.7557 35.5595 34.8407 35.6162 34.9313 35.6625L35.0156 35.7187L35.2688 35.8312H35.3531L35.5781 35.8875H36.5063L36.9844 35.7187H37.0406L37.1813 35.6343L37.2656 35.5781L37.35 35.5219C37.3575 35.5218 37.3646 35.5189 37.3699 35.5136C37.3752 35.5083 37.3781 35.5012 37.3781 35.4937L37.4625 35.4375L37.6031 35.2968H37.6313L37.8 35.1281C39.1623 33.3117 40.9287 31.8375 42.9595 30.8221C44.9903 29.8067 47.2295 29.2781 49.5 29.2781C51.7705 29.2781 54.0097 29.8067 56.0405 30.8221C58.0713 31.8375 59.8377 33.3117 61.2 35.1281C61.5625 35.5993 62.0949 35.9101 62.6834 35.9942C63.272 36.0783 63.8701 35.9289 64.35 35.5781C64.5864 35.4008 64.7855 35.1787 64.9361 34.9245C65.0866 34.6702 65.1856 34.3888 65.2274 34.0963C65.2692 33.8038 65.2529 33.5059 65.1796 33.2197C65.1063 32.9335 64.9773 32.6645 64.8 32.4281C62.8124 29.7449 60.155 27.6306 57.0938 26.2968C58.7669 24.7662 59.9383 22.7657 60.4546 20.5576C60.9708 18.3495 60.8078 16.0369 59.9867 13.9232C59.1657 11.8094 57.725 9.99306 55.8537 8.71237C53.9823 7.43168 51.7676 6.7464 49.5 6.7464C47.2324 6.7464 45.0177 7.43168 43.1463 8.71237C41.275 9.99306 39.8343 11.8094 39.0133 13.9232C38.1923 16.0369 38.0292 18.3495 38.5454 20.5576C39.0617 22.7657 40.2332 24.7662 41.9063 26.2968C39.7026 27.2551 37.699 28.6195 36 30.3187C34.301 28.6195 32.2974 27.2551 30.0938 26.2968C31.7669 24.7662 32.9383 22.7657 33.4546 20.5576C33.9708 18.3495 33.8078 16.0369 32.9867 13.9232C32.1657 11.8094 30.725 9.99306 28.8537 8.71237C26.9823 7.43168 24.7676 6.7464 22.5 6.7464C20.2324 6.7464 18.0177 7.43168 16.1463 8.71237C14.275 9.99306 12.8343 11.8094 12.0133 13.9232C11.1923 16.0369 11.0292 18.3495 11.5454 20.5576C12.0617 22.7657 13.2332 24.7662 14.9063 26.2968C11.8483 27.6228 9.19122 29.7271 7.20001 32.4C7.02272 32.6364 6.89373 32.9053 6.8204 33.1916C6.74707 33.4778 6.73084 33.7757 6.77262 34.0682C6.81441 34.3607 6.9134 34.6421 7.06394 34.8963C7.21448 35.1506 7.41363 35.3727 7.65001 35.55ZM42.75 18C42.75 16.6649 43.1459 15.3599 43.8876 14.2499C44.6293 13.1398 45.6835 12.2747 46.9169 11.7638C48.1503 11.2529 49.5075 11.1192 50.8169 11.3797C52.1262 11.6401 53.329 12.283 54.273 13.227C55.217 14.171 55.8599 15.3737 56.1203 16.6831C56.3808 17.9925 56.2471 19.3497 55.7362 20.5831C55.2253 21.8165 54.3601 22.8707 53.2501 23.6124C52.1401 24.3541 50.835 24.75 49.5 24.75C47.7121 24.7426 45.9995 24.029 44.7352 22.7648C43.4709 21.5005 42.7574 19.7879 42.75 18ZM15.75 18C15.75 16.6649 16.1459 15.3599 16.8876 14.2499C17.6293 13.1398 18.6835 12.2747 19.9169 11.7638C21.1503 11.2529 22.5075 11.1192 23.8169 11.3797C25.1262 11.6401 26.329 12.283 27.273 13.227C28.217 14.171 28.8599 15.3737 29.1203 16.6831C29.3808 17.9925 29.2471 19.3497 28.7362 20.5831C28.2253 21.8165 27.3601 22.8707 26.2501 23.6124C25.1401 24.3541 23.835 24.75 22.5 24.75C20.7121 24.7426 18.9995 24.029 17.7352 22.7648C16.4709 21.5005 15.7574 19.7879 15.75 18ZM57.0938 55.5468C58.7669 54.0162 59.9383 52.0157 60.4546 49.8076C60.9708 47.5995 60.8078 45.2869 59.9867 43.1732C59.1657 41.0594 57.725 39.2431 55.8537 37.9624C53.9823 36.6817 51.7676 35.9964 49.5 35.9964C47.2324 35.9964 45.0177 36.6817 43.1463 37.9624C41.275 39.2431 39.8343 41.0594 39.0133 43.1732C38.1923 45.2869 38.0292 47.5995 38.5454 49.8076C39.0617 52.0157 40.2332 54.0162 41.9063 55.5468C39.7026 56.5051 37.699 57.8695 36 59.5687C34.301 57.8695 32.2974 56.5051 30.0938 55.5468C31.7669 54.0162 32.9383 52.0157 33.4546 49.8076C33.9708 47.5995 33.8078 45.2869 32.9867 43.1732C32.1657 41.0594 30.725 39.2431 28.8537 37.9624C26.9823 36.6817 24.7676 35.9964 22.5 35.9964C20.2324 35.9964 18.0177 36.6817 16.1463 37.9624C14.275 39.2431 12.8343 41.0594 12.0133 43.1732C11.1923 45.2869 11.0292 47.5995 11.5454 49.8076C12.0617 52.0157 13.2332 54.0162 14.9063 55.5468C11.8483 56.8728 9.19122 58.9771 7.20001 61.65C6.84197 62.1274 6.68823 62.7274 6.77262 63.3182C6.85701 63.9089 7.17262 64.4419 7.65001 64.8C8.03647 65.0978 8.51217 65.2563 9.00001 65.25C9.34931 65.25 9.69382 65.1686 10.0062 65.0124C10.3187 64.8562 10.5904 64.6294 10.8 64.35C12.1606 62.5373 13.9239 61.0657 15.9508 60.0513C17.9776 59.0368 20.2124 58.5073 22.4789 58.5046C24.7454 58.5019 26.9816 59.026 29.0108 60.0355C31.0401 61.0451 32.8069 62.5125 34.1719 64.3218L34.3406 64.5187H34.3688L34.5094 64.6593H34.5656L34.65 64.7437H34.6781L34.9313 64.9125L35.0156 64.9687L35.2688 65.0812H35.3531L35.5781 65.1375H36.5344L36.7313 65.0531H36.7594L36.9844 64.9687H37.0406L37.1813 64.8843L37.2656 64.8281L37.35 64.7719H37.3781L37.4625 64.7156L37.6031 64.575H37.6313L37.8 64.4062C39.1623 62.5899 40.9287 61.1156 42.9595 60.1002C44.9903 59.0848 47.2295 58.5562 49.5 58.5562C51.7705 58.5562 54.0097 59.0848 56.0405 60.1002C58.0713 61.1156 59.8377 62.5899 61.2 64.4062C61.5625 64.8774 62.0949 65.1882 62.6834 65.2723C63.272 65.3564 63.8701 65.2071 64.35 64.8562C64.5864 64.6789 64.7855 64.4568 64.9361 64.2026C65.0866 63.9483 65.1856 63.6669 65.2274 63.3744C65.2692 63.0819 65.2529 62.784 65.1796 62.4978C65.1063 62.2116 64.9773 61.9426 64.8 61.7062C62.816 59.0127 60.1583 56.8884 57.0938 55.5468ZM15.75 47.25C15.75 45.915 16.1459 44.6099 16.8876 43.4999C17.6293 42.3898 18.6835 41.5247 19.9169 41.0138C21.1503 40.5029 22.5075 40.3692 23.8169 40.6297C25.1262 40.8901 26.329 41.533 27.273 42.477C28.217 43.421 28.8599 44.6237 29.1203 45.9331C29.3808 47.2425 29.2471 48.5997 28.7362 49.8331C28.2253 51.0665 27.3601 52.1207 26.2501 52.8624C25.1401 53.6041 23.835 54 22.5 54C20.7121 53.9926 18.9995 53.279 17.7352 52.0148C16.4709 50.7505 15.7574 49.0379 15.75 47.25ZM42.75 47.25C42.75 45.915 43.1459 44.6099 43.8876 43.4999C44.6293 42.3898 45.6835 41.5247 46.9169 41.0138C48.1503 40.5029 49.5075 40.3692 50.8169 40.6297C52.1262 40.8901 53.329 41.533 54.273 42.477C55.217 43.421 55.8599 44.6237 56.1203 45.9331C56.3808 47.2425 56.2471 48.5997 55.7362 49.8331C55.2253 51.0665 54.3601 52.1207 53.2501 52.8624C52.1401 53.6041 50.835 54 49.5 54C47.7121 53.9926 45.9995 53.279 44.7352 52.0148C43.4709 50.7505 42.7574 49.0379 42.75 47.25Z"
            })]
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
          className: "w-5/6",
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
            className: "text-lg gilroy-medium group-hover:text-green-500",
            children: "Talents"
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
            className: "text-sm gilroy-regular group-hover:text-green-500",
            children: "Reduce complexity in talent sourcing and management"
          })]
        })]
      })
    })]
  });

  const {
    0: kelas,
    1: setKelas
  } = Object(external_react_["useState"])("notShadow");

  const handleScroll = () => {
    setKelas("notShadow");
  };

  Object(external_react_["useEffect"])(() => {
    window.onscroll = () => {
      handleScroll();
    };
  }, []);
  const {
    0: navbar,
    1: setNavbar
  } = Object(external_react_["useState"])(true); //true for hidden

  const {
    0: navbarBottom,
    1: setNavbarBottom
  } = Object(external_react_["useState"])(true); //true for hidden

  const handleNavbar = () => {
    setNavbar(!navbar);
    setNavbarSolution(true); //true for hidden

    setNavbarCompany(true); //true for hidden
  };

  const handleNavbarBottom = () => {
    if (navbarBottom == true) {
      setTimeout(() => {
        setNavbarBottom(!navbarBottom);
      }, 600);
    } else {
      setNavbarBottom(!navbarBottom);
    }
  };

  const {
    SubMenu
  } = menu_default.a;
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(head, {
      title: "Home"
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(styles, {}), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(layout_default.a, {
      className: "h-auto",
      children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(Header, {
        className: `${kelas} header`,
        style: {
          background: "white",
          position: "fixed",
          zIndex: 31,
          width: "100%"
        },
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
          href: "/",
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
            className: "logo top-4 md:top-4 absolute w-24 md:w-32 cursor-pointer",
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
              width: "auto",
              height: "auto",
              src: "/mig.png"
            })
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
          onClick: () => {
            handleNavbarBottom();
          },
          htmlFor: `menutoggle`,
          className: "md:hidden block float-right cursor-pointer mt-7",
          hidden: !navbar,
          children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("svg", {
            className: "fill-current text-gray-900",
            xmlns: "http://www.w3.org/2000/svg",
            width: 20,
            height: 20,
            viewBox: "0 0 20 20",
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("title", {
              children: "Menu"
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("path", {
              d: "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
            })]
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
          onClick: () => {
            handleNavbar(), handleNavbarBottom();
          },
          htmlFor: `menutoggle`,
          className: "md:hidden block float-right cursor-pointer mt-7",
          hidden: navbar,
          children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("svg", {
            className: "fill-current text-gray-900",
            xmlns: "http://www.w3.org/2000/svg",
            width: 20,
            height: 20,
            viewBox: "0 0 32 32",
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("title", {
              children: "Menu"
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("path", {
              d: "M17.768 16l13.866-13.866c0.488-0.488 0.488-1.28 0-1.768s-1.28-0.488-1.768 0l-13.866 13.866-13.866-13.866c-0.488-0.488-1.28-0.488-1.768 0s-0.488 1.28 0 1.768l13.866 13.866-13.866 13.866c-0.488 0.488-0.488 1.28 0 1.768 0.244 0.244 0.564 0.366 0.884 0.366s0.64-0.122 0.884-0.366l13.866-13.866 13.866 13.866c0.244 0.244 0.564 0.366 0.884 0.366s0.64-0.122 0.884-0.366c0.488-0.488 0.488-1.28 0-1.768l-13.866-13.866z"
            })]
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
          theme: "light",
          mode: "horizontal",
          style: {
            lineHeight: "3.9rem"
          },
          className: "hidden md:block float-right menu pt-2",
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(dropdown_default.a, {
            overlay: menu,
            placement: "bottomCenter",
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(button_default.a, {
              type: "text",
              style: {
                background: "white"
              },
              className: "ant-dropdown-link text-lg text-black hover:text-black",
              onClick: e => e.preventDefault(),
              children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("p", {
                className: "text-lg gilroy-medium menu-underlined",
                children: ["Solutions", " ", /*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["CaretDownOutlined"], {
                  style: {
                    display: "inline-block",
                    verticalAlign: "middle"
                  }
                })]
              })
            })
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
            href: "/aboutus",
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
              className: "text-lg gilroy-medium menu-underlined mx-4",
              children: "About Us"
            })
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
            href: "/joinourteam",
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
              className: "text-lg gilroy-medium menu-underlined mx-4",
              children: "Join Our Team"
            })
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
            href: "/contactus",
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
              className: "text-lg gilroy-medium menu-underlined mx-4",
              children: "Contact Us"
            })
          })]
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
        className: `hidden menuToggle`,
        type: "checkbox",
        id: `menutoggle`
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("section", {
        className: "md:hidden w-full h-auto pt-16",
        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
          theme: "light",
          style: {
            lineHeight: "3.9rem"
          },
          className: "float-right menu2",
          children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(menu_default.a, {
            mode: "inline",
            className: "w-auto",
            children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(SubMenu, {
              title: "Solutions",
              className: "text-lg gilroy-medium",
              children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(menu_default.a.Item, {
                children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
                  className: "relative",
                  style: {
                    display: "inline-block"
                  },
                  width: 40,
                  src: "/image/navbar/hardware_black.png"
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                  href: "/hardware",
                  children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                    className: "text-lg gilroy-medium pl-3",
                    children: "Hardware"
                  })
                })]
              }, "1"), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(menu_default.a.Item, {
                children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
                  className: "relative",
                  style: {
                    display: "inline-block"
                  },
                  width: 40,
                  src: "/image/navbar/software_black.png"
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                  href: "/software",
                  children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                    className: "text-lg gilroy-medium pl-3",
                    children: "Software"
                  })
                })]
              }, "2"), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(menu_default.a.Item, {
                children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
                  className: "relative",
                  style: {
                    display: "inline-block"
                  },
                  width: 40,
                  src: "/image/navbar/talents_black.png"
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                  href: "/talents",
                  children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                    className: "text-lg gilroy-medium pl-3",
                    children: "Talents"
                  })
                })]
              }, "3")]
            }, "sub 1"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu_default.a.Item, {
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/aboutus",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  className: "text-lg gilroy-medium",
                  children: "About Us"
                })
              })
            }, "4"), /*#__PURE__*/Object(jsx_runtime_["jsx"])(menu_default.a.Item, {
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: "/joinourteam",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                  className: "text-lg gilroy-medium",
                  children: "Join Our Team"
                })
              })
            }, "5")]
          }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
            className: "text-lg gilroy-medium",
            className: "mx-6",
            style: {
              position: "absolute",
              bottom: 10,
              zIndex: 1,
              transition: "all 0.2s"
            },
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
              href: "/contactus",
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
                className: "text-lg gilroy-medium menu-navbar",
                children: "Contact Us "
              })
            }), "\xA0\xA0", /*#__PURE__*/Object(jsx_runtime_["jsx"])(ArrowRightOutlined_default.a, {
              style: {
                fontSize: "20px",
                display: "inline-block",
                verticalAlign: "middle"
              }
            }), "\xA0\xA0", /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
              className: "menu-navbar",
              href: "https://www.linkedin.com/company/pt-mitramas-infosys-global",
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["LinkedinFilled"], {
                style: {
                  fontSize: "20px",
                  display: "inline-block",
                  verticalAlign: "middle"
                }
              })
            }), "\xA0\xA0", /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
              className: "menu-navbar",
              href: "https://instagram.com/mitramasglobal?utm_medium=copy_link",
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(icons_["InstagramFilled"], {
                style: {
                  fontSize: "20px",
                  display: "inline-block",
                  verticalAlign: "middle"
                }
              })
            })]
          })]
        })
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Content, {
        className: "site-layout",
        style: {
          padding: "0px"
        },
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
          className: "site-layout-background",
          style: {
            padding: 0,
            minHeight: 380
          },
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
              className: " bg-white h-full",
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
                className: "px-0 relative",
                id: "wrapper",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("main", {
                  className: " md:pt-20",
                  style: {
                    height: `auto`
                  },
                  children: children
                })
              })
            })
          })
        })
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        className: "px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20",
        style: {
          textAlign: "left",
          backgroundColor: "#EEF1EE"
        },
        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
          className: "container mx-auto",
          children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
            className: "py-8 flex flex-col lg:flex-row lg:justify-between",
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
              href: "/",
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
                className: "pb-4 cursor-pointer",
                style: {
                  minWidth: "150px",
                  width: "150px"
                },
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
                  src: "/mig.png"
                })
              })
            }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
              className: "hidden md:flex flex-row px-0 justify-between",
              children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                className: "flex-col pr-2 my-2 lg:my-0 lg:px-16",
                children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                  className: "gilroy-bold py-1 text-lg",
                  children: "Solutions"
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                  href: {
                    pathname: "/hardware"
                  },
                  children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                    className: "gilroy-regular cursor-pointer menu-underlined py-1 w-min",
                    children: "Hardware"
                  })
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                  href: {
                    pathname: "/software"
                  },
                  children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                    className: "gilroy-regular cursor-pointer menu-underlined py-1 w-min",
                    children: "Software"
                  })
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                  href: {
                    pathname: "/talents"
                  },
                  children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                    className: "gilroy-regular cursor-pointer menu-underlined py-1 w-min",
                    children: "Talents"
                  })
                })]
              }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                className: "flex-col pr-2 my-2 lg:my-0 lg:px-16",
                children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                  className: "gilroy-bold py-1 text-lg",
                  children: "Company"
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                  href: {
                    pathname: "/aboutus"
                  },
                  children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                    className: "gilroy-regular cursor-pointer menu-underlined py-1 w-min",
                    children: "About\xA0Us"
                  })
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                  href: {
                    pathname: "/joinourteam"
                  },
                  children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                    className: "gilroy-regular cursor-pointer menu-underlined py-1 w-min",
                    children: "Join\xA0Our\xA0Team"
                  })
                })]
              }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                className: "flex-col pr-2 my-2 lg:my-0 lg:px-16",
                children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                  className: "gilroy-bold py-1 text-lg",
                  children: "Get in touch"
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                  href: "/contactus",
                  children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                    className: "gilroy-regular cursor-pointer menu-underlined py-1 w-min",
                    children: "Contact\xA0Us"
                  })
                })]
              }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                className: "flex-col my-2 lg:my-0 lg:px-16",
                children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                  className: "gilroy-bold py-1 text-lg",
                  children: "Follow"
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                  href: "https://instagram.com/mitramasglobal?utm_medium=copy_link",
                  children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                    className: "flex",
                    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
                      className: "w-5 h-5 relative top-1 mr-2",
                      src: "/image/footer/instagram.png"
                    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                      className: "gilroy-regular cursor-pointer menu-underlined py-1",
                      children: "Instagram"
                    })]
                  })
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                  href: "https://www.linkedin.com/company/pt-mitramas-infosys-global",
                  children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                    className: "flex",
                    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
                      className: "w-5 h-5 relative top-1 mr-2",
                      src: "/image/footer/linkedin.png"
                    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                      className: "gilroy-regular cursor-pointer menu-underlined py-1",
                      children: "LinkedIn"
                    })]
                  })
                })]
              })]
            }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
              className: "block md:hidden",
              children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                className: "flex",
                children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                  className: "w-1/2 pr-2 my-2 lg:my-0 lg:px-16",
                  children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                    className: "gilroy-bold py-1 text-lg",
                    children: "Solutions"
                  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                    href: {
                      pathname: "/hardware"
                    },
                    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                      className: "gilroy-regular cursor-pointer menu-underlined py-1 w-min",
                      children: "Hardware"
                    })
                  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                    href: {
                      pathname: "/software"
                    },
                    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                      className: "gilroy-regular cursor-pointer menu-underlined py-1 w-min",
                      children: "Software"
                    })
                  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                    href: {
                      pathname: "/talents"
                    },
                    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                      className: "gilroy-regular cursor-pointer menu-underlined py-1 w-min",
                      children: "Talents"
                    })
                  })]
                }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                  className: "w-1/2 pr-2 my-2 lg:my-0 lg:px-16",
                  children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                    className: "gilroy-bold py-1 text-lg",
                    children: "Company"
                  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                    href: {
                      pathname: "/aboutus"
                    },
                    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                      className: "gilroy-regular cursor-pointer menu-underlined py-1 w-min",
                      children: "About\xA0Us"
                    })
                  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                    href: {
                      pathname: "/joinourteam"
                    },
                    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                      className: "gilroy-regular cursor-pointer menu-underlined py-1 w-min",
                      children: "Join\xA0Our\xA0Team"
                    })
                  })]
                })]
              }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                className: "flex",
                children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                  className: "w-1/2 pr-2 my-2 lg:my-0 lg:px-16",
                  children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                    className: "gilroy-bold py-1 text-lg",
                    children: "Get in touch"
                  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                    href: "/contactus",
                    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                      className: "gilroy-regular cursor-pointer menu-underlined py-1 w-min",
                      children: "Contact\xA0Us"
                    })
                  })]
                }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                  className: "w-1/2 my-2 lg:my-0 lg:px-16",
                  children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                    className: "gilroy-bold py-1 text-lg",
                    children: "Follow"
                  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                    href: "https://instagram.com/mitramasglobal?utm_medium=copy_link",
                    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                      className: "flex",
                      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
                        className: "w-5 h-5 relative top-1 mr-2",
                        src: "/image/footer/instagram.png"
                      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                        className: "gilroy-regular cursor-pointer menu-underlined py-1",
                        children: "Instagram"
                      })]
                    })
                  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                    href: "https://www.linkedin.com/company/pt-mitramas-infosys-global",
                    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                      className: "flex",
                      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
                        className: "w-5 h-5 relative top-1 mr-2",
                        src: "/image/footer/linkedin.png"
                      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                        className: "gilroy-regular cursor-pointer menu-underlined py-1",
                        children: "LinkedIn"
                      })]
                    })
                  })]
                })]
              })]
            })]
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("hr", {
            className: "border",
            style: {
              background: "#000"
            }
          }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
            className: "flex flex-row pb-4 justify-between pt-2",
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
              className: " text-xs ",
              children: "Copyright \xA9 2021 Mitramas Infosys Global. All rights reserved"
            }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
              className: "flex flex-row ",
              children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: {
                  pathname: "/privacy"
                },
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                  className: "menu-underlined text-xs cursor-pointer ml-4 sm:ml-10 md:ml-20 lg:ml-32",
                  children: "Privacy"
                })
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: {
                  pathname: "/term"
                },
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                  className: "menu-underlined text-xs cursor-pointer ml-4 sm:ml-10 md:ml-20 lg:ml-32",
                  children: "Term"
                })
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
                href: {
                  pathname: "/sitemap"
                },
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                  className: "menu-underlined text-xs cursor-pointer ml-4 sm:ml-10 md:ml-20 lg:ml-32",
                  children: "Sitemap"
                })
              })]
            })]
          })]
        })
      })]
    })]
  });
}

/* harmony default export */ var migwebsite_layout = __webpack_exports__["a"] = (layout);

/***/ }),

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

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("V57t");


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

/***/ "HJQg":
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ }),

/***/ "HgHO":
/***/ (function(module, exports) {

module.exports = require("antd/lib/dropdown");

/***/ }),

/***/ "I/1N":
/***/ (function(module, exports) {

module.exports = require("react-scroll");

/***/ }),

/***/ "K3Dl":
/***/ (function(module, exports) {

module.exports = require("react-reveal/Bounce");

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

/***/ "QNhp":
/***/ (function(module, exports) {

module.exports = require("antd/lib/collapse");

/***/ }),

/***/ "UhrY":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ "V57t":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStaticProps", function() { return getStaticProps; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_collapse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("QNhp");
/* harmony import */ var antd_lib_collapse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_collapse__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ant_design_icons_ArrowRightOutlined__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("uTU4");
/* harmony import */ var _ant_design_icons_ArrowRightOutlined__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons_ArrowRightOutlined__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("xnum");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("I/1N");
/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_scroll__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_migwebsite_layout_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("/2qU");









function JoinOurTeam({
  dataCareers
}) {
  var _dataCareers$data;

  const careers = (_dataCareers$data = dataCareers.data) !== null && _dataCareers$data !== void 0 ? _dataCareers$data : [];
  const {
    Panel
  } = antd_lib_collapse__WEBPACK_IMPORTED_MODULE_1___default.a;
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(_components_migwebsite_layout_js__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, {
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("title", {
        children: "Join Our Team"
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("section", {
      className: "section1careers py-4 md:py-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20",
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
        className: "block md:flex",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
          className: "flex-col m-auto",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
            className: "",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
              className: "text-3xl md:text-4xl pb-6 text-center md:text-left gilroy-bold",
              children: "Careers at MIG"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
              className: "flex-col block md:hidden pb-6",
              children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
                style: {
                  width: "1000px",
                  height: "auto"
                },
                src: "/image/joinourteam/joinourteam_image.png"
              })
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
              className: "text-xl gilroy-medium pb-4",
              children: "We are currently looking to expand our team! Our team comprises of highly motivated, positive and hardworking individuals."
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
              className: "text-center md:text-left",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
                className: "text-xl gilroy-regular",
                children: "See open position!"
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
                className: "md:center w-20 m-auto md:mx-0",
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(react_scroll__WEBPACK_IMPORTED_MODULE_5__["Link"], {
                  className: "flex-col md:center",
                  activeClass: "active",
                  to: "section7careers",
                  smooth: true,
                  offset: -150,
                  duration: 500,
                  children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
                    className: "mt-5 animate-bounce",
                    src: "/image/landingpage/arrow-down.png",
                    style: {
                      width: 60
                    }
                  })
                })
              })]
            })]
          })
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
          className: "flex-col hidden md:flex ml-4",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
            style: {
              width: "1000px",
              height: "auto"
            },
            src: "/image/joinourteam/joinourteam_image.png"
          })
        })]
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("section", {
      className: "section2careers hidden md:block px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 z-50",
      style: {
        background: "#F4F4F4"
      },
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
        className: "block md:flex",
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
          className: "flex py-4",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(react_scroll__WEBPACK_IMPORTED_MODULE_5__["Link"], {
            activeClass: "active",
            to: "section3careers",
            spy: true,
            smooth: true,
            offset: -120,
            className: "mr-12",
            duration: 500,
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("button", {
              className: "gilroy-regular text-xl text-black cursor-pointer flex-col focus:outline-none jot-underlined",
              style: {},
              children: "Our Values"
            })
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(react_scroll__WEBPACK_IMPORTED_MODULE_5__["Link"], {
            activeClass: "active",
            to: "section6careers",
            spy: true,
            smooth: true,
            offset: -120,
            className: "mr-12",
            duration: 500,
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("button", {
              className: "gilroy-regular text-xl text-black cursor-pointer flex-col focus:outline-none jot-underlined",
              style: {},
              children: "Benefits"
            })
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(react_scroll__WEBPACK_IMPORTED_MODULE_5__["Link"], {
            activeClass: "active",
            to: "section7careers",
            spy: true,
            smooth: true,
            offset: -150,
            className: "mr-12",
            duration: 500,
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("button", {
              className: "gilroy-regular text-xl text-black cursor-pointer flex-col focus:outline-none jot-underlined",
              style: {},
              children: "Careers"
            })
          })]
        })
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("section", {
      className: "h-8 hidden md:block"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("section", {
      className: "section3careers py-10 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
        className: "relative",
        style: {
          top: "-140px"
        },
        id: "ourvalues"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
          className: "text-3xl md:text-4xl gilroy-bold text-center pb-8",
          children: "Our Values"
        })
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
        className: "md:flex justify-between",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
          className: "flex-col flex bg-white mr-0 md:mr-10 p-4 w-auto border-2 border-black-300 rounded-lg hover:shadow-lg mb-4",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
              className: "text-xl md:text-2xl gilroy-bold pr-10",
              children: "Agility"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("br", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
              className: "text-left pr-4 text-base md:text-xl",
              children: "We are adapting to fast-changing environments."
            })]
          })
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
          className: "flex-col flex bg-white mr-0 md:mr-10 p-4 w-auto border-2 border-black-300 rounded-lg hover:shadow-lg mb-4",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
              className: "text-xl md:text-2xl gilroy-bold pr-10",
              children: "Perseverance"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("br", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
              className: "text-left pr-4 text-base md:text-xl",
              children: "We aim high and constantly strive for excellence."
            })]
          })
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
          className: "flex-col flex bg-white mr-0 md:mr-10 p-4 w-auto border-2 border-black-300 rounded-lg hover:shadow-lg mb-4",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
              className: "text-xl md:text-2xl gilroy-bold pr-10",
              children: "Integrity"
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("br", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
              className: "text-left pr-4 text-base md:text-xl",
              children: "We are dedicated to adhering to positive ethical values."
            })]
          })
        })]
      })]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("section", {
      className: "section6careers py-10 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 h-auto",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
        className: "relative",
        style: {
          top: "-140px"
        },
        id: "benefits"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
        className: "justify-center",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
          className: "text-center gilroy-bold text-3xl md:text-4xl pb-8",
          children: "Benefits"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
          className: "pb-8 text-justify text-xl",
          children: "Mitramas is a people-centric business with a foundation to gives working opportunities for motivated individuals at all levels. Our long-term sustainable business which has been running for +15 years and operated across 45 cities have a strong commitment to offer pleasant experience for our team, communities, and clients."
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
          className: "block md:flex md:flex-row justify-center object-scale-down text-base",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
            className: "block md:flex md:flex-col justify-center md:w-1/2",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
              className: "pb-6 flex-row flex ",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
                className: "flex-row",
                src: "/image/joinourteam/benefit_1.png",
                style: {
                  height: 30
                }
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
                className: "flex-row my-auto pl-4",
                children: "We love to empower our team members to solve problems that matter"
              })]
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
              className: "pb-6 flex-row flex",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
                className: "flex-row",
                src: "/image/joinourteam/benefit_2.png",
                style: {
                  height: 30
                }
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
                className: "flex-row my-auto pl-4",
                children: "We offer diverse industry exposures and hands-on experience"
              })]
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
              className: "pb-6 flex-row flex",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
                className: "flex-row",
                src: "/image/joinourteam/benefit_3.png",
                style: {
                  height: 30
                }
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
                className: "flex-row my-auto pl-4",
                children: "We support personal growth through constant experiment and learning"
              })]
            })]
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
            className: "block md:flex md:flex-col justify-center md:w-1/2",
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
              className: "pb-6 flex-row flex",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
                className: "flex-row",
                src: "/image/joinourteam/benefit_4.png",
                style: {
                  height: 30
                }
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
                className: "flex-row my-auto pl-4",
                children: "We provide unique and competitive packages to launch your career"
              })]
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
              className: "pb-6 flex-row flex",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
                className: "flex-row",
                src: "/image/joinourteam/benefit_5.png",
                style: {
                  height: 30
                }
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
                className: "flex-row my-auto pl-4",
                children: "We value informal social bonding to offer a enjoyable working environment"
              })]
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
              className: "pb-6 flex-row flex",
              children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
                className: "flex-row",
                src: "/image/joinourteam/benefit_6.png",
                style: {
                  height: 30
                }
              }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
                className: "flex-row my-auto pl-4",
                children: "We create engaging environment and believe everyone has a voice at the table"
              })]
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("section", {
      className: "section7careers pb-10 md:pb-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 h-auto",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
        className: "relative",
        style: {
          top: "-150px"
        },
        id: "vacancies"
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
        className: "block md:flex justify-between",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
          className: "flex-row left-column-section7careers pr-0 md:pr-8",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
            className: "text-3xl gilroy-bold pb-8",
            children: "Careers at MIG"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
            className: "pb-8 text-xl",
            children: "Want to advance your career with us ? See our job openings below for our current financial services and government projects."
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
            className: "w-5/12 border-t-8 border-green-700 pb-8"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("p", {
            className: "pb-8 text-xl",
            children: ["Didn't find the role that best describes your skills ? Send your CV to", " ", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
              className: "gilroy-bold",
              children: "recruitment@mitrasolusi.group"
            }), " ", "for potential opportunities"]
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
          className: "flex-row w-full",
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd_lib_collapse__WEBPACK_IMPORTED_MODULE_1___default.a, {
            accordion: true,
            defaultActiveKey: ["0"],
            expandIconPosition: "right",
            children: careers.map((item, idx) => {
              return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Panel, {
                className: "text-base",
                header: item.position_name,
                children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
                  children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
                    className: "text-base pb-4",
                    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
                      className: "gilroy-bold text-base",
                      children: "Job Description:"
                    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("p", {
                      className: "text-base",
                      children: item.job_description
                    })]
                  }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("a", {
                    className: "text-base hover:text-green-500",
                    href: item.register_link,
                    children: ["Apply Now", /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons_ArrowRightOutlined__WEBPACK_IMPORTED_MODULE_2___default.a, {
                      className: "pl-2 relative -top-0.5"
                    })]
                  })]
                })
              }, idx);
            })
          })
        })]
      })]
    })]
  });
}

async function getStaticProps() {
  const resources = await fetch(`${"https://service-staging.mig.id"}/getCareers`, {
    method: `GET`
  });
  const resjson = await resources.json();
  const dataCareers = resjson;
  return {
    props: {
      dataCareers
    },
    revalidate: 60
  };
}
/* harmony default export */ __webpack_exports__["default"] = (JoinOurTeam);

/***/ }),

/***/ "VzA1":
/***/ (function(module, exports) {

module.exports = require("antd/lib/layout");

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

/***/ "a5Fm":
/***/ (function(module, exports) {

module.exports = require("antd/lib/menu");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

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

/***/ "uTU4":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons/ArrowRightOutlined");

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

/***/ "wkBG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.normalizePathSep=normalizePathSep;exports.denormalizePagePath=denormalizePagePath;function normalizePathSep(path){return path.replace(/\\/g,'/');}function denormalizePagePath(page){page=normalizePathSep(page);if(page.startsWith('/index/')){page=page.slice(6);}else if(page==='/index'){page='/';}return page;}
//# sourceMappingURL=denormalize-page-path.js.map

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

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

/***/ })

/******/ });