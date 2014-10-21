/**
 * @file 数据过滤
 * @author Leo Wang(leowang721@gmail.com)
 */

var sys = require('sys');
var edp = require('edp-core');
var AbstractProcessor = require('./AbstractProcessor');
var dataKey = require('../dataItem/dataKey');
var util = require('../util');

function FilterProcessor () {
    AbstractProcessor.apply(this, arguments);
}
sys.inherits(FilterProcessor, AbstractProcessor);

FilterProcessor.prototype.name = 'FilterProcessor';

// 仅保留了type为Program的数据
var ALLOWED_TYPE = {
    Program: 1
};

FilterProcessor.prototype.process = function (contextItem) {
    if (!Array.isArray(contextItem.data)) {
        contextItem.data = [];
        return [];
    }
    var newData = [];
    contextItem.data.forEach(function (item, index) {
        if (ALLOWED_TYPE[item.type]) {
            newData.push(item);
        }
    });
    contextItem.data = newData;
    return newData;
};

module.exports = exports = FilterProcessor;