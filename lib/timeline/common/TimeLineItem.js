/**
 * @file TimeLine的单条 - 基类
 * @author Leo Wang(leowang721@gmail.com)
 */

// 单项数据例子
// {
//     "type":"ResourceSendRequest",
//     "data":{
//         "requestId":"1181.368",
//         "url":"http://fengchao.baidu.com/nirvana/main.html?userid=630152&t=1406272235606&castk=c42c9un77f0d6f7f7d809",
//         "requestMethod":"GET"
//     },
//     children: [ ... ],
//     "startTime":20832164.138,
//     "frameId":"1181.93"
// }

/**
 * TimeLine的单条 - 基类
 * @param {Object} options
 * {
 *     desc: {string},  // 描述信息
 *     detail: {Object},  // 可以传入数据，以供后续使用
 *     timeDiff: {number},  // 时间差异
 * }
 */
function TimeLineItem (options) {
    options = options || {};
    this.desc = options.desc;
    this.detail = options.detail;
    this.timeDiff = options.timeDiff || 0;

    this.startTime = options.startTime - this.timeDiff;
    this.endTime = options.endTime - this.timeDiff;
}

/**
 * 可以去进行设置开始时间
 */
TimeLineItem.prototype.setStartTime = function (val) {
    this.startTime = val - this.timeDiff;
};

/**
 * 可以去进行设置结束时间
 */
TimeLineItem.prototype.setEndTime = function (val) {
    this.endTime = val - this.timeDiff;
};


TimeLineItem.prototype.dumpToConsole = function(opt_prefix) {
    var prefix = opt_prefix || '';
    console.log(opt_prefix + this.desc + ' at ' + this.startTime);
};

module.exports = exports = TimeLineItem;