// Plugins
// ......
const IgnoreWarningPlugin = require('ignore-warning-plugin');
const warningFilter = require('./warningFilter.js')

// base config
const config = {
  mode: "development",
  resolve: {
    extensions: ["*", ".js", ".json", ".vue", ".ts"],
    alias: {
      // ...
    }
  },
  plugins: [
    //....
    new IgnoreWarningPlugin({
      warningFilter,
    }),
    // ...
  ],
  module: {
    rules: [
      // ...
    ]
  }
};

module.exports = config;
