
Huskify projekti
================

Version 1.0.2

# Description
Huskify is a sledge dog organizing web application writen for Ossi Kaltti. It allows you to quickly organize dogs and sledges after adding them. Print button shows a printable page of the dogs and sledges in order.

There is two main goal for this Angular web application:
  Learn Angular programming and other web technologies
  Ease Ossi's trouble when organizing sledges

# TODO list for this application
- [x] Add a link to your home page
- [x] Fix quick modifying bug
- [x] Update Gulp task so that it uses minified files
- [x] Minify/Uglify only own code and files
- [x] Write automated deployment script, do this only if bored
- [x] Add Google Analytics
- [x] Add support for source maps into Gulp | https://www.npmjs.org/package/gulp-sourcemaps
- [x] Add internationalization, fi_FI, en_US
- [x] Font Awesome icons included to the css file and check button icons work. Bower component Font Awesome icons is already installed.
- [ ] Write a blog post about Huskify

# Improvement suggestion for this application, only if you are really bored!
- [ ] Update color scheme, pick a scheme with color scheme generator
- [ ] Write backend to allow login and saving history
- [ ] Statistics page which shows historical data, how often huskies have run, distances and etc.
- [ ] Setup Angular Html5 mode for connect and extremehuskies


# Tutorials and quides

## Executing Unix commands with Node.js
Execute A Unix Command With Node.js
http://www.dzone.com/snippets/execute-unix-command-nodejs

Copy files to another machine using SSH
http://unix.stackexchange.com/questions/106480/how-to-copy-files-from-one-machine-to-another-using-ssh

http://www.cyberciti.biz/faq/unix-linux-execute-command-using-ssh/

## Angular HTML 5 mode

How to set up .htaccess mod_rewrite rules
  http://www.josscrowcroft.com/2012/code/htaccess-for-html5-history-pushstate-url-routing/

How to configure angular application
  http://scotch.io/quick-tips/js/angular/pretty-urls-in-angularjs-removing-the-hashtag

Angular location provider configuration
  https://docs.angularjs.org/guide/$location

Changes needed to the code
  $locationProvider.html5Mode(true);
