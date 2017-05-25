/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// 需要导出变量的文件
exports.date = __webpack_require__(4);

// jquery 组件文件
__webpack_require__(5);

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["tdx"] = __webpack_require__(0);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
  @file 日期格式处理文件
*/

/*
  根据日期对象，返回格式后的字符串

  @param d { Date } 日期对象
  @param sp { String } 分隔符

  @return result { String } 格式后的日期字符串
*/
exports.fmtDate = function(d, sp) {
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();

  if(month < 10) month = "0" + month;
  if(day < 10) day = "0" + day;

  sp = sp || "";
  return year + sp + month + sp + day;
}

/*
  返回距离某个日期一段时间的日期

  @param d { Date } 基准日期
  @param st { Number } 跨度值
  @param tt { String } 跨度单位，y - 年，m - 月，d - 天

  @return result { Date } 返回计算后的日期对象
*/
exports.spanDate = function(d, st, tt) {

  st = parseInt(st) || 0;
  tt = tt || "d";

  if(st == 0) {
    return d;
  }

  switch(tt) {
    case "y":
      return new Date(d.getFullYear() + st, d.getMonth(), d.getDate());

    case "m":
      return new Date(d.getFullYear(), d.getMonth() + st, d.getDate());

    case "d":
      return new Date(d.getFullYear(), d.getMonth(), d.getDate() + st);       
  }

  // 其他情形，还是返回 d
  return d;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);

var tool = __webpack_require__(6);

// 使用 jQuery 插件时，存放上下文环境
var that;

// 流程配置
var tdxConf;

// 初始化函数
$.fn.tdxSdx = function(conf) {

  // 这个将元素的上下文指定到 that
  that = this;

  // 初始化流程状态
  initState(conf);

  // 检查流程状态
  checkState("begin", showHtml);

}

// 初始化状态
var initState = function(conf) {

  tdxConf = conf;

  var keyConf = tdxConf.conf || "sdx-conf";

  var lsConf = tool.getItem(keyConf); // localStorage 中 keyConf 内容
  if(lsConf) {
    Object.keys(lsConf).map(function(key) {
      $.extend(tdxConf.steps[key], lsConf[key]);
    })
  }

}

// 检查状态
var checkState = function(stepId, callback) {

  // 如果 stepId 为空
  if(!stepId) {
    callback();
    return;
  };

  // 如果流程已经到结尾了
  if(stepId == "end") {
    
    // 流程结束，需要回退到委托界面
    // document.write("<h1>流程已到结尾</h1>");
    // 清空 localStorage
    tool.removeItem([tdxConf.conf || "sdx-conf"]);

    callback();
    return;
  }

  var step = tdxConf.steps[stepId];

  // 如果 state 未定义
  if(step.state == undefined) {

    // 这里需要判断是否定义 ckfunc
    if(typeof step.ckfunc == "function") {

      step.ckfunc(function(rt) {

        if(typeof rt != "object") {
          rt = { code: rt };
        }
        step.info = rt.info || step.info;
        step.state = rt.code;
        checkState(getNextStepId(step), callback);
      })
    }

    // 这里看回调路径中的参数
    else {

      var code = tool.getUrlParam("rtflag");
      step.state = code;
      checkState(getNextStepId(step), callback);
    }
  }
  else {
    checkState(getNextStepId(step), callback);
  }

}

// 获取下一个步骤 id
var getNextStepId = function(step) {

  /*
    step.state

    undefined, return undefind

    其他值返回 op 指向内容
  */
  if(step.state != undefined) {
    return step.op[step.state];
  }
  else {
    return undefined;
  }
}

// 显示流程步骤
var showHtml = function() {

  var tpl = ' \
    <div class="tdx-sdx"> \
      {{stepStr}} \
    </div> \
  ';

  var index = 0;
  var stepStr = [];
  var curStep = "begin";

  while(curStep && curStep != "end") {

    // 形成当前步骤 html
    var step = tdxConf.steps[curStep];
    stepStr.push(fmtStepHtml(step, index));

    // 获取下一个步骤 id
    curStep = getNextStepId(step);
    index++;
  }

  // 如果当前步骤是最后一步了
  // 跳转回委托界面，清空状态
  if(curStep == "end") {

    // tool.removeItem([tdxConf.conf || "sdx-conf"]);
    // document.write("<h1>步骤已执行完</h1>");
    // callback();
    // return;
  }

  // 显示步骤
  that.append(tpl.replace("{{stepStr}}", stepStr.join("")));

  // 绑定点击跳转操作函数
  $(".tdx-sdx-step-btn").unbind("click").bind("click", jumpBtnClick);
}

