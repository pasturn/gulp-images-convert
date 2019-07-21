var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var fs = require('fs');
var imagesConvert = require('../src');
var sharp = require('sharp');


describe('gulp-images-convert', function () {
  describe('in buffer mode', function () {
    it('jpg convert to png', function (done) {

      var fakeFile = new File({
        contents: fs.readFileSync(__dirname + '/ftmore1.jpg')
      });

      var testImagesConvert = imagesConvert({
        targetType: 'png'
      });

      testImagesConvert.write(fakeFile);

      testImagesConvert.once('data', async function (file) {
        assert(file.isBuffer());
        var fileBuffer = await sharp(fs.readFileSync(__dirname + '/ftmore1.jpg')).png().toBuffer();
        assert.equal(file.contents.toString(), fileBuffer.toString());
        done();
      })

    })

    it('png convert to jpg', function (done) {

      var fakeFile = new File({
        contents: fs.readFileSync(__dirname + '/ftmore2.png')
      });

      var testImagesConvert = imagesConvert({
        targetType: 'jpg'
      });

      testImagesConvert.write(fakeFile);

      testImagesConvert.once('data', async function (file) {
        assert(file.isBuffer());
        var fileBuffer = await sharp(fs.readFileSync(__dirname + '/ftmore2.png')).jpeg().toBuffer()
        assert.equal(file.contents.toString(), fileBuffer.toString());
        done();
      })
    })

    it('png convert to jpg with quality', function (done) {
      
      var fakeFile = new File({
        contents: fs.readFileSync(__dirname + '/ftmore2.png')
      });

      var testImagesConvert = imagesConvert({
        targetType: 'jpg',
        quality: 80
      })

      testImagesConvert.write(fakeFile);

      testImagesConvert.once('data', async function (file) {
        assert(file.isBuffer());
        var fileBuffer = await sharp(fs.readFileSync(__dirname + '/ftmore2.png')).jpeg({quality: 80}).toBuffer();
        assert.equal(file.contents.toString(), fileBuffer.toString());
        done();
      })
    })

    it('gif convert to jpg', function (done) {
      
      var fakeFile = new File({
        contents: fs.readFileSync(__dirname + '/ftmore3.gif')
      });

      var testImagesConvert = imagesConvert({
        targetType: 'jpeg'
      })

      testImagesConvert.write(fakeFile);

      testImagesConvert.once('data', async function (file) {
        assert(file.isBuffer());
        var fileBuffer = await sharp(fs.readFileSync(__dirname + '/ftmore3.gif')).toFormat('jpeg').toBuffer();
        assert.equal(file.contents.toString(), fileBuffer.toString());
        done();
      });
    })

    it('gif convert to png', function (done) {
      
      var fakeFile = new File({
        contents: fs.readFileSync(__dirname + '/ftmore3.gif')
      });

      var testImagesConvert = imagesConvert({
        targetType: 'png'
      });
      testImagesConvert.write(fakeFile);

      testImagesConvert.once('data', async function (file) {
        assert(file.isBuffer());
        var fileBuffer = await sharp(fs.readFileSync(__dirname + '/ftmore3.gif')).png('png').toBuffer();
        assert.equal(file.contents.toString(), fileBuffer.toString());
        done();
      })
    })
  })
})