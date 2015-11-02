module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'../assets/css/main.css' : 'scss/main.scss'
				},
				options: {
					style: "compressed",
					sourcemap: "none"
				}
			}
		},
		/*
		concat: {
		    options: {
		    	separator: ';\n',
		    },
		    dist: {
		    	src: ['public/js/zepto.js', 'public/js/app.js'],
		    	dest: '../public/static/js/app.js'
		    },
		},
		*/
		uglify: {
		    options: {
		      	mangle: {
		        	except: []
		      	}
		    },
		    my_target: {
		      	files: {
		        	'../assets/js/main.js': ['js/main.js']
		    	}
		    }
		},
  		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
			js: {
				files: '**/*.js',
				tasks: ['uglify']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default',['watch']);
}
