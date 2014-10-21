/*! @2014 Leo Wang. All Rights Reserved */
define("echarts/component/grid",["require","./base","zrender/shape/Rectangle","../config","zrender/tool/util","../component"],function(require){function e(e,i,s,a,o){t.call(this,e,i,s,a,o),this.refresh(a)}var t=require("./base"),i=require("zrender/shape/Rectangle"),s=require("../config"),a=require("zrender/tool/util");return e.prototype={type:s.COMPONENT_TYPE_GRID,getX:function(){return this._x},getY:function(){return this._y},getWidth:function(){return this._width},getHeight:function(){return this._height},getXend:function(){return this._x+this._width},getYend:function(){return this._y+this._height},getArea:function(){return{x:this._x,y:this._y,width:this._width,height:this._height}},refixAxisShape:function(e){for(var t,i,a,o=e.xAxis._axisList.concat(e.yAxis._axisList),h=o.length;h--;)if(a=o[h],a.type==s.COMPONENT_TYPE_AXIS_VALUE&&a._min<0&&a._max>=0)a.isHorizontal()?t=a.getCoord(0):i=a.getCoord(0);if("undefined"!=typeof t||"undefined"!=typeof i)for(h=o.length;h--;)o[h].refixAxisShape(t,i)},refresh:function(e){if(e||this._zrWidth!=this.zr.getWidth()||this._zrHeight!=this.zr.getHeight()){this.clear(),this.option=e||this.option,this.option.grid=this.reformOption(this.option.grid);var t=this.option.grid;this._zrWidth=this.zr.getWidth(),this._zrHeight=this.zr.getHeight(),this._x=this.parsePercent(t.x,this._zrWidth),this._y=this.parsePercent(t.y,this._zrHeight);var s=this.parsePercent(t.x2,this._zrWidth),a=this.parsePercent(t.y2,this._zrHeight);if("undefined"==typeof t.width)this._width=this._zrWidth-this._x-s;else this._width=this.parsePercent(t.width,this._zrWidth);if(this._width=this._width<=0?10:this._width,"undefined"==typeof t.height)this._height=this._zrHeight-this._y-a;else this._height=this.parsePercent(t.height,this._zrHeight);this._height=this._height<=0?10:this._height,this._x=this.subPixelOptimize(this._x,t.borderWidth),this._y=this.subPixelOptimize(this._y,t.borderWidth),this.shapeList.push(new i({zlevel:this._zlevelBase,hoverable:!1,style:{x:this._x,y:this._y,width:this._width,height:this._height,brushType:t.borderWidth>0?"both":"fill",color:t.backgroundColor,strokeColor:t.borderColor,lineWidth:t.borderWidth}})),this.zr.addShape(this.shapeList[0])}}},a.inherits(e,t),require("../component").define("grid",e),e});