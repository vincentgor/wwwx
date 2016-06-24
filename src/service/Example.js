'use strict';

const Promise = require('bluebird');

//const exampleModel = require('./../models').Example;

function Example() {

}

Example.prototype.add = function () {
    return Promise.resolve(0);
};

module.exports = new Example();