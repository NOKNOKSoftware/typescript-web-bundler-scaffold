# Typescript Web Bundler Scaffold
Automatic scaffolding for a typescript web bundles powered by gulp/babel/typescript. Geared towards WordPress development

## Prerequists:
Make sure you install the following
- Python 3.10 or later with dependencies

## Python 3.10 or later with dependencies
You can check if python is already installed by running the following command ```python --version```

Download Python [here](https://www.python.org/downloads/). 

### Python dependencies
Once installed, you can use the following command to install each of the required python dependencies.
``` sh
pip install cookiecutter
```

If you have any issues during dependency installation, try reinstalling python.


## Creating a new Typescript bundle project
Once all pre-requisites are installed, you can run the following command to scaffold a new bundler project.
``` sh
python -m cookiecutter https://github.com/NOKNOKSoftware/typescript-web-bundler-scaffold
```

## Cookiecutter properties
- ```package_slug``` - Set's the package name. This should be lowercase, with alphanumeric and dash characters only. This also sets the output folder name.
- ```jsx_scheme``` - Set's which react scheme you want to use. If not using react choose none. Each option is listed below.
  - none - No JSX scheme
  - react - Typical react scheme, good for scripts that aren't only the public frontend
  - preact -  React scheme but preact is used for lower bundle sizes (better for public frontends)
  - wp-element - For use with WordPress admin frontend only, uses built in WordPress scripts
- ```use_post_css``` - Allows importing of css files via typescript imports.

## Gulp Commands
- ```gulp build``` - Bundle files and export js to ```dist/``` directory
- ```gulp watch``` - Watch files in ```src``` for changes and automatically build when files are changed
