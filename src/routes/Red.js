'use strict';

const redController = require('./../controllers/Red');

module.exports = function (router) {

    router.post('/', redController.aware);

};
