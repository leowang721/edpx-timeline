/**
 * @file 请求分析页面 - View定义
 * @author wangkemiao (wangkemiao@baidu.com)
 */

define(function (require) {

    // 加载tpl
    require('etpl/tpl!./tpl.html');

    // 加载样式
    require('css!./style.less');

    /**
     * 请求分析页面 - View定义
     *
     * @class ?
     * @extends {er.View}
     * @constructor
     */
    var overrides = {};

    /**
     * @property {string} [template] 所使用的模板
     */
    overrides.template = 'entry-request';

    
    /**
     * 界面渲染完成之后的事件处理
     */
    overrides.enterDocument = function () {};
    

    var View = require('eoo').create(require('er/View'), overrides);

    return View;
});