/**
 * @file 数据对象基类
 * @author Leo Wang(leowang721@gmail.com)
 */

var edp = require('edp-core');

/**
 * 数据对象基类
 * @param options
 *     options.timeline {Array.<Object>} 处理得到的timeline数组
 *     options.startTime {number} 开始时间
 *     options.endTime {number} 结束时间
 *     options.timeDiff {number} 相对时间差，因为数据的时间都是时间戳，计算相对时间用这个
 */
function AbstractTimeLine (options) {
    var options = options || {};
    this.timeline = options.timeline || [];
    this.startTime = options.startTime || null;
    this.endTime = options.endTime || null;
    this.timeDiff = options.timeDiff || 0;
}

AbstractTimeLine.prototype.autoProcess = function () {
    edp.log.warn('You should rewrite `autoProcess` method in Child Class.');
};

AbstractTimeLine.prototype.push = function (item) {
    this.timeline.push(item);
};
AbstractTimeLine.prototype.pop = function () {
    var item = this.timeline.pop();
};

module.exports = exports = AbstractTimeLine;