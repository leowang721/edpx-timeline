/**
 * @file 处理页面级事件信息，DOMContentLoaded、load、first paint
 * @author Leo Wang(leowang721@gmail.com)
 */

var common = require('../../common');

var ALLOWED_TYPE = {
    MarkDOMContent: 1,
    MarkFirstPaint: 1,
    MarkLoad: 1
};

var TYPE_KEY = {
    DOM_CONTENT_LOADED: common.config.TYPE.EVENT.DOM_CONTENT_LOADED.key,
    FIRST_PAINT: common.config.TYPE.EVENT.FIRST_PAINT.key,
    LOAD: common.config.TYPE.EVENT.LOAD.key
};

var ORDER = [
    TYPE_KEY.DOM_CONTENT_LOADED,
    TYPE_KEY.FIRST_PAINT,
    TYPE_KEY.LOAD
];

/**
 * 处理页面级事件信息，DOMContentLoaded、load、first paint
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
function getPageEventInfo (list, options) {
    options = options || {};
    var startLine = options.startLine || 0;
    var endLine = options.endLine || 0;

    var result = {
        dumpToConsole: dumpToConsole
    };
    var foundedInfo = 0;
    var finishLine = common.processor.doEachLine.process(list, {
        child: function (child, father, line) {
            if (ALLOWED_TYPE[child.type]) {
                switch (child.type) {
                    case TYPE_KEY.DOM_CONTENT_LOADED:
                        if (child.data.isMainFrame) {
                            result.domContentLoaded = new common.TimeLineItem({
                                desc: '触发浏览器的DOMContentLoaded事件',
                                timeDiff: options.timeDiff,
                                startTime: child.startTime,
                                endTime: child.startTime,
                                detail: child
                            });
                            foundedInfo++;
                            result.startLine = line + startLine;
                        }
                        break;
                    case TYPE_KEY.FIRST_PAINT:
                        result.firstPaint = new common.TimeLineItem({
                            desc: '触发浏览器的第一次绘制',
                            timeDiff: options.timeDiff,
                            startTime: child.startTime,
                            endTime: child.startTime,
                            detail: child
                        });
                        foundedInfo++;
                        break;
                    case TYPE_KEY.LOAD:
                        if (child.data.isMainFrame) {
                            result.load = new common.TimeLineItem({
                                desc: '触发浏览器的load事件',
                                timeDiff: options.timeDiff,
                                startTime: child.startTime,
                                endTime: child.startTime,
                                detail: child
                            });
                            foundedInfo++;
                            result.endLine = line + startLine;
                        }
                        break;
                }

                if (foundedInfo >= ORDER.length) {
                    return true;  // found and break
                }
            }
            return false;
        }
    }, startLine, endLine);

    return result;
}

function dumpToConsole () {
    console.log('页面处理，基础事件触发时间点：');
    console.log('\t' + this.domContentLoaded.desc
        + ': ' + this.domContentLoaded.startTime);
    console.log('\t' + this.firstPaint.desc
        + ': ' + this.firstPaint.startTime);
    console.log('\t' + this.load.desc
        + ': ' + this.load.startTime);
}

exports.process = getPageEventInfo;