# Docker Wordpress Env Scaffold
Automatic scaffolding for a new docker WordPress environment based on [docker-nginx-dev-env] (https://github.com/NOKNOKSoftware/docker-nginx-dev-env) (Check link for additional documentation)

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

