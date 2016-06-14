import gulp from 'gulp'
import browserSync from 'browser-sync'
import { paths } from './common'

gulp.task('browser-sync', [], doBrowserSync)

function doBrowserSync() {
  browserSync({
    server: paths.output
  })
}
