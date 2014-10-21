/**
 * @file 配置
 * @author Leo Wang(leowang721@gmail.com)
 */

module.exports = exports = {
    TYPE: {
        REQUEST: {
            SEND: {
                key: 'ResourceSendRequest',
                desc: '发送请求'
            },
            START_RECIEVE: {
                key: 'ResourceReceiveResponse',
                desc: '开始接收数据'
            },
            RECIEVE: {
                key: 'ResourceReceivedData',
                desc: '接收数据'
            },
            FINISH: {
                key: 'ResourceFinish',
                desc: '完成请求'
            },
            XHR_STATE_CHANGE: {
                key: 'XHRReadyStateChange',
                desc: 'AJAX请求XHR状态变化'
            }
        },
        EVENT: {
            DOM_CONTENT_LOADED: {
                key: 'MarkDOMContent',
                desc: '浏览器级事件DomContentLoaded，DOM结构完成触发'
            },
            FIRST_PAINT: {
                key: 'MarkFirstPaint',
                desc: '浏览器级事件First Paint'
            },
            LOAD: {
                key: 'MarkLoad',
                desc: '浏览器级事件load，资源加载完成触发'
            }
        }
    }
};