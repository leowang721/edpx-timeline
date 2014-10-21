/*! @2014 Leo Wang. All Rights Reserved */
define("esui/Frame",["require","esui/lib","esui/Control","esui/painters","esui"],function(require){function e(){n.apply(this,arguments)}var t=require("esui/lib"),n=require("esui/Control");e.prototype.type="Frame",e.prototype.createMain=function(){return document.createElement("iframe")},e.prototype.initOptions=function(e){var n={};if(t.extend(n,e),!n.src)n.src=this.main.src;this.setProperties(n)},e.prototype.initStructure=function(){this.main.frameborder="no",this.main.marginHeight="0",this.main.marginWeight="0"},e.prototype.initEvents=function(){this.helper.delegateDOMEvent(this.main,"load"),this.helper.addDOMEvent(this.main,"message",function(e){var t={origin:e.origin,data:e.data};this.fire("message",t)})};var i=require("esui/painters");return e.prototype.repaint=i.createRepaint(n.prototype.repaint,{name:"src",paint:function(e,t){if(e.main.src!==t)e.main.src=t}},i.style("height"),i.style("width")),e.prototype.callContentMethod=function(e){var t=[].slice.call(arguments,1),n=this.main.contentWindow;if(!n)throw new Error("No content window on this iframe");if("function"!=typeof n[e])throw new Error('No "'+e+'" method on window');return n[e].apply(n,t)},e.prototype.postMessage=function(e,t){var n=this.main.contentWindow;if(!n)throw new Error("No content window on this iframe");if("function"!=typeof n.postMessage)throw new Error("Current browser does not support postMessage");n.postMessage(e,t)},t.inherits(e,n),require("esui").register(e),e});