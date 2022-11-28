## Overview (22 November 2022)

- Run a [Buddy Live Backup] before carrying out any live changes.
- To preview the dev theme in your browser, refer to the URL in the Shopify CLI terminal.
- Never merge direct to `master` (try to merge to `development`, then to `review`, then to `master`). At very least, merge to `review`, and then review to `master`.
- Check if there are Buddy pipelines for [review] and [production] deployment.


## Requirements

1. Node 19.1.0
2. Gulp (CLI 2.3.0 Local 4.0.2)
3. Shopify CLI 3.23.0


## Getting setup 🚀

You will need to install:

 1. [Node](https://nodejs.org/en/download/)
 2. [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)
 3. [Shopify CLI](https://shopify.dev/themes/tools/cli/install)

Confirm all are installed by running the following commands in your terminal:

```
node -v
gulp -v
shopify version
```


### Node

Required by Gulp and Shopify CLI.

#### Setup

If you install Homebrew first it will install Node for you.

I would recommend deleting the node_modules folder by running `rm -rf node_modules`, and then running `npm install` with required node version running (using npm this can be done using `nvm use 19` to set node to v19).

#### Usage

With the node envionment setup, we will just be using Shopify CLI and Gulp when working on Shopify themes.


### Gulp

Feel free to review the gulpfile.js but as a quickover, we are mainly just uglifying and merging the SCSS/JS files into a single CSS/JS file. In hindsight, we should probably review this in the near future, and split the CSS/JS out into individual files (maybe per template) rather than trying to serve everything on the site into two files. 

The icons folder will accept svgs, it will minify them and strip out any comments or unnessarcy spacing (and also attributes such as class; important to retain if used for css animation, in which case comment out this function in gulpfile.js). It will also prefix the file name with 'icon-' if it doesn't exist, and drop the icon within the snippets folder.

#### Setup

With Node installed and configured, let's install Gulp locally, and download the plugins we need. This is a really straight forward process.

If the project already has a gulpfile.js file in the dev folder (usually `dev` or `src` folder within root of project directory), then just run the `npm install` terminal command to download all the gulp plugins needed.

If installing into new project, then use `npm init` command in dev directory to setup new package.json file. Then run `npm install gulp` command to install Gulp.

#### Usage

Run a separate instance of terminal in the dev folder (usually `dev` or `src` folder within root of project directory), and run the `gulp` watch command (sometimes it might be `gulp watch` might be required) from there. 

Gulp will then process the files, and drop them in assets, in which Shopify CLI will see the changes and push them up to the Shopify Store. 


### Shopify CLI

The Shopify CLI dev command will watch for changes in the following folders:

 - Assets
 - Config
 - Layout
 - Locales
 - Sections
 - Snippets
 - Templates

#### Setup

It is recommended to always have at least two Shopify themes in a store. Firstly a development theme in which to actively built and test a feature or fix (using a theme name that reflects the project/task URI and github branch name). Then a final production theme which we deploy to once the client has approved a development theme. An intermediary review theme can be used to combine multiple developments prior to deploying to production theme (such as if multiple developers have worked on different features or fixes, this intermediary theme can be used to fix merge issues before being reviewed).

Installing Shopify CLI 3.x was tested on OS Ventura 13.0.1 and therefore is recommended.

##### Ignored files

Within the `.shopifyignore` file, we ignore the following theme files:
- config/settings_data.json 
- templates/*.json
- locales/*.json

The reason we ignore these files from Shopify, is because they will be different per store, so we can't safetly sync changes. 

#### Usage

Run a separate instance of terminal in the root of project directory.

We first need to log into the Shopify store. If already logged into another account, then log out using `shopify auth logout` via Shopify CLI in terminal. Each of the next steps is going to prompt you for login first, followed by a prompt in terminal to select theme from presented Shopify CLI list.

If not already downloaded and ready locally, you will need to pull down your theme using `shopify theme pull --store {store-name}` command in terminal to work on it locally. Once a theme is locally ready, you'll need to working on the theme locally using `shopify theme dev` command in terminal to watch for your changes.


### Theme Version Build

#### Setup

With Node and Gulp installed and configured, let's install gulp-bump and yargs.

If installing into new project, then use `npm install gulp-bump --save-dev` command in dev directory to setup gulp-bump for Gulp. Then run `npm install yargs --save-dev` command to install yargs for Gulp. And finally, run `npm install fs` command to setup required Gulp includes for the snippet versioning control (can be removed from theme.liquid and gulpfile.js if not desired).

Running `gulp` command in terminal will trigger theme version bump. Refer to gulpfile.js for gulp-bump parameter usage.