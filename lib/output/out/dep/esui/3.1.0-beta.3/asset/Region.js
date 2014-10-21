/*! @2014 Leo Wang. All Rights Reserved */
define("esui/Region",["require","./Select","./lib","./controlHelper","./InputControl","./main","underscore"],function(require){function e(){_.apply(this,arguments)}function t(e){for(var t=e.regionData,i=t.length,n=[],a=0;i>a;a++)n.push(l(e,t[a],1));var o='<input type="hidden" id="${inputId}" name="${name}" />';n.push(x.format(o,{inputId:L.getId(e,"param-value"),name:e.name})),e.main.innerHTML=n.join("")}function i(e,t,n){t.call(n,e),X.each(e.children,function(e){i(e,t,n)})}function n(e,t){var n=e.regionDataIndex,s=[];X.each(t,function(e){var t=n[e];if(t)i(t,function(e){s.push(e.id)})});var r={};X.each(s,function(e){r[e]=1}),X.each(e.regionDataIndex,function(t,i){var n=r.hasOwnProperty(i),o=a(e,i);if(o)o.checked=n;else t.isSelected=n}),o(e),g(e)}function a(e,t){return x.g(L.getId(e,"item-"+t))}function o(e,t,i,n){var n=n||0;t=t||{children:e.regionData};var s=e.regionDataIndex[t.id];if(!i)e.rawValue=[];var l,h=0,V=t.id&&a(e,t.id),m=t.children,U=m instanceof Array&&m.length;if(U){for(var d=!0,p=0;U>p;p++){if(l=o(e,m[p],1,n+1))h++;d=d&&l}if(V)V.checked=d,d&&e.rawValue.push(t.id),s.isSelected=d;if(3==n)if(!d)r(e,h,U,t.id);else r(e,1,1,t.id);return d}else{if(V){if(V.checked)e.rawValue.push(t.id);return V.checked}else if(s.isSelected)e.rawValue.push(t.id);return s.isSelected}}function s(){return W.getConfig("stateClassPrefix")+"-hidden"}function r(e,t,i,n){var a=x.g(L.getId(e,"info-"+n));if(0!==t&&t!==i)x.removeClass(a,s()),a.innerHTML=t+"/"+i;else x.addClass(a,s()),a.innerHTML=""}function l(e,t,i){t.level=i;var n=[],a=t.children;if(null!=a)if(t.isSelected=!1,3==t.level){if(t.children&&t.children.length>0)e.cityCache[t.id]=h(e,t)}else for(var o=a instanceof Array&&a.length,r=0;o>r;r++)n.push(l(e,t.children[r],i+1));switch(i){case 1:return x.format(K,{boxClass:L.getPartClasses(e,"country-box").join(" "),itemClasses:L.getPartClasses(e,"country-check").join(" "),itemWrapperId:"",itemValue:t.id,itemId:L.getId(e,"item-"+t.id),level:t.level,text:t.text,contentClass:"",content:n.join("")});case 2:return x.format(K,{boxClass:L.getPartClasses(e,"region-box"+J++%2).join(" "),itemClasses:L.getPartClasses(e,"region-check").join(" "),itemWrapperId:"",itemValue:t.id,itemId:L.getId(e,"item-"+t.id),level:t.level,text:t.text,contentClass:L.getPartClasses(e,"province-box").join(" "),content:n.join("")});case 3:var V=x.format(I,{popLayerClass:L.getPartClasses(e,"locator").join(" "),layerBoxClass:L.getPartClasses(e,"city-box").join(" "),hiddenClass:s(),id:L.getId(e,"sub-"+t.id),infoId:L.getId(e,"info-"+t.id),innerHTML:n.join("")}),m=x.format(w,{itemClasses:L.getPartClasses(e,"text").join(" "),itemWrapperId:L.getId(e,"wrapper-"+t.id),itemValue:t.id,itemId:L.getId(e,"item-"+t.id),level:t.level,text:t.text});return x.format(v,{classes:L.getPartClasses(e,"province-item").join(" "),content:V+m});case 4:return x.format(w,{itemClasses:L.getPartClasses(e,"city").join(" "),itemWrapperId:"",itemValue:t.id,itemId:L.getId(e,"item-"+t.id),level:t.level,text:t.text})}}function h(e,t){if(3==t.level&&null!=t.children){for(var i=[],n=0,a=0,o=0;o<t.children.length;o++){if(t.children[o].parent=t,t.children[o].level=t.level+1,i.push(l(e,t.children[o],t.level+1)),o%2===0&&t.children[o].text.length>n)n=t.children[o].text.length;if(o%2===1&&t.children[o].text.length>a)a=t.children[o].text.length}if(i.length%2===1)i.push("");for(var s=['<table border="0" cellspacing="0" cellpadding="0"',' width="',14*(n+a)+66,'">'].join(""),r=["<tr>",'<td width="',14*n+33,'">${firstItem}',"</td>",'<td width="',14*a+33,'">${secondItem}',"</td>","</tr>"].join(""),h=0;h<i.length;h+=2)s+=x.format(r,{firstItem:i[h],secondItem:i[h+1]});return s+"</table>"}return""}function V(e,t){function i(e,n){var a,o,s=e instanceof Array&&e.length;if(s)for(var a=0;s>a;a++){var o=x.clone(e[a]);o.parent=n,t.regionDataIndex[o.id]=o,i(o.children,o)}}var n=t.regionData;t.regionDataIndex={},i(n,{children:n})}function m(e){if(!this.disabled&&!this.readOnly)for(var t=e.target;t&&t!=document.body;){var i=!1;if("input"===t.nodeName.toLowerCase())i=!0;else if("label"===t.nodeName.toLowerCase()){var n=x.getAttribute(t,"for");t=x.g(n),i=!0}if(i)return U(this,t),void this.fire("change");t=t.parentNode}}function U(e,t,i){var n=x.getAttribute(t,"data-optionId"),s=t.checked,l=e.regionDataIndex[n];l.isSelected=s;var h=l.children,V=h instanceof Array&&h.length;if(V)X.each(h,function(t){var i=a(e,t.id);if(i)i.checked=s,U(e,i,1);else e.regionDataIndex[t.id].isSelected=s});else if(0===V)if(3==x.getAttribute(t,"level")){var m=0,d=e.regionDataIndex[n].parent.children;X.each(d,function(e){if(a(e.id).checked===!0)m++}),r(e,m,d.length,e.regionDataIndex[n].parent.id)}if(!i)o(e),g(e)}function d(e,t){if(!this.disabled&&!this.readOnly){var i=t.target,n=L.getPartClasses(this,"text"),a=L.getPartClasses(this,"city-box"),o=p;if("hide"==e)o=c;for(var s;i&&i!=document.body;){var r;if(x.hasClass(i,n[0]))s=x.getAttribute(i.firstChild,"value"),r=i.previousSibling.firstChild;else if(x.hasClass(i,a[0]))r=i;if(r)return void o(this,r,s);i=i.parentNode}}}function p(e,t,i){if(i){var a=e.cityCache[i];if(!a)return;t.innerHTML=a,n(e,e.rawValue)}x.removeClass(t,s());var o=t.parentNode.nextSibling;L.addPartClasses(e,"text-over",o)}function c(e,t){x.addClass(t,s());var i=t.parentNode.nextSibling;L.removePartClasses(e,"text-over",i)}function u(e,t){function i(e){var t=e.children,a=!!t;if(e.id)n.push({text:e.text,value:e.id,disabled:a});if(a)for(var o=t.length,s=0,o=t.length;o>s;s++)i(t[s])}var n=[];i({children:t.regionData}),t.singleRegionData=n}function f(e){var t='<div data-ui="type:Select;childName:regionSel;id:regionSel;width:100;"></div><input type="hidden" id="${inputId}" name="${name}" />';e.main.innerHTML=x.format(t,{inputId:L.getId(e,"param-value"),name:e.name}),e.initChildren(e.main);var i=e.getChild("regionSel");i.setProperties({datasource:e.singleRegionData}),i.on("change",x.bind(y,null,e,i))}function y(e,t){var i=parseInt(t.getValue(),10);e.rawValue=i,g(e)}function b(e,t){if("multi"===e.mode)for(var i=e.main.getElementsByTagName("input"),n=0,a=i.length;a>n;n++){var o=i[n];o.disabled=t}else{var s=e.getChild("regionSel");s.setProperties({disabled:t})}}function g(e){var t=x.g(L.getId(e,"param-value")),i=e.rawValue;if(x.isArray(i))t.value=i.join(",");else t.value=i}function k(e,t){var i=e.regionDataIndex,n=[];if(i[t.id]&&i[t.id].isSelected)n.push(t.id);else X.each(t.children,function(t){var a=i[t.id];n.push.apply(n,k(e,a))});return n}require("./Select");var x=require("./lib"),L=require("./controlHelper"),_=require("./InputControl"),W=require("./main"),X=require("underscore"),w=['<div class="${itemClasses}" id="${itemWrapperId}" >','<input type="checkbox" value="${itemValue}" id="${itemId}"',' data-optionId="${itemValue}" data-level="${level}">','<label for="${itemId}">${text}</label>',"</div>"].join(""),K=['<div class="${boxClass}">',w,'<div class="${contentClass}">${content}</div>',"</div>"].join(""),I=['<div class="${popLayerClass}">','<div class="${hiddenClass} ${layerBoxClass}" id="${id}">',"${innerHTML}</div>",'<b class="${hiddenClass}" id="${infoId}"></b>',"</div>"].join(""),v='<div class="${classes}">${content}</div>',J=0;return e.prototype={type:"Region",initOptions:function(t){var i={regionData:x.clone(e.REGION_LIST),mode:"multi",pureSelect:!1,rawValue:[]};if(L.extractValueFromInput(this,t),t.value)t.rawValue=t.value.split(",");if(x.extend(i,t),"multi"==i.mode)V(this,i),this.cityCache={};else i.rawValue="",u(this,i);if("false"==i.pureSelect)i.pureSelect=!1;this.setProperties(i)},initStructure:function(){if(x.isInput(this.main))L.replaceMain(this);if("multi"==this.mode)t(this);else f(this),x.addClass(this.main,L.getPartClasses(this,"single").join(" "))},initEvents:function(){if("multi"==this.mode)this.helper.addDOMEvent(this.main,"click",m),this.helper.addDOMEvent(this.main,"mouseover",x.curry(d,"show")),this.helper.addDOMEvent(this.main,"mouseout",x.curry(d,"hide"));else{var e=this.getChild("regionSel");e.on("change",x.bind(y,null,this,e))}},repaint:L.createRepaint(_.prototype.repaint,{name:"rawValue",paint:function(e,t){if("multi"==e.mode)n(e,t);else{var i=e.getChild("regionSel");i.setProperties({value:t})}}},{name:["disabled","readOnly"],paint:function(e,t,i){var n=!0;if(t||i)n=!1;if(b(e,!n),!t&&i){var a=x.g(L.getId(e,"param-value"));a.disabled=!1}}}),setRawValue:function(e){this.setProperties({rawValue:e})},getRawValue:function(){if("single"==this.mode)return this.getChild("regionSel").getValue();if(this.pureSelect){var e={id:"-100",children:this.regionData},t=k(this,e);return t}return this.rawValue},stringifyValue:function(e){if("multi"==this.mode)return e.join(",");else return e},parseValue:function(e){return e.split(",")}},e.REGION_LIST=[{id:"90",text:"中国",children:[{id:"80",text:"华北地区",children:[{id:"1",text:"北京",children:[{id:"742",text:"昌平区"},{id:"743",text:"朝阳区"},{id:"744",text:"崇文区"},{id:"745",text:"大兴区"},{id:"746",text:"东城区"},{id:"747",text:"房山区"},{id:"748",text:"丰台区"},{id:"749",text:"海淀区"},{id:"750",text:"怀柔区"},{id:"751",text:"门头沟区"},{id:"752",text:"密云县"},{id:"753",text:"平谷区"},{id:"754",text:"石景山区"},{id:"755",text:"顺义区"},{id:"756",text:"通州区"},{id:"757",text:"西城区"},{id:"758",text:"宣武区"},{id:"759",text:"延庆县"}]},{id:"3",text:"天津",children:[{id:"760",text:"宝坻区"},{id:"761",text:"北辰区"},{id:"763",text:"东丽区"},{id:"765",text:"河北区"},{id:"766",text:"河东区"},{id:"767",text:"和平区"},{id:"768",text:"河西区"},{id:"769",text:"红桥区"},{id:"770",text:"蓟县"},{id:"771",text:"津南区"},{id:"772",text:"静海县"},{id:"773",text:"南开区"},{id:"774",text:"宁河县"},{id:"776",text:"武清区"},{id:"777",text:"西青区"},{id:"900",text:"滨海新区"}]},{id:"15",text:"河北",children:[{id:"226",text:"保定市"},{id:"228",text:"沧州市"},{id:"229",text:"承德市"},{id:"230",text:"邯郸市"},{id:"231",text:"衡水市"},{id:"234",text:"廊坊市"},{id:"236",text:"秦皇岛市"},{id:"239",text:"石家庄市"},{id:"240",text:"唐山市"},{id:"241",text:"邢台市"},{id:"242",text:"张家口市"}]},{id:"24",text:"内蒙古",children:[{id:"428",text:"阿拉善盟"},{id:"429",text:"巴彦淖尔市"},{id:"430",text:"包头市"},{id:"431",text:"赤峰市"},{id:"432",text:"鄂尔多斯市"},{id:"434",text:"呼和浩特市"},{id:"435",text:"呼伦贝尔市"},{id:"437",text:"通辽市"},{id:"438",text:"乌海市"},{id:"439",text:"乌兰察布市"},{id:"442",text:"锡林郭勒盟"},{id:"444",text:"兴安盟"}]},{id:"28",text:"山西",children:[{id:"486",text:"大同市"},{id:"491",text:"晋城市"},{id:"492",text:"晋中市"},{id:"493",text:"临汾市"},{id:"494",text:"吕梁市"},{id:"495",text:"朔州市"},{id:"496",text:"太原市"},{id:"497",text:"忻州市"},{id:"498",text:"阳泉市"},{id:"501",text:"运城市"},{id:"502",text:"长治市"}]}]},{id:"81",text:"东北地区",children:[{id:"17",text:"黑龙江",children:[{id:"272",text:"大庆市"},{id:"273",text:"大兴安岭地区"},{id:"276",text:"哈尔滨市"},{id:"278",text:"鹤岗市"},{id:"279",text:"黑河市"},{id:"282",text:"鸡西市"},{id:"284",text:"佳木斯市"},{id:"287",text:"牡丹江市"},{id:"289",text:"七台河市"},{id:"290",text:"齐齐哈尔市"},{id:"291",text:"双鸭山市"},{id:"293",text:"绥化市"},{id:"298",text:"伊春市"}]},{id:"20",text:"吉林",children:[{id:"345",text:"白城市"},{id:"346",text:"白山市"},{id:"351",text:"吉林市"},{id:"352",text:"辽源市"},{id:"355",text:"四平市"},{id:"356",text:"松原市"},{id:"358",text:"通化市"},{id:"359",text:"延边朝鲜族自治州"},{id:"361",text:"长春市"}]},{id:"23",text:"辽宁",children:[{id:"413",text:"鞍山市"},{id:"414",text:"本溪市"},{id:"415",text:"朝阳市"},{id:"416",text:"大连市"},{id:"417",text:"丹东市"},{id:"418",text:"抚顺市"},{id:"419",text:"阜新市"},{id:"421",text:"葫芦岛市"},{id:"422",text:"锦州市"},{id:"423",text:"辽阳市"},{id:"424",text:"盘锦市"},{id:"425",text:"沈阳市"},{id:"426",text:"铁岭市"},{id:"427",text:"营口市"}]}]},{id:"82",text:"华东地区",children:[{id:"2",text:"上海",children:[{id:"818",text:"宝山区"},{id:"819",text:"崇明县"},{id:"820",text:"奉贤区"},{id:"821",text:"虹口区"},{id:"822",text:"黄浦区"},{id:"823",text:"嘉定区"},{id:"824",text:"金山区"},{id:"825",text:"静安区"},{id:"826",text:"卢湾区"},{id:"827",text:"闵行区"},{id:"830",text:"浦东新区"},{id:"831",text:"普陀区"},{id:"832",text:"青浦区"},{id:"833",text:"松江区"},{id:"834",text:"徐汇区"},{id:"835",text:"杨浦区"},{id:"836",text:"闸北区"},{id:"837",text:"长宁区"}]},{id:"8",text:"安徽",children:[{id:"101",text:"安庆市"},{id:"102",text:"蚌埠市"},{id:"103",text:"亳州市"},{id:"104",text:"巢湖市"},{id:"105",text:"池州市"},{id:"106",text:"滁州市"},{id:"107",text:"阜阳市"},{id:"110",text:"合肥市"},{id:"111",text:"淮北市"},{id:"112",text:"淮南市"},{id:"113",text:"黄山市"},{id:"115",text:"六安市"},{id:"116",text:"马鞍山市"},{id:"118",text:"铜陵市"},{id:"119",text:"芜湖市"},{id:"120",text:"宿州市"},{id:"121",text:"宣城市"}]},{id:"9",text:"福建",children:[{id:"124",text:"福州市"},{id:"126",text:"龙岩市"},{id:"127",text:"南平市"},{id:"128",text:"宁德市"},{id:"129",text:"莆田市"},{id:"130",text:"泉州市"},{id:"131",text:"三明市"},{id:"132",text:"厦门市"},{id:"138",text:"漳州市"}]},{id:"21",text:"江苏",children:[{id:"363",text:"常州市"},{id:"367",text:"淮安市"},{id:"375",text:"连云港市"},{id:"376",text:"南京市"},{id:"377",text:"南通市"},{id:"381",text:"苏州市"},{id:"383",text:"泰州市"},{id:"386",text:"无锡市"},{id:"391",text:"宿迁市"},{id:"392",text:"徐州市"},{id:"393",text:"盐城市"},{id:"395",text:"扬州市"},{id:"399",text:"镇江市"}]},{id:"22",text:"江西",children:[{id:"401",text:"抚州市"},{id:"402",text:"赣州市"},{id:"403",text:"吉安市"},{id:"404",text:"景德镇市"},{id:"406",text:"九江市"},{id:"407",text:"南昌市"},{id:"408",text:"萍乡市"},{id:"409",text:"上饶市"},{id:"410",text:"新余市"},{id:"411",text:"宜春市"},{id:"412",text:"鹰潭市"}]},{id:"27",text:"山东",children:[{id:"461",text:"滨州市"},{id:"462",text:"德州市"},{id:"463",text:"东营市"},{id:"466",text:"菏泽市"},{id:"467",text:"济南市"},{id:"468",text:"济宁市"},{id:"470",text:"莱芜市"},{id:"472",text:"聊城市"},{id:"473",text:"临沂市"},{id:"474",text:"青岛市"},{id:"476",text:"日照市"},{id:"477",text:"泰安市"},{id:"479",text:"威海市"},{id:"480",text:"潍坊市"},{id:"481",text:"烟台市"},{id:"482",text:"枣庄市"},{id:"485",text:"淄博市"}]},{id:"34",text:"浙江",children:[{id:"604",text:"杭州市"},{id:"605",text:"湖州市"},{id:"606",text:"嘉兴市"},{id:"608",text:"金华市"},{id:"611",text:"丽水市"},{id:"615",text:"宁波市"},{id:"617",text:"衢州市"},{id:"619",text:"绍兴市"},{id:"621",text:"台州市"},{id:"624",text:"温州市"},{id:"630",text:"舟山市"}]}]},{id:"83",text:"华中地区",children:[{id:"16",text:"河南",children:[{id:"243",text:"安阳市"},{id:"246",text:"鹤壁市"},{id:"249",text:"焦作市"},{id:"250",text:"开封市"},{id:"252",text:"漯河市"},{id:"253",text:"洛阳市"},{id:"254",text:"南阳市"},{id:"255",text:"平顶山市"},{id:"256",text:"濮阳市"},{id:"257",text:"三门峡市"},{id:"258",text:"商丘市"},{id:"261",text:"新乡市"},{id:"262",text:"信阳市"},{id:"263",text:"许昌市"},{id:"266",text:"郑州市"},{id:"267",text:"周口市"},{id:"268",text:"驻马店市"},{id:"901",text:"济源市"}]},{id:"18",text:"湖北",children:[{id:"304",text:"鄂州市"},{id:"305",text:"恩施市"},{id:"307",text:"黄冈市"},{id:"308",text:"黄石市"},{id:"309",text:"荆门市"},{id:"310",text:"荆州市"},{id:"311",text:"潜江市"},{id:"312",text:"神农架林区"},{id:"313",text:"十堰市"},{id:"314",text:"随州市"},{id:"315",text:"天门市"},{id:"317",text:"武汉"},{id:"319",text:"仙桃市"},{id:"320",text:"咸宁市"},{id:"321",text:"襄樊市"},{id:"323",text:"孝感市"},{id:"324",text:"宜昌市"}]},{id:"19",text:"湖南",children:[{id:"328",text:"常德市"},{id:"329",text:"郴州市"},{id:"330",text:"衡阳市"},{id:"331",text:"怀化市"},{id:"334",text:"娄底市"},{id:"335",text:"邵阳市"},{id:"337",text:"湘潭市"},{id:"338",text:"湘西土家族苗族自治州"},{id:"339",text:"益阳市"},{id:"340",text:"永州市"},{id:"341",text:"岳阳市"},{id:"342",text:"张家界市"},{id:"343",text:"长沙市"},{id:"344",text:"株洲市"}]}]},{id:"84",text:"华南地区",children:[{id:"11",text:"广东",children:[{id:"157",text:"潮州市"},{id:"158",text:"东莞市"},{id:"160",text:"佛山市"},{id:"162",text:"广州市"},{id:"163",text:"河源市"},{id:"164",text:"惠州市"},{id:"166",text:"江门市"},{id:"167",text:"揭阳市"},{id:"169",text:"茂名市"},{id:"170",text:"梅州市"},{id:"172",text:"清远市"},{id:"173",text:"汕头市"},{id:"174",text:"汕尾市"},{id:"175",text:"韶关市"},{id:"176",text:"深圳市"},{id:"180",text:"阳江市"},{id:"182",text:"云浮市"},{id:"184",text:"湛江市"},{id:"185",text:"肇庆市"},{id:"186",text:"中山市"},{id:"187",text:"珠海市"}]},{id:"12",text:"广西",children:[{id:"188",text:"百色市"},{id:"189",text:"北海市"},{id:"191",text:"防城港市"},{id:"193",text:"贵港市"},{id:"194",text:"桂林市"},{id:"195",text:"河池市"},{id:"196",text:"贺州市"},{id:"197",text:"来宾市"},{id:"198",text:"柳州市"},{id:"199",text:"南宁市"},{id:"200",text:"钦州市"},{id:"201",text:"梧州市"},{id:"203",text:"玉林市"}]},{id:"14",text:"海南",children:[{id:"218",text:"儋州市"},{id:"219",text:"东方市"},{id:"220",text:"海口市"},{id:"221",text:"琼海市"},{id:"223",text:"三亚市"},{id:"225",text:"文昌市"},{id:"867",text:"五指山"},{id:"868",text:"万宁"}]}]},{id:"85",text:"西南地区",children:[{id:"4",text:"重庆",children:[{id:"778",text:"巴南区"},{id:"779",text:"北碚区"},{id:"780",text:"璧山县"},{id:"781",text:"城口县"},{id:"782",text:"大渡口区"},{id:"783",text:"大足县"},{id:"784",text:"垫江县"},{id:"785",text:"丰都县"},{id:"786",text:"奉节县"},{id:"787",text:"涪陵区"},{id:"788",text:"合川区"},{id:"789",text:"江北区"},{id:"790",text:"江津区"},{id:"791",text:"九龙坡区"},{id:"792",text:"开县"},{id:"793",text:"梁平县"},{id:"794",text:"南岸区"},{id:"795",text:"南川区"},{id:"796",text:"彭水县"},{id:"797",text:"綦江县"},{id:"798",text:"黔江区"},{id:"799",text:"荣昌县"},{id:"800",text:"沙坪坝区"},{id:"801",text:"石柱县"},{id:"802",text:"双桥区"},{id:"803",text:"铜梁县"},{id:"804",text:"潼南县"},{id:"805",text:"万盛区"},{id:"806",text:"万州区"},{id:"807",text:"巫山县"},{id:"808",text:"巫溪县"},{id:"809",text:"武隆县"},{id:"810",text:"秀山县"},{id:"811",text:"永川区"},{id:"812",text:"酉阳县"},{id:"813",text:"渝北区"},{id:"814",text:"渝中区"},{id:"815",text:"云阳县"},{id:"816",text:"长寿区"},{id:"817",text:"忠县"}]},{id:"13",text:"贵州",children:[{id:"204",text:"安顺市"},{id:"205",text:"毕节市"},{id:"208",text:"贵阳市"},{id:"210",text:"六盘水市"},{id:"211",text:"黔东南苗族侗族自治州"},{id:"212",text:"黔南布依族苗族自治州"},{id:"213",text:"黔西南布依族苗族自治州"},{id:"215",text:"铜仁市"},{id:"217",text:"遵义市"}]},{id:"30",text:"四川",children:[{id:"516",text:"阿坝藏族羌族自治州"},{id:"517",text:"巴中市"},{id:"518",text:"成都市"},{id:"519",text:"达州市"},{id:"520",text:"德阳市"},{id:"523",text:"甘孜藏族自治州"},{id:"524",text:"广安市"},{id:"526",text:"广元市"},{id:"528",text:"乐山市"},{id:"529",text:"凉山彝族自治州"},{id:"530",text:"泸州市"},{id:"531",text:"眉山市"},{id:"532",text:"绵阳市"},{id:"534",text:"南充市"},{id:"535",text:"内江市"},{id:"536",text:"攀枝花市"},{id:"538",text:"遂宁市"},{id:"540",text:"雅安市"},{id:"541",text:"宜宾市"},{id:"542",text:"资阳市"},{id:"543",text:"自贡市"}]},{id:"31",text:"西藏",children:[{id:"546",text:"拉萨市"},{id:"547",text:"林芝地区"},{id:"548",text:"那曲地区"},{id:"549",text:"日喀则地区"}]},{id:"33",text:"云南",children:[{id:"578",text:"保山市"},{id:"579",text:"楚雄市"},{id:"580",text:"大理市"},{id:"581",text:"德宏傣族景颇族自治州"},{id:"585",text:"红河哈尼族彝族自治州"},{id:"587",text:"昆明市"},{id:"589",text:"丽江市"},{id:"590",text:"临沧市"},{id:"593",text:"普洱市"},{id:"594",text:"曲靖市"},{id:"595",text:"文山市"},{id:"597",text:"玉溪市"},{id:"598",text:"昭通市"}]}]},{id:"86",text:"西北地区",children:[{id:"10",text:"甘肃",children:[{id:"139",text:"白银市"},{id:"140",text:"定西市"},{id:"144",text:"嘉峪关市"},{id:"145",text:"金昌市"},{id:"146",text:"酒泉市"},{id:"147",text:"兰州市"},{id:"148",text:"临夏回族自治州"},{id:"150",text:"陇南市"},{id:"151",text:"平凉市"},{id:"152",text:"庆阳市"},{id:"153",text:"天水市"},{id:"154",text:"武威市"},{id:"156",text:"张掖市"}]},{id:"25",text:"宁夏",children:[{id:"446",text:"固原市"},{id:"447",text:"石嘴山市"},{id:"448",text:"吴忠市"},{id:"449",text:"银川市"},{id:"450",text:"中卫市"}]},{id:"26",text:"青海",children:[{id:"454",text:"海东地区"},{id:"456",text:"海西蒙古族藏族自治州"},{id:"458",text:"西宁市"},{id:"459",text:"玉树藏族自治州"}]},{id:"29",text:"陕西",children:[{id:"503",text:"安康市"},{id:"504",text:"宝鸡市"},{id:"506",text:"汉中市"},{id:"508",text:"商洛市"},{id:"509",text:"铜川市"},{id:"510",text:"渭南市"},{id:"511",text:"西安市"},{id:"512",text:"咸阳市"},{id:"513",text:"延安市"},{id:"515",text:"榆林市"}]},{id:"32",text:"新疆",children:[{id:"551",text:"阿克苏地区"},{id:"554",text:"阿勒泰市"},{id:"556",text:"巴音郭楞蒙古自治州"},{id:"557",text:"博尔塔拉蒙古自治州"},{id:"560",text:"昌吉回族自治州"},{id:"563",text:"哈密市"},{id:"564",text:"和田市"},{id:"565",text:"喀什市"},{id:"566",text:"克拉玛依市"},{id:"570",text:"石河子市"},{id:"571",text:"塔城市"},{id:"572",text:"吐鲁番市"},{id:"573",text:"乌鲁木齐市"},{id:"576",text:"伊犁市"},{id:"869",text:"克孜勒苏柯尔克孜"},{id:"870",text:"五家渠"}]}]},{id:"87",text:"港澳台",children:[{id:"5",text:"澳门"},{id:"6",text:"香港"},{id:"7",text:"台湾"}]}]},{id:"999",text:"国外"},{id:"0",text:"其他"}],x.inherits(e,_),W.register(e),e});