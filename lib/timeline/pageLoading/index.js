/**
 * @file edp timeline pageLoading 命令处理主入口
 * @author Leo Wang(leowang721@gmail.com)
 */

var edp = require('edp-core');
var fs = require('fs');
var path = require('path');
var util = require('../../util');
var ProcessContext = require('')

exports.process = function (args, opts) {
    // 读取参数

    console.log(args)
    var filePath = util.resolvePath(opts.file);
    var entry = opts.entry;
    var output = opts.output;

    // 读取数据
    var processContext = new ProcessContext();

    processContext.read(filePath);
};