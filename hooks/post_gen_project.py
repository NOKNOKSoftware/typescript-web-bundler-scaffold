import subprocess

schema_dependencies = {
    'none': [],
    'preact': [ 'preact', 'regenerator-runtime' ],
    'react': [ 'react' ],
    'wp-element': []
}

schema_dev_dependencies = {
    'none': [
        "@babel/preset-env",
        "@babel/preset-typescript"
    ],
    'preact': [
        "aliasify",
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
    'react': [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    "wp-element": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-react-jsx",
        "@wordpress/babel-preset-default",
        "@wordpress/element",
        "@wordpress/babel-plugin-import-jsx-pragma",
    ]
}

# All Dependencies
dependencies = []
dev_dependencies = [
    '@babel/cli',
    '@babel/core',
    'babelify',
    'browserify',
    'gulp',
    'gulp-sourcemaps',
    'gulplog',
    'lodash.assign',
    'typescript',
    'vinyl-buffer',
    'vinyl-source-stream',
    'watchify',
    'tsify'
]

# Add schema dependent dependencies
dependencies += schema_dependencies[ "{{cookiecutter.jsx_scheme}}" ]
dev_dependencies += schema_dev_dependencies[ "{{cookiecutter.jsx_scheme}}" ]

# Postcss dependencies
if "{{cookiecutter.use_post_css}}" == "yes":
    dev_dependencies += [ "browserify-postcss", "postcss-import" ]

if len( dependencies ): 
    subprocess.run( 'npm install ' + ' '.join( dependencies ), shell=True, check=True )

subprocess.run( 'npm install ' + ' '.join( dev_dependencies ), shell=True, check=True )
subprocess.run( 'gulp build', shell=True )