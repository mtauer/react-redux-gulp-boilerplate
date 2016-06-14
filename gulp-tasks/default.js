import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('default', ['watch'])
gulp.task('build', gulpSequence('test', 'clean', ['styles:build', 'javascript:build', 'staticFiles:build']))
gulp.task('watch', gulpSequence('test', ['styles:watch', 'javascript:watch', 'staticFiles:watch'], 'browser-sync'))
