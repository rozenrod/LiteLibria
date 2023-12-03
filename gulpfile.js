const gulp = require("gulp");
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('gulp4-run-sequence');
const jsonEditor = require('gulp-json-editor');
const dom = require('gulp-dom');
const modifyFile = require('gulp-modify-file');
const zip = require('gulp-zip');

const sftp = require('gulp-sftp');

// Condig
const CACHE_PREFIX = 'Kaamira';
const CACHE_VERSION_MAJOR = 2;
const CACHE_VERSION_MINOR = 0;
// const CACHE_VERSION_PATCH = Date.now();
const CACHE_VERSION_PATCH = 23;
const CACHE_VERSION = CACHE_VERSION_MAJOR+'.'+CACHE_VERSION_MINOR+'.'+CACHE_VERSION_PATCH;



gulp.task('clean:archive', async function(){
	return await del('archive/**/*');
});
gulp.task('clean:public', async function(){
	return await del('public/**/*');
});

gulp.task('static_img', function() {
	return gulp.src('src/img/**/*')
		.pipe(gulp.dest('public/img'))
})

gulp.task('assets', function() {
	return gulp.src('src/assets/**/*')
		.pipe(gulp.dest('public'))
})

gulp.task('p2p', function() {
	return gulp.src('src/p2p/**/*')
		.pipe(gulp.dest('public/p2p'))
})

gulp.task('cloud', function() {
	return gulp.src('src/cloud/**/*')
		.pipe(gulp.dest('public/cloud'))
})

gulp.task('config', function() {
	return gulp.src("src/config.js")
  .pipe(modifyFile((content, path, file) => {
		return content.replace('Kaamira - 2.0.0', `${CACHE_PREFIX}-${CACHE_VERSION}`)
	}))
  .pipe(gulp.dest("public"));
})

gulp.task('useref', function(){
  return gulp.src('src/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('public'))
});

gulp.task('assemble', function() {
  return gulp.src('src/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.js', rename(function (path) {
			path.dirname += `-${CACHE_VERSION}`;
		})))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulpIf('*.css', rename(function (path) {
			path.dirname += `-${CACHE_VERSION}`;
		})))
		.pipe(gulp.dest('public'))
});

gulp.task('dom', function() {
  return gulp.src('public/index.html')
		.pipe(dom(function(){
				return this.querySelectorAll('body')[0].setAttribute('version', `${CACHE_PREFIX}-${CACHE_VERSION}`);
		}))
		.pipe(dom(function(){
			let element,SRC,HREF;

			for (let i = 0; i < this.querySelectorAll('link').length; i++) {
				element = this.querySelectorAll('link')[i]
				HREF = element.href;
				element.setAttribute('href', HREF.replace('build/', `/build-${CACHE_VERSION}/`));
			}

			for (let i = 0; i < this.querySelectorAll('script[src]').length; i++) {
				element = this.querySelectorAll('script[src]')[i]
				SRC = element.src;
				if(SRC == 'build/main.min.js') element.setAttribute('defer', '');
				element.setAttribute('src', SRC.replace('build/', `/build-${CACHE_VERSION}/`));
			}
		}))
		.pipe(gulp.dest('public'))
});

gulp.task('images', function () {
	return gulp.src("src/img/**/*")
		.pipe(cache(imagemin()))
		.pipe(gulp.dest("public/img"));
});

gulp.task("filesToCache", function(){
  return gulp.src("src/filesToCache.json")
		.pipe(jsonEditor(function(json){
			json.forEach((value, key, map) => {
				json[key] = value.replace('build', `build-${CACHE_VERSION}`)
			});
			return json;
		}))
		.pipe(gulp.dest(`public`));
});

gulp.task("manifest", function(){
  return gulp.src("src/manifest.json")
  .pipe(jsonEditor({
    'version': CACHE_VERSION
  }))
  .pipe(gulp.dest("public"));
});

gulp.task("sw", function(){
  return gulp.src("src/sw.js")
	.pipe(modifyFile((content, path, file) => {
		let newContent = content.replace(`CACHE_PREFIX = 'Kaamira'`, `CACHE_PREFIX = '${CACHE_PREFIX}'`)
		.replace(`CACHE_VERSION_MAJOR = 2`, `CACHE_VERSION_MAJOR = '${CACHE_VERSION_MAJOR}'`)
		.replace(`CACHE_VERSION_MINOR = 0`, `CACHE_VERSION_MINOR = '${CACHE_VERSION_MINOR}'`)
		.replace(`CACHE_VERSION_PATCH = 0`, `CACHE_VERSION_PATCH = '${CACHE_VERSION_PATCH}'`);
		
		return newContent;
	}))

  .pipe(gulp.dest("public"));
});

gulp.task("archive", function(){
  return gulp.src('public/**/*')
		.pipe(zip(`release.zip`))
		.pipe(gulp.dest('archive'))
});

gulp.task('build', function (callback) {
  runSequence(
		'clean:public',
		['static_img', 'config', 'images', 'assemble', 'filesToCache', 'manifest', 'assets', 'p2p', 'cloud'], 
		'dom',
		'sw',
		'clean:archive',
		'archive',
    callback
  )
})


gulp.task('ssh', function () {
    return gulp.src('public/**/*')
        .pipe(sftp({
            host: '192.168.0.200',
			auth: 'keyMain',
			remotePath: '/home/rozenrod/webapps/server.litelibria.com/'
        }));
});

gulp.task('deploy', function (callback) {
	runSequence(
		  'build',
		  'ssh',
		  'clean:public',
		  'clean:archive',
	  callback
	)
  })