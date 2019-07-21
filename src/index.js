"use strict";

require("@babel/polyfill");
var through = require('through2');
var gutil = require('gulp-util');
var sharp = require('sharp');
var PluginError = gutil.PluginError;


var PLUGIN_NAME = 'gulp-images-convert';

function imagesConvert(option) {
  if (!option) {
    throw new PluginError(PLUGIN_NAME, 'Missing option!');
  }
  
  var targetType = option.targetType
  var quality = option.quality

  if (!targetType) {
    throw new PluginError(PLUGIN_NAME, 'Missing targetType')
  }

  var stream = through.obj(async function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported'))
      return cb();
    }
    if (file.isBuffer()) {
      var data = await sharp(file.contents).toFormat(targetType, quality ? {
        quality: quality
      } : undefined).toBuffer();

      file.contents = data;
      this.push(file);
      cb()
    }
  })

  return stream
}

module.exports = imagesConvert;