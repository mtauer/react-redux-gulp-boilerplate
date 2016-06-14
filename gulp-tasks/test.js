import gulp from 'gulp'
import gulpMocha from 'gulp-mocha'
import { paths } from './common'

gulp.task('test', [], doTest)

function doTest() {
  return gulp
    .src(paths.tests.inputFiles, { read: false })
    .pipe(gulpMocha())
}
