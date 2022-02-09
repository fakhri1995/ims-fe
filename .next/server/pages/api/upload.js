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
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ({

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("xiHj");


/***/ }),

/***/ "xiHj":
/***/ (function(module, exports) {

// import Formidable from "Formidable";
// const fs = require("fs");
// export const config = {
//   api: {
//     bodyParser: false
//   }
// };
// const uploadForm = next => (req, res) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const form = new Formidable.IncomingForm({
//         multiples: true,
//         keepExtensions: true
//       });
//       form.once("error", console.error);
//       form
//         .on("fileBegin", (name, file) => {
//           console.log("start uploading: ", file.name);
//         })
//         .on("aborted", () => console.log("Aborted..."));
//       form.once("end", () => {
//         console.log("Done!");
//       });
//       await form.parse(req, async (err, fields, files) => {
//         if (err) {
//           throw String(JSON.stringify(err, null, 2));
//         }
//         console.log(
//           "moving file: ",
//           files.file.path,
//           " to ",
//           `public/upload/${files.file}`
//         );
//         // await fs.rename(
//         //   files.file.path,
//         //   `public/upload/${files.file.name}`,
//         //   err => {
//         //     if (err) throw err;
//         //   }
//         // );
//         // fs.renameSync(files.file.path, `public/upload/${files.file.name}`);
//         req.form = { fields, files };
//         return resolve(next(req, res));
//       });
//     } catch (error) {
//       return resolve(res.status(403).send(error));
//     }
//   });
// };
// function handler(req, res) {
//   try {
//     if (req.method === "POST") {
//       res.status(200).send(req.form);
//     } else {
//       throw String("Method not allowed");
//     }
//   } catch (error) {
//     res.status(400).json({ message: JSON.stringify(error, null, 2) });
//   }
// }
// export default uploadForm(handler);

/***/ })

/******/ });