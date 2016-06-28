/*!
 * Created by vinxent on 2016/5/26.
 */

'use strict';

const questionnaireService = require('./../service/Questionnaire');

function Questionnaire() {

}

Questionnaire.prototype.add = function* (next) {
    this.body = yield questionnaireService.add();
};

module.exports = new Questionnaire();