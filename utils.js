'use strict';

var utils = {};

utils.getFileNameFromFileStr = function (fileStr) {
    return fileStr.substr(0, fileStr.indexOf('.'));
};

module.exports = utils;

