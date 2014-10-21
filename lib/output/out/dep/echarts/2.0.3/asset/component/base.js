/*! @2014 Leo Wang. All Rights Reserved */
define("echarts/component/base",["require","../config","../util/ecQuery","../util/number","zrender/tool/util","zrender/tool/env"],function(require){function e(e,t,i,s,a){this.ecTheme=e,this.messageCenter=t,this.zr=i,this.option=s,this.series=s.series,this.myChart=a,this.component=a.component,this._zlevelBase=this.getZlevelBase(),this.shapeList=[],this.effectList=[];var r=this;r.hoverConnect=function(e){var t=(e.target||{}).hoverConnect;if(t){var i,s=10;if(!(t instanceof Array)){if(i=r.getShapeById(t))r.zr.addHoverShape(i),s=Math.min(s,i.zlevel)}else for(var a=0,o=t.length;o>a;a++)i=r.getShapeById(t[a]),r.zr.addHoverShape(i),s=Math.min(s,i.zlevel);if(s<e.target.zlevel)r.zr.addHoverShape(e.target)}}}var t=require("../config"),i=require("../util/ecQuery"),s=require("../util/number"),a=require("zrender/tool/util");return e.prototype={canvasSupported:require("zrender/tool/env").canvasSupported,getZlevelBase:function(e){switch(e=e||this.type+""){case t.COMPONENT_TYPE_GRID:case t.COMPONENT_TYPE_AXIS_CATEGORY:case t.COMPONENT_TYPE_AXIS_VALUE:case t.COMPONENT_TYPE_POLAR:return 0;case t.CHART_TYPE_LINE:case t.CHART_TYPE_BAR:case t.CHART_TYPE_SCATTER:case t.CHART_TYPE_PIE:case t.CHART_TYPE_RADAR:case t.CHART_TYPE_MAP:case t.CHART_TYPE_K:case t.CHART_TYPE_CHORD:case t.CHART_TYPE_GUAGE:case t.CHART_TYPE_FUNNEL:return 2;case t.COMPONENT_TYPE_LEGEND:case t.COMPONENT_TYPE_DATARANGE:case t.COMPONENT_TYPE_DATAZOOM:case t.COMPONENT_TYPE_TIMELINE:case t.COMPONENT_TYPE_ROAMCONTROLLER:return 4;case t.CHART_TYPE_ISLAND:return 5;case t.COMPONENT_TYPE_TOOLBOX:case t.COMPONENT_TYPE_TITLE:return 6;case t.COMPONENT_TYPE_TOOLTIP:return 8;default:return 0}},reformOption:function(e){return a.merge(e||{},a.clone(this.ecTheme[this.type]||{}))},reformCssArray:function(e){if(e instanceof Array)switch(e.length+""){case"4":return e;case"3":return[e[0],e[1],e[2],e[1]];case"2":return[e[0],e[1],e[0],e[1]];case"1":return[e[0],e[0],e[0],e[0]];case"0":return[0,0,0,0]}else return[e,e,e,e]},getShapeById:function(e){for(var t=0,i=this.shapeList.length;i>t;t++)if(this.shapeList[t].id==e)return this.shapeList[t];return null},getFont:function(e){var t=a.merge(a.clone(e)||{},this.ecTheme.textStyle);return t.fontStyle+" "+t.fontWeight+" "+t.fontSize+"px "+t.fontFamily},getItemStyleColor:function(e,t,i,s){return"function"==typeof e?e(t,i,s):e},subPixelOptimize:function(e,t){if(t%2==1)e=Math.floor(e)+.5;else e=Math.round(e);return e},resize:function(){this.refresh&&this.refresh(),this.clearEffectShape&&this.clearEffectShape(!0);var e=this;setTimeout(function(){e.animationEffect&&e.animationEffect()},200)},clear:function(){this.clearEffectShape&&this.clearEffectShape(),this.zr&&this.zr.delShape(this.shapeList),this.shapeList=[]},dispose:function(){this.clear(),this.shapeList=null,this.effectList=null},query:i.query,deepQuery:i.deepQuery,deepMerge:i.deepMerge,parsePercent:s.parsePercent,parseCenter:s.parseCenter,parseRadius:s.parseRadius,numAddCommas:s.addCommas},e});