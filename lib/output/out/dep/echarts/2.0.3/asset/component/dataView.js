/*! @2014 Leo Wang. All Rights Reserved */
define("echarts/component/dataView",["require","./base","../config","zrender/tool/util","../component"],function(require){function e(e,i,s,a,o){if(t.call(this,e,i,s,a,o),this.dom=o.dom,this._tDom=document.createElement("div"),this._textArea=document.createElement("textArea"),this._buttonRefresh=document.createElement("button"),this._buttonClose=document.createElement("button"),this._hasShow=!1,this._zrHeight=s.getHeight(),this._zrWidth=s.getWidth(),this._tDom.className="echarts-dataview",this.hide(),this.dom.firstChild.appendChild(this._tDom),window.addEventListener)this._tDom.addEventListener("click",this._stop),this._tDom.addEventListener("mousewheel",this._stop),this._tDom.addEventListener("mousemove",this._stop),this._tDom.addEventListener("mousedown",this._stop),this._tDom.addEventListener("mouseup",this._stop),this._tDom.addEventListener("touchstart",this._stop),this._tDom.addEventListener("touchmove",this._stop),this._tDom.addEventListener("touchend",this._stop);else this._tDom.attachEvent("onclick",this._stop),this._tDom.attachEvent("onmousewheel",this._stop),this._tDom.attachEvent("onmousemove",this._stop),this._tDom.attachEvent("onmousedown",this._stop),this._tDom.attachEvent("onmouseup",this._stop)}var t=require("./base"),i=require("../config"),s=require("zrender/tool/util");return e.prototype={type:i.COMPONENT_TYPE_DATAVIEW,_lang:["Data View","close","refresh"],_gCssText:"position:absolute;display:block;overflow:hidden;transition:height 0.8s,background-color 1s;-moz-transition:height 0.8s,background-color 1s;-webkit-transition:height 0.8s,background-color 1s;-o-transition:height 0.8s,background-color 1s;z-index:1;left:0;top:0;",hide:function(){this._sizeCssText="width:"+this._zrWidth+"px;height:0px;background-color:#f0ffff;",this._tDom.style.cssText=this._gCssText+this._sizeCssText},show:function(e){this._hasShow=!0;var t=this.query(this.option,"toolbox.feature.dataView.lang")||this._lang;this.option=e,this._tDom.innerHTML='<p style="padding:8px 0;margin:0 0 10px 0;border-bottom:1px solid #eee">'+(t[0]||this._lang[0])+"</p>",this._textArea.style.cssText="display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:"+(this._zrWidth-15)+"px;height:"+(this._zrHeight-100)+"px;";var i=this.query(this.option,"toolbox.feature.dataView.optionToContent");if("function"!=typeof i)this._textArea.value=this._optionToContent();else this._textArea.value=i(this.option);this._tDom.appendChild(this._textArea),this._buttonClose.style.cssText="float:right;padding:1px 6px;",this._buttonClose.innerHTML=t[1]||this._lang[1];var s=this;if(this._buttonClose.onclick=function(){s.hide()},this._tDom.appendChild(this._buttonClose),this.query(this.option,"toolbox.feature.dataView.readOnly")===!1)this._buttonRefresh.style.cssText="float:right;margin-right:10px;padding:1px 6px;",this._buttonRefresh.innerHTML=t[2]||this._lang[2],this._buttonRefresh.onclick=function(){s._save()},this._tDom.appendChild(this._buttonRefresh),this._textArea.readOnly=!1,this._textArea.style.cursor="default";else this._textArea.readOnly=!0,this._textArea.style.cursor="text";this._sizeCssText="width:"+this._zrWidth+"px;height:"+this._zrHeight+"px;background-color:#fff;",this._tDom.style.cssText=this._gCssText+this._sizeCssText},_optionToContent:function(){var e,t,s,a,o,n,r=[],h="";if(this.option.xAxis){if(this.option.xAxis instanceof Array)r=this.option.xAxis;else r=[this.option.xAxis];for(e=0,a=r.length;a>e;e++)if("category"==(r[e].type||"category")){for(n=[],t=0,s=r[e].data.length;s>t;t++)o=r[e].data[t],n.push("undefined"!=typeof o.value?o.value:o);h+=n.join(", ")+"\n\n"}}if(this.option.yAxis){if(this.option.yAxis instanceof Array)r=this.option.yAxis;else r=[this.option.yAxis];for(e=0,a=r.length;a>e;e++)if("category"==r[e].type){for(n=[],t=0,s=r[e].data.length;s>t;t++)o=r[e].data[t],n.push("undefined"!=typeof o.value?o.value:o);h+=n.join(", ")+"\n\n"}}var l,d=this.option.series;for(e=0,a=d.length;a>e;e++){for(n=[],t=0,s=d[e].data.length;s>t;t++){if(o=d[e].data[t],d[e].type==i.CHART_TYPE_PIE||d[e].type==i.CHART_TYPE_MAP)l=(o.name||"-")+":";else l="";if(d[e].type==i.CHART_TYPE_SCATTER)o="undefined"!=typeof o.value?o.value:o,o=o.join(", ");n.push(l+("undefined"!=typeof o.value?o.value:o))}h+=(d[e].name||"-")+" : \n",h+=n.join(d[e].type==i.CHART_TYPE_SCATTER?"\n":", "),h+="\n\n"}return h},_save:function(){var e=this._textArea.value,t=this.query(this.option,"toolbox.feature.dataView.contentToOption");if("function"!=typeof t){e=e.split("\n");for(var s=[],a=0,o=e.length;o>a;a++)if(e[a]=this._trim(e[a]),""!==e[a])s.push(e[a]);this._contentToOption(s)}else t(e,this.option);this.hide();var n=this;setTimeout(function(){n.messageCenter&&n.messageCenter.dispatch(i.EVENT.DATA_VIEW_CHANGED,null,{option:n.option},n.myChart)},n.canvasSupported?800:100)},_contentToOption:function(e){var t,s,a,o,n,r,h,l=[],d=0;if(this.option.xAxis){if(this.option.xAxis instanceof Array)l=this.option.xAxis;else l=[this.option.xAxis];for(t=0,o=l.length;o>t;t++)if("category"==(l[t].type||"category")){for(r=e[d].split(","),s=0,a=l[t].data.length;a>s;s++)if(h=this._trim(r[s]||""),n=l[t].data[s],"undefined"!=typeof l[t].data[s].value)l[t].data[s].value=h;else l[t].data[s]=h;d++}}if(this.option.yAxis){if(this.option.yAxis instanceof Array)l=this.option.yAxis;else l=[this.option.yAxis];for(t=0,o=l.length;o>t;t++)if("category"==l[t].type){for(r=e[d].split(","),s=0,a=l[t].data.length;a>s;s++)if(h=this._trim(r[s]||""),n=l[t].data[s],"undefined"!=typeof l[t].data[s].value)l[t].data[s].value=h;else l[t].data[s]=h;d++}}var p=this.option.series;for(t=0,o=p.length;o>t;t++)if(d++,p[t].type==i.CHART_TYPE_SCATTER)for(var s=0,a=p[t].data.length;a>s;s++){if(r=e[d],h=r.replace(" ","").split(","),"undefined"!=typeof p[t].data[s].value)p[t].data[s].value=h;else p[t].data[s]=h;d++}else{r=e[d].split(",");for(var s=0,a=p[t].data.length;a>s;s++)if(h=(r[s]||"").replace(/.*:/,""),h=this._trim(h),h="-"!=h&&""!==h?h-0:"-","undefined"!=typeof p[t].data[s].value)p[t].data[s].value=h;else p[t].data[s]=h;d++}},_trim:function(e){var t=new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)","g");return e.replace(t,"")},_stop:function(e){if(e=e||window.event,e.stopPropagation)e.stopPropagation();else e.cancelBubble=!0},resize:function(){if(this._zrHeight=this.zr.getHeight(),this._zrWidth=this.zr.getWidth(),this._tDom.offsetHeight>10)this._sizeCssText="width:"+this._zrWidth+"px;height:"+this._zrHeight+"px;background-color:#fff;",this._tDom.style.cssText=this._gCssText+this._sizeCssText,this._textArea.style.cssText="display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:"+(this._zrWidth-15)+"px;height:"+(this._zrHeight-100)+"px;"},dispose:function(){if(window.removeEventListener)this._tDom.removeEventListener("click",this._stop),this._tDom.removeEventListener("mousewheel",this._stop),this._tDom.removeEventListener("mousemove",this._stop),this._tDom.removeEventListener("mousedown",this._stop),this._tDom.removeEventListener("mouseup",this._stop),this._tDom.removeEventListener("touchstart",this._stop),this._tDom.removeEventListener("touchmove",this._stop),this._tDom.removeEventListener("touchend",this._stop);else this._tDom.detachEvent("onclick",this._stop),this._tDom.detachEvent("onmousewheel",this._stop),this._tDom.detachEvent("onmousemove",this._stop),this._tDom.detachEvent("onmousedown",this._stop),this._tDom.detachEvent("onmouseup",this._stop);if(this._buttonRefresh.onclick=null,this._buttonClose.onclick=null,this._hasShow)this._tDom.removeChild(this._textArea),this._tDom.removeChild(this._buttonRefresh),this._tDom.removeChild(this._buttonClose);this._textArea=null,this._buttonRefresh=null,this._buttonClose=null,this.dom.firstChild.removeChild(this._tDom),this._tDom=null}},s.inherits(e,t),require("../component").define("dataView",e),e});