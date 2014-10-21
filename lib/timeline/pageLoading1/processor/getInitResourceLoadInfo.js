/**
 * @file 从html加载完成开始，统计至load事件触发，期间所有的resource加载状况
 * @author Leo Wang(leowang721@gmail.com)
 */

var common = require('../../common');

var ALLOWED_TYPE = {};
// 仅关注资源请求
ALLOWED_TYPE[common.config.TYPE.REQUEST.SEND.key] = 1;

/**
 * 处理从html加载完成开始，统计至load事件触发，期间所有的resource加载状况
 * @param {Array} list json数据
 * @param {Object=} options 配置
 * {
 *     startLine: {number},  // 开始处理的行数
 *     endLine: {number},  // 结束处理的行数
 *     timeDiff: {number}  // 时间差异
 * }
 * @returns {Object}
 * {
 *     result: {TimelineGroup},
 *     startLine: {number},
 *     endLine: {number}
 * }
 */
function getInitResourceLoadInfo (list, options) {
    options = options || {};
    var startLine = options.startLine || 0;
    var endLine = options.endLine || 0;

    var resourceReqs = [];
    common.processor.doEachLine.process(list, {
        child: function (child, father, line) {
            if (ALLOWED_TYPE[child.type]) {
                resourceReqs.push({
                    requestId: child.data.requestId,
                    startLine: line
                });
            }
        }
    }, startLine, endLine);

    var timingLog = {
        startTime: Number.MAX_VALUE,
        endTime: Number.MIN_VALUE,
        spentTime: 0,
        waiting: 0,
        recieving: 0,
        css: {
            endTime: Number.MIN_VALUE,
            startTime: Number.MAX_VALUE,
            waiting: 0,
            recieving: 0,
            spentTime: 0
        },
        js: {
            endTime: Number.MIN_VALUE,
            startTime: Number.MAX_VALUE,
            waiting: 0,
            recieving: 0,
            spentTime: 0
        },
        image: {
            endTime: Number.MIN_VALUE,
            startTime: Number.MAX_VALUE,
            waiting: 0,
            recieving: 0,
            spentTime: 0
        },
        other: {
            endTime: Number.MIN_VALUE,
            startTime: Number.MAX_VALUE,
            waiting: 0,
            recieving: 0,
            spentTime: 0
        }
    };

    var result = {
        dumpToConsole: dumpToConsole,
        detail: [],
        byType: {
            css: [],
            js: [],
            image: [],
            other: []
        },
        timingLog: timingLog
    };

    resourceReqs.forEach(function (item, index) {
        var req = new common.RequestTimeLineGroup({
            requestId: item.requestId
        });
        req.autoProcess(list, {
            startLine: item.startLine,
            timeDiff: options.timeDiff
        })
        result.detail.push(req);

        // 分组，区分css、js、图片、其他
        if (/\.css/.test(req.desc)) {
            result.byType.css.push(req);
            processTypeTime(timingLog, req, 'css');
        } else if (/\.js/.test(req.desc)) {
            result.byType.js.push(req);
            processTypeTime(timingLog, req, 'js');
        } else if (/\.png|\.jpg|\.gif/.test(req.desc)) {
            result.byType.image.push(req);
            processTypeTime(timingLog, req, 'image');
        } else {
            result.byType.other.push(req);
            processTypeTime(timingLog, req, 'other');
        }
        timingLog.startTime = timingLog.startTime < req.startTime
            ? timingLog.startTime : req.startTime;
        timingLog.endTime = timingLog.endTime > req.endTime
            ? timingLog.endTime : req.endTime;
        timingLog.spentTime = timingLog.endTime - timingLog.startTime;
    });

    return result;
}

function processTypeTime (timingLog, req, type) {
    timingLog[type].startTime = timingLog[type].startTime < req.startTime
        ? timingLog[type].startTime : req.startTime;
    timingLog[type].endTime = timingLog[type].endTime > req.endTime
        ? timingLog[type].endTime : req.endTime;
    timingLog[type].spentTime += (req.endTime - req.startTime);
    var waiting = (req.startToRecieve - req.startTime);
    var recieving = (req.endTime - req.startToRecieve);
    timingLog[type].waiting += waiting;
    timingLog[type].recieving += recieving;
    timingLog.waiting += waiting;
    timingLog.recieving += recieving;
}

function dumpToConsole (isSimple) {
    isSimple = !!isSimple;
    console.log('\n从html加载完成开始，统计至load事件触发，期间所有的请求状况');

    for (var k in this.byType) {
        console.log('\t' + k.toUpperCase() + '：');

        this.byType[k].forEach(function (item, index) {
            if (!isSimple) {
                console.log('\t\t' + item.desc + ', start at: ' + item.startTime
                    + ', end at ' + item.endTime
                    + ', waited ' + (item.startToRecieve - item.startTime)
                );
            }
        });

        console.log('\t\t请求共计' + this.byType[k].length + '个');
        console.log('\t\t开始于：' + this.timingLog[k].startTime);
        console.log('\t\t结束于：' + this.timingLog[k].endTime);
        console.log('\t\t消耗了：' + this.timingLog[k].spentTime);
        console.log('\t\t等待时间：' + this.timingLog[k].waiting + '（含并发）');
        console.log('\t\t接收时间：' + this.timingLog[k].recieving + '（含并发）');
    }

    console.log('\n请求总计' + this.detail.length + '个');
    console.log('\t开始于：' + this.timingLog.startTime);
    console.log('\t结束于：' + this.timingLog.endTime);
    console.log('\t消耗了：' + this.timingLog.spentTime);
    console.log('\t请求等待消耗：' + this.timingLog.waiting + '（含并发）');
    console.log('\t请求接收消耗：' + this.timingLog.recieving + '（含并发）');
}

exports.process = getInitResourceLoadInfo;