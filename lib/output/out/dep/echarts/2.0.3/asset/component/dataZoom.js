/*! @2014 Leo Wang. All Rights Reserved */
define("echarts/component/dataZoom",["require","./base","zrender/shape/Rectangle","zrender/shape/Polygon","../util/shape/Icon","../config","zrender/tool/util","../component"],function(require){function e(e,i,s,a,o){t.call(this,e,i,s,a,o);var n=this;if(n._ondrift=function(e,t){return n.__ondrift(this,e,t)},n._ondragend=function(){return n.__ondragend()},this._fillerSize=28,this._handleSize=8,this._isSilence=!1,this._zoom={},this.option.dataZoom=this.reformOption(this.option.dataZoom),this.zoomOption=this.option.dataZoom,this._location=this._getLocation(),this._zoom=this._getZoom(),this._backupData(),this.option.dataZoom.show)this._buildShape();this._syncData()}var t=require("./base"),i=require("zrender/shape/Rectangle"),s=require("zrender/shape/Polygon"),a=require("../util/shape/Icon"),o=require("../config"),n=require("zrender/tool/util");return e.prototype={type:o.COMPONENT_TYPE_DATAZOOM,_buildShape:function(){this._buildBackground(),this._buildFiller(),this._buildHandle(),this._buildFrame();for(var e=0,t=this.shapeList.length;t>e;e++)this.zr.addShape(this.shapeList[e]);this._syncFrameShape()},_getLocation:function(){var e,t,i,s,a=this.component.grid;if("horizontal"==this.zoomOption.orient)i=this.zoomOption.width||a.getWidth(),s=this.zoomOption.height||this._fillerSize,e="undefined"!=typeof this.zoomOption.x?this.zoomOption.x:a.getX(),t="undefined"!=typeof this.zoomOption.y?this.zoomOption.y:this.zr.getHeight()-s-2;else i=this.zoomOption.width||this._fillerSize,s=this.zoomOption.height||a.getHeight(),e="undefined"!=typeof this.zoomOption.x?this.zoomOption.x:2,t="undefined"!=typeof this.zoomOption.y?this.zoomOption.y:a.getY();return{x:e,y:t,width:i,height:s}},_getZoom:function(){var e=this.option.series,t=this.option.xAxis;if(t&&!(t instanceof Array))t=[t],this.option.xAxis=t;var i=this.option.yAxis;if(i&&!(i instanceof Array))i=[i],this.option.yAxis=i;var s,a,n=[],h=this.zoomOption.xAxisIndex;if(t&&"undefined"==typeof h){s=[];for(var r=0,l=t.length;l>r;r++)if("category"==t[r].type||"undefined"==typeof t[r].type)s.push(r)}else if(h instanceof Array)s=h;else if("undefined"!=typeof h)s=[h];else s=[];if(h=this.zoomOption.yAxisIndex,i&&"undefined"==typeof h){a=[];for(var r=0,l=i.length;l>r;r++)if("category"==i[r].type)a.push(r)}else if(h instanceof Array)a=h;else if("undefined"!=typeof h)a=[h];else a=[];for(var r=0,l=e.length;l>r;r++)if(e[r].type==o.CHART_TYPE_LINE||e[r].type==o.CHART_TYPE_BAR||e[r].type==o.CHART_TYPE_SCATTER||e[r].type==o.CHART_TYPE_K){for(var d=0,p=s.length;p>d;d++)if(s[d]==(e[r].xAxisIndex||0)){n.push(r);break}for(var d=0,p=a.length;p>d;d++)if(a[d]==(e[r].yAxisIndex||0)){n.push(r);break}if(e[r].type==o.CHART_TYPE_SCATTER&&"undefined"==typeof this.zoomOption.xAxisIndex&&"undefined"==typeof this.zoomOption.yAxisIndex)n.push(r)}else;var c="undefined"!=typeof this._zoom.start?this._zoom.start:"undefined"!=typeof this.zoomOption.start?this.zoomOption.start:0,f="undefined"!=typeof this._zoom.end?this._zoom.end:"undefined"!=typeof this.zoomOption.end?this.zoomOption.end:100;if(c>f)c+=f,f=c-f,c-=f;var u=Math.round((f-c)/100*("horizontal"==this.zoomOption.orient?this._location.width:this._location.height));return{start:c,end:f,start2:0,end2:100,size:u,xAxisIndex:s,yAxisIndex:a,seriesIndex:n,scatterMap:this._zoom.scatterMap||{}}},_backupData:function(){this._originalData={xAxis:{},yAxis:{},series:{}};for(var e=this.option.xAxis,t=this._zoom.xAxisIndex,i=0,s=t.length;s>i;i++)this._originalData.xAxis[t[i]]=e[t[i]].data;for(var a=this.option.yAxis,n=this._zoom.yAxisIndex,i=0,s=n.length;s>i;i++)this._originalData.yAxis[n[i]]=a[n[i]].data;for(var h,r=this.option.series,l=this._zoom.seriesIndex,i=0,s=l.length;s>i;i++)if(h=r[l[i]],this._originalData.series[l[i]]=h.data,h.type==o.CHART_TYPE_SCATTER)this._calculScatterMap(l[i])},_calculScatterMap:function(e){this._zoom.scatterMap=this._zoom.scatterMap||{},this._zoom.scatterMap[e]=this._zoom.scatterMap[e]||{};var t=require("../component"),i=t.get("axis"),s=n.clone(this.option.xAxis);if(s instanceof Array)s[0].type="value",s[0].scale=!0,s[0].boundary=[0,0],s[1]&&(s[1].type="value",s[1].boundary=[0,0]);else s.type="value",s.scale=!0,s.boundary=[0,0];var a=new i(this.ecTheme,null,!1,{xAxis:s,series:this.option.series},this,"xAxis"),o=this.option.series[e].xAxisIndex||0;if(this._zoom.scatterMap[e].x=a.getAxis(o).getExtremum(),a.dispose(),s=n.clone(this.option.yAxis),s instanceof Array)s[0].type="value",s[0].scale=!0,s[1]&&(s[1].type="value",s[1].boundary=[0,0]);else s.type="value",s.scale=!0,s.boundary=[0,0];a=new i(this.ecTheme,null,!1,{yAxis:s,series:this.option.series},this,"yAxis"),o=this.option.series[e].yAxisIndex||0,this._zoom.scatterMap[e].y=a.getAxis(o).getExtremum(),a.dispose()},_buildBackground:function(){var e=this._location.width,t=this._location.height;this.shapeList.push(new i({zlevel:this._zlevelBase,hoverable:!1,style:{x:this._location.x,y:this._location.y,width:e,height:t,color:this.zoomOption.backgroundColor}}));for(var a=0,n=this._originalData.xAxis,h=this._zoom.xAxisIndex,r=0,l=h.length;l>r;r++)a=Math.max(a,n[h[r]].length);for(var d=this._originalData.yAxis,p=this._zoom.yAxisIndex,r=0,l=p.length;l>r;r++)a=Math.max(a,d[p[r]].length);for(var c,f=this._zoom.seriesIndex[0],u=this._originalData.series[f],g=Number.MIN_VALUE,y=Number.MAX_VALUE,r=0,l=u.length;l>r;r++){if(c="undefined"!=typeof u[r]?"undefined"!=typeof u[r].value?u[r].value:u[r]:0,this.option.series[f].type==o.CHART_TYPE_K)c=c[1];if(isNaN(c))c=0;g=Math.max(g,c),y=Math.min(y,c)}var m=g-y,_=[],x=e/(a-(a>1?1:0)),v=t/(a-(a>1?1:0)),S=1;if("horizontal"==this.zoomOption.orient&&1>x)S=Math.floor(3*a/e);else if("vertical"==this.zoomOption.orient&&1>v)S=Math.floor(3*a/t);for(var r=0,l=a;l>r;r+=S){if(c="undefined"!=typeof u[r]?"undefined"!=typeof u[r].value?u[r].value:u[r]:0,this.option.series[f].type==o.CHART_TYPE_K)c=c[1];if(isNaN(c))c=0;if("horizontal"==this.zoomOption.orient)_.push([this._location.x+x*r,this._location.y+t-1-Math.round((c-y)/m*(t-10))]);else _.push([this._location.x+1+Math.round((c-y)/m*(e-10)),this._location.y+v*r])}if("horizontal"==this.zoomOption.orient)_.push([this._location.x+e,this._location.y+t]),_.push([this._location.x,this._location.y+t]);else _.push([this._location.x,this._location.y+t]),_.push([this._location.x,this._location.y]);this.shapeList.push(new s({zlevel:this._zlevelBase,style:{pointList:_,color:this.zoomOption.dataBackgroundColor},hoverable:!1}))},_buildFiller:function(){if(this._fillerShae={zlevel:this._zlevelBase,draggable:!0,ondrift:this._ondrift,ondragend:this._ondragend,_type:"filler"},"horizontal"==this.zoomOption.orient)this._fillerShae.style={x:this._location.x+Math.round(this._zoom.start/100*this._location.width)+this._handleSize,y:this._location.y,width:this._zoom.size-2*this._handleSize,height:this._location.height,color:this.zoomOption.fillerColor,text:":::",textPosition:"inside"};else this._fillerShae.style={x:this._location.x,y:this._location.y+Math.round(this._zoom.start/100*this._location.height)+this._handleSize,width:this._location.width,height:this._zoom.size-2*this._handleSize,color:this.zoomOption.fillerColor,text:"::",textPosition:"inside"};this._fillerShae.highlightStyle={brushType:"fill",color:"rgba(0,0,0,0)"},this._fillerShae=new i(this._fillerShae),this.shapeList.push(this._fillerShae)},_buildHandle:function(){if(this._startShape={zlevel:this._zlevelBase,draggable:!0,style:{iconType:"rectangle",x:this._location.x,y:this._location.y,width:this._handleSize,height:this._handleSize,color:this.zoomOption.handleColor,text:"=",textPosition:"inside"},highlightStyle:{brushType:"fill"},ondrift:this._ondrift,ondragend:this._ondragend},"horizontal"==this.zoomOption.orient)this._startShape.style.height=this._location.height,this._endShape=n.clone(this._startShape),this._startShape.style.x=this._fillerShae.style.x-this._handleSize,this._endShape.style.x=this._fillerShae.style.x+this._fillerShae.style.width;else this._startShape.style.width=this._location.width,this._endShape=n.clone(this._startShape),this._startShape.style.y=this._fillerShae.style.y-this._handleSize,this._endShape.style.y=this._fillerShae.style.y+this._fillerShae.style.height;this._startShape=new a(this._startShape),this._endShape=new a(this._endShape),this.shapeList.push(this._startShape),this.shapeList.push(this._endShape)},_buildFrame:function(){var e=this.subPixelOptimize(this._location.x,1),t=this.subPixelOptimize(this._location.y,1);this._startFrameShape={zlevel:this._zlevelBase,hoverable:!1,style:{x:e,y:t,width:this._location.width-(e>this._location.x?1:0),height:this._location.height-(t>this._location.y?1:0),lineWidth:1,brushType:"stroke",strokeColor:this.zoomOption.handleColor}},this._endFrameShape=n.clone(this._startFrameShape),this._startFrameShape=new i(this._startFrameShape),this._endFrameShape=new i(this._endFrameShape),this.shapeList.push(this._startFrameShape),this.shapeList.push(this._endFrameShape)},_syncHandleShape:function(){if("horizontal"==this.zoomOption.orient)this._startShape.style.x=this._fillerShae.style.x-this._handleSize,this._endShape.style.x=this._fillerShae.style.x+this._fillerShae.style.width,this._zoom.start=Math.floor((this._startShape.style.x-this._location.x)/this._location.width*100),this._zoom.end=Math.ceil((this._endShape.style.x+this._handleSize-this._location.x)/this._location.width*100);else this._startShape.style.y=this._fillerShae.style.y-this._handleSize,this._endShape.style.y=this._fillerShae.style.y+this._fillerShae.style.height,this._zoom.start=Math.floor((this._startShape.style.y-this._location.y)/this._location.height*100),this._zoom.end=Math.ceil((this._endShape.style.y+this._handleSize-this._location.y)/this._location.height*100);this.zr.modShape(this._startShape.id),this.zr.modShape(this._endShape.id),this._syncFrameShape(),this.zr.refresh()},_syncFillerShape:function(){var e,t;if("horizontal"==this.zoomOption.orient)e=this._startShape.style.x,t=this._endShape.style.x,this._fillerShae.style.x=Math.min(e,t)+this._handleSize,this._fillerShae.style.width=Math.abs(e-t)-this._handleSize,this._zoom.start=Math.floor((Math.min(e,t)-this._location.x)/this._location.width*100),this._zoom.end=Math.ceil((Math.max(e,t)+this._handleSize-this._location.x)/this._location.width*100);else e=this._startShape.style.y,t=this._endShape.style.y,this._fillerShae.style.y=Math.min(e,t)+this._handleSize,this._fillerShae.style.height=Math.abs(e-t)-this._handleSize,this._zoom.start=Math.floor((Math.min(e,t)-this._location.y)/this._location.height*100),this._zoom.end=Math.ceil((Math.max(e,t)+this._handleSize-this._location.y)/this._location.height*100);this.zr.modShape(this._fillerShae.id),this._syncFrameShape(),this.zr.refresh()},_syncFrameShape:function(){if("horizontal"==this.zoomOption.orient)this._startFrameShape.style.width=this._fillerShae.style.x-this._location.x,this._endFrameShape.style.x=this._fillerShae.style.x+this._fillerShae.style.width,this._endFrameShape.style.width=this._location.x+this._location.width-this._endFrameShape.style.x;else this._startFrameShape.style.height=this._fillerShae.style.y-this._location.y,this._endFrameShape.style.y=this._fillerShae.style.y+this._fillerShae.style.height,this._endFrameShape.style.height=this._location.y+this._location.height-this._endFrameShape.style.y;this.zr.modShape(this._startFrameShape.id),this.zr.modShape(this._endFrameShape.id)},_syncShape:function(){if(this.zoomOption.show){if("horizontal"==this.zoomOption.orient)this._startShape.style.x=this._location.x+this._zoom.start/100*this._location.width,this._endShape.style.x=this._location.x+this._zoom.end/100*this._location.width-this._handleSize,this._fillerShae.style.x=this._startShape.style.x+this._handleSize,this._fillerShae.style.width=this._endShape.style.x-this._startShape.style.x-this._handleSize;else this._startShape.style.y=this._location.y+this._zoom.start/100*this._location.height,this._endShape.style.y=this._location.y+this._zoom.end/100*this._location.height-this._handleSize,this._fillerShae.style.y=this._startShape.style.y+this._handleSize,this._fillerShae.style.height=this._endShape.style.y-this._startShape.style.y-this._handleSize;this.zr.modShape(this._startShape.id),this.zr.modShape(this._endShape.id),this.zr.modShape(this._fillerShae.id),this._syncFrameShape(),this.zr.refresh()}},_syncData:function(e){var t,i,s,a,n;for(var h in this._originalData){t=this._originalData[h];for(var r in t)if(n=t[r],"undefined"!=typeof n)if(a=n.length,i=Math.floor(this._zoom.start/100*a),s=Math.ceil(this._zoom.end/100*a),this.option[h][r].type!=o.CHART_TYPE_SCATTER)this.option[h][r].data=n.slice(i,s);else this.option[h][r].data=this._synScatterData(r,n);else;}if(!this._isSilence&&(this.zoomOption.realtime||e))this.messageCenter.dispatch(o.EVENT.DATA_ZOOM,null,{zoom:this._zoom},this.myChart)},_synScatterData:function(e,t){if(0===this._zoom.start&&100==this._zoom.end&&0===this._zoom.start2&&100==this._zoom.end2)return t;var i,s,a,o,n,h=[],r=this._zoom.scatterMap[e];if("horizontal"==this.zoomOption.orient)i=r.x.max-r.x.min,s=this._zoom.start/100*i+r.x.min,a=this._zoom.end/100*i+r.x.min,i=r.y.max-r.y.min,o=this._zoom.start2/100*i+r.y.min,n=this._zoom.end2/100*i+r.y.min;else i=r.x.max-r.x.min,s=this._zoom.start2/100*i+r.x.min,a=this._zoom.end2/100*i+r.x.min,i=r.y.max-r.y.min,o=this._zoom.start/100*i+r.y.min,n=this._zoom.end/100*i+r.y.min;for(var l,d=0,p=t.length;p>d;d++)if(l=t[d].value||t[d],l[0]>=s&&l[0]<=a&&l[1]>=o&&l[1]<=n)h.push(t[d]);return h},__ondrift:function(e,t,i){if(this.zoomOption.zoomLock)e=this._fillerShae;var s="filler"==e._type?this._handleSize:0;if("horizontal"==this.zoomOption.orient)if(e.style.x+t-s<=this._location.x)e.style.x=this._location.x+s;else if(e.style.x+t+e.style.width+s>=this._location.x+this._location.width)e.style.x=this._location.x+this._location.width-e.style.width-s;else e.style.x+=t;else if(e.style.y+i-s<=this._location.y)e.style.y=this._location.y+s;else if(e.style.y+i+e.style.height+s>=this._location.y+this._location.height)e.style.y=this._location.y+this._location.height-e.style.height-s;else e.style.y+=i;if("filler"==e._type)this._syncHandleShape();else this._syncFillerShape();if(this.zoomOption.realtime)this._syncData();return!0},__ondragend:function(){this.isDragend=!0},ondragend:function(e,t){if(this.isDragend&&e.target){if(!this.zoomOption.realtime&&this._syncData(),t.dragOut=!0,t.dragIn=!0,!this._isSilence&&!this.zoomOption.realtime)this.messageCenter.dispatch(o.EVENT.DATA_ZOOM,null,{zoom:this._zoom},this.myChart);t.needRefresh=!1,this.isDragend=!1}},ondataZoom:function(e,t){t.needRefresh=!0},absoluteZoom:function(e){this._zoom.start=e.start,this._zoom.end=e.end,this._zoom.start2=e.start2,this._zoom.end2=e.end2,this._syncShape(),this._syncData(!0)},rectZoom:function(e){if(!e)return this._zoom.start=this._zoom.start2=0,this._zoom.end=this._zoom.end2=100,this._syncShape(),this._syncData(!0),this._zoom;var t=this.component.grid.getArea(),i={x:e.x,y:e.y,width:e.width,height:e.height};if(i.width<0)i.x+=i.width,i.width=-i.width;if(i.height<0)i.y+=i.height,i.height=-i.height;if(i.x>t.x+t.width||i.y>t.y+t.height)return!1;if(i.x<t.x)i.x=t.x;if(i.x+i.width>t.x+t.width)i.width=t.x+t.width-i.x;if(i.y+i.height>t.y+t.height)i.height=t.y+t.height-i.y;var s,a=(i.x-t.x)/t.width,o=1-(i.x+i.width-t.x)/t.width,n=1-(i.y+i.height-t.y)/t.height,h=(i.y-t.y)/t.height;if("horizontal"==this.zoomOption.orient)s=this._zoom.end-this._zoom.start,this._zoom.start+=s*a,this._zoom.end-=s*o,s=this._zoom.end2-this._zoom.start2,this._zoom.start2+=s*n,this._zoom.end2-=s*h;else s=this._zoom.end-this._zoom.start,this._zoom.start+=s*n,this._zoom.end-=s*h,s=this._zoom.end2-this._zoom.start2,this._zoom.start2+=s*a,this._zoom.end2-=s*o;return this._syncShape(),this._syncData(!0),this._zoom},syncBackupData:function(e){for(var t,i,s=this._originalData.series,a=e.series,o=0,n=a.length;n>o;o++){if(i=a[o].data,s[o])t=Math.floor(this._zoom.start/100*s[o].length);else t=0;for(var h=0,r=i.length;r>h;h++)if(s[o])s[o][h+t]=i[h]}},syncOption:function(e){if(this.silence(!0),this.option=e,this.clear(),this._location=this._getLocation(),this._zoom=this._getZoom(),this._backupData(),this.option.dataZoom&&this.option.dataZoom.show)this._buildShape();this._syncData(),this.silence(!1)},silence:function(e){this._isSilence=e},getRealDataIndex:function(e,t){if(!this._originalData||0===this._zoom.start&&100==this._zoom.end)return t;var i=this._originalData.series;if(i[e])return Math.floor(this._zoom.start/100*i[e].length)+t;else return-1},resize:function(){if(this.clear(),this._location=this._getLocation(),this._zoom=this._getZoom(),this.option.dataZoom.show)this._buildShape()}},n.inherits(e,t),require("../component").define("dataZoom",e),e});