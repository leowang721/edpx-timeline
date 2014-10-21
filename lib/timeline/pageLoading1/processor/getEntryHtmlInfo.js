/**
 * @file 从timeline数据中找到入口HTML的名字及信息
 * @author Leo Wang(leowang721@gmail.com)
 */

var chalk = require('chalk');
var common = require('../../common');

// 关键数据的类型定义
var ALLOWED_TYPE = {};
// {
//     "type":"ResourceSendRequest",
//     "data":{
//         "requestId":"1181.368",
//         "url":"http://fengchao.baidu.com/nirvana/main.html?userid=630152&t=1406272235606&castk=c42c9un77f0d6f7f7d809",
//         "requestMethod":"GET"
//     },
//     "startTime":20832164.138,
//     "frameId":"1181.93"
// }
ALLOWED_TYPE[common.config.TYPE.REQUEST.SEND.key] = 1;

/**
 * 获取入口HTML加载的相关信息
 * @param {Array} list json数据
 * @param {Object=} options 配置
 * {
 *     keyword: {string},  // 关键词,
 *     startLine: {number},  // 开始处理的行数
 *     endLine: {number}  // 结束处理的行数
 * }
 * @returns {Object}
 * {
 *     result: {TimelineGroup},
 *     startLine: {number},
 *     endLine: {number}
 * }
 */
function getEntryHtmlInfo (list, options) {
    options = options || {}
    var keyword = options.keyword || '.html';
    var startLine = options.startLine || 0;
    var endLine = options.endLine || 0;
    var matchReg = new RegExp('/(\\w*' + keyword + ')', 'g');

    var htmlInfo = {};
    var found = false;
    var foundLine = common.processor.doEachLine.process(list, {
        child: function (child) {
            if (ALLOWED_TYPE[child.type]
                && child.data.url.indexOf(keyword) > -1) {
                htmlInfo.name = matchReg.exec(child.data.url)[1];
                htmlInfo.detail = child;
                htmlInfo.timeDiff = child.startTime;
                found = true;
                return true;  // found and break
            }
            return false;
        }
    }, startLine, endLine);

    var timelineGroup = new common.RequestTimeLineGroup({
        desc: '请求资源' + htmlInfo.name,
        detail: htmlInfo.detail,
        timeDiff: htmlInfo.timeDiff,
        requestId: htmlInfo.detail.data.requestId
    });
    timelineGroup.fileName = htmlInfo.name;
    var finishLine = timelineGroup.autoProcess(list, options);
    return {
        result: timelineGroup,
        startLine: foundLine,
        endLine: finishLine
    };
}

exports.process = getEntryHtmlInfo;