import gulp from 'gulp'
import gulpUtil from 'gulp-util'
import gulpAwspublish from 'gulp-awspublish'
import mergeStream from 'merge-stream'
import { env, paths } from './common'
import * as configS3 from '../config/configS3.js'
const deployEnvironments = ['staging', 'production']

gulp.task('deployS3', ['build'], doDeployS3)

function doDeployS3() {
  ensureEnvironmentIsValid()
  const config = configS3[env]
  console.log('Deploying - using this configuration:\n', config.aws)

  const publisher = gulpAwspublish.create(config.aws)
  const bucketPath = config.aws.bucketPath + '/'
  const headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  }
  const zipFiles = paths.output + '/**/*.{js,css,html,svg}'
  const otherFiles = [paths.output + '/**/*.*'].concat('!' + zipFiles)
  return mergeStream(
      gulp.src(zipFiles).pipe(gulpAwspublish.gzip()),
      gulp.src(otherFiles)
    )
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(publisher.sync())
    .pipe(gulpAwspublish.reporter())

  function ensureEnvironmentIsValid() {
    if (deployEnvironments.indexOf(env) === -1) {
      gulpUtil.log(
        gulpUtil.colors.red('You can only deploy to one of these environments: '),
        gulpUtil.colors.green(deployEnvironments.join(', ')),
      )
      gulpUtil.log('Use e.g. \'gulp -e staging deploy\'')
      return false
    }
  }
}
