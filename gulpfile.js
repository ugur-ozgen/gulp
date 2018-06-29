var gulp = require("gulp"),
    sass = require("gulp-sass"),
    uglify = require("gulp-uglify"),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename");

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task("sass", function () {
    gulp.src("./sass/site.scss")
        .pipe(sass({outputStyle: "expanded"})).on('error', swallowError)
        .pipe(autoprefixer("> 0%"))
        .pipe(gulp.dest("css"));
});

gulp.task('minify-css', function () {
    gulp.src('css/site.css')
        .pipe(cleanCSS({compatibility: 'ie8'})).on('error', swallowError)
        .pipe(rename({
            suffix: '.min'
        })).on('error', swallowError)
        .pipe(autoprefixer("> 0%"))
        .pipe(gulp.dest('css'));
});

gulp.task("js", function () {
    gulp.src('./js/site.js')
        .pipe(uglify()).on('error', swallowError)
        .pipe(rename({
            suffix: '.min'
        })).on('error', swallowError)
        .pipe(gulp.dest('./js/'));
});

gulp.task('default', function () {

    gulp.watch("./sass/*.scss", ["sass"]);

    gulp.watch("./css/*.css", ["minify-css"]);

    gulp.watch("./js/*", ["js"]);

});