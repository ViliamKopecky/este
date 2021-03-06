import bg from 'gulp-bg';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import webpackBuild from './webpack/build';

const runEslint = () => {
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.js',
    'webpack/*.js'
    // '!**/__tests__/*.*'
  ])
  .pipe(eslint())
  .pipe(eslint.format());
};

// Always use Gulp only in development
gulp.task('set-dev-environment', () => {
  process.env.NODE_ENV = 'development'; // eslint-disable-line no-undef
});

gulp.task('build', webpackBuild);

gulp.task('eslint', () => {
  return runEslint();
});

gulp.task('eslint-ci', () => {
  // Exit process with an error code (1) on lint error for CI build.
  return runEslint().pipe(eslint.failAfterError());
});

gulp.task('test', (done) => {
  runSequence('eslint-ci', 'build', done);
});

gulp.task('server-hot', bg('node', './webpack/server'));

gulp.task('nodemon', () => {
  nodemon({
    script: './src/server'
  });
});

gulp.task('server', ['set-dev-environment', 'server-hot', 'nodemon']);

gulp.task('default', ['server']);
