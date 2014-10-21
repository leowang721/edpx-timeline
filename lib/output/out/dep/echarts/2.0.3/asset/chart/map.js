/*! @2014 Leo Wang. All Rights Reserved */
define("echarts/chart/map",["require","../component/base","./base","zrender/shape/Text","zrender/shape/Path","zrender/shape/Circle","zrender/shape/Rectangle","zrender/shape/Line","zrender/shape/Polygon","zrender/shape/Ellipse","../component/dataRange","../component/roamController","../config","../util/ecData","zrender/tool/util","zrender/config","zrender/tool/event","../util/mapData/params","../util/mapData/textFixed","../util/mapData/geoCoord","../util/projection/svg","../util/projection/normal","../chart"],function(require){function e(e,s,a,o,r){t.call(this,e,s,a,o,r),i.call(this);var n=this;n._onmousewheel=function(e){return n.__onmousewheel(e)},n._onmousedown=function(e){return n.__onmousedown(e)},n._onmousemove=function(e){return n.__onmousemove(e)},n._onmouseup=function(e){return n.__onmouseup(e)},n._onroamcontroller=function(e){return n.__onroamcontroller(e)},this._isAlive=!0,this._selectedMode={},this._activeMapType={},this._clickable={},this._hoverable={},this._showLegendSymbol={},this._selected={},this._mapTypeMap={},this._mapDataMap={},this._nameMap={},this._specialArea={},this._refreshDelayTicket,this._mapDataRequireCounter,this._markAnimation=!1,this._roamMap={},this._scaleLimitMap={},this._mx,this._my,this._mousedown,this._justMove,this._curMapType,this.refresh(o),this.zr.on(f.EVENT.MOUSEWHEEL,this._onmousewheel),this.zr.on(f.EVENT.MOUSEDOWN,this._onmousedown),s.bind(p.EVENT.ROAMCONTROLLER,this._onroamcontroller)}var t=require("../component/base"),i=require("./base"),s=require("zrender/shape/Text"),a=require("zrender/shape/Path"),o=require("zrender/shape/Circle"),r=require("zrender/shape/Rectangle"),n=require("zrender/shape/Line"),h=require("zrender/shape/Polygon"),l=require("zrender/shape/Ellipse");require("../component/dataRange"),require("../component/roamController");var p=require("../config"),d=require("../util/ecData"),c=require("zrender/tool/util"),f=require("zrender/config"),u=require("zrender/tool/event"),m=require("../util/mapData/params").params,y=require("../util/mapData/textFixed"),g=require("../util/mapData/geoCoord");return e.prototype={type:p.CHART_TYPE_MAP,_buildShape:function(){var e=this.series;this.selectedMap={},this._activeMapType={};for(var t,i,s,a,o=this.component.legend,r={},n={},h={},l={},d=0,f=e.length;f>d;d++)if(e[d].type==p.CHART_TYPE_MAP){if(e[d]=this.reformOption(e[d]),i=e[d].mapType,n[i]=n[i]||{},n[i][d]=!0,h[i]=h[i]||e[d].mapValuePrecision,this._scaleLimitMap[i]=this._scaleLimitMap[i]||{},e[d].scaleLimit&&c.merge(this._scaleLimitMap[i],e[d].scaleLimit,!0),this._roamMap[i]=e[d].roam||this._roamMap[i],this._nameMap[i]=this._nameMap[i]||{},e[d].nameMap&&c.merge(this._nameMap[i],e[d].nameMap,!0),this._activeMapType[i]=!0,e[d].textFixed)c.merge(y,e[d].textFixed,!0);if(e[d].geoCoord)c.merge(g,e[d].geoCoord,!0);if(this._selectedMode[i]=this._selectedMode[i]||e[d].selectedMode,"undefined"==typeof this._hoverable[i]||this._hoverable[i])this._hoverable[i]=e[d].hoverable;if("undefined"==typeof this._clickable[i]||this._clickable[i])this._clickable[i]=e[d].clickable;if("undefined"==typeof this._showLegendSymbol[i]||this._showLegendSymbol[i])this._showLegendSymbol[i]=e[d].showLegendSymbol;if(l[i]=l[i]||e[d].mapValueCalculation,t=e[d].name,this.selectedMap[t]=o?o.isSelected(t):!0,this.selectedMap[t]){r[i]=r[i]||{},s=e[d].data;for(var u=0,_=s.length;_>u;u++){a=this._nameChange(i,s[u].name),r[i][a]=r[i][a]||{seriesIndex:[]};for(var v in s[u])if("value"!=v)r[i][a][v]=s[u][v];else if(!isNaN(s[u].value))"undefined"==typeof r[i][a].value&&(r[i][a].value=0),r[i][a].value+=s[u].value;r[i][a].seriesIndex.push(d)}}}this._mapDataRequireCounter=0;for(var b in r)this._mapDataRequireCounter++;if(this._clearSelected(),0===this._mapDataRequireCounter)this.clear(),this.zr&&this.zr.delShape(this.lastShapeList),this.lastShapeList=[];for(var b in r){if(l[b]&&"average"==l[b])for(var _ in r[b])r[b][_].value=(r[b][_].value/r[b][_].seriesIndex.length).toFixed(h[b])-0;if(this._mapDataMap[b]=this._mapDataMap[b]||{},this._mapDataMap[b].mapData)this._mapDataCallback(b,r[b],n[b])(this._mapDataMap[b].mapData);else if(m[b.replace(/\|.*/,"")].getGeoJson)this._specialArea[b]=m[b.replace(/\|.*/,"")].specialArea||this._specialArea[b],m[b.replace(/\|.*/,"")].getGeoJson(this._mapDataCallback(b,r[b],n[b]))}},_mapDataCallback:function(e,t,i){var s=this;return function(a){if(s._isAlive){if(-1!=e.indexOf("|"))a=s._getSubMapData(e,a);if(s._mapDataMap[e].mapData=a,a.firstChild)s._mapDataMap[e].rate=1,s._mapDataMap[e].projection=require("../util/projection/svg");else s._mapDataMap[e].rate=.75,s._mapDataMap[e].projection=require("../util/projection/normal");if(s._buildMap(e,s._getProjectionData(e,a,i),t,i),s._buildMark(e,i),--s._mapDataRequireCounter<=0)s.addShapeList(),s.zr.refresh()}}},_clearSelected:function(){for(var e in this._selected)if(!this._activeMapType[this._mapTypeMap[e]])delete this._selected[e],delete this._mapTypeMap[e]},_getSubMapData:function(e,t){for(var i=e.replace(/^.*\|/,""),s=t.features,a=0,o=s.length;o>a;a++)if(s[a].properties&&s[a].properties.name==i){if(s=s[a],"United States of America"==i&&s.geometry.coordinates.length>1)s={geometry:{coordinates:s.geometry.coordinates.slice(5,6),type:s.geometry.type},id:s.id,properties:s.properties,type:s.type};break}return{type:"FeatureCollection",features:[s]}},_getProjectionData:function(e,t,i){var s,a=this._mapDataMap[e].projection,o=[],r=this._mapDataMap[e].bbox||a.getBbox(t,this._specialArea[e]);if(!this._mapDataMap[e].hasRoam)s=this._getTransform(r,i,this._mapDataMap[e].rate);else s=this._mapDataMap[e].transform;var n,h=this._mapDataMap[e].lastTransform||{scale:{}};if(s.left!=h.left||s.top!=h.top||s.scale.x!=h.scale.x||s.scale.y!=h.scale.y)n=a.geoJson2Path(t,s,this._specialArea[e]),h=c.clone(s);else s=this._mapDataMap[e].transform,n=this._mapDataMap[e].pathArray;this._mapDataMap[e].bbox=r,this._mapDataMap[e].transform=s,this._mapDataMap[e].lastTransform=h,this._mapDataMap[e].pathArray=n;for(var l=[s.left,s.top],p=0,d=n.length;d>p;p++)o.push(this._getSingleProvince(e,n[p],l));if(this._specialArea[e])for(var f in this._specialArea[e])o.push(this._getSpecialProjectionData(e,t,f,this._specialArea[e][f],l));if("china"==e){var u=this.geo2pos(e,g["南海诸岛"]||m["南海诸岛"].textCoord),_=s.scale.x/10.5,v=[32*_+u[0],83*_+u[1]];if(y["南海诸岛"])v[0]+=y["南海诸岛"][0],v[1]+=y["南海诸岛"][1];o.push({name:this._nameChange(e,"南海诸岛"),path:m["南海诸岛"].getPath(u,_),position:l,textX:v[0],textY:v[1]})}return o},_getSpecialProjectionData:function(e,t,i,s,a){t=this._getSubMapData("x|"+i,t);var o=require("../util/projection/normal"),r=o.getBbox(t),n=this.geo2pos(e,[s.left,s.top]),h=this.geo2pos(e,[s.left+s.width,s.top+s.height]),l=Math.abs(h[0]-n[0]),p=Math.abs(h[1]-n[1]),d=r.width,c=r.height,f=l/.75/d,u=p/c;if(f>u)f=.75*u,l=d*f;else u=f,f=.75*u,p=c*u;var m={OffsetLeft:n[0],OffsetTop:n[1],scale:{x:f,y:u}},y=o.geoJson2Path(t,m);return this._getSingleProvince(e,y[0],a)},_getSingleProvince:function(e,t,i){var s,a=t.properties.name,o=y[a]||[0,0];if(g[a])s=this.geo2pos(e,g[a]);else if(t.cp)s=[t.cp[0]+o[0],t.cp[1]+o[1]];else{var r=this._mapDataMap[e].bbox;s=this.geo2pos(e,[r.left+r.width/2,r.top+r.height/2]),s[0]+=o[0],s[1]+=o[1]}return t.name=this._nameChange(e,a),t.position=i,t.textX=s[0],t.textY=s[1],t},_getTransform:function(e,t,i){var s,a,o,r,n,h,l,p=this.series,d=this.zr.getWidth(),c=this.zr.getHeight(),f=Math.round(.02*Math.min(d,c));for(var u in t)s=p[u].mapLocation||{},o=s.x||o,n=s.y||n,h=s.width||h,l=s.height||l;if(a=this.parsePercent(o,d),a=isNaN(a)?f:a,r=this.parsePercent(n,c),r=isNaN(r)?f:r,"undefined"==typeof h)h=d-a-2*f;else h=this.parsePercent(h,d);if("undefined"==typeof l)l=c-r-2*f;else l=this.parsePercent(l,c);var m=e.width,y=e.height,g=h/i/m,_=l/y;if(g>_)g=_*i,h=m*g;else _=g,g=_*i,l=y*_;if(isNaN(o))switch(o=o||"center",o+""){case"center":a=Math.floor((d-h)/2);break;case"right":a=d-h}if(isNaN(n))switch(n=n||"center",n+""){case"center":r=Math.floor((c-l)/2);break;case"bottom":r=c-l}return{left:a,top:r,width:h,height:l,baseScale:1,scale:{x:g,y:_}}},_buildMap:function(e,t,i,p){for(var f,u,m,y,g,_,v,b,x,S,M,L=this.series,C=this.component.legend,w=this.component.dataRange,z=this.ecTheme.map,A=0,k=t.length;k>A;A++){if(b=c.clone(t[A]),x={name:b.name,path:b.path,position:c.clone(b.position)},u=b.name,m=i[u]){g=[m],f="";for(var T=0,I=m.seriesIndex.length;I>T;T++)if(g.push(L[m.seriesIndex[T]]),f+=L[m.seriesIndex[T]].name+" ",C&&this._showLegendSymbol[e]&&C.hasColor(L[m.seriesIndex[T]].name))this.shapeList.push(new o({zlevel:this._zlevelBase+1,position:c.clone(b.position),_mapType:e,style:{x:b.textX+3+7*T,y:b.textY-10,r:3,color:C.getColor(L[m.seriesIndex[T]].name)},hoverable:!1}));g.push(z),y=m.value}else{m="-",f="",g=[];for(var P in p)g.push(L[P]);g.push(z),y="-"}if(_=w&&!isNaN(y)?w.getColor(y):null,b.color=b.color||_||this.getItemStyleColor(this.deepQuery(g,"itemStyle.normal.color"),m.seriesIndex,-1,m)||this.deepQuery(g,"itemStyle.normal.areaStyle.color"),b.strokeColor=b.strokeColor||this.deepQuery(g,"itemStyle.normal.borderColor"),b.lineWidth=b.lineWidth||this.deepQuery(g,"itemStyle.normal.borderWidth"),x.color=this.getItemStyleColor(this.deepQuery(g,"itemStyle.emphasis.color"),m.seriesIndex,-1,m)||this.deepQuery(g,"itemStyle.emphasis.areaStyle.color")||b.color,x.strokeColor=this.deepQuery(g,"itemStyle.emphasis.borderColor")||b.strokeColor,x.lineWidth=this.deepQuery(g,"itemStyle.emphasis.borderWidth")||b.lineWidth,b.brushType=x.brushType=b.brushType||"both",b.lineJoin=x.lineJoin="round",b._name=x._name=u,v=this.deepQuery(g,"itemStyle.normal.label.textStyle"),M={zlevel:this._zlevelBase+1,position:c.clone(b.position),_mapType:e,_geo:this.pos2geo(e,[b.textX,b.textY]),style:{brushType:"fill",x:b.textX,y:b.textY,text:this.getLabelText(u,y,g,"normal"),_name:u,textAlign:"center",color:this.deepQuery(g,"itemStyle.normal.label.show")?this.deepQuery(g,"itemStyle.normal.label.textStyle.color"):"rgba(0,0,0,0)",textFont:this.getFont(v)}},M._style=c.clone(M.style),M.highlightStyle=c.clone(M.style),this.deepQuery(g,"itemStyle.emphasis.label.show"))M.highlightStyle.text=this.getLabelText(u,y,g,"emphasis"),M.highlightStyle.color=this.deepQuery(g,"itemStyle.emphasis.label.textStyle.color")||M.style.color,v=this.deepQuery(g,"itemStyle.emphasis.label.textStyle")||v,M.highlightStyle.textFont=this.getFont(v);else M.highlightStyle.color="rgba(0,0,0,0)";if(S={zlevel:this._zlevelBase,position:c.clone(b.position),style:b,highlightStyle:x,_style:c.clone(b),_mapType:e},"undefined"!=typeof b.scale)S.scale=c.clone(b.scale);switch(M=new s(M),S.style.shapeType){case"rectangle":S=new r(S);break;case"line":S=new n(S);break;case"circle":S=new o(S);break;case"polygon":S=new h(S);break;case"ellipse":S=new l(S);break;default:S=new a(S),S.pathArray=S._parsePathData(S.style.path)}if(this._selectedMode[e]&&this._selected[u]||m.selected&&this._selected[u]!==!1)M.style=M.highlightStyle,S.style=S.highlightStyle;if(M.clickable=S.clickable=this._clickable[e]&&("undefined"==typeof m.clickable||m.clickable),this._selectedMode[e])if(this._selected[u]="undefined"!=typeof this._selected[u]?this._selected[u]:m.selected,this._mapTypeMap[u]=e,"undefined"==typeof m.selectable||m.selectable)S.clickable=M.clickable=!0,S.onclick=M.onclick=this.shapeHandler.onclick;if(this._hoverable[e]&&("undefined"==typeof m.hoverable||m.hoverable))M.hoverable=S.hoverable=!0,S.hoverConnect=M.id,M.hoverConnect=S.id,S.onmouseover=M.onmouseover=this.hoverConnect;else M.hoverable=S.hoverable=!1;d.pack(M,{name:f,tooltip:this.deepQuery(g,"tooltip")},0,m,0,u),this.shapeList.push(M),d.pack(S,{name:f,tooltip:this.deepQuery(g,"tooltip")},0,m,0,u),this.shapeList.push(S)}},_buildMark:function(e,t){this._seriesIndexToMapType=this._seriesIndexToMapType||{},this.markAttachStyle=this.markAttachStyle||{};var i=[this._mapDataMap[e].transform.left,this._mapDataMap[e].transform.top];for(var s in t)this._seriesIndexToMapType[s]=e,this.markAttachStyle[s]={position:i,_mapType:e},this.buildMark(s)},getMarkCoord:function(e,t){return t.geoCoord||g[t.name]?this.geo2pos(this._seriesIndexToMapType[e],t.geoCoord||g[t.name]):[0,0]},getMarkGeo:function(e){return e.geoCoord||g[e.name]},_nameChange:function(e,t){return this._nameMap[e][t]||t},getLabelText:function(e,t,i,s){var a=this.deepQuery(i,"itemStyle."+s+".label.formatter");if(a){if("function"==typeof a)return a.call(this.myChart,e,t);else if("string"==typeof a)return a=a.replace("{a}","{a0}").replace("{b}","{b0}"),a=a.replace("{a0}",e).replace("{b0}",t)}else return e},_findMapTypeByPos:function(e,t){var i,s,a,o,r;for(var n in this._mapDataMap)if(i=this._mapDataMap[n].transform,i&&this._roamMap[n]&&this._activeMapType[n]){if(s=i.left,a=i.top,o=i.width,r=i.height,e>=s&&s+o>=e&&t>=a&&a+r>=t)return n}else;},__onmousewheel:function(e){if(!(this.shapeList.length<=0)){var t,i=e.event,s=u.getX(i),a=u.getY(i),o=u.getDelta(i),r=e.mapTypeControl;if(!r)if(r={},t=this._findMapTypeByPos(s,a),t&&this._roamMap[t]&&"move"!=this._roamMap[t])r[t]=!0;var n=!1;for(t in r)if(r[t]){n=!0;var h=this._mapDataMap[t].transform,l=h.left,d=h.top,c=h.width,f=h.height,m=this.pos2geo(t,[s-l,a-d]);if(o>0){if(o=1.2,"undefined"!=typeof this._scaleLimitMap[t].max&&h.baseScale>=this._scaleLimitMap[t].max)return}else if(o=1/1.2,"undefined"!=typeof this._scaleLimitMap[t].min&&h.baseScale<=this._scaleLimitMap[t].min)return;h.baseScale*=o,h.scale.x*=o,h.scale.y*=o,h.width=c*o,h.height=f*o,this._mapDataMap[t].hasRoam=!0,this._mapDataMap[t].transform=h,m=this.geo2pos(t,m),h.left-=m[0]-(s-l),h.top-=m[1]-(a-d),this._mapDataMap[t].transform=h,this.clearEffectShape(!0);for(var y=0,g=this.shapeList.length;g>y;y++)if(this.shapeList[y]._mapType==t){if(this.shapeList[y].position[0]=h.left,this.shapeList[y].position[1]=h.top,"path"==this.shapeList[y].type||"symbol"==this.shapeList[y].type||"circle"==this.shapeList[y].type||"rectangle"==this.shapeList[y].type||"polygon"==this.shapeList[y].type||"line"==this.shapeList[y].type||"ellipse"==this.shapeList[y].type)this.shapeList[y].scale[0]*=o,this.shapeList[y].scale[1]*=o;else if("mark-line"==this.shapeList[y].type)this.shapeList[y].style.pointListLength=void 0,this.shapeList[y].style.pointList=!1,m=this.geo2pos(t,this.shapeList[y]._geo[0]),this.shapeList[y].style.xStart=m[0],this.shapeList[y].style.yStart=m[1],m=this.geo2pos(t,this.shapeList[y]._geo[1]),this.shapeList[y]._x=this.shapeList[y].style.xEnd=m[0],this.shapeList[y]._y=this.shapeList[y].style.yEnd=m[1];else if("icon"==this.shapeList[y].type)m=this.geo2pos(t,this.shapeList[y]._geo),this.shapeList[y].style.x=this.shapeList[y].style._x=m[0]-this.shapeList[y].style.width/2,this.shapeList[y].style.y=this.shapeList[y].style._y=m[1]-this.shapeList[y].style.height/2;else if(m=this.geo2pos(t,this.shapeList[y]._geo),this.shapeList[y].style.x=m[0],this.shapeList[y].style.y=m[1],"text"==this.shapeList[y].type)this.shapeList[y]._style.x=this.shapeList[y].highlightStyle.x=m[0],this.shapeList[y]._style.y=this.shapeList[y].highlightStyle.y=m[1];this.zr.modShape(this.shapeList[y].id)}}if(n){u.stop(i),this.zr.refresh();var _=this;clearTimeout(this._refreshDelayTicket),this._refreshDelayTicket=setTimeout(function(){_&&_.shapeList&&_.animationEffect()},100),this.messageCenter.dispatch(p.EVENT.MAP_ROAM,e.event,{type:"scale"},this.myChart)}}},__onmousedown:function(e){if(!(this.shapeList.length<=0)){var t=e.target;if(!t||!t.draggable){var i=e.event,s=u.getX(i),a=u.getY(i),o=this._findMapTypeByPos(s,a);if(o&&this._roamMap[o]&&"scale"!=this._roamMap[o]){this._mousedown=!0,this._mx=s,this._my=a,this._curMapType=o,this.zr.on(f.EVENT.MOUSEUP,this._onmouseup);var r=this;setTimeout(function(){r.zr.on(f.EVENT.MOUSEMOVE,r._onmousemove)},100)}}}},__onmousemove:function(e){if(this._mousedown&&this._isAlive){var t=e.event,i=u.getX(t),s=u.getY(t),a=this._mapDataMap[this._curMapType].transform;a.hasRoam=!0,a.left-=this._mx-i,a.top-=this._my-s,this._mx=i,this._my=s,this._mapDataMap[this._curMapType].transform=a;for(var o=0,r=this.shapeList.length;r>o;o++)if(this.shapeList[o]._mapType==this._curMapType)this.shapeList[o].position[0]=a.left,this.shapeList[o].position[1]=a.top,this.zr.modShape(this.shapeList[o].id);this.messageCenter.dispatch(p.EVENT.MAP_ROAM,e.event,{type:"move"},this.myChart),this.clearEffectShape(!0),this.zr.refresh(),this._justMove=!0,u.stop(t)}},__onmouseup:function(e){var t=e.event;this._mx=u.getX(t),this._my=u.getY(t),this._mousedown=!1;var i=this;setTimeout(function(){i._justMove&&i.animationEffect(),i._justMove=!1,i.zr.un(f.EVENT.MOUSEMOVE,i._onmousemove),i.zr.un(f.EVENT.MOUSEUP,i._onmouseup)},120)},__onroamcontroller:function(e){var t=e.event;t.zrenderX=this.zr.getWidth()/2,t.zrenderY=this.zr.getHeight()/2;var i=e.mapTypeControl,s=0,a=0,o=e.step;switch(e.roamType){case"scaleUp":return t.zrenderDelta=1,void this.__onmousewheel({event:t,mapTypeControl:i});case"scaleDown":return t.zrenderDelta=-1,void this.__onmousewheel({event:t,mapTypeControl:i});case"up":s=-o;break;case"down":s=o;break;case"left":a=-o;break;case"right":a=o}var r,n;for(n in i)if(this._mapDataMap[n]&&this._activeMapType[n])r=this._mapDataMap[n].transform,r.hasRoam=!0,r.left-=a,r.top-=s,this._mapDataMap[n].transform=r;else;for(var h=0,l=this.shapeList.length;l>h;h++)if(n=this.shapeList[h]._mapType,i[n]&&this._activeMapType[n])r=this._mapDataMap[n].transform,this.shapeList[h].position[0]=r.left,this.shapeList[h].position[1]=r.top,this.zr.modShape(this.shapeList[h].id);else;this.messageCenter.dispatch(p.EVENT.MAP_ROAM,e.event,{type:"move"},this.myChart),this.clearEffectShape(!0),this.zr.refresh(),clearTimeout(this.dircetionTimer);var d=this;this.dircetionTimer=setTimeout(function(){d.animationEffect()},150)},onclick:function(e){if(this.isClick&&e.target&&!this._justMove&&"icon"!=e.target.type){this.isClick=!1;var t=e.target,i=t.style._name,s=this.shapeList.length,a=t._mapType||"";if("single"==this._selectedMode[a])for(var o in this._selected)if(this._selected[o]&&this._mapTypeMap[o]==a){for(var r=0;s>r;r++)if(this.shapeList[r].style._name==o&&this.shapeList[r]._mapType==a)this.shapeList[r].style=this.shapeList[r]._style,this.zr.modShape(this.shapeList[r].id);o!=i&&(this._selected[o]=!1)}this._selected[i]=!this._selected[i];for(var r=0;s>r;r++)if(this.shapeList[r].style._name==i&&this.shapeList[r]._mapType==a){if(this._selected[i])this.shapeList[r].style=this.shapeList[r].highlightStyle;else this.shapeList[r].style=this.shapeList[r]._style;this.zr.modShape(this.shapeList[r].id)}this.messageCenter.dispatch(p.EVENT.MAP_SELECTED,e.event,{selected:this._selected,target:i},this.myChart),this.zr.refresh();var n=this;setTimeout(function(){n.zr.trigger(f.EVENT.MOUSEMOVE,e.event)},100)}},refresh:function(e){if(e)this.option=e,this.series=e.series;if(this._mapDataRequireCounter>0)this.clear();else this.backupShapeList();this._buildShape(),this.zr.refreshHover()},ondataRange:function(e,t){if(this.component.dataRange)this.refresh(),t.needRefresh=!0},pos2geo:function(e,t){if(!this._mapDataMap[e].transform)return null;else return this._mapDataMap[e].projection.pos2geo(this._mapDataMap[e].transform,t)},getGeoByPos:function(e,t){if(!this._mapDataMap[e].transform)return null;var i=[this._mapDataMap[e].transform.left,this._mapDataMap[e].transform.top];if(t instanceof Array)t[0]-=i[0],t[1]-=i[1];else t.x-=i[0],t.y-=i[1];return this.pos2geo(e,t)},geo2pos:function(e,t){if(!this._mapDataMap[e].transform)return null;else return this._mapDataMap[e].projection.geo2pos(this._mapDataMap[e].transform,t)},getPosByGeo:function(e,t){if(!this._mapDataMap[e].transform)return null;var i=this.geo2pos(e,t);return i[0]+=this._mapDataMap[e].transform.left,i[1]+=this._mapDataMap[e].transform.top,i},getMapPosition:function(e){if(!this._mapDataMap[e].transform)return null;else return[this._mapDataMap[e].transform.left,this._mapDataMap[e].transform.top]},dispose:function(){this.clear(),this.shapeList=null,this.effectList=null,this._isAlive=!1,this.zr.un(f.EVENT.MOUSEWHEEL,this._onmousewheel),this.zr.un(f.EVENT.MOUSEDOWN,this._onmousedown),this.messageCenter.unbind(p.EVENT.ROAMCONTROLLER,this._onroamcontroller)}},c.inherits(e,i),c.inherits(e,t),require("../chart").define("map",e),e});