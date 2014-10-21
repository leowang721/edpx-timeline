/*! @2014 Leo Wang. All Rights Reserved */
define("zrender/loadingEffect/DynamicLine",["require","./Base","../tool/util","../tool/color","../shape/Line"],function(require){function e(e){t.call(this,e)}var t=require("./Base"),n=require("../tool/util"),i=require("../tool/color"),a=require("../shape/Line");return n.inherits(e,t),e.prototype._start=function(e,t){for(var r=n.merge(this.options,{textStyle:{color:"#fff"},backgroundColor:"rgba(0, 0, 0, 0.8)",effectOption:{n:30,lineWidth:1,color:"random",timeInterval:100}}),o=this.createTextShape(r.textStyle),s=this.createBackgroundShape(r.backgroundColor),l=r.effectOption,h=l.n,d=l.lineWidth,m=[],u=this.canvasWidth,c=this.canvasHeight,p=0;h>p;p++){var f=-Math.ceil(1e3*Math.random()),V=Math.ceil(400*Math.random()),U=Math.ceil(Math.random()*c),y="random"==l.color?i.random():l.color;m[p]=new a({highlightStyle:{xStart:f,yStart:U,xEnd:f+V,yEnd:U,strokeColor:y,lineWidth:d},animationX:Math.ceil(100*Math.random()),len:V})}return setInterval(function(){e(s);for(var n=0;h>n;n++){var i=m[n].highlightStyle;if(i.xStart>=u)m[n].len=Math.ceil(400*Math.random()),i.xStart=-400,i.xEnd=-400+m[n].len,i.yStart=Math.ceil(Math.random()*c),i.yEnd=i.yStart;i.xStart+=m[n].animationX,i.xEnd+=m[n].animationX,e(m[n])}e(o),t()},l.timeInterval)},e});