/*globals module, require*/

module.exports = function (grunt) {
	"use strict";

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		clean: {
			build: {
				src: ["dist/*.min.js"]
			},
			ugly: {
				src: ["dist/*.ugly.js"]
			}
		},
		"closure-compiler": {
			build: {
				closurePath: ".",
				js: "dist/encryptscript.ugly.js",
				jsOutputFile: "dist/encryptscript.min.js",
				noreport: true,
				options: {
					compilation_level: "ADVANCED_OPTIMIZATIONS",
					externs: "demo/components/JES.min.js",
					language_in: "ECMASCRIPT5_STRICT",
					output_wrapper: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
									'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
									'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
									' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n%output%'
				}
			}
		},
		jslint: {
			build: {
				src: ["**/*.js"],
				exclude: ["demo/components/**/*.js", "node_modules/**/*.js"],
				directives: {
					white: true
				},
				options: {
					failOnError: false
				}
			}
		},
		uglify: {
			build: {
				files: {
					"dist/encryptscript.ugly.js": ["src/encryptscript.js"]
				}
			}
		}
	});

	grunt.registerTask("default", ["clean:build", "jslint", "uglify", "closure-compiler", "clean:ugly"]);
};