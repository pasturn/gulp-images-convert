var through = require('through2');
var gutil = require('gulp-util');
var images = require('images');
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

  var stream = through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported'))
      return cb();
    }
    if (file.isBuffer()) {
      file.contents = images(file.contents).encode(targetType, quality ? {quality: quality} : undefined)
    }

    this.push(file);

    cb()
  })

  return stream
}

module.exports = imagesConvert;