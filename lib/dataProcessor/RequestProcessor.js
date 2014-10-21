/**
 * @file 获取所有请求信息的处理器
 * @author Leo Wang(leowang721@gmail.com)
 */

var sys = require('sys');
var edp = require('edp-core');
var AbstractProcessor = require('./AbstractProcessor');
var dataKey = require('../dataItem/dataKey');
var ResourceTimeLine = require('../dataItem/ResourceTimeLine');
var util = require('../util');

function RequestProcessor () {
    AbstractProcessor.apply(this, arguments);
}
sys.inherits(RequestProcessor, AbstractProcessor);

RequestProcessor.prototype.name = 'RequestProcessor';

RequestProcessor.prototype.process = function (contextItem) {
    var me = this;

    var timeDiff = contextItem.timeDiff || 0;
    // 寻找到所有的被标记为请求的数据
    var requestList = [];
    util.doEachLine({
        contextItem: contextItem,
        eachChild: function (child, line, lineIndex, list) {
            if (child.type === dataKey.REQUEST.SEND.key) {
                requestList.push(new ResourceTimeLine({
                    startItem: child,
                    startIndex: lineIndex,
                    timeDiff: timeDiff
                }));
            }
        }
    });

    var total = requestList.length;
    requestList.forEach(function (eachReq, index) {
        edp.log.write(
            '[' + me.name + '] %s [%d/%d]',
            eachReq.url.substring(0, 100)
                + (eachReq.url.length > 100 ? '...' : ''),
            index + 1, total
        );
        eachReq.autoProcessWith(contextItem);
    });

    // 重新整理数据for contextItem.request
    // 整理出一个data以url为key存储数据
    // 整理byOrder按请求顺序存储url
    // 整理出byType按类型存储url
    var request = {
        data: {},
        byOrder: [],
        byType: {}
    };

    requestList.forEach(function (item) {
        var url = item.startItem.data.url;
        request.data[url] = item;
        request.byOrder.push(url);
        request.byType[item.type] || (request.byType[item.type] = []);
        request.byType[item.type].push(url);
    });
    contextItem.request = request;

    return requestList;
};

module.exports = exports = RequestProcessor;