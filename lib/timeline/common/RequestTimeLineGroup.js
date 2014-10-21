/**
 * @file 请求类一次请求组
 * @author Leo Wang(leowang721@gmail.com)
 */

var sys = require('sys');
var TimeLineGroup = require('./TimeLineGroup');
var RequestTimeLineItem = require('./RequestTimeLineItem');
var doEachLine = require('./processor/doEachLine');
var config = require('./config');

/**
 * TimeLine的分组 - 请求类
 * @constructor
 * @extends {TimeLineGroup}
 * @param {Object} options
 * {
 *     desc: {string},  // 描述信息
 *     detail: {Object},  // 可以传入数据，以供后续使用
 *     timeDiff: {number},  // 时间差异
 * }
 */
function RequestTimeLineGroup (options) {
    TimeLineGroup.call(this, options);
    this.requestId = options.requestId;
    this.valid = false;
}
sys.inherits(RequestTimeLineGroup, TimeLineGroup);

/**
 * 推入一个RequestTimeLineItem对象
 * @type {RequestTimeLineItem} item
 */
RequestTimeLineGroup.prototype.push = function (item) {
    if (item.requestId === this.requestId) {
        if (this.children.length == 0) {
            this.startTime = item.startTime;
        }

        this.children.push(item);
        this.endTime = item.endTime;
    }
    else {
        console.log(chalk.red('requestId not match, not pushed!'));
    }
};

RequestTimeLineGroup.prototype.setStartToRecieve = function (val) {
    this.startToRecieve = val - this.timeDiff;
};

// 请求流程名称定义
var REQ_TYPE_KEY = {
    SEND: config.TYPE.REQUEST.SEND.key,
    START_RECIEVE: config.TYPE.REQUEST.START_RECIEVE.key,
    RECIEVE: config.TYPE.REQUEST.RECIEVE.key,
    FINISH: config.TYPE.REQUEST.FINISH.key,
    XHR_STATE_CHANGE: config.TYPE.REQUEST.XHR_STATE_CHANGE.key
};

// 请求流程的具体type
var REQ_TYPE_ALLOWED = {};

for (var key in config.TYPE.REQUEST) {
    REQ_TYPE_ALLOWED[config.TYPE.REQUEST[key].key] = 1;
}

// 描述
var REQ_TYPE_DESC = {};

for (var key in config.TYPE.REQUEST) {
    REQ_TYPE_DESC[config.TYPE.REQUEST[key].key] = config.TYPE.REQUEST[key].desc;
}

/**
 * 自动从数据中整理出加载流
 * 必须指定requestId，如果没有，尝试使用自己的，如果再没有的话，认为没有
 * @param {Array} list
 * @param {Object} options
 * {
 *     startLine: {number},  // 开始处理的行数
 *     endLine: {number},  // 结束处理的行数
 *     timeDiff: {number},
 *     isAjax: {boolean}  // 是否是ajax，需要手动指定，判断原则外置
 * }
 * @param {string=} opt_requestId 可选的请求ID
 */
RequestTimeLineGroup.prototype.autoProcess = function (list, options, opt_requestId) {
    var me = this;
    if (opt_requestId) {
        me.requestId = opt_requestId;
    }
    var requestId = me.requestId;
    if (!requestId) {
        return;
    }

    me.reset();

    options = options || {};
    isAjax = !!options.isAjax;
    me.isAjax = isAjax;

    var startLine = options.startLine || 0;
    var endLine = isAjax ? 0 : (options.endLine || 0);
    if (options.timeDiff) {
        me.timeDiff = options.timeDiff;
    }

    var timeDiff = me.timeDiff;
    var startToRecieve = 0;
    var url;
    var finishLine = doEachLine.process(list, {
        child: function (child, father) {
            if (
                (
                    child.type == REQ_TYPE_KEY.XHR_STATE_CHANGE
                        && child.data.url == url
                )
                ||
                (
                    REQ_TYPE_ALLOWED[child.type]
                        && child.data.requestId == requestId
                )
            ) {

                switch (child.type) {
                    case REQ_TYPE_KEY.SEND:
                    case REQ_TYPE_KEY.START_RECIEVE:
                    case REQ_TYPE_KEY.FINISH:
                    case REQ_TYPE_KEY.RECIEVE:
                        me.push(new RequestTimeLineItem({
                            requestId: requestId,
                            startTime: child.startTime,
                            endTime: child.endTime || child.startTime,
                            timeDiff: timeDiff,
                            desc: REQ_TYPE_DESC[child.type],
                            detail: child
                        }));
                        url = url || child.data.url;
                        break;
                    case REQ_TYPE_KEY.XHR_STATE_CHANGE:
                        if (child.data.url === url) {
                            me.push(new RequestTimeLineItem({
                                requestId: requestId,
                                startTime: child.startTime,
                                endTime: child.endTime || child.startTime,
                                timeDiff: timeDiff,
                                desc: REQ_TYPE_DESC[child.type],
                                detail: child
                            }));
                        }
                }

                // 如果没有desc、detail这些信息，则配置处理一下
                if (!me.desc || !me.detail) {
                    me.desc = child.data.url;
                    me.detail = child;
                }

                if (child.type == REQ_TYPE_KEY.START_RECIEVE) {
                    me.setStartToRecieve(child.startTime);
                }

                if (child.type == REQ_TYPE_KEY.FINISH && !isAjax) {
                    me.setEndTime(child.startTime);
                    me.valid = true;
                    return true;
                }

                if (isAjax && child.type == REQ_TYPE_KEY.XHR_STATE_CHANGE) {
                    if (child.data.readyState === 4) {
                        me.setEndTime(child.endTime);
                        me.valid = true;
                        return true;
                    }
                }
            }
        }
    }, startLine, endLine);

    return finishLine;
};

module.exports = exports = RequestTimeLineGroup;