# Erin's Development Projects

Welcome to my Udacity project builds. This is where all of the projects I build for my FEND program will be placed.


## Folder Layout

There is just the 1 folder that is important when it comes to your build:
    * _app_: Contains the source code of your website. Basically the easy to read and edit version of the site's CSS, JS, and HTML files.

##### The App folder
Now this app folder has several parts to it:
    *_components_: Contains the component code sections that are required to build the site. Each component will have the required CSS and JS needed for it to function
    *_images_: Images, SVGs, and any media assets for the site
    *_js_: Primary JS file for the site. This JS file will import the required components as needed
    *_scss_: Primary Styles of the site.
    *_pages_: HTML Pages of the site. These HTML pages use nunjucks to be rendered.
    *_templates_: These are the template modules of nunjucks, used to build the HTML Pages.
    *_vendor_: These are required vendor code bases that the site make use of. Usually just the minified usable code that the site makes use of. Like Swiper-JS, jQuery, and other libraries

When you have gulp up & running and are testing/ distributing your site, you'll see 1 more folders being created during this process:
    *_dist_: This is the distribution folder for the hosted site. Depending if your in development mode, or live will determine if the code within here is ready for a test site, or a live facing site. Basically if files are minified, and JS has been converted to ES5 for compatibility.

### Getting start with a project

I build using the gulp toolkit. Here I can test my site within a local development environment until it's to be published as live ready code. Every website build gets started in the same manner:
As I developer on a Windows machine, these instructions are for windows users using Git's Bash command line (Instead of powershell), but for the most part I believe they should work on Mac's as well.

1. First ensure you have NodeJS install, this project used 12.14.1 (Personally I use NVM so I can run different NodeJS versions with each build, if needed)

2. Make sure Gulp is installed globally. If not then install Gulp globally - _using command line_
    * Make sure to include the '-g' flag. This tells npm to install it globally.
    ```sh
    $ npm install gulp -g
    ```

3. Run npm install program - _using command line_
   * As you have already downloaded my project, you have my **package.json** file, which has a list of all the dependencies and dev-dependencies needed for the project. By running 'npm install', your tell npm to run it's 'install' package on all the dependencies & dev-dependencies located within the package.json file. This can also be done using yarn if you have it installed.
   * This is quicker than installing each gulp package required seperately
     _* Make sure your are in the repository folder before you start the npm install process_
     ```sh
     $ npm install
     ```
     If using yarn
     ```sh
     $ yarn install
     ```

4. Please wait for all assets to load. It can take some time

5. Start testing your website. Just run the npm ```dev``` function. This will create the test version of your site within the created 'dev' folder and start a local server.
   ```sh
   $ npm run dev
   ```

   a. How the local server works using ```browser-sync``` and ```gulp-watch```.
     * Using ```npm run dev``` you can launch a local version of the website. **Gulp's Watch** will watch to see if any changes are made to the source files, create the dev version of those files, than **Browser-Sync** will update the browser accordingly.
     ```sh
     $ npm run dev
     ```

     * Should you like to make any changes to the site and make it your own, just start editing the files within the 'app' folder, **Serve** will handle the rest.

6. Run your Production ready Site
   * You're finished editing the site to your liking, give it one last test and run the 'serve:dist' task. This will export you project to the 'dist' folder while also creating the smallest version of each file.
   ```sh
   $ npm run live
   ```

### Explaining the NPM Functions

Now I've created npm run commands that make using my gulp setup a bit easier. Please see the list here, and what they do:
  *  ```npm run dev```: This cleans out the distribution folder, then builds a dev version of your site, creating the CSS, JS, and html files that still have comments & source maps to make life easy while developing
  *  ```npm run live``` : Cleans out the distribution folder, then creates the live version of your project. This will produced minified CSS, JS, HTML, and will shrink the images included in the project.
  *  ```npm run cleanup``` : Delete your current **dist** folder.
  *  ```npm run sass``` : Build just your CSS files of the project.
  *  ```npm run html``` : This will build out the html files of your project.


#### Attribution
Here I'll link to all sources that infomration, or images were pulled from for these projects.

 * [GO-CSS]: <https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery> "Google's Optimized CSS Delivery"
 * [GitHub Pages]: <https://pages.github.com/> "GitHub hosting solution GitHub Pages"
 * [Node JS]: <https://nodejs.org/en/> "Node.JS's main page"
 * [newspaper Icon](https://fontawesome.com/icons/newspaper?style=regular) - Used from font awesome
 * [Chalk blackboard background](https://unsplash.com/photos/DJUZjUYsLwQ) - By [Annie Spratt](https://unsplash.com/@anniespratt)