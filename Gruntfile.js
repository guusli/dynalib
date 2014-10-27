// Gruntfile.js
module.exports = function(grunt) {

  var localConfig = require('./server/config/local.env');

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

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['server/**/*.spec.js']
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
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
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-karma');

  // register the nodemon task when we run grunt
  grunt.registerTask('default', ['sass', 'wiredep', 'nodemon']);
  grunt.registerTask('test', ['env:all', 'env:test', 'mochaTest']);
  grunt.registerTask('clientTest', ['env:all','karma']);

};