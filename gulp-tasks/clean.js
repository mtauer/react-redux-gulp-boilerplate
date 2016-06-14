import gulp from 'gulp';
import del from 'del';
import { paths } from './common'

gulp.task('clean', () => {
  return del.sync([
    `${paths.output}**/*`
  ])
})
