'use strict';
var path = require('path');
function absolutePath(file) {
    return path.join(__dirname, file);
}
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: { // https://github.com/nDmitry/grunt-autoprefixer
            options: {
                browsers: ['> 1%', 'bb 10', 'ie 8', 'ie 9'],
                remove: true/*,
                 map: {
                 inline: false
                 }*/
            },
            no_dest: {
                src: 'css/styles.css' // output file
            }

        },

        cssmin: {
            options: {},
            minify: {
                src: ['css/styles.css'],
                dest: absolutePath('css/styles.min.css')
            }
        },

        watch: {
            css: {
                files: ['css/styles.css'],
                tasks: ['default']
            }
        }

    });


    // register task
    grunt.registerTask('default', ['autoprefixer', 'cssmin']);
    grunt.registerTask('dev', ['watch']);

};
