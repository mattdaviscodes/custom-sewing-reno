module.exports = function (grunt) {
    require("grunt-browserify")(grunt);
    require("grunt-contrib-connect")(grunt);
    require("grunt-contrib-watch")(grunt);
    require("grunt-contrib-copy")(grunt);
    require("grunt-contrib-uglify")(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        browserify: {
            dev: {
                src: ["src/**/*.js"],
                dest: "bundle.js",
                options: {
                    transform: [["babelify", {"presets": ["es2015"]}]],
                    browserifyOptions: {debug: true}
                }
            },
            build: {
                src: ["src/**/*.js"],
                dest: "docs/bundle.js",
                options: {
                    transform: [["babelify", {"presets": ["es2015"]}]],
                    browserifyOptions: {debug: true}
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                }
            }
        },
        watch : {
            js: {
                files: [
                    'src/**/*.js'
                ],
                tasks: ["browserify:dev"],
            },
        },
        copy: {
            build: {
                files: [
                    {expand: false, src: ["index.html", "style.css"], dest: "docs/"},
                    {expand: false, src: ["img/*"], dest: "docs/"}
                ]
            }
        },
        uglify: {
            build: {
                files: {
                    'docs/bundle.js': ['docs/bundle.js']
                }
            }
        }
    });

    grunt.registerTask("default", ["dev"]);
    grunt.registerTask("dev", ["browserify:dev", "connect", "watch"]);
    grunt.registerTask("build", ["copy:build", "browserify:build", "uglify:build"])
};
