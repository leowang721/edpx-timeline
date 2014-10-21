/**
 * @file 数据对象 资源请求
 * @author Leo Wang(leowang721@gmail.com)
 */

var sys = require('sys');
var edp = require('edp-core');
var AbstractTimeLine = require('./AbstractTimeLine');
var dataKey = require('./dataKey');
var util = require('../util');

/**
 * 数据对象 资源请求
 * @param options
 *     options.startItem {Object} 对应的一条TimeLine数据，例如
 *     {
 *         "type": "ResourceSendRequest",
 *         "data": {
 *             "requestId": "20296.413",
 *             "url": "http://fengchao.baidu.com/nirvana/main.html?userid=630152&castk=bac57at74910fa13bd655#/entry/management~navLevel=account&level=plan&startTime=2014-10-12&endTime=2014-10-12&miniMode=0&pageNo=1&pageSize=50",
 *             "requestMethod": "GET"
 *         },
 *         "startTime": 86726591.683,
 *         "frameId": "20296.1"
 *     }
 */
function ResourceTimeLine (options) {
    options = options || {};
    AbstractTimeLine.apply(this, arguments);
    this.startItem = options.startItem || {};
    this.url = this.startItem.data.url;
    this.requestId = this.startItem.data.requestId;
}
sys.inherits(ResourceTimeLine, AbstractTimeLine);

var MATCH_KEYS = {};
for (var k in dataKey.REQUEST) {
    MATCH_KEYS[dataKey.REQUEST[k].key] = 1;
}

/**
 * 自动根据requestId或url整理出数据集中的timeline信息
 */
ResourceTimeLine.prototype.autoProcessWith = function (contextItem) {
    var me = this;
    if (!me.startItem || !me.startItem.data
        ||!me.startItem.data.requestId || !me.startItem.data.url) {
        edp.log.error('错误的ResourceTimeLine处理器的执行，没有合法的startItem数据！');
        return;
    }

    me.timeline = [];
    var requestId = me.startItem.data.requestId;
    var url = me.startItem.data.url;

    util.doEachLine({
        contextItem: contextItem,
        eachChild: function (child, line, lineIndex, list) {
            if (MATCH_KEYS[child.type]
                && (child.data.requestId == requestId || child.data.url == url)) {
                me.timeline.push(child);
            }
        },
        startIndex: me.startIndex
    });

    me.url = url;
    me.requestId = requestId;
    me.mimeType = determineResourceMimeType(me.timeline);
    me.type = determineType(me.timeline, me.mimeType);

    // 算出开始、结束时间
    me.startTime = me.startItem.startTime;
    var lastItem = me.timeline[me.timeline.length - 1];
    me.endTime = (lastItem.endTime 
        || (
            lastItem.children 
                ? lastItem.children[lastItem.children.length - 1].endTime
                : lastItem.startTime
        )
    );
};

/**
 * 返回去除timeDiff的相对开始时间
 */
ResourceTimeLine.prototype.getStartTime = function () {
    return (this.startTime - this.timeDiff);
};
/**
 * 返回去除timeDiff的相对结束时间
 */
ResourceTimeLine.prototype.getEndTime = function () {
    return (this.endTime - this.timeDiff);
};
/**
 * 返回消耗时间
 */
ResourceTimeLine.prototype.getSpentTime = function () {
    return (this.endTime - this.startTime);
};

function determineType (timeline, mimeType) {
    // 首先判断是不是ajax
    var isAjax = determineIsAjax(timeline);
    if (isAjax) {
        return 'xhr';
    }
    else if (mimeType) {
        var type = mimeType.split('/');
        switch (type[0]) {
            case 'application':
                switch (type[1]) {
                    case 'x-javascript':
                    case 'javascript':
                        return 'javascript';
                    case 'x-shockwave-flash':
                        return 'flash';
                    default:
                        return type[1];
                }
            case 'image':
                return 'image';
            case 'text':
            default:
                return mimeType;
        }
    }
    else {
        return 'unknown';
    }
}

function determineResourceMimeType (timeline) {
    var mimeType = null;
    timeline.some(function (item) {
        if (item.data && item.data.mimeType) {
            mimeType = item.data.mimeType;
            return true;
        }
    });

    return mimeType;
}

function determineIsAjax (timeline) {
    var isAjax = false;
    // 进判断是否有XHRReadyStateChange类型的数据
    timeline.some(function (item) {
        if (item.type === dataKey.REQUEST.XHR_STATE_CHANGE.key) {
            isAjax = true;
            return true;
        }
    });

    return isAjax;
}

module.exports = exports = ResourceTimeLine;