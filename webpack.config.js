var path = require("path");

module.exports = {

  entry: {
    "normal": "./src/index.js",
    "amd": "./src/amd.js"
  },

  output: {
    filename: "bundle.[name].js",
    path: path.resolve(__dirname, "dist")
  }
}