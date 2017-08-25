# gulp-images-convert


![build status](https://travis-ci.org/feathermore/gulp-images-convert.svg?branch=master)

This is a wrapper of images package for gulp. It support encoder(png/jpeg/gif) convert to encoder(png/jpeg).
## Installation
Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-images-convert`

## Usage
```js
var gulp = require('gulp');
var rename = require('gulp-rename');
var imagesConvert = require('gulp-image-convert');

gulp.task('convert', function () {
  return gulp.src('assets/*.jpg')
      .pipe(imagesConvert({targetType: 'png'}))
      .pipe(rename({extname: ".png"}))
      .pipe('dist/assets');
})

```

## License
MIT