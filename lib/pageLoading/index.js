/**
 * @file edp timeline pageLoading 命令处理主入口
 * @author Leo Wang(leowang721@gmail.com)
 */

var edp = require('edp-core');
var fs = require('fs');
var path = require('path');
var util = require('../util');
var ProcessContext = require('../util/ProcessContext');

var dataProcessor = {
    FilterProcessor: require('../dataProcessor/FilterProcessor'),
    RequestProcessor: require('../dataProcessor/RequestProcessor')
};

var outputProcessor = {
    RequestProcessor: require('../outputProcessor/RequestProcessor'),
    OutputProcessor: require('../outputProcessor/OutputProcessor')
}

exports.process = function (args, opts) {
    // 读取参数
    var filePath = opts.file;
    var startMark = opts.startMark;
    var output = opts.output;
    var isDebug = !!opts.debug;

    // 读取数据
    var processContext = new ProcessContext({
        startMark: startMark,
        isDebug: isDebug,
        output: output,
        dataProcessors: [
            new dataProcessor.FilterProcessor(),
            new dataProcessor.RequestProcessor()
        ],
        outputProcessors: [
            new outputProcessor.RequestProcessor(),
            new outputProcessor.OutputProcessor()
        ]
    });
    processContext.read(filePath);
    processContext.process();
};