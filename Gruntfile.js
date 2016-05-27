module.exports = function (grunt) {

    grunt.initConfig({


        shell: {
            dev: {
                command: 'node server.js'
            },

        },

        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function() { return <%= contents %> })',
                            {data: data}
                        );
                    }
                }
            }
        },

        sass: {
            dist: {
                options: {
                    update: true
                },
                files: [{
                    expand: true,
                    cwd: 'public_html/sass/',
                    src: ['main.scss'],
                    dest: 'public_html/css/out/',
                    ext: '.css'
                }]
            }
        },

        watch: {
            fest: {
                files: 'templates/*.xml',
                tasks: ['fest'],
                options: {
                    atBegin: true
                }
            },

            sass: {
                files: 'public_html/sass/**/*.scss',
                tasks: ['sass']
            },


            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
                options: {
                    livereload: true
                }
            }
            
        },
        
        concurrent: {
            target:  ['watch', 'shell'],
            options: {
                logConcurrentOutput: true,
            }
        },

        qunit: {
            all: ['./public_html/tests/index.html']        
        }

    });

    // подключть все необходимые модули
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-sass');


    // результат команды grunt
    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);

};
