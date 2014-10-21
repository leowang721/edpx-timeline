/**
 * @file 一些基础工具方法
 * @author Leo Wang(leowang721@gmail.com)
 */

var path = require('path');
var util = {};

/**
 * 处理传入的相对路径，转为真正可用的路径
 */
util.resolvePath = function (targetPath) {

    var targetPath = targetPath || '.';

    // 使用用户的相对路径
    if (targetPath == '~' || targetPath.indexOf('~/') == 0) {
        targetPath = targetPath.replace(/^~/, process.env.HOME);
    }
    return path.resolve('.', targetPath);
}

util.doEachLine = function (opts) {
    var opts = opts || {};

    var contextItem = opts.contextItem;
    if (!contextItem || !contextItem.data.length) {
        return;
    }

    var startIndex = opts.startIndex || 0;
    var endIndex = opts.endIndex || (contextItem.data.length - 1);
    var lineCallback = opts.eachLine;
    var childCallback = opts.eachChild;

    var breakIndex = startIndex;

    contextItem.data.slice(startIndex, endIndex).some(function (line, lineIndex, list) {
        breakIndex = lineIndex;
        if (typeof lineCallback == 'function') {
            var result = lineCallback(line, lineIndex, list);
            if (result === true) {
                return true;  // break some loop
            }
        }
        // 子集处理状态
        var childrenProcessResult = processChildren(line, childCallback, lineIndex, list);
        return childrenProcessResult;
    });

    return breakIndex;
};

function processChildren(lineData, callback, lineIndex, list) {
    var needBreak = false;
    if (!lineData) {
        return needBreak;
    }
    if (Array.isArray(lineData.children) && lineData.children.length) {
        lineData.children.some(function (child) {
            needBreak = callback(child, lineData, lineIndex, list);
            if (needBreak !== true) {
                if (Array.isArray(child.children) && child.children.length > 0) {
                    needBreak = processChildren(child, callback, lineIndex, list);
                }
            }
            return needBreak;
        });
    }
    return needBreak;
}


module.exports = exports = util;