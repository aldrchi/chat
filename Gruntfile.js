module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: 'routes/',      // Src matches are relative to this path.
                        src: ['*.js'], // Actual pattern(s) to match.
                        dest: 'build/',   // Destination path prefix.
                        ext: '.min.js'   // Dest filepaths will have this extension.
                    }
                ]
            }
        },

        removelogging: {
            dist: {
                src: "app.js",
                dest: "app-clean.js",

                options: {
                    // see below for options. this is optional.
                }
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
//    grunt.loadNpmTasks('grunt-contrib-uglify');


    // Default task(s).
//    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('rmlogs', ['removelogging'])

};