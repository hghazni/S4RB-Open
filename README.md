# CPMU - Complaints Per Million Units


[By Haroon Ghazni](http://www.hghazni.com)

This is my **WIP** project for S4RB. An app that essentially calculates the **CPMU (Complaints Per Million Units)** in monthly and quarterly figures. For the Front End I'm using **Angular 5**, **Materialze** and **SCSS**. For the Back End I'm utilising the **JSON REST API** Database which I'll be communicating with using **basic ES6 JavaScript/TypeScript** and **ReactveX**. I also used plugins such as **Moment.js** to help sort the Timestamps into useable dates for Monthly (MM, YYYY) and Quarterly (YYYY).

![Example Reporting Porta](/example-2.png "Example Reporting Portal")

There are error handlers built into the app but I've not yet implented Unit testing. There is however **End-to-End testing** in the form of **Karma Jasmine**. Due it being native it's quite at making suggestions as well as catching errors. 

> Just to note that though this project isn't 'completley' finished due to time constraints. Had I had enough time I would have implemented the Quarterly CPMU calculations that I've correctly calculated into the view. Then proceeded to do the final bit which is the 'missing months' calculation. Which is the only real thing missing from this project...However I feel this gives an accurate representation of my confidence in tackling new frameworks, technologies and picking up new programming methodologies in a short space of time.

There is a lot of refinement that could go into this. Larger functions could be broken down. Quite a few methods could be implemented in Services that could be fed into components. I could implement more Unit tests and try out **'Protractor'** for End to End testing.

## JSON REST Server

Run `json-server --watch db.json` to start JSON DB on `http://localhost:3000/`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
