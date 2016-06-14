import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('default', ['build'])
gulp.task('build', gulpSequence('clean', ['styles:build']))
