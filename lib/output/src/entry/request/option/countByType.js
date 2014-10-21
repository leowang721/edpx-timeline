/**
 * @file
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    var mockData = require('mockData/request/countByTypeOption');
    var option = {
        title : {
            text: '请求数分布',
            subtext: 'By edpx-timeline',
            sublink: 'http://github.com/leowang721/edpx-timeline',
        },
        tooltip : {
            trigger: 'axis'
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'value',
                boundaryGap : [0, 0.01]
            }
        ],
        yAxis : [
            {
                type : 'category',
                data : mockData.keys
            }
        ],
        series : [
            {
                name:'请求数',
                type:'bar',
                data: mockData.values,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position:'insideRight'
                        }
                    }
                }
            }
        ]
    };

    option.mockData = mockData;
    return option;
                        
});