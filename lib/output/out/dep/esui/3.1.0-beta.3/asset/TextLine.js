/*! @2014 Leo Wang. All Rights Reserved */
define("esui/TextLine",["require","underscore","./lib","./InputControl","./main","./TextBox","./painters"],function(require){function e(){r.apply(this,arguments)}function t(e){var t='<textarea wrap="off" id="'+e.helper.getId("text")+'"</textarea>',i=[e.helper.getPartBeginTag("num-line","div"),"1",e.helper.getPartEndTag("num-line","div"),e.helper.getPartBeginTag("text-container","div"),t,e.helper.getPartEndTag("text-container","div")];return i.join("")}function i(e){if("input"===e.type||"value"===e.propertyName)n.call(this)}function n(){var e=this.helper.getPart("text").value.split("\n").length;if(e!==this.number){this.number=e;var t=this.helper.getPart("num-line");t.innerHTML=a.range(1,e+1).join("<br />")}this.resetScroll(),this.fire("change")}var a=require("underscore"),o=require("./lib"),r=require("./InputControl"),s=require("./main");return require("./TextBox"),e.prototype={type:"TextLine",initOptions:function(e){var t={width:300,height:200,value:""};if(o.isInput(this.main))this.helper.extractOptionsFromInput(this.main,t);if(a.extend(t,e),!t.hasOwnProperty("title")&&this.main.title)t.title=this.main.title;this.setProperties(t)},initStructure:function(){if(o.isInput(this.main))this.helper.replaceMain();this.main.innerHTML=t(this),this.helper.initChildren()},initEvents:function(){var e=this.helper.getPart("text"),t="oninput"in e?"input":"propertychange";this.helper.addDOMEvent(e,t,i),this.helper.addDOMEvent(e,"scroll",this.resetScroll)},repaint:require("./painters").createRepaint(r.prototype.repaint,{name:"height",paint:function(e,t){t=t||300;var i=e.helper.getPart("num-line");i.style.height=t+"px",e.main.style.height=t+"px"}},{name:"width",paint:function(e,t){t=t||300,e.main.style.width=t+"px"}},{name:"rawValue",paint:function(e,t){var o=e.helper.getPart("text");if(t){if(a.isArray(t))e.value=a.unescape(t.join("\n"));else if("string"==typeof t)e.value=a.unescape(t);var r="oninput"in o?"input":"propertychange";e.helper.removeDOMEvent(o,r,i),o.value=e.value,e.helper.addDOMEvent(o,r,i),n.call(e)}}},{name:["disabled","readOnly"],paint:function(e,t,i){var n=e.helper.getPart("text");n.disabled=!!t,n.readOnly=!!i}}),resetScroll:function(){var e=this.helper.getPart("text"),t=this.helper.getPart("num-line");t.style.height=e.clientHeight+"px",t.scrollTop=e.scrollTop},stringifyValue:function(e){return e.join("\n")},parseValue:function(e){return o.trim(e.replace(/\n{2,}/g,"\n")).split("\n")},getRawValue:function(){return a.unique(this.getValueRepeatableItems())},getValueRepeatableItems:function(){var e=this.helper.getPart("text").value,t=e.split("\n");return a.chain(t).map(o.trim).compact().value()},getRowsNumber:function(){var e=this.getValue().split("\n");return e.length},addLines:function(e){var t=e.join("\n"),i=this.getValue();if(i.length>0)t=i+"\n"+t;this.setRawValue(t)}},o.inherits(e,r),s.register(e),e});