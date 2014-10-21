/**
 * @file timeline数据处理器，每次处理一行
 *  每行都会触发一个回调
 *  每行的children会被递归处理，每个item会触发一个回调
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

/**
 * 处理器
 * @param {Array} list
 * @param {Object} callback return true to break
 * {
 *     line: {Function},
 *     child: {Function}
 * }
 * @param {number=} opt_startLine
 * @param {number=} opt_finishLine
 * @returns stoppedLine
 */
function process (list, callback, opt_startLine, opt_finishLine) {
    if (!Array.isArray(list)) {
        list = [list];
    }

    opt_startLine = opt_startLine || 0;
    opt_finishLine = opt_finishLine || list.length;

    callback = callback || {};
    var stoppedLine = 0;
    list.slice(opt_startLine, opt_finishLine).some(function (line, lineIndex) {
        if (opt_finishLine && line === opt_finishLine) {
            return true;  // 中断
        }
        stoppedLine = lineIndex;
        if (typeof callback.line == 'function') {
            var needBreak = callback.line(line, lineIndex, list);
            if (needBreak === true) {
                return true;  // break some loop
            }
        }

        // 子集处理状态
        var childrenProcessResult = processChildren(line, callback.child, lineIndex, list);
        return childrenProcessResult;
    });

    return stoppedLine;
}

function processChildren(item, callback, lineIndex, list) {
    var needBreak = false;
    if (!item) {
        return needBreak;
    }
    if (Array.isArray(item.children) && item.children.length > 0) {
        item.children.some(function (child) {
            needBreak = callback(child, item, lineIndex, list);
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

exports.process = process;