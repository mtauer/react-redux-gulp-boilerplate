import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('default', ['build'])
gulp.task('build', gulpSequence('clean', ['styles:build', 'javascript:build', 'staticFiles:build']))
gulp.task('watch', ['styles:watch', 'javascript:watch', 'staticFiles:watch'])
