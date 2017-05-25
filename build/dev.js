var path = require("path");
var webpack = require("webpack");

// 压缩文件添加版本信息
var package = require("../package.json");
var { version, author } = package;
var time = new Date().toLocaleString();

// css 文件提取出来单独生成一个文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  context: process.cwd(),
  entry: "./build/index",
  output: {
    filename: `tdx-${version}.js`,
    path: path.resolve(__dirname, "../dist")
  },


  // 模块
  module: {

    rules: [

      {
        test: path.resolve(__dirname, "index.js"),
        use: {
          loader: "expose-loader",
          options: "tdx"
        }
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader"]
        })
      }
    ]
  },

  // 插件
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: `tdx-${version}.css`
    }),
  ]
}

var compiler = webpack(config);
compiler.run((err, stats) => {
  if(err) {
    console.log(err);
  }
});