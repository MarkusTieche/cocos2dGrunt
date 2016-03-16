'use strict';
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    
	function log(err, stdout, stderr, cb) {
		console.log('Directory listing:\n' + stdout);
		cb();
	}
    
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		shell: {
			fnCmd: {
				command: function (version) {
					// `this` is scoped to the grunt instance
					if (version) {
						return 'echo current build version: ' + version;
					}

					return 'echo current build version: ' + this.version;
				}
			},
			callback: {
				command: 'ls',
				options: {
					callback: log
				}
			},
			withColor: {
				command: 'ls -G'
			},
            runAndroid: {
				command: 'cocos run -p android'
			},
            runWeb: {
				command: 'cocos run -p web'
			},
			error: {
				command: 'ls && exit 1',
				options: {
					failOnError: false
				}
			}
		}
	});

//	grunt.loadTasks('tasks');

//	grunt.registerTask('default', [
//		'shell'
//	]);
    grunt.registerTask('default', [
		'shell:fnCmd:<%= pkg.version %>'
	]);
    
    grunt.registerTask('run_android', [
		'shell:runAndroid'
	]);
    grunt.registerTask('run_web', [
		'shell:runWeb'
	]);
};
