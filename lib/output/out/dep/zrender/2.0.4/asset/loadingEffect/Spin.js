/*! @2014 Leo Wang. All Rights Reserved */
define("zrender/loadingEffect/Spin",["require","./Base","../tool/util","../tool/color","../tool/area","../shape/Sector"],function(require){function e(e){t.call(this,e)}var t=require("./Base"),n=require("../tool/util"),i=require("../tool/color"),a=require("../tool/area"),r=require("../shape/Sector");return n.inherits(e,t),e.prototype._start=function(e,t){var o=n.merge(this.options,{textStyle:{color:"#fff",textAlign:"start"},backgroundColor:"rgba(0, 0, 0, 0.8)"}),s=this.createTextShape(o.textStyle),l=10,h=a.getTextWidth(s.highlightStyle.text,s.highlightStyle.textFont),d=a.getTextHeight(s.highlightStyle.text,s.highlightStyle.textFont),m=n.merge(this.options.effect||{},{r0:9,r:15,n:18,color:"#fff",timeInterval:100}),u=this.getLocation(this.options.textStyle,h+l+2*m.r,Math.max(2*m.r,d));m.x=u.x+m.r,m.y=s.highlightStyle.y=u.y+u.height/2,s.highlightStyle.x=m.x+m.r+l;for(var c=this.createBackgroundShape(o.backgroundColor),p=m.n,f=m.x,V=m.y,U=m.r0,y=m.r,g=m.color,_=[],b=Math.round(180/p),k=0;p>k;k++)_[k]=new r({highlightStyle:{x:f,y:V,r0:U,r:y,startAngle:b*k*2,endAngle:b*k*2+b,color:i.alpha(g,(k+1)/p),brushType:"fill"}});var x=[0,f,V];return setInterval(function(){e(c),x[0]-=.3;for(var n=0;p>n;n++)_[n].rotation=x,e(_[n]);e(s),t()},m.timeInterval)},e});