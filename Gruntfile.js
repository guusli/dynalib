// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // configure nodemon
    nodemon: {
      dev: {
        script: 'server/app.js',
        options: {
          watch: ['server']
        }
      }
    },

    sass: {
      server: {
        options: {
          loadPath: [
            'client/bower_components',
            'client/app',
            'client/components'
          ],
          compass: false
        },
        files: {
          'client/app/app.css': 'client/app/app.scss'
        }
      }
    },
    wiredep: {
      task: {
        src: [
          'client/index.html', // .html support...
        ]
      }
    }

  });

  // load nodemon
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-wiredep');

  // register the nodemon task when we run grunt
  grunt.registerTask('default', ['sass', 'wiredep', 'nodemon']);

};