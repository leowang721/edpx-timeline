/**
 * @file TimeLine的分组 - 基类
 * @author Leo Wang(leowang721@gmail.com)
 */

/**
 * TimeLine的分组 - 基类
 * @constructor
 * @param {Object} options
 * {
 *     desc: {string},  // 描述信息
 *     detail: {Object},  // 可以传入数据，以供后续使用
 *     timeDiff: {number},  // 时间差异
 * }
 */
function TimeLineGroup (options) {
    options = options || {};
    this.desc = options.desc;
    this.detail = options.detail;
    this.timeDiff = options.timeDiff || 0;

    this.reset();
}

/**
 * 一个分组内具体的操作集，每个都会是一个TimeLineItem或者它的子类
 * @type {Array.<TimeLineItem>}
 */
TimeLineGroup.prototype.children = [];

/**
 * 重置状态
 */
TimeLineGroup.prototype.reset = function () {
    this.children = [];
    this.startTime = null;
    this.endTime = null;
};

/**
 * 推入一个TimeLineItem对象
 * @type {TimeLineItem} item
 */
TimeLineGroup.prototype.push = function (item) {
    if (!item) {
        return;
    }
    if (this.children.length == 0) {
        this.startTime = item.startTime;
    }
    
    this.children.push(item);
    this.endTime = item.endTime;
};

/**
 * 推出一个TimeLineItem对象
 * @returns {TimeLineItem} item
 */
TimeLineGroup.prototype.pop = function () {
    var item = this.children.pop();
    if (item) {
        if (this.children.length == 0) {
            this.startTime = this.endTime = null;
        }
        else {
            this.setEndTime(this.children[this.children.length - 1].endTime);
        }
    }
    return item;
};

/**
 * 可以去进行设置开始时间
 */
TimeLineGroup.prototype.setStartTime = function (val) {
    this.startTime = val - this.timeDiff;
};

/**
 * 可以去进行设置结束时间
 */
TimeLineGroup.prototype.setEndTime = function (val) {
    this.endTime = val - this.timeDiff;
};


TimeLineGroup.prototype.dumpToConsole = function () {
    console.log(this.desc);
    console.log('\tstarted at ' + this.startTime);
    this.children.forEach(function (item) {
        item.dumpToConsole('\t\t');
    });
    console.log('\tfinished at ' + this.endTime);
};

module.exports = exports = TimeLineGroup;