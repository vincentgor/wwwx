'use strict';

const exampleController = require('./../controllers/Example');

const loginCheck = require('./../middleware/loginCheck');

module.exports = function (router) {

    router.all('/', loginCheck.checkOffLine, exampleController.add);

};
