/*!
 * Created by vinxent on 2016/5/26.
 */

'use strict';

const redService = require('./../service/Red');

function Red() {

}

Red.prototype.aware = function* (next) {
    this.body = yield redService.aware();
};

module.exports = new Red();