// 形成当前步骤html
var fmtStepHtml = function(step, index) {

  var tplStep = ' \
    <div class="tdx-sdx-step"> \
      <div class="{{indexClass}}">{{stepIndex}}</div> \
      <div class="tdx-sdx-step-col2"> \
        <p class="tdx-sdx-step-col2-title">{{title}}</p> \
        <p class="tdx-sdx-step-col2-info">{{info}}</p> \
      </div> \
      <div class="{{btnClass}}" stepid="{{stepId}}">{{btnText}}</div> \
    </div> \
  ';

  var title = step.title;
  var info = step.info;
  var stepId = "";
  var indexClass = "";
  var btnText = "";
  var btnClass = "";
  var stepIndex = "";

  var nextId = getNextStepId(step);

  // 表示还有下一步
  if(nextId) {
    indexClass = "tdx-sdx-step-col1 tdx-sdx-step-col1-done";
    stepIndex = "√";
  }

  // 正在判断的步骤
  else {
    indexClass = "tdx-sdx-step-col1 tdx-sdx-step-col1-do";
    btnText = step.btntext;
    btnClass = "tdx-sdx-step-btn";
    stepIndex = index + 1;
    stepId = step.id;
  }

  var tmpStr = tplStep.replace(/{{indexClass}}/g, indexClass)
                .replace(/{{stepIndex}}/g, stepIndex)
                .replace(/{{title}}/g, title)
                .replace(/{{info}}/g, info)
                .replace(/{{btnText}}/g, btnText)
                .replace(/{{stepId}}/g, stepId)
                .replace(/{{btnClass}}/g, btnClass);

  return tmpStr;
}

// 点击跳转函数
var jumpBtnClick = function() {

  var stepId = $(this).attr("stepid");
  var step = tdxConf.steps[stepId];

  var url = step.url;
  if(url.indexOf("redirect_uri") < 0) {
    if(url.indexOf("?") >= 0) {
      url += "&redirect_uri=" + encodeURIComponent(tdxConf.homeurl + "?rtflag=RTFLAG");
    }
    else {
      url += "?redirect_uri=" + encodeURIComponent(tdxConf.homeurl + "?rtflag=RTFLAG");
    }
  }

  // 这里把流程信息存放到 localStorage 中
  var keyConf = tdxConf.conf || "sdx-conf";
  var conf = {};
  Object.keys(tdxConf.steps).map(function(key) {
    var step = tdxConf.steps[key];
    conf[key] = { info: step.info, id: step.id, state: step.state };
  })

  tool.setItem(keyConf, conf);

  window.location.href = url;
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
  @file 工具类
*/

/*
  从 localStorage 取值

  @param key { String } 关键字

  @return result { * } 根据存放的内容判断，使用 JSON.parse 的应答
*/
exports.getItem = key => {

  var value = localStorage.getItem(key);

  try {
    return JSON.parse(value);
  }
  catch(e) {
    return value;
  }
}

/*
  向 localStorage 中存放内容

  @param key { String } 存放的key
  @param value { * } 任何类型

  @return 无返回值
*/
exports.setItem = (key, value) => {

  if(typeof value == "string") {
    localStorage.setItem(key, value);
  }
  else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/*
  清空 localStorage 中对应 keys 的值

  @param keys { Array }

  @return 无返回值
*/
exports.removeItem = function(keys) {
  keys.map(function(key) {
    localStorage.removeItem(key);
  })
}

/*
  根据 name 获取 url 中的参数

  @param name { String }

  @return result { String }
*/
exports.getUrlParam = function(name) {
  var regStr = "(&|^)" + name + "=([^&]+)(&|$)";
  var reg = new RegExp(regStr);
  var res = location.search.substr(1).match(reg);

  return res && res[2];
}

/***/ })
/******/ ]);