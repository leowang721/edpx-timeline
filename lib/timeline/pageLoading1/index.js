/**
 * @file edp timeline pageLoading 命令处理主入口
 * @author Leo Wang(wangkemiao@baidu.com)
 */

var edp = require('edp-core');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var common = require('../common');

/**
 * 命令处理方法
 */
exports.process = function (args, opts) {
    // 获取目标文件
    var fileName = opts.file;

    if (!fileName) {
        edp.log.error('必须指定一个输入文件！');
        return;
    }

    var filePath = fileName;

    if (filePath[0] != '~') {
        filePath = path.resolve('.', filePath);
    }

    if (!fs.existsSync(filePath)) {
        edp.log.error('指定的输入文件不存在！路径为：' + filePath);
        return;
    }

    var isSilent = !!opts.silent;

    if (!isSilent) {
        // 先加载数据
        edp.log.info('正在加载文件：' + filePath);
    }
    var fileData = fs.readFileSync(filePath);
    if (!isSilent) {
        edp.log.info('加载完毕');
        edp.log.info('处理中...');
    }

    // 转换为JSON
    var data = null;

    try {
        data = JSON.parse(fileData);
    }
    catch (e) {
        console.error(e);
        edp.log.error('指定的文件内容不合法！');
        return;
    }

    var result = {};

    // 此时开始处理timeline数据
    result.uaData = data.splice(0, 1);
    if (!isSilent) {
        edp.log.info('UA is ' + result.uaData);
    }

    // 通用数据过滤
    // result.data = common.processor.filterData.process(data);
    result.data = data;

    // 需要指定入口HTML
    // 否则会默认将第一个SendResourceRequest且url有.html的资源作为入口html
    // entryHtmlInfo获取的是入口html相关的信息
    result.entryHtmlInfo = require('./processor/getEntryHtmlInfo').process(
        result.data
    );
    !isSilent && result.entryHtmlInfo.result.dumpToConsole();

    var timeDiff = result.entryHtmlInfo.result.timeDiff;
    var realDiff = timeDiff - result.data[0].startTime;

    result.timeDiff = timeDiff;
    result.realDiff = realDiff;

    if (!isSilent) {
        edp.log.info('let the first data\'s timestamp be 0'
            + ', then the REAL TIME DIFF is ' + chalk.red(realDiff));
        edp.log.info('so from now on , all timestamp is started at 0'
            + ' (send html request) ');
    }

    // 处理页面级事件信息，DOMContentLoaded、load、first paint
    result.pageEventInfo = require('./processor/getPageEventInfo').process(
        result.data,
        {
            timeDiff: timeDiff,
            startLine: result.entryHtmlInfo.endLine
        }
    );
    !isSilent && result.pageEventInfo.dumpToConsole();

    // 下面分析资源加载
    // 从html加载完成开始，统计至load事件触发，期间所有的resource加载状况
    result.resourceLoadInfo = require('./processor/getInitResourceLoadInfo').process(
        result.data,
        {
            timeDiff: timeDiff,
            startLine: result.entryHtmlInfo.endLine,
            endLine: result.pageEventInfo.endLine
        }
    );
    !isSilent && result.resourceLoadInfo.dumpToConsole(true);

    return result;
};