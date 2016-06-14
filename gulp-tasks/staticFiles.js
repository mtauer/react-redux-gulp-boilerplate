import gulp from 'gulp'
import gulpLivereload from 'gulp-livereload'
import { paths } from './common'

gulp.task('staticFiles:build', [], doStaticFilesBuild)
gulp.task('staticFiles:watch', ['staticFiles:build'], doStaticFilesWatch)
gulp.task('staticFiles:buildAndWatch', [], doStaticFilesBuildAndWatch)

function doStaticFilesBuild() {
  return buildStaticFiles()
}

function doStaticFilesWatch() {
  gulpLivereload.listen()
  return gulp.watch(paths.staticFiles.input, ['staticFiles:buildAndWatch'])
}

function doStaticFilesBuildAndWatch() {
  return buildStaticFiles()
    .pipe(gulpLivereload())
}

function buildStaticFiles() {
  return gulp.src(paths.staticFiles.input)
    .pipe(gulp.dest(paths.staticFiles.output))
}
