/**
 * @file 环境
 * @author Leo Wang(leowang721@gmail.com)
 */

var fs = require('fs');
var path = require('path');
var minimatch = require('minimatch');
var edp = require('edp-core');
var util = require('./index');
var ProcessContextItem = require('./ProcessContextItem');

function ProcessContext (options) {
    /**
     * 数据集
     * @type {ProcessContextItem}
     */
    this.items = [];
    this.paths = [];

    var options = options || {};
    this.dataProcessors = options.dataProcessors || [];
    this.outputProcessors = options.outputProcessors || [];
    this.isDebug = !!options.isDebug;

    // 标记为整个的起始点，从这里才是真正的开始
    // 仅匹配资源的url，且仅匹配资源的请求发送
    // 如果不指定则不进行数据过滤
    this.startMark = options.startMark || '';
}

var toIncludeFile = [
    'TimelineRawData-*'
];
function isInclude (fileName) {
    return toIncludeFile.some(function (item) {
        if (typeof item == 'string') {
            // 使用minimatch
            var matchBase = item.indexOf( '/' ) === -1;
            return minimatch(fileName, item, { matchBase: matchBase });
        }
        else if (item instanceof RegExp) {
            return item.test(fileName);
        }
        else {
            return false;
        }
    });
}

ProcessContext.prototype.read = function (filePath) {
    var me = this;
    var filePath = util.resolvePath(filePath);

    edp.log.info('正在扫描待读取的数据文件...');

    try {
        var stat = fs.lstatSync(filePath);
        if (stat.isFile()) {
            me.paths.push(filePath);
        }
        else if (stat.isDirectory()) {
            var files = fs.readdirSync(filePath);
            files.forEach(function (item) {
                if (isInclude(item)) {
                    me.paths.push(path.resolve(filePath, item));
                }
            });
        }
        else {
            edp.log.error('指定的路径不合法，你应该指定文件');
        }
    }
    catch (e) {
        console.error(e);
        edp.log.error('指定的路径不合法！');
    }

    me.paths.forEach(function (eachPath) {
        var item = new ProcessContextItem({
            path: eachPath,
            startMark: me.startMark
        });
        item.read();
        me.items.push(item);
    });

    edp.log.info('数据文件读取完成！\n');
};

ProcessContext.prototype.process = function () {
    var isDebug = this.isDebug;

    var item = this.items[0];

    edp.log.info('开始处理`' + item.path + '`');
    if (item.startMark) {
        edp.log.info(
            '指定起始匹配为`%s`, 起始匹配行：%d，timeDiff为%d',
            item.startMark, item.startIndex, item.timeDiff
        );
    }
    var realStartTime = new Date();
    var startTime = realStartTime;
    var spent = {
        dataProcess: 0,
        logicProcess: 0
    };

    this.dataProcessors.forEach(function (eachProcessor) {
        edp.log.write('[%s] 处理', eachProcessor.name);
        var result = eachProcessor.process(item, isDebug);
        var current = new Date();
        console.log(
            ' 消耗了%dms',
            (current - startTime)
        );
        spent.dataProcess += (current - startTime);
        startTime = current;
    });
    edp.log.info('数据处理完成，消耗了%dms，开始处理逻辑。', spent.dataProcess);

    this.outputProcessors.forEach(function (eachProcessor) {
        edp.log.write('[%s] 处理', eachProcessor.name);
        var result = eachProcessor.process(item, isDebug);
        var current = new Date();
        console.log(
            ' 消耗了%dms',
            (current - startTime)
        );
        spent.logicProcess += (current - startTime);
        startTime = current;
    });
    edp.log.info('逻辑处理完成，消耗了%dms。\n', spent.logicProcess);
    edp.log.info('处理完成，总计消耗了%dms。', (new Date() - realStartTime));
};

module.exports = exports = ProcessContext;