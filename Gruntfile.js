module.exports = function(grunt){

	grunt.initConfig({
		jshint: {
			all: {
                src: 'js/*.js',
                options: {
                	expr: true,
                	sub: true,
                	loopfunc: true
                }
            }
		},
		watch: {
			jshint: {
				files: ['js/*.js'],
				tasks: ['jshint']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('run', ['watch']);
};