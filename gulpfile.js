var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('default', async function dist () {
  gulp.src('src/*.js')
  .pipe(babel({
    presets: ['@babel/env'],
    plugins: ['@babel/plugin-transform-runtime']
  }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

