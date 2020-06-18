# A highly opinionated Yeoman generator for typescript modules

![npm](https://img.shields.io/npm/v/generator-dodevops-typescript)

## Introduction

This is a highly opinionated [Yeoman](http://yeoman.io) generator for building Typescript-based modules with the following features:

* Complete [Grunt](https://gruntjs.com/)-based tasks to transpile and test your Typescript files
* [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/)-based testing framework
* [Istanbul](https://istanbul.js.org/)-based coverage calculation
* [Loglevel](https://github.com/pimterry/loglevel) Logger set up
* Support for [Bluebird](http://bluebirdjs.com/)-based promises (including testing capabilities based on [chai-as-promised](https://github.com/domenic/chai-as-promised))
* Code Style checking based on [ESlint](https://eslint.org/), [Typescript-eslint](https://typescript-eslint.io/) and [Prettier](https://prettier.io/) with some opinionated settings
* Git ignore set up for Node and major IDEs

## Usage

Install `yo` and `generator-dodevops-typescript` globally:

    npm install -g yo generator-dodevops-typescript

Create a new directory and run the generator

    mkdir my-project
    cd my-project
    yo dodevops-typescript

The generator will ask you a few questions and then you can start right away by opening then example class in `index.ts` in your favourite editor or IDE.
