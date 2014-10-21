/**
 * @file 请求分析页面 - Action定义
 * @author wangkemiao (wangkemiao@baidu.com)
 */

define(function (require) {

    var echarts = require('echarts');
    require('echarts/chart/bar');
    require('echarts/chart/pie');
    
    /**
     * 请求分析页面 - Action定义
     *
     * @class ?
     * @extends {er.Action}
     * @constructor
     */
    var overrides = {};

    overrides.modelType = require('./Model');
    overrides.viewType = require('./View');

    /**
     * 初始化行为交互
     */
    overrides.initBehavior = function () {
        var spentByTypeChart = echarts.init(
            $('#entry-request-chart-spentByType')[0]
        );
        spentByTypeChart.setOption(require('./option/spentByType'));


        var countByTypeChart = echarts.init(
            $('#entry-request-chart-countByType')[0]
        );
        countByTypeChart.setOption(require('./option/countByType'));

        var simpleLineChartDom = $('#entry-request-chart-simpleLine');
        var simpleLineChartOption = require('./option/simpleLine');
        simpleLineChartDom.css(
            'height',
            65 + simpleLineChartOption.mockData.yAxis.length * 12
        );
        var simpleLineChart = echarts.init(
            simpleLineChartDom[0]
        );
        simpleLineChart.setOption(simpleLineChartOption);
    };

    var Action = require('eoo').create(require('er/Action'), overrides);

    return Action;
});