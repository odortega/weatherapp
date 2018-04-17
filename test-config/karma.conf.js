var webpackConfig = require('./webpack.test.js');
module.exports = function (config) {
  var _config = {
    basePath: '',
    frameworks: ['jasmine'],
      plugins: [
          require('karma-jasmine'),
          require('karma-chrome-launcher'),
          require('karma-jasmine-html-reporter'),
          require('@angular/cli/plugins/karma'),
          require('karma-tap'),
          require('karma-sourcemap-loader'),
          require('karma-webpack'),
        ],
    files: [
      {pattern: './karma-test-shim.js', watched: true}
    ],
    preprocessors: {
      './karma-test-shim.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    webpackServer: {
      noInfo: true
    },
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },
    reporters: ['kjhtml', 'dots'],
    port: 9877,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  };
  config.set(_config);
};