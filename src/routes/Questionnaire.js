'use strict';

const questionnaireController = require('./../controllers/Questionnaire');

module.exports = function (router) {

    router.post('/', questionnaireController.add);

};
