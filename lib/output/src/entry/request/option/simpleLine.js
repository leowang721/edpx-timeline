/**
 * @file
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var mockData = require('mockData/request/simpleLineOption');
    var maxLen = 200;

    var option = {
        title: {
            text: '页面加载timeline',
            subtext: 'By edpx-timeline',
            sublink: 'http://github.com/leowang721/edpx-timeline'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                return (
                    params[0][1]
                    + '<br />'
                    + params[0][0] + ': ' + params[0][2]
                    + '<br />'
                    + params[1][0] + ': ' + params[1][2]
                    + '<br />'
                    + params[2][0] + ': '
                    + (params[2][2].length > maxLen
                        ? (params[2][2].substring(0, maxLen) + ' ...')
                        : params[2][2]
                    )
                );
            }
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        xAxis : [
            {
                type : 'value',
                splitNumber: 20
            }
        ],
        yAxis : [
            {
                type : 'category',
                splitLine: { show: false},
                axisLabel: {
                    show: false
                },
                data : mockData.yAxis
            }
        ],
        series : [
            {
                name:'加载开始',
                type:'bar',
                stack: '加载开始',
                itemStyle:{
                    normal:{
                        barBorderColor:'rgba(0,0,0,0)',
                        color:'rgba(0,0,0,0)'
                    },
                    emphasis:{
                        barBorderColor:'rgba(0,0,0,0)',
                        color:'rgba(0,0,0,0)'
                    }
                },
                data: mockData.series.start
            },
            {
                name:'加载消耗',
                type:'bar',
                stack: '加载开始',
                data: mockData.series.spent
            },
            {
                name: '路径',
                stack: '加载开始',
                type: 'bar',
                itemStyle:{
                    normal:{
                        barBorderColor:'rgba(0,0,0,0)',
                        color:'rgba(0,0,0,0)'
                    },
                    emphasis:{
                        barBorderColor:'rgba(0,0,0,0)',
                        color:'rgba(0,0,0,0)'
                    }
                },
                show: false,
                data: mockData.series.path
            }
        ]
    };

    option.mockData = mockData;

    return option;
});