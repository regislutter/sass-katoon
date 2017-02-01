'use strict';
module.exports = function(grunt) {
    grunt.initConfig({

        connect: {
            server: {
                options: {
                    port: 8888,
                    base: 'www'
                }
            }
        },

        watch: {
            'www-src': {
                options: {
                    livereload: true
                },
                files: ['www-src/Source/**/*.js'],
                tasks: ['exec:moobuild']
            },
            'sass': {
                files: ['sass/*.scss'],
                tasks: ['sass'],
            },
            'css': {
                options: {
                    livereload: true
                },
                files: ['css/*.css'],
                tasks: [],
            },
            'html': {
                files: ['**/*.html'],
                tasks: [],
            }
        },

        exec: {
            moobuild: {
                command: 'www-src/build > www/js/app.js'
            },
            package: {
                command: 'zip -r "exports/sass.zhtml" www/*'
            },
            convert: {
                command: 'cd excels; node import.js'
            },
            "push-dev": {
                command: 'git add -A; git commit -m "New patient import"; git push origin development'
            }
        },

        sass: {
            dist: {
                options: {
                    trace: true,
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'sass/',
                    src: ['app.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('build', ['exec:package']);
};