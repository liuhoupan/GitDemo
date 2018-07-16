// gulp 主文件，用于注册任务





// 4.html压缩

// 在gulpfile中先载入gulp包,因为这些包提供了一些API
var gulp=require('gulp');
// 载入gulp-less包,用于将less文件转换成css文件
var less=require('gulp-less');
 // 载入gulp-cssnano包,用于将css文件进行压缩
var cssnano=require('gulp-cssnano');
//载入gulp-concat包,用于将js文件进行合并
var concat=require('gulp-concat');
//载入gulp-uglify包,用于将js文件进行压缩
var uglify=require('gulp-uglify');
//载入gulp-htmlmin包,用于将html文件进行压缩
var htmlmin=require('gulp-htmlmin');

// 注册任务

// 1.LESS编译 压缩 合并
gulp.task('style',function(){
	//以下是执行style任务时自动执行的
	// 找到源文件
	//选择src/styles中包含.less的文件，去除包含_*.less的文件
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	//用于将less文件转换成css文件
	.pipe(less())		
	//用于将css文件进行压缩
	.pipe(cssnano())	
	//用于将src中的less文件经过转换压缩后拷贝到自动新增的dist文件夹
	.pipe(gulp.dest('dist/styles'))
	// 如果源文件变化自动进行刷新
	.pipe(browserSync.reload({stream:true}))

})

// 2.JS合并 压缩 混淆
gulp.task('script',function(){
	//找到src/scripts中的所有.js文件
	gulp.src('src/scripts/*.js')
	// 将src中的所有JS文件合并为一个all.js文件
	.pipe(concat('all.js'))
	// 将all.js文件进行压缩
	.pipe(uglify())
	//将这个all.js文件导出到dist/scripts中
	.pipe(gulp.dest('dist/scripts'))
	// 如果源文件变化自动进行刷新
	.pipe(browserSync.reload({stream:true}))
})

// 3.img复制
gulp.task('image',function(){
	// 找到src/images里面的所有图片
	gulp.src('src/images/*.*')
	// 将图片复制到dist/images中去
	.pipe(gulp.dest('dist/images'))
	// 如果源文件变化自动进行刷新
	.pipe(browserSync.reload({stream:true}))
})

// 4.html压缩并复制
gulp.task('html',function(){
	// 找到源文件
	gulp.src('src/*.html')
	// 进行压缩
	.pipe(htmlmin({
		//折叠空格
		collapseWhitespace: true,
		//去除注释
		removeComments:true
	}))
	// 输出
	.pipe(gulp.dest('dist/'))
	// 如果源文件变化自动进行刷新
	.pipe(browserSync.reload({stream:true}))
	
})



//启动一个服务,监视文件的变化,自动执行相应的操作
var browserSync=require('browser-sync');
gulp.task('service',function(){
	browserSync({
		server: {	//指定文件路径是在dist里面
			baseDir:'dist/'
		},
			
	}, function(err, bs) {
   		console.log(bs.options.getIn(["urls", "local"]));
	});

	//监视less文件的变化,执行style任务
	gulp.watch('src/styles/*.less',['style']);
	//监视script文件的变化,执行script任务
	gulp.watch('src/scripts/*.js',['script']);
	//监视images文件的变化,执行image任务
	gulp.watch('src/images/*.*',['image']);
	//监视html文件的变化,执行html任务
	gulp.watch('src/*.html',['html']);
})

