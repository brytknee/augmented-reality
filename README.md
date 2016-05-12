# Fire framework

Below are instructions on how to create a Bootstrap site using a SASS preprocessor.

## Setup
- Clone the repo and navigate via Terminal to that folder
- Run `npm install`

If you do not have npm, follow these instructions. If you do, continue to next section:

- Run `brew`. If command is not found, you need to install Brew
`ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

- Install npm
`brew install node`

- Install grunt
`npm install -g grunt-cli`

## Workflow

Next run `grunt init` to copy the bootstrap files and compile SASS for the first time into the css folder.

You can now edit the files in the /sass folder to make changes. Start by reviewing and editing variables in the `/assets/sass/base/_variable-overrides.scss` file.

## Getting Started
Run `grunt browsersync` to begin development. This will load up the `index.html` file in your browser and you'll begin to see your changes made live.

Alternatively, after you've run the initial `grunt init` you can then use `grunt watch` to continuously watch the sass folder for changes, or you can run `grunt sass` to just do a single run and compile the sass.

## Overriding styles
The `/assets/sass/base/_variable-overrides.scss` file is generally where you will
the majority of your time overriding the variables provided by the [Bootstrap
Framework].

The `/assets/sass/_bootstrap.scss` file is nearly an exact copy from the
[Bootstrap Framework Source Files]. The only difference is that it injects the
`_variable-overrides.scss` file directly before it has imported the[Bootstrap
Framework]'s `_variables.scss` file. This allows you to easily override variables
without having to constantly keep up with newer or missing variables during an
upgrade.

The `/assets/sass/style.scss` file is the glue that combines the
`_bootstrap.sass` and `_overrides.scss` files together.

## Adding styles
Creating a partial in any of the `styles` subfolders will automatically add that partial to the main `styles.css` file. It is recommended that you create small, focused .scss files for each component, section, and page of the site. This makes the site more modular and easy to maintain.


[Bootstrap Framework]: http://getbootstrap.com
[Bootstrap Framework Source Files]: https://github.com/twbs/bootstrap/releases
[SASS]: http://sass-lang.com/
