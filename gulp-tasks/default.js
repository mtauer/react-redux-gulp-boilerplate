import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('default', ['build'])
gulp.task('build', gulpSequence('test', 'clean', ['styles:build', 'javascript:build', 'staticFiles:build']))
gulp.task('watch', ['test', 'styles:watch', 'javascript:watch', 'staticFiles:watch'])
