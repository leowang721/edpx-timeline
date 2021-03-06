/*! @2014 Leo Wang. All Rights Reserved */
define("zrender/shape/Heart",["require","./Base","../tool/util"],function(require){"use strict";var e=require("./Base"),t=function(t){e.call(this,t)};return t.prototype={type:"heart",buildPath:function(e,t){e.moveTo(t.x,t.y),e.bezierCurveTo(t.x+t.a/2,t.y-2*t.b/3,t.x+2*t.a,t.y+t.b/3,t.x,t.y+t.b),e.bezierCurveTo(t.x-2*t.a,t.y+t.b/3,t.x-t.a/2,t.y-2*t.b/3,t.x,t.y),e.closePath()},getRect:function(e){if(e.__rect)return e.__rect;var t;if("stroke"==e.brushType||"fill"==e.brushType)t=e.lineWidth||1;else t=0;return e.__rect={x:Math.round(e.x-e.a-t/2),y:Math.round(e.y-e.b/4-t/2),width:2*e.a+t,height:5*e.b/4+t},e.__rect}},require("../tool/util").inherits(t,e),t});