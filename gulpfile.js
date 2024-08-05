'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(/Warning - \[sass\] The local CSS class/gi);
build.addSuppression(/Warning - lint - /gi);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    generatedConfiguration.module.rules.push(
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!htmlparser2|micromark-util-decode-numeric-character-reference|micromark-util-sanitize-uri)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    );
    return generatedConfiguration;
  }
});

build.initialize(require('gulp'));
