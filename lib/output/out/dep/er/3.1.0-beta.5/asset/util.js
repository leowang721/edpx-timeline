/*! @2014 Leo Wang. All Rights Reserved */
define("er/util",[],function(){var e=+new Date,t={};t.guid=function(){return"er"+e++},t.mix=function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];if(n){for(var i in n)if(n.hasOwnProperty(i))e[i]=n[i]}else;}return e};var n=Function.prototype.bind;t.bind=n?function(e){return n.apply(e,[].slice.call(arguments,1))}:function(e,t){var n=[].slice.call(arguments,2);return function(){var i=n.concat([].slice.call(arguments));return e.apply(t,i)}},t.noop=function(){};var i=!{toString:1}.propertyIsEnumerable("toString");t.inherits=function(e,t){var n=function(){};n.prototype=t.prototype;var a=new n,o=e.prototype;e.prototype=a;for(var s in o)a[s]=o[s];if(i){if(o.hasOwnProperty("toString"))a.toString=o.toString;if(o.hasOwnProperty("valueOf"))a.valueOf=o.valueOf}return e.prototype.constructor=e,e},t.parseJSON=function(e){if(!e)return void 0;if(window.JSON&&"function"==typeof JSON.parse)return JSON.parse(e);else return new Function("return ("+e+");")()};var a=/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g;return t.trim=function(e){return e.replace(a,"")},t.encodeHTML=function(e){return e+="",e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},t.getElement=function(e){if("string"==typeof e)e=document.getElementById(e);return e},t});