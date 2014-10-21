/**
 * @file 关于加载相关的TimeLineItem
 * @author Leo Wang(leowang721@gmail.com)
 */

var sys = require('sys');
var TimeLineItem = require('./TimeLineItem');

/**
 * 关于加载相关的TimeLineItem
 * @constructor
 * @extends {TimeLineItem}
 * @param {Object} options
 * {
 *     desc: {string},  // 描述信息
 *     detail: {Object},  // 可以传入数据，以供后续使用
 *     timeDiff: {number},  // 时间差异
 *     requestId: {string},  // 请求的ID
 * }
 */
function RequestTimeLineItem (options) {
    TimeLineItem.call(this, options);
    this.requestId = options.requestId;
}

sys.inherits(RequestTimeLineItem, TimeLineItem);

module.exports = exports = RequestTimeLineItem;