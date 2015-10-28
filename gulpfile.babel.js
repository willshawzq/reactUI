import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import load from 'gulp-load-plugins';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';

var $ = load();
gulp.task('styles', () => {
    return gulp.src('lib/scss/*.scss')
            .pipe($.sass())
            .pipe($.autoprefixer())
            .pipe(gulp.dest('dist/css/'));
});

gulp.task('jsx', () => {
    return gulp.src('lib/jsx/*.js')
            .pipe(babel())
            .pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('lib/scss/*.scss', ['styles'])
        .on('change', browserSync.reload);
    gulp.watch('lib/jsx/*.js', ['jsx'])
        .on('change', browserSync.reload);
    gulp.watch('*.html')
        .on('change', browserSync.reload);
});