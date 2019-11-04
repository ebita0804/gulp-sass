var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('default', ['browser-sync']);


gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: "./htdocs/"       //対象ディレクトリ
      , index: "index.html"
    }
  });
});

//ブラウザリロード
gulp.task('bs-reload', function () {
  browserSync.reload();
});

// sassコンパイルタスク
gulp.task('sass', function () {
  gulp.src('./source/sass/**/*.scss')
    // ↓ここにplumberを追加するとsassでエラー出ても止まらない
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./htdocs/css/'));
});
// watchタスク(Sassファイル変更時に実行するタスク)
gulp.task('sass-watch', ['sass'], function () {
  var watcher = gulp.watch('./source/sass/**/*.scss', ['sass']);
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});


//監視ファイル
gulp.task('default', ['browser-sync', 'sass-watch'], function () {
  gulp.watch("./htdocs/*.html", ['bs-reload']);
  gulp.watch("./htdocs/css/*.css", ['bs-reload']);
  gulp.watch("./htdocs/js/*.js", ['bs-reload']);
});
