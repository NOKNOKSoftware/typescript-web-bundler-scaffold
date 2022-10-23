'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var log = require('gulplog');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var tsify = require('tsify');
var babelify    = require( 'babelify' );

var opts = {
    entries: [ './src/index.ts' ],
    debug: true
};

{% if cookiecutter.jsx_scheme == "none" -%}

var babelifyOpts = {
    sourceMaps: true,
    presets: [
        [ "@babel/preset-env" ],
        [ "@babel/typescript" ]
    ],
}

{% elif cookiecutter.jsx_scheme == "preact" -%}

var babelifyOpts = {
    sourceMaps: true,
    presets: [
        [ "@babel/preset-env" ],
        [ "@babel/preset-react", { jsxPragma: "h" } ],
        [ "@babel/typescript",   { jsxPragma: "h" } ],
    ],
    plugins: [
        ["@babel/transform-react-jsx", { pragma: "h" }],
    ],
    global: true
}

var aliasifyOpts = {
    global: true,
    verbose: true,
    aliases: {
        "react": "preact/compat",
        "react-dom": "preact/compat"
    }
}

{% elif cookiecutter.jsx_scheme == "react" -%}

var babelifyOpts = {
    sourceMaps: true,
    presets: [
        [ "@babel/preset-env" ],
        [ "@babel/preset-react" ],
        [ "@babel/typescript" ],
    ],
    plugins: [
        ["@babel/transform-react-jsx", { pragma: "h" }],
    ],
    global: true
}

{% elif cookiecutter.jsx_scheme == "wp-element" -%}

var babelifyOpts = {
    sourceMaps: true,
    presets: [
        "@wordpress/babel-preset-default"
    ],
    plugins: [
        [ '@babel/plugin-proposal-class-properties' ],
        [ '@wordpress/babel-plugin-import-jsx-pragma', {
            scopeVariable: 'createElement',
            scopeVariableFrag: 'Fragment',
            source: '@wordpress/element',
            isDefault: false,
        } ],
        [ '@babel/plugin-transform-react-jsx', {
            pragma: 'createElement',
            pragmaFrag: 'Fragment',
        } ]
    ]
}

{% endif -%}

function bundle( b ) {
    b
    {%- if cookiecutter.use_post_css == "yes" %} 
        // Transform CSS files using postcss
        .transform( 'browserify-postcss', {
            // basedir: __dirname + '/src',
            inject: true,
            global: true
        } )
        
    {%- endif %}
        
        .transform( babelify, babelifyOpts )
        .plugin(tsify, { target: 'es6' })
        
    {%- if cookiecutter.jsx_scheme == "preact" %} 
        .transform( 'aliasify', aliasifyOpts )
    {%- endif -%}
    ;

        b.on( 'update', () => rebundle( b ) );
        b.on( 'log', log.info );

    
    return rebundle( b );
}

function rebundle( b ) {

    return b
        .bundle()
        // log errors if they happen
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source('bundle.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
            // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./dist'));
}

gulp.task( 'build', () => bundle( browserify( opts ) ) );
gulp.task( 'watch', () => bundle( watchify( browserify( assign({}, watchify.args, opts) ) ) ) );