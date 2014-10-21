/**
 * @file
 * @author Leo Wang(leowang721@gmail.com)
 */

var fs = require('fs');
var edp = require('edp-core');

var util = require('./index');
var dataKey = require('../dataItem/dataKey');

function ProcessContextItem (options) {
    options = options || {};
    this.data = options.data || [];
    this.path = options.path;
    this.ua = options.ua;
    this.startIndex = options.startIndex || 0;
    this.endIndex = options.endIndex || (this.data.length - 1);
    this.startMark = options.startMark;
}

ProcessContextItem.prototype.read = function (path) {
    var me = this;

    if (path) {
        me.path = path;
    }

    if (!me.path) {
        edp.log.error('没有指定path，read不能！');
        return;
    }

    var data = JSON.parse(
        fs.readFileSync(me.path, { encoding: 'utf8' })
    );
    me.ua = data[0];
    me.data = data.slice(1);

    if (me.startMark) {
        // 需要匹配一次，找到对应的行
        var actureStartIndex = util.doEachLine({
            contextItem: me,
            eachChild: function (child, childData, line, list) {
                if (child.type == dataKey.REQUEST.SEND.key
                    && child.data.url.indexOf(me.startMark) > -1) {
                    // found! set and break
                    me.timeDiff = child.startTime
                    return true;
                }
            }
        });
        me.data = me.data.slice(actureStartIndex);
        me.startIndex = actureStartIndex;
    }
};

module.exports = exports = ProcessContextItem;