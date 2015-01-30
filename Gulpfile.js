var gulp       = require('gulp');
var secret     = require("./secret.js");
var exec       = require('child_process').exec;
var connect    = require('gulp-connect');
var jshint     = require('gulp-jshint');
var uglify     = require('gulp-uglifyjs');
var concat     = require('gulp-concat');
var minifyCSS  = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var imagemin   = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var replace    = require('gulp-replace');
var open       = require("gulp-open");
var del        = require('del');

var options = {
  dest: 'build',
  clean: ['build/*.*'],
  url: 'http://localhost:3000',
  idxHtml: 'src/index.html',
  js: ['src/scripts/**/*.js'],
  libs: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-ui/ui/core.js',
    'bower_components/jquery-ui/ui/widget.js',
    'bower_components/jquery-ui/ui/mouse.js',
    'bower_components/jquery-ui/ui/sortable.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-local-storage/dist/angular-local-storage.js',
    'bower_components/angular-ui-sortable/sortable.js',
    'bower_components/angular-translate/angular-translate.js',
    'bower_components/ngDialog/js/ngDialog.js'
    ],
  css: [
    'bower_components/components-font-awesome/css/font-awesome.min.css',
    'bower_components/ngDialog/css/ngDialog.css',
    'bower_components/ngDialog/css/ngDialog-theme-plain.css',
    'bower_components/pure/pure-min.css',
    'src/css/**/*.css'
    ],
  html:['src/**/*.html'],
  images: ['src/images/**/*'],
  ssh: 'scp -rp build/* extreme:~/www/huskify/',
  fontawesome: 'bower_components/components-font-awesome/fonts/**.*'
}

gulp.task('clean', function(cb) {
    del(options.clean, {force: true}, cb);
});

gulp.task("browser", function(){
  gulp.src(options.idxHtml) // Destination must be defined or the task will be skipped
  .pipe(open('', {url: options.url}));
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    port: 3000,
    livereload: true
  });
});

gulp.task('lint', function() {
  gulp.src(options.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('minify-js', function() {
  gulp.src(options.libs.concat(options.js))
    .pipe(sourcemaps.init())
    .pipe(concat('huskify.js'))
    .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(options.dest + '/scripts'));
});

gulp.task('minify-css', function() {
  gulp.src(options.css)
    .pipe(concat('huskify.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(options.dest + '/css'));
});

gulp.task('minify-html', function() {
  gulp.src(options.html)
    .pipe(replace(/::goa/g, secret.analytics)) // Replaces with access key
    .pipe(minifyHTML({empty:true})) // Empty true needed for Angular
    .pipe(gulp.dest(options.dest));
});

gulp.task('minify-images', function() {
  return gulp.src(options.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(options.dest + '/images'));
});

gulp.task('icons', function() {
    return gulp.src(options.fontawesome)
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task('ssh', function() {
  child = exec(options.ssh, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('Child process error, stderr: ', stderr, ' error: ' , error);
    } else {
      console.log('Child process exit, OK. Command: ', options.ssh, " stdout: ", stdout);
    }
  });
});

/* We separate reloading action from uglify and minifying so that we can call them separately */

gulp.task('js', function () {
  gulp.src(options.js)
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src(options.html)
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src(options.css)
    .pipe(connect.reload());
});

gulp.task('images', function () {
  gulp.src(options.images)
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(options.js, ['lint', 'minify-js', 'js']);
  gulp.watch(options.css, ['minify-css', 'css']);
  gulp.watch(options.html, ['minify-html', 'html']);
});

gulp.task('default', ['connect', 'clean', 'lint', 'icons' ,'minify-js', 'minify-css', 'minify-html', 'watch']);
gulp.task('deploy', ['clean', 'lint' ,'minify-js', 'minify-css', 'minify-html', 'ssh']);