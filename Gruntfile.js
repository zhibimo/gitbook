module.exports = function (grunt) {
    var path = require("path");

    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-bower-install-simple');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    // Init GRUNT configuraton
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'bower-install-simple': {
            options: {
                color:       true,
                production:  false,
                directory:   "theme/vendors"
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "theme/assets/style.css": "theme/stylesheets/website.less",
                    "theme/assets/print.css": "theme/stylesheets/ebook.less"
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: "gitbook",
                    baseUrl: "theme/javascript/",
                    out: "theme/assets/app.js",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    include: ["requireLib"],
                    paths: {
                        "jQuery": '../vendors/jquery/dist/jquery',
                        "lodash": '../vendors/lodash/dist/lodash',
                        "requireLib": '../vendors/requirejs/require',
                        "Mousetrap": '../vendors/mousetrap/mousetrap',
                        "lunr": '../vendors/lunr.js/lunr',
                        "URIjs": '../vendors/URIjs/src/',
                        "ace": '../vendors/ace-builds/src-noconflict/',
                        "QRCode": '../vendors/qrcode.js/qrcode'
                    },
                    shim: {
                        'jQuery': {
                            exports: '$'
                        },
                        'lodash': {
                            exports: '_'
                        },
                        'Mousetrap': {
                            exports: 'Mousetrap'
                        },
                        'lunr': {
                            exports: 'lunr'
                        },
                        'QRCode': {
                            exports: 'QRCode'
                        }
                    }
                }
            }
        },
        copy: {
            vendors: {
                files: [
                    {
                        expand: true,
                        cwd: 'theme/vendors/fontawesome/fonts/',
                        src: ['**'],
                        dest: 'theme/assets/fonts/fontawesome/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        watch: {
          files: ['theme/**/*'],
          tasks: ['build-book'],
          options: { spawn: false }
        },
        exec: {
          build_book: {
            command: 'gitbook build ./sample-book',
            stdout: true,
            stderr: true 
          }
        }
    });

    grunt.registerTask("bower-install", [ "bower-install-simple" ]);

    // Build
    grunt.registerTask('build', [
        'bower-install',
        'less',
        'requirejs',
        'copy:vendors'
    ]);

    grunt.registerTask('build-book', [
      'less',
      'requirejs',
      "exec:build_book"
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
