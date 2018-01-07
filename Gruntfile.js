module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');
  // Project configuration.
  grunt.initConfig({
	pkg : pkg,
    clean: {
      dev: {
        src: [ 'dev/*' ]
      },
      build: {
        src: [ 'build/*' ]
      },
    },
    copy: {
      dev: {
        cwd: 'src',
        src: [ '**'],
        dest: 'dev',
        expand: true
      },
      build: {
        cwd: 'src',
        src: [ '**'],
        dest: 'build',
        expand: true
      },
    },
    uglify: {
      build: {
        options: {
//           mangle: false
			banner : '/**\r * <%= pkg.name %> <%= pkg.version %>\r * Release date: <%= grunt.template.today("yyyy-mm-dd") %>\r */\r\r'
        },
        cwd: 'src',
        src: [ 'sourceCode/*.js' ],
        dest: 'build',
        expand: true
      }
    }
 });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask(
    'publishdev', 
    'Publish vor development', 
    [ 'clean:dev', 'copy:dev' ]
  );

  grunt.registerTask(
    'publishbuild', 
    'Publish for production use', 
    [ 'clean:build', 'copy:build', 'uglify:build' ]
  );

  grunt.registerTask('default', ['clean']);

};