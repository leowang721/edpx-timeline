/**
 * @file 主入口
 * @author Leo Wang(wangkemiao@baidu.com)
 */

define(function (require) {
    require('er/controller').registerAction(
        require('underscore').flatten(require('./actionConf'))
    );
    require('er').start();
});