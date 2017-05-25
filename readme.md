这是一个打包工具使用 demo

## 1. 一些约定

1. 输出文件

    **输出目录**：`dist`

    **输入文件**：`[filename].min.css`, `[filename].min.js`

    **使用**：

    在 `html` 页面中引入这2个文件。

    如果是业务组件，这里的使用方式是 `$(el).tdxGrid(...)`

    如果是公共处理函数，如判断浏览器环境，日期格式化这些操作，则在文件中有个全局变量 `tdx`, 在 `tdx` 下挂在不同的变量，如 `tdx.platform`, `tdx.date` 等

2. 建议使用模块规范：`CommonJS`、`ES6 module`，不建议使用 `AMD`

3. 组件命名规范

    如果是业务组件，命名 `tdx-mod-[名称]`，这个业务组件名称可以是汉字首字母缩写或者英文单词。

    如果是一些公共函数操作，命名 `tdx-js-[名称]`

## 2. 总的打包项目

示例 `demo` 地址: [https://github.com/kuangcaibao/umd-test.git](https://github.com/kuangcaibao/umd-test)

目录结构：

```
/
  package.json              // 项目信息文件
  readme.md                 // 项目说明文件
  build/                    // 打包工程配置目录
    index.js                // 打包入口文件
    dev.js                  // 打包开发文件配置信息文件
    pro.js                  // 打包生产文件配置信息文件
  dist/                     // 打包发布文件夹
  node_modules/             // 这个文件夹存放我们自己的一些 npm 包和第三方包
```

`dist` 文件目录下的文件格式：

```
tdx-<version>.css       // css合并文件
tdx-<version>.js        // 开发版
tdx.min-<version>.js    // 生产包
```

> 资源文件，如图片文件暂时还没有规则如何处理

## 3. tdx-js-* 示例

示例 `demo` 地址: [https://github.com/kuangcaibao/tdx-js-date.git](https://github.com/kuangcaibao/tdx-js-date)

这个是一个示例，我们的公共函数处理的包，可以这样类似写。只需要满足 `CommonJS` 或者 `es6 module` 模块规范，`AMD` 规范还没有测试过。

## 4. tdx-mod-* 示例

示例 `demo` 地址：[https://github.com/kuangcaibao/tdx-mod-sdx.git](https://github.com/kuangcaibao/tdx-mod-sdx)

> 这 2 个 demo 包都上传到 `regitry.npmjs.org` 上，可以按照正常的 `npm install` 下载下来。