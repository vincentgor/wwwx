/*!
 * Created by vinxent on 2016/5/26.
 */
 
'use strict';

//const Promise = require('bluebird');

const exampleService = require('./../service/Example');

function Example() {

}

Example.prototype.add = function* (next) {
    this.body = yield exampleService.add();
};

module.exports = new Example();