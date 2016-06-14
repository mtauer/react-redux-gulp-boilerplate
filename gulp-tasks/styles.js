import gulp from 'gulp';
import gulpNotify from 'gulp-notify';
import gulpPlumber from 'gulp-plumber';
import gulpSass from 'gulp-sass';
import gulpPostcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssMqpacker from 'css-mqpacker';
import csswring from 'csswring';
import gulpIf from 'gulp-if';
import gulpLivereload from 'gulp-livereload';
import gulpSourcemaps from 'gulp-sourcemaps';
import { paths, env } from './common'

gulp.task('styles:build', doStylesBuild);
gulp.task('styles:watch', doStylesWatch);
gulp.task('styles:buildAndWatch', doStylesBuildAndWatch);

// compile sass to css
function doStylesBuild() {
  return gulp.src(paths.styles.input + paths.styles.inputMain)
    .pipe(gulpIf(env !== 'production', gulpSourcemaps.init()))
    .pipe(gulpPlumber({ errorHandler: gulpNotify.onError('SASS Error: <%= error.message %>') }))
    .pipe(gulpSass({ sourceComments: true }).on('error', gulpSass.logError))
    .pipe(gulpPostcss([
      autoprefixer({
        browsers: ['last 2 versions', '> 2%'],
        cascade: false
      }),
      cssMqpacker,
      csswring({ removeAllComments: true })
    ]))
    .pipe(gulpIf(env !== 'production', gulpSourcemaps.write()))
    .pipe(gulp.dest(paths.styles.output))
}

function doStylesWatch() {
  gulpLivereload.listen()
  return gulp.watch(paths.styles.inputFiles, ['styles:buildAndWatch'])
}

function doStylesBuildAndWatch() {
  return doStylesBuild()
    .pipe(gulpLivereload())
}
