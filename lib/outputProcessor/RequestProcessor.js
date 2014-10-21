/**
 * @file 获取所有请求信息的处理器
 * @author Leo Wang(leowang721@gmail.com)
 */

var sys = require('sys');
var edp = require('edp-core');
var AbstractProcessor = require('./AbstractProcessor');

function RequestProcessor () {
    AbstractProcessor.apply(this, arguments);
}
sys.inherits(RequestProcessor, AbstractProcessor);

RequestProcessor.prototype.name = 'RequestProcessor';
RequestProcessor.prototype.outputName = 'request';

var colorByType = {
    'text/html': '#83AAF0',
    'text/plain': '#9FD7FB',
    'text/css': '#5BD75B',
    'javascript': '#FFB733',
    'json': '#FF9873',
    'xhr': '#FF87C3',
    'image': '#D77C7C',
    'flash': '#C777DB',
    'other': '#CD5C5C'
};

RequestProcessor.prototype.process = function (contextItem) {
    var me = this;

    var prefix = this.outputName + '/';

    var timeDiff = contextItem.timeDiff || 0;
    contextItem.output = contextItem.output || {};

    var requestList = contextItem.requestList;

    // 整理simpleline数据，将输出为一个柱状图供查看
    var simpleLineData = {};
    simpleLineData.yAxis = [];
    simpleLineData.series = {
        start: [],
        spent: [],
        path: contextItem.request.byOrder.reverse()
    };
    simpleLineData.series.path.forEach(function (url) {
        var currentItem = contextItem.request.data[url];
        simpleLineData.yAxis.push(currentItem.type);
        simpleLineData.series.start.push(
            currentItem.getStartTime().toFixed(2)
        );
        simpleLineData.series.spent.push({
            value: currentItem.getSpentTime().toFixed(2),
            itemStyle: {
                normal: {
                    color: colorByType[currentItem.type] || colorByType.other
                }
            }
        });
    });
    contextItem.output[prefix + 'simpleLineOption'] = simpleLineData;

    // 整理spentByType数据，形成饼图的数据
    var spentByType = {};
    // 同时整理countByType数据，形成柱状图的数据
    var countByType = {};

    for (var type in contextItem.request.byType) {
        spentByType[type] = 0;
        countByType[type] = 0
        contextItem.request.byType[type].forEach(function (url) {
            spentByType[type] += contextItem.request.data[url].getSpentTime();
            countByType[type]++;
        });
        spentByType[type] = spentByType[type].toFixed(2);
    }
    var spentByTypeOption = {
        keys: Object.keys(spentByType),
        values: []
    };
    spentByTypeOption.keys.forEach(function (key) {
        spentByTypeOption.values.push({
            value: spentByType[key],
            name: key,
            itemStyle: {
                normal: {
                    color: colorByType[key] || colorByType.other
                }
            }
        });
    });
    contextItem.output[prefix + 'spentByTypeOption'] = spentByTypeOption;

    var countByTypeOption = {
        keys: Object.keys(countByType),
        values: []
    }
    countByTypeOption.keys.forEach(function (key) {
        countByTypeOption.values.push({
            value: countByType[key],
            itemStyle: {
                normal: {
                    color: colorByType[key] || colorByType.other
                }
            }
        });
    });

    contextItem.output[prefix + 'countByTypeOption'] = countByTypeOption;


    return;
};
module.exports = exports = RequestProcessor;