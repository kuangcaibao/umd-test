var path = require("path");
var webpack = require("webpack");

// 压缩文件添加版本信息
var package = require("../package.json");
var { version, author } = package;
var time = new Date().toLocaleString();

var config = {
  context: process.cwd(),
  entry: "./build/index",
  output: {
    filename: `tdx.min-${version}.js`,
    path: path.resolve(__dirname, "../dist")
  },

  // 模块
  module: {

  },

  // 插件
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        preamble: `/* \r\n @version: ${version} \r\n @author: ${author} \r\n @time: ${time} \r\n */`
      }
    })
  ]
}

var compiler = webpack(config);
compiler.run((err, stats) => {
  if(err) {
    console.log(err);
  }
});