var through = require('through2');
var gutil = require('gulp-util');
var images = require('images');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-images-convert';

function ImagesConvert(option) {
  if (!option) {
    throw new PluginError(PLUGIN_NAME, 'Missing option!');
  }
  var defaults = Object.assign({})


  var stream = through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported'))
      return cb();
    }
    if (file.isBuffer()) {
      file.contents = images(file.contents).encode(fileType)
    }

    this.push(file);

    cb()
  })

  return stream
}

module.exports = ImagesConvert;