var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var fs = require('fs');
var imagesConvert = require('../src');
var images = require('images')


describe('gulp-images-convert', function () {
  describe('in buffer mode', function () {
    it('jpg convert to png', function (done) {

      var fakeFile = new File({
        contents: fs.readFileSync(__dirname + '/ftmore.jpg')
      });

      var testImagesConvert = imagesConvert({
        targetType: 'png'
      })

      testImagesConvert.write(fakeFile);

      testImagesConvert.once('data', function (file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString(), images(fs.readFileSync(__dirname + '/ftmore.jpg')).encode('png').toString())
        done()
      })

    })

    it('png convert to jpg', function (done) {

      var fakeFile = new File({
        contents: fs.readFileSync(__dirname + '/ftmore.png')
      });

      var testImagesConvert = imagesConvert({
        targetType: 'jpg'
      })

      testImagesConvert.write(fakeFile);

      testImagesConvert.once('data', function (file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString(), images(fs.readFileSync(__dirname + '/ftmore.png')).encode('jpg').toString())
        done()
      })
    })

    it('png convert to jpg with quality', function (done) {
      
      var fakeFile = new File({
        contents: fs.readFileSync(__dirname + '/ftmore.png')
      });

      var testImagesConvert = imagesConvert({
        targetType: 'jpg',
        quality: 80
      })

      testImagesConvert.write(fakeFile);

      testImagesConvert.once('data', function (file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString(), images(fs.readFileSync(__dirname + '/ftmore.png')).encode('jpg', {quality: 80}).toString())
        done()
      })
    })

    it('gif convert to jpg', function (done) {
      
      var fakeFile = new File({
        contents: fs.readFileSync(__dirname + '/ftmore.gif')
      });

      var testImagesConvert = imagesConvert({
        targetType: 'jpg'
      })

      testImagesConvert.write(fakeFile);

      testImagesConvert.once('data', function (file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString(), images(fs.readFileSync(__dirname + '/ftmore.gif')).encode('jpg').toString())
        done()
      })
    })

    it('gif convert to png', function (done) {
      
      var fakeFile = new File({
        contents: fs.readFileSync(__dirname + '/ftmore.gif')
      });

      var testImagesConvert = imagesConvert({
        targetType: 'png'
      })

      testImagesConvert.write(fakeFile);

      testImagesConvert.once('data', function (file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString(), images(fs.readFileSync(__dirname + '/ftmore.gif')).encode('png').toString())
        done()
      })
    })
  })
})