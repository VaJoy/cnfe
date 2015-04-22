var gulp = require('gulp'),
    sass = require('gulp-sass'),
    mincss = require('gulp-mini-css'),
    sourcemaps = require('gulp-sourcemaps'),
    changed = require('gulp-changed'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');

var view = './views',
    raw_css = './FE_RAW/css',
    com_css = './public/css',
    pureCss = [com_css + '/**/*.css','!'+com_css + '/**/*-*.css'],
    raw_js = './FE_RAW/js',
    com_js = './public/js';

var cleanCss = function(){
    gulp.src(pureCss)
        .pipe(clean())
};

var repHtml = function(addr){
    return function(){
    return gulp.src([addr + '/**/*.json', view+'/**/*.html'])
        .pipe( revCollector({
            replaceReved: true
        }) )
        .pipe( gulp.dest(view) );
    }
};

var cssMd5 = function(){  //以回调形式确保同步
    gulp.src(pureCss)
        .pipe(changed(com_css + '/**/*.css'))
        .pipe(rev())
        .pipe(gulp.dest(com_css))
        .pipe(rev.manifest())
        .pipe(gulp.dest(com_css))
        .on('end',repHtml(com_css))
        .on('end',cleanCss)
};
gulp.task('sass',function () {
    gulp.src(raw_css + '/**/*.scss')
        .pipe(changed(com_css,{extension: '.css'}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(mincss())
        .pipe(sourcemaps.write('../css/map'))
        .pipe(gulp.dest(com_css))
        .on('end',cssMd5);
});

gulp.task('minjs', function () {
    gulp.src(raw_js + '/**/*.js')
        .pipe(changed(com_js))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(com_js))
        .pipe(rev.manifest())
        .pipe(gulp.dest(com_js))
        .on('end',repHtml(com_js))
});

gulp.task('watch', function () {
    gulp.watch(raw_css + '/**/*.scss', ['sass']);
    gulp.watch(raw_js + '/**/*.js', ['minjs']);
});

var a = function () {
    gulp.run('sass', 'minjs');
    gulp.run('watch');
};

gulp.task('default',function () {
    gulp.run('sass', 'minjs');
    gulp.run('watch');
});