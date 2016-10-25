var gulp = require('gulp');
//var connect = require('gulp-connect');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var wrap = require('gulp-wrap');
//var minify = require('gulp-minify');

gulp.task('server', function(){
    browserSync({
        server: {
            baseDir: "./dest/",
            directory: true,
        },
        port: 8080,
        host: 'develop.ren'
    });

    /*
connect.server({
root: './dest/blog/',
livereload: true,
port: 8080,
host: 'blog.develop.ren'
});
*/
});

/* blog project*/
gulp.task('blog-rebuild-css', function (){
    gulp.src('src/blog/**/*.css')
        .pipe(sass())
        .pipe(prefixer())
         //.pipe(minify())
        .pipe(gulp.dest('dest/blog/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('blog-rebuild-pic', function (){
    gulp.src('src/blog/pic/**/*')
        .pipe(gulp.dest('dest/blog/pic/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('blog-rebuild-js', function (){
    gulp.src('src/blog/**/*.js')
        .pipe(gulp.dest('dest/blog/'));
});

gulp.task('blog-rebuild-html', function (){
    gulp.src('src/blog/**/*.html')
        .pipe(gulp.dest('dest/blog/'));
});

gulp.task('blog-watch', function (){
    gulp.watch('src/blog/**/*.css', {cwd: './'}, ['blog-rebuild-css']);
    gulp.watch('src/blog/**/*.js', {cwd: './'}, ['blog-reload']);
    gulp.watch('src/blog/**/*.html', {cwd: './'}, ['blog-reload']);
    gulp.watch('src/blog/**/*.pic', {cwd: './'}, ['blog-rebuild-pic']);
});

gulp.task('blog-reload', ['blog-build'], function (){
    browserSync.reload();
});
gulp.task('blog-build', ['blog-rebuild-css', 'blog-rebuild-js', 'blog-rebuild-html', 'blog-rebuild-pic']);
gulp.task('blog', ['server', 'blog-build', 'blog-watch']);



/* react project*/
gulp.task('react-rebuild', function (cb){
    gulp.src('src/react/**/*')
        .pipe(gulp.dest('dest/react/'));
    cb(browserSync.reload());
});

gulp.task('react-watch', function (){
    gulp.watch('src/react/**/*', {cwd: './'}, ['react-rebuild']);
});
gulp.task('react', ['server', 'react-rebuild', 'react-watch']);





/* flexbox project*/
gulp.task('flexbox-rebuild-css', function (){
    gulp.src('src/flexbox/styles/*')
        .pipe(sass())
        .pipe(prefixer())
        //.pipe(minify())
        .pipe(gulp.dest('dest/flexbox/styles/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('flexbox-rebuild-pic', function (){
    gulp.src('src/flexbox/pic/**/*')
        .pipe(gulp.dest('dest/flexbox/pic/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('flexbox-rebuild-js', function (cb){
    gulp.src('src/flexbox/**/*.js')
        .pipe(gulp.dest('dest/flexbox/'));
    cb(browserSync.reload());
});

gulp.task('flexbox-rebuild-html', function (cb){
    gulp.src('src/flexbox/**/*.html')
        .pipe(wrap({src:"src/flexbox/layout/default.html"}))
        .pipe(gulp.dest('dest/flexbox/'));
    cb(browserSync.reload());
});

gulp.task('flexbox-watch', function (){
    gulp.watch('src/flexbox/styles/*', {cwd: './'}, ['flexbox-rebuild-css']);
    gulp.watch('src/flexbox/**/*.js', {cwd: './'}, ['flexbox-rebuild-js']);
    gulp.watch('src/flexbox/**/*.html', {cwd: './'}, ['flexbox-rebuild-html']);
    gulp.watch('src/flexbox/pic/**/*', {cwd: './'}, ['flexbox-rebuild-pic']);
});

/*
gulp.task('flexbox-reload', ['flexbox-build'], function (){
    setTimeout(function(){
        console.log('step:2');
        browserSync.reload();
    }, 100);
});
var reload =  function(){
    console.log('step:2');
    browserSync.reload();
};
*/

gulp.task('flexbox-build', ['flexbox-rebuild-css', 'flexbox-rebuild-js', 'flexbox-rebuild-html', 'flexbox-rebuild-pic'], function(){
});
gulp.task('flexbox', ['server', 'flexbox-build', 'flexbox-watch']);

























gulp.task('one', function(callback){
    /*
setTimeout(function(){
console.log('task: one');
callback();
}, 2000);
*/
});
//two任务需要等待one任务执行完成
gulp.task('two', ['one'], function(callback){
    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('task: two');
            resolve();
        }, 3000);
    });
    return promise;
});
//default任务需要等待two任务执行完成
gulp.task('default', ['two'], function(){
    console.log('task: default');
});
