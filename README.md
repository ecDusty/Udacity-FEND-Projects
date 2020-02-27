# Erin's Development Projects

Welcome to my Udacity project builds. This is where all of the projects I build for my FEND program will be placed.

### Getting start with a project

I build with a gulp environment. Here I can test my site within a local development environment until it's to be published as live ready code. Every folder get get started in the same manner:

1) First ensure you have NodeJS install, this project used 12.14.1 (Personally I use NVM so I can run different NodeJS versions with each build, if needed)

2) Now use the following command: ```npm install```, making sure your inside the right project folder before you do. If you have yarn installed, ```yarn install``` works too.

3) Please wait for all assets to load.

4) Now I've created npm run commands that make using my gulp setup a bit easier. Please see the list here, and what they do:
  *  ```npm run dev```: "gulp --env=localDev",
  *  ```npm run live``` : Create the live version of your project. This will produced minified CSS, JS, HTML, and will shrink the images included in the project.
  *  ```npm run cleanup``` : Delete your current **dist** folder.
  *  ```npm run sass``` : Build just your CSS files of the project.
  *  ```npm run html``` : This will build out the html files of your project.

#### Attribution
Here I'll link to all sources that infomration, or images were pulled from for these projects.

 * [newspaper Icon](https://fontawesome.com/icons/newspaper?style=regular) - Used from font awesome
 * [Chalk blackboard background](https://unsplash.com/photos/DJUZjUYsLwQ) - By [Annie Spratt](https://unsplash.com/@anniespratt)