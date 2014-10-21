/*! @2014 Leo Wang. All Rights Reserved */
define("echarts/util/shape/GaugePointer",["require","zrender/shape/Base","zrender/tool/util","./normalIsCover"],function(require){function e(e){t.call(this,e)}var t=require("zrender/shape/Base"),n=require("zrender/tool/util");return e.prototype={type:"gauge-pointer",buildPath:function(e,t){var n=t.r,i=t.width,a=t.angle,o=t.x-Math.cos(a)*i*(i>=n/3?1:2),s=t.y+Math.sin(a)*i*(i>=n/3?1:2);a=t.angle-Math.PI/2,e.moveTo(o,s),e.lineTo(t.x+Math.cos(a)*i,t.y-Math.sin(a)*i),e.lineTo(t.x+Math.cos(t.angle)*n,t.y-Math.sin(t.angle)*n),e.lineTo(t.x-Math.cos(a)*i,t.y+Math.sin(a)*i),e.lineTo(o,s)},getRect:function(e){if(e.__rect)return e.__rect;var t=2*e.width,n=e.x,i=e.y,a=n+Math.cos(e.angle)*e.r,o=i-Math.sin(e.angle)*e.r;return e.__rect={x:Math.min(n,a)-t,y:Math.min(i,o)-t,width:Math.abs(n-a)+t,height:Math.abs(i-o)+t},e.__rect},isCover:require("./normalIsCover")},n.inherits(e,t),e});