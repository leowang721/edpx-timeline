/**
 * @file 过滤timeline数据
 * @author Leo Wang(leowang721@gmail.com)
 */

// 仅保留了type为Program的数据
var ALLOWED_TYPE = {
    Program: 1
};

// 行处理
function filterData (json) {
    if (!Array.isArray(json)) {
        return [];
    }
    var newData = [];
    json.forEach(function (item, index) {
        if (ALLOWED_TYPE[item.type]) {
            newData.push(item);
        }
    });
    json = null;
    return newData;
}

exports.process = filterData;