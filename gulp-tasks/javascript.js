import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import vinylSourceStream from 'vinyl-source-stream'
import watchify from 'watchify'
import vinylBuffer from 'vinyl-buffer'
import gulpUglify from 'gulp-uglify'
import gulpIf from 'gulp-if'
import gulpUtil from 'gulp-util'
import gulpNotify from 'gulp-notify'
import livereactload from 'livereactload'
import { paths } from './common'

const production = false
const watch = true

gulp.task('javascript:build', [], doJavascriptBuild)
gulp.task('javascript:watch', [], doJavascriptWatch)

function doJavascriptBuild() {
  return bundleJavascript(createBundler())
}

function doJavascriptWatch() {
  const watcher = createBundler({ watch: true })
  bundleJavascript(watcher)
  watcher.on('update', () => { bundleJavascript(watcher) })
}

function createBundler(options = {}) {
  const bundler = browserify(
    paths.javascript.input + paths.javascript.inputMain, {
      debug: !production,
      cache: {},
      plugin: options.watch === true ? [livereactload] : []
    }
  )
  .transform(babelify)
  return options.watch === true ? watchify(bundler) : bundler
}

function bundleJavascript(bundler) {
  return bundler.bundle()
    .on('error', handleError('Browserify'))
    .pipe(vinylSourceStream(paths.javascript.outputMain))
    .pipe(gulpIf(production, vinylBuffer()))
    .pipe(gulpIf(production, gulpUglify()))
    .pipe(gulp.dest(paths.javascript.output))
}

const handleError = task => {
  return function(err) {
    gulpNotify.onError({
      message: task + ' failed: ' + formatError(err),
      sound: false
    })(err)
    gulpUtil.log(gulpUtil.colors.bgRed(task + ' error:'), gulpUtil.colors.red(err))

    function formatError(err) {
      var message = 'check the logs.'
      if (err.message) {
        message = err.message;
        if (err.fileName && err.lineNumber) {
          message += ' File ' + err.fileName.replace(__dirname, '') + ':' + err.lineNumber + '.'
        }
      }
      return message
    }
  }
}
