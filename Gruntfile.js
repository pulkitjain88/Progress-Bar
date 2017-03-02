module.exports = function(grunt) {
  grunt.initConfig ({
    pkg: grunt.file.readJSON('package.json'),

    /*============================================================
     Sass
     ============================================================*/
    sass: {
      compile: {
        options: {
          style: 'compressed'
        },

        files: {
          'src/css/style.min.css': 'src/scss/style.scss'
        }
      }
    },

    /*============================================================
     Scss lint
     ============================================================*/
    scsslint: {
     // allFiles: ['public/scss/**/*.scss'],

      options: {
        exclude: ['node_modules/bootstrap-sass/assets/stylesheets/**/*.scss']
      }
    },

    /*============================================================
     Code Duplication
     ============================================================*/
    jscpd: {
      sass: {
		path: ['src/scss/**/*'
		],
      },
      js: {
        path: 'src/js/custom/**/*.js'
      }
    },

    /*============================================================
     JS hint
     ============================================================*/
    // jshint: {
    //     all: ['Gruntfile.js', 'src/js/custom/**/*.js'],
    //     options: {
    //         loopfunc: true,
    //         reporterOutput: ""
    //     }
    // },

    /*============================================================
     Code Complexity
     ============================================================*/
    complexity: {
      generic: {
        src: ['src/js/custom/**/*.js'],
        options: {
          breakOnErrors: true,
          errorsOnly: false, // show only maintainability errors
          cyclomatic: [6], // or optionally a single value, like 3
          halstead: [20], // or optionally a single value, like
          maintainability: 100,
          hideComplexFunctions: false, // only display maintainability
          broadcast: true // broadcast data over event-bus
        }
      }
    },

    /*============================================================
     JS concatenation
     ============================================================*/
    concat: {
      modules: {
        src: ['src/js/custom/**/*.js'],
        dest: 'src/js/scripts.js'
      }
    },

    /*============================================================
     Uglify
     ============================================================*/
    uglify: {
      dest: {
        files: {
          'src/js/scripts.min.js': ['src/js/scripts.js']
        }
      }
    },

    /*============================================================
     Watch
     ============================================================*/
    watch: {
      js: {
        files: ['src/js/custom/**/*.js',
          'src/js/scripts.js'
		],
        tasks: ['concat', 'uglify']
      },
      sass: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass', 'scsslint'],
        options: {
          livereload: true
        }
      }
    },

    /*============================================================
     Githooks
     ============================================================*/
    githooks: {
      all: {
        'pre-commit': 'scsslint'
      }
    }

  });

  // Loads the required plugins.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-scss-lint');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-jscpd');
  grunt.loadNpmTasks('grunt-complexity');

  // Default tasks.
  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'watch']);

  // Executes test tasks.
  grunt.registerTask('test', ['scsslint', 'jscpd', 'complexity']);
  grunt.registerTask('testjs', ['jscpd:js', 'complexity']);
  grunt.registerTask('testsass', ['scsslint', 'jscpd:sass']);

};
