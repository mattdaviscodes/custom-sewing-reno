module.exports = function (grunt) {
    require("grunt-browserify")(grunt);
    require("grunt-contrib-connect")(grunt);
    require("grunt-contrib-watch")(grunt);

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
        }
    });

    grunt.registerTask("default", ["dev"]);
    grunt.registerTask("dev", ["browserify:dev", "connect", "watch"]);
};
