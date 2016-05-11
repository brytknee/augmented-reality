module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass_directory_import: {
            options: {
                quiet: true,
            },
            files: {
                src: ['assets/sass/**/_all.scss']
            }
        },

        // Compile SASS files into minified CSS.
        sass: {
            options: {
                includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: [
                    {'assets/css/style.css':'assets/sass/style.scss'},
                    {
                        expand: true,
                        cwd: 'assets/sass/pages',
                        src: ['*.scss'],
                        dest: 'assets/css',
                        ext: '.css'
                    }
                ]
            }
        },

        // Watch these files and notify of changes.
        watch: {
            grunt: { files: ['gruntfile.js'] },

            html: { files: ['*.html'] },

            sass: {
                files: [
                    'assets/sass/*.scss',
                    'assets/sass/**/*.scss'
                ],
                tasks: ['sass_directory_import', 'sass']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'assets/css/*.css',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        }

    });

    // Load externally defined tasks.
    grunt.loadNpmTasks('grunt-sass-directory-import');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-php');

    // Establish tasks we can run from the terminal.
    grunt.registerTask('init', ['sass']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('browsersync', ['browserSync', 'watch']);
}
