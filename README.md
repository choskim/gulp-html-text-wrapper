# gulp-html-text-wrapper [![NPM Version][npm-image]][npm-url]
> A gulp plugin that finds and wraps text content in HTML files with HTML tags.

## Install
```shell
npm install --save-dev gulp-html-text-wrapper
```

## Usage
```js
var gulp = require('gulp');
var wrap = require('gulp-html-text-wrapper');

gulp.task('wrap', function() {
  return gulp.src('*/**/*.html', {base: './'})
    .pipe(wrapper({
      tagName: 'sb-i18n',
      ignoredParentsTagNames: ['style', 'script', 'dom-module', 'template']
    }))
    .pipe(gulp.dest('.'));
});
```

## License
[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/gulp-html-text-wrapper.svg
[npm-url]: https://www.npmjs.com/package/gulp-html-text-wrapper
