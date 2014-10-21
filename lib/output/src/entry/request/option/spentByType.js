/**
 * @file
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {

    var mockData = require('mockData/request/spentByTypeOption');
    var maxLen = 200;

    var option = {
        title : {
            text: '资源加载耗时分布',
            subtext: 'By edpx-timeline',
            sublink: 'http://github.com/leowang721/edpx-timeline',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data: mockData.keys
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
        calculable : true,
        series : [
            {
                name:'加载消耗',
                type:'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data: mockData.values
            }
        ]
    };

    option.mockData = mockData;

    return option;
});
                    